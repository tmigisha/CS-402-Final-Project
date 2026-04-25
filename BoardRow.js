import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Button, StyleSheet, Text, View, Alert, useWindowDimensions } from 'react-native';


const styles = StyleSheet.create({
  gameRow: {
    margin: 4,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 20
  },
  square: {
    
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center'
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  clueBox: {
    flex: 1,
    paddingHorizontal: 5,
    maxWidth: 80, 
    borderWidth: 1,
    marginRight: 20, 
    width: 80, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    backgroundColor: 'white'
  }
});


const BoardRow = ({item1, item2, item3, item4, patternCheck, positionEnabled}) => {
  const getClueColor = (clueValue, index) => {
    if (clueValue === 2 && positionEnabled) {
      const items = [item1, item2, item3, item4];
      return items[index]?.color || 'black';
    }
    return 'black';
  }

  const renderClue = ({item, index}) => {
    if (item === 2) {
      return (
        <View style={{paddingHorizontal: 3}}><Text style={{fontSize: 18, color: getClueColor(2, index)}}>+</Text></View>
      )
        }
    if (item === 1) {
      return (
        <View style={{paddingHorizontal: 3}}><Text style={{fontSize: 18, color: 'black'}}>-</Text></View>
      )
    }
    return null;
  }

  const renderSlot = (item) => {
    const isFilled = item && item.key !== '';
      return (
        <View style={[
          styles.square,
          { backgroundColor: isFilled ? item.color : 'white' } 
        ]}>
          <Text style={[styles.symbolText, {color: 'white', textAlign: 'center'}]}>{item.key}</Text>
        </View>
      );
    }

  return (
    <View style={styles.gameRow}>
      <View style={styles.clueBox}>
        <FlatList 
          data={patternCheck}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={renderClue}
          numColumns={4}
        />
      </View>

      {renderSlot(item1)}
      {renderSlot(item2)}
      {renderSlot(item3)}
      {renderSlot(item4)}
    </View>
  );
}

export default BoardRow;
