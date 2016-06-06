import md5 from 'md5'
import moment from 'moment'

class Card {
  constructor(front, back, deckID) {
    this.front = front
    this.back = back
    this.deckID = deckID
    this.strength = 0
    this.dueDate = moment()
    this.id = md5(front + back + deckID)
  }

  setFromObject(obj) {
    this.front = obj.front
    this.back = obj.back
    this.deckID = obj.deckID
    this.strength = obj.strength
    this.dueDate = moment(obj.dueDate)
    this.id = obj.id
  }

  static fromObject(obj) {
    const card = new Card(obj.front, obj.back, obj.deckID)
    card.setFromObject(obj)
    return card
  }
}