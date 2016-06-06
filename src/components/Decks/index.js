import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import Reflux from 'reflux';
import DeckMetaStore from '../../stores/DeckMetaStore'
import CardsStore from '../../stores/CardsStore'
import { DeckActions, CardActions } from '../../actions'
import DeckModel from '../../data/Deck'

import Deck from './Deck'
import Button from '../Button'
import NormalText from '../NormalText'

import DeckCreation from './DeckCreation'

class Decks extends Component {
  constructor() {
    super()

    this.state = {
      onDecksChange: [Reflux.listenTo(DeckMetaStore, 'onDecksChange')],
      decks: []
    }
  }

  componentDidMount() {
    CardsStore.emit()
    DeckMetaStore.emit()
  }

  onDecksChange(decks) {
    this.setState({ decks })
  }

  newDeck(newDeckName) {
    const deck = new DeckModel(newDeckName)
    DeckActions.createDeck(deck)
    this.props.createdDeck(deck)
  }

  getDecks() {
    if (!this.state.decks) {
      return null
    }

    return this.state.decks.map(x => (
      <Deck
        deck={x}
        addCards={this.props.createdDeck}
        onReview={this.props.review}
        key={x.id}
      />
    ))
  }

  deleteAll() {
    DeckActions.deleteAllDecks()
    CardActions.deleteAllCards()
  }

  render() {
    return (
      <View style={styles.container}>
        {_ => this.getDecks()}
        <DeckCreation newDeck={deckName => this.newDeck(deckName)}/>
        {/*
        <Button onPress={this.deleteAll}>
          <NormalText>Delete All the Things</NormalText>
        </Button>
        */}
      </View>
    );
  }
}

Decks.propTypes = {
  createdDeck: PropTypes.func.isRequired,
  review: PropTypes.func.isRequired
}

var styles = StyleSheet.create({})

export default Decks