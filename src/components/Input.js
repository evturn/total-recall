import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native'

import colors from '../styles/colors';
import { fonts } from '../styles/fonts';

class Input extends Component {
  constructor(props) {
    super(props)

    this.clearOnSubmit = true
    this.state = {
      text: ''
    }
  }

  create() {
    this.props.onEntry(this.state.text)
    this.setState({ text: '' })
  }

  onSubmit(ev) {
    this.props.onEntry(ev.nativeEvent.text)

    if (!!this.clearOnSubmit) {
      this.setState({ text: '' })
    }
  }

  onChange(text) {
    this.setState({ text })
    if (this.props.onChange) {
      this.props.onChange(text)
    }
  }

  render() {
    return (
      <TextInput
        style={[styles.nameField, styles.wideButton, fonts.normal, this.props.style]}
        ref="newDeckInput"
        multiline={false}
        value={this.state.text}
        autoCorrect={false}
        onChangeText={text => this.onChange(text)}
        onSubmitEditing={e => this.onSubmit(e)}
      />
    )
  }
}

Input.propTypes = {
  onEntry: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  style: View.propTypes.style,
  clearOnSubmit: PropTypes.bool
}

const styles = StyleSheet.create({
  nameField: {
    backgroundColor: colors.tan,
    height: 60
  },
  wideButton: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
    margin: 10
  }
})

export default Input