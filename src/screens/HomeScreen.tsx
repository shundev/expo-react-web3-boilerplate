import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";

import Web3 from "web3";
import hdkey from "ethereumjs-wallet/hdkey";
import bip39 from "bip39";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    mnemonic: "",
    address: ""
  };

  componentDidMount() {
    this.createAccount();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.mnemonic}</Text>
        <Text style={styles.text}>{this.state.address}</Text>
      </View>
    );
  }

  async createAccount() {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeed(mnemonic);
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet = hdwallet.derivePath(`m/44'/60'/0'/0/0`).getWallet();
    const address = wallet.getAddress().toString("hex");
    this.setState({
      mnemonic: mnemonic,
      address: "0x" + address
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
});
