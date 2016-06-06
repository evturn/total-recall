import md5 from 'md5'

class Deck {
  constructor(name) {
    this.name = name
    this.totalCards = 0
    this.dueCards = 0
    this.id = md5(name)
  }

  setFromObject(obj) {
    this.name = obj.name
    this.totalCards = obj.totalCards
    this.dueCards = obj.dueCards
    this.id = obj.id
  }

  resetCounts() {
    this.totalCards = 0
    this.dueCards = 0
  }

  static fromObject(obj) {
    const deck = new Deck(obj.name)
    deck.setFromObject(obj)
    return deck
  }
}

export default Deck