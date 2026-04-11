import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Button, StyleSheet, Text, View, Alert, useWindowDimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    margin: 20,
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30
  },
  menuRow: {
    flexDirection: 'row',
    padding: 5
  },
  text: {
    fontSize: 20,
    marginTop: 7
  }, 
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 8,
    padding: 7
  },
  dropdownContainer: {
    borderWidth: 2
  },
  checkbox: {
    borderWidth: 3,
    width: 20,
    height: 20,
    margin: 10,
    top: 2
  },
  enabled: {
    backgroundColor: 'blue'
  },
  startButton: {
    margin: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'green'
  }
})

const symbolsData = [
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6}
];

const puzzleLength = [
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8}
];

const HomePage = ({numOfSymbols, setNumOfSymbols, numOfTries, setNumOfTries, positionEnabled, 
                  setPositionEnabled, duplicatesEnabled, setDuplicatesEnabled, start, setStart}) => {
  // const [numOfSymbols, setNumOfSymbols] = useState(6);
  // const [numOfTries, setNumOfTries] = useState(8);
  // const [positionEnabled, setPositionEnabled] = useState(false);
  // const [duplicatesEnabled, setDuplicatesEnabled] = useState(false);
  // const [start, setStart] = useState(false);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pattern Guesser: Deluxe Edition</Text>

      <View style={styles.menuRow}>
        <Text style={styles.text}>Number of Symbols:</Text>
        <Dropdown 
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          data={symbolsData}
          labelField="label"
          valueField="value"
          value={numOfSymbols}
          onChange={item => setNumOfSymbols(item.value)}
        />
      </View>

      <View style={styles.menuRow}>
        <Text style={styles.text}>Number of Tries:</Text>
        <Dropdown 
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          data={puzzleLength}
          labelField="label"
          valueField="value"
          value={numOfTries}
          onChange={item => setNumOfTries(item.value)}
        />
      </View>

      <View style={styles.menuRow}>
        <Text style={styles.text}>Show correct position:</Text>
        <TouchableOpacity 
          style={[styles.checkbox, positionEnabled && styles.enabled]} 
          onPress={() => setPositionEnabled(!positionEnabled)}>
        </TouchableOpacity>
      </View>

      <View style={styles.menuRow}>
        <Text style={styles.text}>No duplicates:</Text>
        <TouchableOpacity 
          style={[styles.checkbox, duplicatesEnabled && styles.enabled]} 
          onPress={() => setDuplicatesEnabled(!duplicatesEnabled)}>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={() => setStart(true)}>
        <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>Start!</Text>
      </TouchableOpacity>
    </View>
  );

}

export default HomePage;