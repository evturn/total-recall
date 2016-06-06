import { AsyncStorage } from 'react-native'
import Reflux from 'reflux'
import Card from '../data/Card'
import { CardActions } from '../actions'

import _ from 'lodash'

const CARD_KEY = 'total-recall-cards'

const cardsStore = Reflux.createStore({
  init() {
    this.loadCards().done()
    this.listenTo(CardActions.createCard,     this.createCard)
    this.listenTo(CardActions.deleteAllCards, this.deleteAllCards)
    this.listenTo(CardActions.editCard,       this.editCard)
    this.cards = []
    this.emit()
  },

  async loadCards() {
    try {
      const val = await AsyncStorage.getItem(CARD_KEY)

      if (val !== null) {
        this.cards = JSON.parse(val).map(cardObj => Card.fromObject(cardObj))
        this.emit()
      } else {
        console.info(`${CARD_KEY} not found on disk.`);
      }
    } catch (e) {
      console.error('AsyncStorage error:', e.message)
    }
  },

  async writeCards() {
    try {
      await AsyncStorage.setItem(CARD_KEY, JSON.stringify(this.cards))
    } catch (e) {
      console.error('AsyncStorage error:', e.message)
    }
  },

  deleteAllCards() {
    this.cards = []
    this.emit()
  },

  editCard(newCard) {
    const match = _.find(
      this.cards,
      card => card.id === newCard.id
    )

    match.setFromObject(newCard)
    this.emit()
  },

  createCard(front, back, deckID) {
    this.cards.push(new Card(front, back, deckID))
    this.emit()
  },

  emit() {
    this.writeCards().done()
    this.trigger(this.cards)
  }
})

export default cardsStore