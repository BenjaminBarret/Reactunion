import React from 'react'
import { Animated } from 'react-native'

interface Props {
  shouldEnlarge: any;
}

interface State {
  viewSize: any;
}

class EnlargeShrink extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      viewSize: new Animated.Value(this._getSize())
    }
  }

  _getSize() {
    if (this.props.shouldEnlarge) {
      return 50
    }
    return 40
  }
  // La méthode componentDidUpdate est exécuté chaque fois que le component est mise à jour, c'est l'endroit parfait pour lancer / relancer notre animation.
  componentDidUpdate() {
    Animated.spring(
      this.state.viewSize,
      {
        toValue: this._getSize(),
        useNativeDriver: false,
      }
    ).start()
  }

  render() {
    return (
        <Animated.View
          style={{ width: this.state.viewSize, height: this.state.viewSize }}>
          {this.props.children}
        </Animated.View>
    )
  }
}

export default EnlargeShrink