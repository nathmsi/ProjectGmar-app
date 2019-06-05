// Components/Search.js
import React, { Component } from 'react';
import Expo, { Notifications } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { dbLogin, dbRegister } from '../API/serverAPI'
import { connect } from 'react-redux'
import registerForNotifications from '../services/push_notification'

class Login extends Component {

  state = {
    phone: '',
    password: '',
    visibleModal: null,
    codeVerify: 0,
    code: 1,
    screen: 'login',
    isLoading: false
  }

  componentDidMount = () => {
    console.log('<login>')
  }





  handleRegister = async () => {
    this.setState({ isLoading: true })
    const { phone } = this.state
    try {
      // try to register 
      let result = await dbRegister(phone)
      if (result.err !== 'user already  exist') {
        code = Math.floor(Math.random() * 100) + 1
        console.log('the code confirmation ' + code)
        this.setState({ code, screen: 'confirmation' , isLoading: false})
      }

    } catch (err) {
      console.log('error login ' + err)
    }

  }

  handleLogin = async () => {
    this.setState({ isLoading: true })
    result = await dbLogin(this.state.phone)
    if (result.err) {
      alert(result.err)
    } else {
      this.props.dispatch({ type: "tokenid", value: result.token })
      console.log('token login ' + result.token)
      await this.handlePostNotification(result.token)
      this.setState({ isLoading: false })
      this.props.navigation.replace('voicemail');
    }

  }

  checkCodeConfirmation = () => {
    this.setState({ isLoading: true })
    const { code, codeVerify } = this.state
    console.log('comparaison ', code, codeVerify)
    if (code == codeVerify) {
      this.handleLogin()
    } else {
      this.setState({ isLoading: false })
      Alert.alert('wrong code')
    }
  }



  handlePostNotification = async (token) => {
    await registerForNotifications(token)
  }






  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    } else {
      if (this.state.screen === 'login') {
        return (
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/phone-2/ultraviolet' }} />
              <TextInput style={styles.inputs}
                placeholder="Phone"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={(phone) => this.setState({ phone })} />
            </View>


            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleRegister()}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
              <TextInput style={styles.inputs}
                placeholder="Enter the code"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(codeVerify) => this.setState({ codeVerify })} />
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.checkCodeConfirmation()}>
              <Text style={styles.loginText}> Submit </Text>
            </TouchableHighlight>


            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.setState({ screen: 'login' })}>
              <Text>Change Phone number</Text>
            </TouchableHighlight>
          </View>
        )
      }
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#0277BD",
  },
  loginText: {
    color: 'white',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});



const mapStateToProps = (state) => {
  return {
    mytoken: state.mytoken
  }
}
export default connect(mapStateToProps)(Login)