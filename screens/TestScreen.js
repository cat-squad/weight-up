import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput
} from "react-native";
import { TestComponent } from "./../components/AppComponents";
import * as firebase from "firebase";
import { connect } from "react-redux";
import globalStyles from "../styles";

import { setDisplayName, watchUserData } from "./../redux/app-redux";

const mapStateToProps = state => {
  //take state from redux and applies to this components properties
  return {
    displayName: state.displayName,
    userData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  //take a dispatch from redux and applies to this components properties
  return {
    setDisplayName: text => {
      dispatch(setDisplayName(text));
    },
    watchUserData: () => {
      dispatch(watchUserData());
    }
  };
};

class TestScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.displayName
    };

    this.props.watchUserData();
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  };

  onSetNamePress = () => {
    this.props.setDisplayName(this.state.displayName);
  };

  render() {
    return (
      <View style={{ paddingTop: 80 }}>
        <Button title="Sign Out" onPress={this.onSignoutPress} />
        <Text>{this.props.displayName}</Text>
        <TextInput
          value={this.state.displayName}
          style={globalStyles.textInput}
          onChangeText={text => {
            this.setState({ displayName: text });
          }}
        />
        <Button title="Set Name" onPress={this.onSetNamePress} />

        <Text>{this.props.userData.displayName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestScreen);
