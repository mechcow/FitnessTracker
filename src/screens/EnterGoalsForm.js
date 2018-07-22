import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  ListView,
  ScrollView,
  Dimensions
} from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field,reduxForm } from 'redux-form';

/* Main Screen */

class EnterGoalsForm extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      isReady: false
    };
    this.renderInput = this.renderInput.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
     'Roboto': require('native-base/Fonts/Roboto.ttf'),
     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }

  renderInput({ input, label, type, meta: {touched, error, warning} }) {
    var hasError=false;
    if(error !== undefined) {
      hasError=true;
    }
    return(
      <Item error= {hasError}>
        <Input {...input}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }


AppRegistry.registerComponent('EnterGoals', () => FitnessTracker);

export default reduxForm({
})(EnterGoals)


