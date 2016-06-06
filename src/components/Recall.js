import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator,
  View
} from 'react-native'

import Reflux from 'reflux'
import { DeckActions } from '../actions'
import Decks from './Decks'
import Review from './Review'
import NewCard from './NewCard'
import Heading from './Header'
import CardsStore from '../stores/CardsStore'
import DeckMetaStore from '../stores/DeckMetaStore'

class Recall extends Component {
  constructor() {
    super()

    this.state = {
      deckMetas: [Reflux.connect(DeckMetaStore, 'deckMetas')]
    }
  }

  componentWillMount() {
    CardsStore.emit()
  }

  review(deckID) {
    DeckActions.reviewDeck(deckID)
    this.refs.navigator.push({
      name: 'review',
      data: {
        deckID: deckID
      }
    })
  }

  createdDeck(deck) {
    this.refs.navigator.push({
      name: 'createCards',
      data: {
        deck: deck
      }
    })
  }

  goHome() {
    this.refs.navigator.popToTop()
  }

  renderScene(route) {
    switch (route.name) {
      case 'decks':
        return (
          <Decks
            review={deckID => this.review(deckID)}
            createdDeck={deck => this.createdDeck(deck)}
          />
        )

      case 'createCards':
        return (
          <NewCard
            review={deckID => this.review(deckID)}
            quit={_ => this.goHome()}
            nextCard={deck => this.createdDeck(deck)}
            {...route.data}
          />
        )

      case 'review':
        return (
          <Review
            quit={_ => this.goHome()}
            {...route.data}
          />
        )

      default:
        console.error('Encountered unexpected route:', route.name)
    }

    return <Decks />
  }

  render() {
    return (
      <View style={styles.container}>
        <Heading/>
        <Navigator
          ref='navigator'
          initialRoute={{ name: 'decks' }}
          renderScene={route => this.renderScene(route)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  }
})

export default Recall