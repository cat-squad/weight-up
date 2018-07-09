import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmed: "",
      name: "",
      age: "",
      weight: "",
      height: ""
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirmed) {
      Alert.alert("The passwords do not match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {},
        error => {
          Alert.alert(error.message);
        }
      );
  };

  onBackPress = () => {
    const navActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });

    this.props.navigation.dispatch(navActions);
  };

  render() {
    return (
      <View style={{ paddingTop: 50, alignItems: "center" }}>
        <TextInput
          style={{ width: 200, height: 40, borderWidth: 1 }}
          value={this.state.email}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          autoCorrect={false}
        />

        <TextInput
          style={{ width: 200, height: 40, borderWidth: 1 }}
          value={this.state.password}
          onChangeText={text => {
            this.setState({ password: text });
          }}
          autoCorrect={false}
        />

        <TextInput
          style={{ width: 200, height: 40, borderWidth: 1 }}
          value={this.state.passwordConfirmed}
          onChangeText={text => {
            this.setState({ passwordConfirmed: text });
          }}
          autoCorrect={false}
        />

        <Button title="Sign Up" onPress={this.onSignupPress} />

        <Button title="Back" onPress={this.onBackPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
