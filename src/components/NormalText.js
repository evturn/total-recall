import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { fonts, scalingFactors } from '../styles/fonts'
import Dimensions from 'Dimensions'

const  { width } = Dimensions.get('window')

class NormalText extends Component {
  render() {
    return (
      <Text style={[this.props.style, fonts.normal, scaled.normal]}>
        {this.props.children}
      </Text>
    )
  }
}

NormalText.propTypes = {
  style: View.propTypes.style
}

const scaled = StyleSheet.create({
  normal: {
    fontSize: width / scalingFactors.normal
  }
});

export default NormalText
