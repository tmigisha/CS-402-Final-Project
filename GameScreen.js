import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Button, StyleSheet, Text, View, Alert, useWindowDimensions } from 'react-native';

const styles = StyleSheet.create({
  inputBoxContainer: {
    flex: 1,
    margin: 10,
    padding: 7,
    borderWidth: 2,
    justifyContent: 'space-around'
  },
  board: {
    // flex: 1,
    margin: 10,
    padding: 5,
    borderWidth: 2,
    marginTop: 20,
    height: 380
  },
  icon: {
    borderWidth: 2,
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 3
  },
  iconText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  }
});


const iconSet = [
  {key: "*", color: 'red'},
  {key: "#", color: 'blue'},
  {key: "!", color: 'green'},
  {key: "~", color: 'yellow'},
  {key: "@", color: 'orange'},
  {key: "&", color: 'purple'}
];

const GameScreen = ({numOfSymbols}) => {
  const [icon, setIcon] = useState("");



  const renderIcon = ({item}) => {
    return (
      <TouchableOpacity style={[styles.icon, {backgroundColor: item.color}]}>
        <Text style={styles.iconText}>{item.key}</Text>
      </TouchableOpacity>
    );
  }

  var board =
      <View style={styles.board}>
      </View>

  var inputBox = 
      <View style={styles.inputBoxContainer}>
        <FlatList
          data={iconSet}
          keyExtractor={item => item.id}
          renderItem={renderIcon}
          numColumns={3}
        />
      </View>


  return (
    <View>
      {board}
      {inputBox}
    </View>
  );

}

export default GameScreen;