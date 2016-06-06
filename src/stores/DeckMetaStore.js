import Reflux from 'reflux'
import moment from 'moment'
import { AsyncStorage } from 'react-native'

import { DeckActions } from '../actions'
import Deck from '../data/Deck'
import CardsStore from './CardsStore';

const DECK_KEY = 'total-recall-decks'

const decksStore = Reflux.createStore({
  init() {
    this.decks = []
    this.loadDecks().done()
    this.cards = []
    this.listenTo(CardsStore,                 this.cardUpdate)
    this.listenTo(DeckActions.createDeck,     this.createDeck)
    this.listenTo(DeckActions.deleteAllDecks, this.deleteAllDecks)
  },

  async loadDecks() {
    try {
      const val = await AsyncStorage.getItem(DECK_KEY)

      if (val !== null) {
        this.decks = JSON.parse(val).map(deckObj => Deck.fromObject(deckObj))
        this.emit()
      } else {
        console.info(`${DECK_KEY} not found on disk.`);
      }
    } catch (e) {
      console.error('AsyncStorage error:', e.message);
    }
  },

  async writeDecks() {
    try {
      await AsyncStorage.setItem(DECK_KEY, JSON.stringify(this.decks))
    } catch (e) {
      console.error('AsyncStorage error:', e.message)
    }
  },

  deleteAllDecks() {
    this.decks = []
    this.emit()
  },

  emit() {
    this.writeDecks().done()
    this.trigger(this.decks)
  },

  recalculateMetaData() {
    const deckMap = {}

    this.decks.forEach(x => {
      x.resetCounts()
      deckMap[x.id] = x
    })

    const now = moment()
    this.cards.forEach(x => {
      if (x.deckID in deckMap) {
        deckMap[x.deckID].totalCards++
        if (x.dueDate <= now) {
          deckMap[x.deckID].dueCards++
        }
      }
    })
  },

  cardUpdate(cards) {
    this.cards = cards
    this.recalculateMetaData()
    this.emit()
  },

  createDeck(deck) {
    this.decks.push(deck)
    this.emit()
  }
})

export default decksStore