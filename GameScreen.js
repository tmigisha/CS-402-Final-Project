import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Button, StyleSheet, Text, View, Alert, useWindowDimensions } from 'react-native';
import BoardRow from './BoardRow';

const styles = StyleSheet.create({
  inputBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 7,
    paddingLeft: 10,
    borderWidth: 2,
    justifyContent: 'space-around'
  },
  board: {
    paddingTop: 10,
    margin: 10,
    padding: 5,
    borderWidth: 2,
    marginTop: 20,
    height: 410
  },
  icon: {
    borderWidth: 2,
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 4
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
  {key: '~', color: 'yellow'},
  {key: '@', color: 'orange'},
  {key: '&', color: 'purple'}
];

const GameScreen = ({numOfSymbols, numOfTries,setStart}) => {
  const [guesses, setGuesses] = useState(
    Array(numOfTries).fill(null).map(() => Array(4).fill(null))
  );

  const [currentRow, setCurrentRow] = useState(numOfTries - 1);
  const [currentSlot, setCurrentSlot] = useState(0);

  const activeIcons = iconSet.slice(0, numOfSymbols);

 

  const handleIconPress = (symbol) => {
  if (currentSlot < 4) {
    const newGuesses = [...guesses];
    newGuesses[currentRow][currentSlot] = symbol;

    const nextSlot = currentSlot + 1;

    // If row is complete, move up
    if (nextSlot === 4) {
      if (currentRow > 0) 
        setCurrentRow(currentRow - 1); // move up a row
        setCurrentSlot(0);             // reset slot
       
    } else {
      setCurrentSlot(nextSlot);
    }

    setGuesses(newGuesses);
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


  const resetGame = () => {
  const emptyBoard = Array(numOfTries)
    .fill(null)
    .map(() => Array(4).fill(null));

  setGuesses(emptyBoard);
  setCurrentRow(numOfTries - 1);
  setCurrentSlot(0);
};

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
      <View style={styles.board}>
        <FlatList
          data={guesses}
          renderItem={({item}) => (
            <BoardRow
              item1={item[0] || {key: '', color: 'transparent'}}
              item2={item[1] || {key: '', color: 'transparent'}}
              item3={item[2] || {key: '', color: 'transparent'}}
              item4={item[3] || {key: '', color: 'transparent'}}
            />
          )}
          keyExtractor={(item) => item.key}
        />

      </View>
      {inputBox}
    </View>
  );

}

export default GameScreen;