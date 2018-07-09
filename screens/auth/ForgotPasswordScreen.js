import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  onBackPress = () => {
    const navActions = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });

    this.props.navigation.dispatch(navActions);
  };

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert("Password reset email has been sent.");
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  render() {
    return (
      <View style={{ paddingTop: 50, alignItems: "center" }}>
        <Text> Forgot Password </Text>
        <TextInput
          style={{ width: 200, height: 40, borderWidth: 1 }}
          value={this.state.email}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          autoCorrect={false}
        />

        <Button title="Reset Password" onPress={this.onResetPasswordPress} />
        <Button title="Back" onPress={this.onBackPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
