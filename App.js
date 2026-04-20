import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Button, StyleSheet, Text, View, Alert, useWindowDimensions } from 'react-native';


import HomePage from './HomePage';
import GameScreen from './GameScreen';


const App = () => {
  const [numOfSymbols, setNumOfSymbols] = useState(6);
  const [numOfTries, setNumOfTries] = useState(8);
  const [positionEnabled, setPositionEnabled] = useState(false);
  const [duplicatesEnabled, setDuplicatesEnabled] = useState(false);
  const [start, setStart] = useState(false);
 

  return (
    <>
      {start ? (
        <GameScreen 
          numOfSymbols={numOfSymbols}
          numOfTries={numOfTries}
          setStart={setStart} 
        
        />
      ) : (
        <HomePage 
          numOfSymbols={numOfSymbols}
          setNumOfSymbols={setNumOfSymbols}
          numOfTries={numOfTries}
          setNumOfTries={setNumOfTries}
          positionEnabled={positionEnabled}
          setPositionEnabled={setPositionEnabled}
          duplicatesEnabled={duplicatesEnabled}
          setDuplicatesEnabled={setDuplicatesEnabled}
          start={start}
          setStart={setStart}
        />
      )}
    </>
  );

  


}

export default App;