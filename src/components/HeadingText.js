import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { fonts, scalingFactors } from '../styles/fonts'
import Dimensions from 'Dimensions'

const { width } = Dimensions.get('window')

class HeadingText extends Component {
  render() {
    return (
      <Text style={[this.props.style, fonts.big, scaled.big]}>
        {this.props.children}
      </Text>
      )
  }
}

HeadingText.propTypes = {
  style: View.propTypes.style
}

var scaled = StyleSheet.create({
  big: {
    fontSize: width / scalingFactors.big
  }
})


export default HeadingText
