import Reflux from 'reflux'

const DeckActions = Reflux.createActions([
  'createDeck',
  'deleteDeck',
  'reviewDeck',
  'deleteAllDecks'
])

const CardActions = Reflux.createActions([
  'createCard',
  'deleteCard',
  'review',
  'editCard',
  'deleteAllCards'
])

export {
  DeckActions,
  CardActions
}