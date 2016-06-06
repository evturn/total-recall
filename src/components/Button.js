import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import colors from '../styles/colors';

class Button extends Component {
  constructor() {
    super()
    this.disabled = false
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={this.disabled ? 1 : 0.5}
        onPress={this.props.onPress}
        style={[styles.wideButton, this.props.style]}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  styles: View.propTypes.style,
  children: PropTypes.object,
  disabled: PropTypes.bool
}

const styles = StyleSheet.create({
  wideButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: colors.pink
  }
})

export default Button