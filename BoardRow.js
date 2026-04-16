import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Button, StyleSheet, Text, View, Alert, useWindowDimensions } from 'react-native';


const styles = StyleSheet.create({
  gameRow: {
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20
  },
  square: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center'
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});


const BoardRow = ({item1, item2, item3, item4}) => {
  const renderSlot = (item) => {
    return (
      <View style={styles.square}>
        <Text style={[styles.symbolText, {color: item.color, textAlign: 'center'}]}>{item.key}</Text>
      </View>
    );
  }

  return (
    <View style={styles.gameRow}>
      <View style={[styles.square, {marginRight: 50}]}>
      </View>

      {renderSlot(item1)}
      {renderSlot(item2)}
      {renderSlot(item3)}
      {renderSlot(item4)}
    </View>
  );
}


export default BoardRow;