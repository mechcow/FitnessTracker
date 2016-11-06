// index.android.js

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  ListView,
} from 'react-native';

import t from 'tcomb-form-native'

var Form = t.form.Form;

/* Person */

var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

/* Goal */

var Goal = t.struct({
  goal: t.String,
  metric: t.Number,
  metricType: t.enums.of([
    'kg',
    'cm',
  ])
})

var Goals = t.list(Goal);

var options = {}; // optional rendering options (see documentation)

var STORAGE_KEY = '@FitnessTracker:goals';

/* Main Screen */

class FitnessTracker extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = { goals: null };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  onPress() {
    // call getValue() to get the values of the form
    var goals = this.refs.form.getValue();
    if (goals) { // if validation fails, value will be null
      console.log(goals);
      this._setGoals(goals);
    }
  }

  _setGoals = async (goals) => {
    this.setState({goals})
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({goals}));
      console.log("Saved goals")
    } catch (error) {
      console.log("AsyncStorage setItem error: ", error)
    }
  };

  _loadInitialState = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      value = JSON.parse(value);
      if (value !== null){
        this.setState({goals: value});
      }
    } catch (error) {
      console.log("AsyncStorage error: ", error);
    }
  };

  render() {
    if(this.state.goals !== null) {
      console.log("Goals: " + this.state.goals);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return(
        <View style={styles.container}>
          <Text style={styles.title}>FitnessTracker: Goals Found</Text>
          <ListView
            dataSource={ ds.cloneWithRows(this.state.goals) }
            renderRow={ (goal) => <Text>{goal.goal}: {goal.metric} {goal.metricType}</Text> }
          />
        </View>
      );
    } else {


      return (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to FitnessTracker</Text>

          <Form
            ref="form"
            type={Goals}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('FitnessTracker', () => FitnessTracker);