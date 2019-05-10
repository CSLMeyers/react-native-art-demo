/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Component } from 'react';
import {Platform, StyleSheet, Text, View, Animated, ART, Easing} from 'react-native';

const {Surface, Group, Shape, Path} = ART;
const AnimatedShape = Animated.createAnimatedComponent(Shape);

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      circleAnimated: new Animated.Value(0), //设置初始值
      markAnimated: new Animated.Value(0), //设置初始值
    };

    this.markAnimation = this.state.markAnimated.interpolate({
      inputRange: [
         0,
         20,
         100
      ],
      outputRange: [
         `M36 50 l0 0 l0 0`,
         `M36 50 l10 10 l0 0`,
         `M36 50 l10 10 l18 -18`,
      ]
    });
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation () {
    Animated.timing(
      this.state.markAnimated,
      {
        duration: 500,
        toValue: 100,
        easing: Easing.ease,
      }
    ).start(() => {
      this.state.circleAnimated.setValue(.8);
      Animated.spring(this.state.circleAnimated, {
        friction: 4,
        tension: 100,
        toValue: 1,
      }).start();
    });
  }

  render(){
    return(
        <View style={styles.container}>
            <Animated.View style={[styles.circle, {
                    transform: [{
                        scale: this.state.circleAnimated
                    }]
                }]}
                width={70} 
                height={70}
                borderRadius={35}
               />
            <Surface width={100} height={100} style={styles.surface} >
                <AnimatedShape 
                  d={this.markAnimation} 
                  stroke="#1471f1" 
                  strokeWidth={8}  
                  strokeLinecap="round"
                />
            </Surface>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative'
  },
  surface: {
    position: 'absolute',
  },
  circle: {
    borderWidth: 4,
    borderColor: '#1471f166',
    position: 'absolute',
  },
});
