import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import { CardActions } from '../../actions'

import DeckModel from '../../data/Deck'

import Button from '../Button'
import LabeledInput from '../LabeledInput'
import NormalText from '../NormalText'

import colors from '../../styles/colors'

class NewCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      font: '',
      back: ''
    }
  }

  handleFront(text) {
    this.setState({ front: text })
  }

  handleBack(text) {
    this.setState({ back: text })
  }

  createCard() {
    CardActions.createCard(
      this.state.front,
      this.state.back,
      this.props.deck.id
    )

    this.props.nextCard(this.props.deck)
  }

  reviewDeck() {
    this.props.review(this.props.deck.id)
  }

  render() {
    return (
      <View>

        <LabeledInput
          label="Front"
          clearOnSubmit={false}
          onEntry={text => this.handleFront(text)}
          onChange={text => this.handleFront(text)}
        />
        <LabeledInput
          label="Back"
          clearOnSubmit={false}
          onEntry={text => this.handleBack(text)}
          onChange={text => this.handleBack(text)}
        />

        <Button
          style={styles.createButton}
          onPress={_ => this.createCard()}>
          <NormalText>Create Card</NormalText>
        </Button>

        <View style={styles.buttonRow}>
          <Button style={styles.secondaryButton}
            onPress={this.props.quit}>
            <NormalText>Done</NormalText>
          </Button>

          <Button
            style={styles.secondaryButton}
            onPress={_ => this.reviewDeck()}>
            <NormalText>Review Deck</NormalText>
          </Button>
        </View>

      </View>
    )
  }
}

NewCard.propTypes = {
  deck: PropTypes.instanceOf(DeckModel),
  quit: PropTypes.func.isRequired,
  nextCard: PropTypes.func.isRequired,
  review: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: colors.green
  },
  secondaryButton: {
    backgroundColor: colors.blue
  },
  buttonRow: {
    flexDirection: 'row'
  }
})

export default NewCard