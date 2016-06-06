import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

class Recall extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Hell!
        </Text>
        <Text style={styles.instructions}>
          To get started, drink this random beverage.
        </Text>
        <Text style={styles.instructions}>
          Press rm -rf ~/* to begin,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default Recall