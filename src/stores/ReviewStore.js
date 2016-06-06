import Reflux from 'reflux'
import moment from 'moment'

import { DeckActions, CardActions } from '../actions'
import CardsStore from './CardsStore'
import DeckMetaStore from './DeckMetaStore'
import CardReview from '../data/Review'

import _ from 'lodash'

const reviewStore = Reflux.createStore({
  init() {
    this.deckInfos = null
    this.cards = []
    this.currentDeckInfo = null
    this.currentDeckID = null
    this.reviews = []
    this.cardReviews = {}
    this.listenTo(CardsStore,             this.cardUpdate)
    this.listenTo(DeckMetaStore,          this.deckMetaUpdate)
    this.listenTo(CardActions.review,     this.onCardReview)
    this.listenTo(DeckActions.reviewDeck, this.onReviewDeck)
  },

  emit() {
    this.trigger(this.reviews)
  },

  recalculate() {
    this.updateCurrentDeckInfo()
    const qualifyingCards = this.qualifyingCards()
    this.reviews = this.createReviews(qualifyingCards)
    const cardReviews = qualifyingCards.map(x => new CardReview(x))

    cardReviews.forEach(x => this.cardReviews[x.card.id] = x)
    this.emit()
  },

  deckMetaUpdate(deckInfos) {
    this.deckInfos = deckInfos
    this.updateCurrentDeckInfo()
  },

  updateCurrentDeckInfo() {
    if (this.currentDeckID == null) {
      return
    }

    const deck = this.deckInfos.filter(x => x.id === this.currentDeckID)
    if (deck.length !== 1) {
      return
    }

    this.currentDeckInfo = deck[0]
  },

  cardUpdate(cards) {
    this.cards = cards
  },

  qualifyingCards() {
    const now = moment()
    return this.cards
      .filter(x => x.deckID === this.currentDeckID && now >= x.dueDate, this)
  },

  createReviews(cards) {
    const makeReviews = function(sideOne, sideTwo) {
      return cards.map(x => {
        const others = x.filter(other => other.id !== x.id)

        return {
          orientation: sideOne,
          cardID: x.id,
          prompt: x[sideOne],
          correctAnswer: x[sideTwo],
          answers: [x[sideTwo]].concat(
            _.sample(_.pluck(others, sideTwo), 3)
          )
        }
      })
    }

    const reviews = makeReviews('front', 'back')
      .concat(makeReviews('back', 'front'))

    return _.shuffle(reviews)
  },

  onCardReview(cardID, orientation, correct) {
    const cardReview = this.cardReviews[cardID]

    if (orientation === 'front') {
      cardReview.reviewFront(correct)
    } else {
      cardReview.reviewBack(correct)
    }

    if (cardReview.done()) {
      const change = cardReview.correct ? 1 : -1
      const card = cardReview.card

      card.strength = card.strength + change

      if (card.strength < 0) {
        card.strength = 0
      }
      card.dueDate = CardReview.newDueDate(card.strength)
      CardActions.editCard(card)
    }
  },

  onReviewDeck(deckID) {
    this.currentDeckID = deckID
    this.recalculate()
  }
})

export default reviewStore