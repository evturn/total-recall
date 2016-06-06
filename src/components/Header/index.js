import React, { Component, PropTypes } from 'react'
import {
  View,
  Image
} from 'react-native'

import styles from './styles';
import HeadingText from '../HeadingText';

class Header extends Component {

  render() {
    return (
      <View style={styles.header}>
        <Image
          source={{ uri: 'http://placekitten.com/123/432' }}
          style={styles.logo}
        />
        <HeadingText>Total Recall</HeadingText>
      </View>
    )
  }
}

export default Header