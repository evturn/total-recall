import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import Button from '../Button';
import NormalText from '../NormalText';
import Input from '../Input';

import colors from '../../styles/colors';

class CreateDeckButton extends Component {
  render() {
    return (
      <Button
        style={styles.createDeck}
        onPress={this.props.onPress}>
        <NormalText>Create Deck</NormalText>
      </Button>
    )
  }
}

class EnterDeck extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  create() {
    this.props.create(this.state.text)
  }

  render() {
    return (
      <View style={styles.enterDeck}>
        <Input
          onEntry={this.props.create}
          onChange={text => this.setState({ text })}
        />
        <CreateDeckButton onPress={_ => this.create()} />
      </View>
    )
  }
}

EnterDeck.propTypes = {
  create: PropTypes.func.isRequired
}

class DeckCreation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingNameField: false
    }
  }

  newDeck(name) {
    this.props.newDeck(name)
    this.setState({ showingNameField: false })
  }

  showField() {
    this.setState({ showingNameField: true })
  }

  render() {
    return this.state.showingNameField ?
      <EnterDeck create={name => this.newDeck(name)} /> :
      <CreateDeckButton onPress={_ => this.showField()} />
  }
}

DeckCreation.propTypes = {
  newDeck: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  nameField: {
    backgroundColor: colors.tan,
    height: 40
  },
  wideButton: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    margin: 10
  },
  createDeck: {
    backgroundColor: colors.green
  }
})

export default DeckCreation