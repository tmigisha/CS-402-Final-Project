import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Button, StyleSheet, Text, View, Alert, useWindowDimensions } from 'react-native';
import BoardRow from './BoardRow';
import { LinearGradient } from 'expo-linear-gradient';
import { generateSequence, compareSequence } from './scripts';


const styles = StyleSheet.create({
  inputBoxContainer: {
    flex: 0.8,
    flexDirection: 'row',
    margin: 10,
    marginBottom: 50,
    padding: 7,
    paddingLeft: 20,
    borderWidth: 2,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  board: {
    flex: 3,
    paddingTop: 10,
    margin: 10,
    padding: 5,
    borderWidth: 2,
    marginTop: 40,
    width: '95%',
    alignSelf: 'center'
  },
  icon: {
    borderWidth: 2,
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 6
  },
  iconText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  },
  menuContainer: {
    flex: 1,
    marginRight: 80,
  },
  menuButton: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 2,
    margin: 4,
    width: 80
  }
});

const iconSet = [
  {key: '*', color: 'red'},
  {key: '#', color: 'blue'},
  {key: '!', color: 'green'},
  {key: '~', color: '#fde047'},
  {key: '@', color: 'orange'},
  {key: '&', color: 'purple'}
];

const GameScreen = ({numOfSymbols, numOfTries, setStart, positionEnabled, noDuplicates}) => {
  const [guesses, setGuesses] = useState(
    Array(numOfTries).fill(null).map(() => Array(4).fill(null))
  );
  const [rowClues, setRowClues] = useState(Array(numOfTries).fill([]));
  const [currentRow, setCurrentRow] = useState(numOfTries - 1);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [secretPattern, setSecretPattern] = useState([]);

  const activeIcons = iconSet.slice(0, numOfSymbols);

  useEffect(() => {
    const secretIndices = generateSequence(numOfSymbols, 4, noDuplicates).flat();
    const patternObjects = secretIndices.map(index => iconSet[index]);
    setSecretPattern(patternObjects); 
    console.log(secretIndices);
   
  }, [numOfSymbols, numOfTries, noDuplicates]);

  const handleIconPress = (symbol) => {
    if (currentRow >= 0 && currentSlot < 4) {
      const newGuesses = [...guesses];
      newGuesses[currentRow][currentSlot] = symbol;
      setGuesses(newGuesses);

      const nextSlot = currentSlot + 1;

      if (nextSlot === 4) {
        
        const result = compareSequence(
          secretPattern.map(s => s.key), 
          newGuesses[currentRow].map(g => g.key), 
          positionEnabled);
        console.log(result);


        const newRowClues = [...rowClues];
        newRowClues[currentRow] = result;
        setRowClues(newRowClues);

        if (result.every(num => (num === 2))) {
          console.log("WIN TRIGGERED");
          Alert.alert(
            'You Won!',
            'You guessed the pattern!',
            [
              { text: 'Home', onPress: () => setStart(false) },
              { text: 'New Game', onPress: resetGame}
            ]
          );
        
        } else if (currentRow === 0) {
          const patternString = secretPattern.map(item => item.key).join(' ');

          Alert.alert(
            'Game Over',
            `The corrct pattern was ${patternString}`,
            [
              { text: 'Home', onPress: () => setStart(false), style: 'bold'},
              { text: 'New Game', onPress: resetGame, style: 'bold'}
            ]
          );
          
        } else {
          setCurrentRow(currentRow - 1); // move up a row
          setCurrentSlot(0);             // reset slot
        }   
      } else {
        setCurrentSlot(nextSlot);
      }
    }
  }

  const handleUndo = () => {
    const newGuesses = guesses.map(row => [...row]);

      if (currentSlot > 0) {
        newGuesses[currentRow][currentSlot - 1] = null;
        setGuesses(newGuesses);
        setCurrentSlot(currentSlot - 1);
        return;
      }
      
      if (currentRow < numOfTries - 1) {
        const prevRow = currentRow + 1;

        let lastIndex = -1;
        for (let i = 0; i < 4; i++) {
          if (newGuesses[prevRow][i] !== null) {
            lastIndex = i;
          }
        }

        if (lastIndex !== -1) {
          newGuesses[prevRow][lastIndex] = null;
          setGuesses(newGuesses);
          setCurrentRow(prevRow);
          setCurrentSlot(lastIndex);
        }
    }
  };


  const resetGame = () => {
    const emptyBoard = Array(numOfTries)
      .fill(null)
      .map(() => Array(4).fill(null));
    const emptyClues = Array(numOfTries).fill([]);

    const secretIndices = generateSequence(numOfSymbols, 4, noDuplicates).flat();
    const patternObjects = secretIndices.map(index => iconSet[index]);
    setSecretPattern(patternObjects); 
    console.log(secretIndices);

    setRowClues(emptyClues);
    setGuesses(emptyBoard);
    setCurrentRow(numOfTries - 1);
    setCurrentSlot(0);
  };

  
  const renderIcon = ({item}) => {
    return (
      <TouchableOpacity 
        style={[styles.icon, {backgroundColor: item.color}]}
        onPress={() => handleIconPress(item)}
      >
        <Text style={styles.iconText}>{item.key}</Text>
      </TouchableOpacity>
    );
  }
  

  var inputBox = 
      <View style={styles.inputBoxContainer}>
        <FlatList
          data={activeIcons}
          keyExtractor={item => item.id}
          renderItem={renderIcon}
          numColumns={3}
        />
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setStart(false)}>
            <Text style={{textAlign: 'center'}}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={resetGame}>
            <Text style={{textAlign: 'center'}}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={handleUndo}>
            <Text style={{textAlign: 'center'}}>Undo</Text>
          </TouchableOpacity>
        </View>
      </View>


  return (
    <View style={{flex: 1}}>
      <LinearGradient colors={['#b5eef5', '#f3f4f6']} style={styles.board} >
        <FlatList
          data={guesses}
          renderItem={({item, index}) => (
            <BoardRow
              item1={item[0] || {key: '', color: 'transparent'}}
              item2={item[1] || {key: '', color: 'transparent'}}
              item3={item[2] || {key: '', color: 'transparent'}}
              item4={item[3] || {key: '', color: 'transparent'}}
              patternCheck={rowClues[index]}
              positionEnabled={positionEnabled}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

      </LinearGradient>
      {inputBox}
    </View>
  );

}

export default GameScreen;
