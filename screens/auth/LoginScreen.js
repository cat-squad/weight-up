import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {},
        error => {
          Alert.alert(error.message);
        }
      );
  };

  onCreateAccountPress = () => {
    // this.props.navigation.navigate("Signup");

    const navActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Signup" })]
    });

    this.props.navigation.dispatch(navActions);
  };

  onForgotPasswordPress = () => {
    const navActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "ForgotPassword" })]
    });

    this.props.navigation.dispatch(navActions);
  };

  render() {
    return (
      <View style={{ paddingTop: 50, alignItems: "center" }}>
        <TextInput
          style={{
            width: 200,
            height: 40,
            borderWidth: 1,
            margin: 4,
            paddingLeft: 4
          }}
          value={this.state.email}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          autoCorrect={false}
          placeholder="E-mail"
          autoCapitalize="none"
        />

        <TextInput
          style={{
            width: 200,
            height: 40,
            borderWidth: 1,
            margin: 4,
            paddingLeft: 4
          }}
          value={this.state.password}
          onChangeText={text => {
            this.setState({ password: text });
          }}
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <Button title="Login" onPress={this.onLoginPress} />
        <Button title="Create Account" onPress={this.onCreateAccountPress} />
        <Button title="Forgot Password" onPress={this.onForgotPasswordPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
