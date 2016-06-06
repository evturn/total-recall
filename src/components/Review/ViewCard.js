import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import Button from '../Button'
import NormalText from '../NormalText'
import HeadingText from '../HeadingText'

import { CardActions } from './../../actions'

import colors from '../../styles/colors'

class ContinueButton extends Component {
  render() {
    const text = this.props.wasCorrect ?
    'Correct! Next card?' :
    'Oops, not quite. Next card?'

    return (
      <Button
        onPress={this.props.onPress}
        style={styles.continueButton}>
        <NormalText>{text}</NormalText>
      </Button>
      )
  }
}

ContinueButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  wasCorrect: PropTypes.bool.isRequired
}

class ViewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingAnswer: false,
      wasCorrect: null
    }
  }

  continue() {
    this.setState({
      showingAnswer: false,
      wasCorrect: null
    })

    this.props.continue()
  }

  selectAnswer(correct) {
    this.props.onReview(correct)
    this.setState({
      showingAnswer: true,
      wasCorrect: correct
    })
    CardActions.review(this.props.cardID, this.props.orientation, correct)
  }

  buttons() {
    if (!this.props.answers) {
      return null
    }

    return this.props.answers.map(a => {
      const isCorrectAnswer = a === this.props.correctAnswer
      const buttonStyle = [styles.options]
      if (this.state.showingAnswer && isCorrectAnswer) {
        if (this.state.wasCorrect) {
          buttonStyle.push(styles.rightAnswer)
        } else {
          buttonStyle.push(styles.wrongAnswer)
        }
      }

      return (
        <Button
          key={a}
          disabled={this.state.showingAnswer}
          style={buttonStyle}
          onPress={this.selectAnswer.bind(this, a === this.props.correctAnswer)}>
          <NormalText>{a}</NormalText>
        </Button>
      )
    })
  }

  render() {
    const buttons = this.buttons()

    return (
      <View>

        <HeadingText>
          {this.props.prompt}
        </HeadingText>
        {buttons}

        {this.state.showingAnswer ? (
          <ContinueButton
            onPress={_ => this.continue()}
            wasCorrect={this.state.wasCorrect}
          />
        ) : (
          <Button
            onPress={this.props.quit}
            style={styles.continueButton}>
            <NormalText>Stop Reviewing</NormalText>
          </Button>
        )}

      </View>
    )
  }
}

ViewCard.propTypes = {
  continue: PropTypes.func.isRequired,
  quit: PropTypes.func.isRequired,
  onReview: PropTypes.func.isRequired,
  orientation: PropTypes.string.isRequired,
  cardID: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  options: {
    backgroundColor: '#FFFFFF'
  },
  continueButton: {
    backgroundColor: colors.tan
  },
  rightAnswer: {
    backgroundColor: colors.green
  },
  wrongAnswer: {
    backgroundColor: colors.pink
  }
})

export default ViewCard