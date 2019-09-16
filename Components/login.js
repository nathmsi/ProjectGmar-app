// Components/Search.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { ServerAPI } from '../API/serverAPI'
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

  /// **** Send SMS to PHONE NUMBER USER *** ///
  sendCode = () =>{
    const { code } = this.state
    console.log('the code confirmation ' + code)
    /// SEND SMS
  }



  /// **** CREATE DIGIT CODE WITH 4 ODD  *** ///
  createCode = () => {
    code = Math.floor(Math.random() * 9999) + 1000 // 4 digit number
    this.setState({ code })
  }


  handleRegister = async () => {
    this.setState({ isLoading: true })
    const { phone } = this.state
    try {
      // // try to register 
      let result = await ServerAPI('/user/signup', 'post', {
        phone
      })
      // // if (result.err !== 'user already  exist') {
      this.createCode()
      this.sendCode()
      this.setState({ screen: 'confirmation', isLoading: false })


      this.setState({ isLoading: false })
    } catch (err) {
      this.setState({ phone: '', isLoading: false })
      console.log('error login ' + err)
    }
  }

  handleLogin = async () => {
    this.setState({ isLoading: true })
    try {
      result = await ServerAPI('/user/login', 'post', {
        phone: this.state.phone
      })
      if (result.token !== '') {
        this.props.dispatch({ type: "tokenid", value: result.token })
        console.log('token login ' + result.token)
        await this.handlePostNotification(result.token)
        this.setState({ isLoading: false })
        this.props.navigation.replace('voicemail');
      } else {
        Alert.alert(result.err)
      }
    } catch (err) {
      this.setState({ phone: '', screen: 'confirmation', isLoading: false })
      console.log('error login ' + err)
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
        <View style={styles.main_container}>
          <Modal onRequestClose={() => null} transparent>
            <View style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.Text}>annatel
                  <Text style={{ color: '#c71585' }}>.mobile</Text>
              </Text>
              <View style={{ borderRadius: 10, backgroundColor: '#FFFFFF', padding: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: '200', fontWeight: 'bold', color: "#c71585" }}>Loading ... </Text>
                <ActivityIndicator size="large" />
              </View>
            </View>
          </Modal>
        </View>
      )
    } else {
      if (this.state.screen === 'login') {

        return (
          <View style={styles.main_container}>

            <Text style={styles.Text}>annatel
                  <Text style={{ color: '#c71585' }}>.mobile</Text>
            </Text>

            <Text style={styles.Titleinputs} >Numero de telephone</Text>

            <TextInput style={styles.inputs}
              placeholder="Entrez votre numero de telephone"
              keyboardType="numeric"
              onChangeText={(phone) => this.setState({ phone })} />


            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleRegister()}
            >
              <Text style={styles.loginText} > SUIVANT </Text>
            </TouchableOpacity>


          </View>

        )

      } else {
        return (
          <View style={styles.main_container}>

            <Text style={styles.Text}>annatel
              <Text style={{ color: '#c71585' }}>.mobile</Text>
            </Text>

            <Text style={styles.Titleinputs} >Code de confirmation</Text>

            <TextInput style={styles.inputs}
              placeholder="Entrez le code de confirrmation"
              keyboardType="numeric"
              onChangeText={(codeVerify) => this.setState({ codeVerify })} />

            <TouchableOpacity style={styles.button} onPress={() => this.checkCodeConfirmation()}>
              <Text style={styles.loginText}>Valider</Text>
            </TouchableOpacity>

            <Text style={styles.TexteButtonText}> Pas recu de SMS ? </Text>
            <TouchableOpacity style={styles.TexteButtonContainer} onPress={() => this.sendCode()}>
              <Text style={{ textDecorationLine: 'underline' }}> Me renvoyer in code de confirmation </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TexteButtonContainer} onPress={() => this.setState({ screen: 'login' })}>
              <Text style={{ textDecorationLine: 'underline' }} >Modifier mon numero de telephone</Text>
            </TouchableOpacity>

          </View>

        )
      }
    }
  }

}


const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: 'bold',
    color: "#000000",
    marginTop: 80,
    marginBottom: 100
  },
  Titleinputs: {
    color: '#000000',
    fontSize: 30,
  },
  inputs: {
    marginTop: 10,
    color: '#000000',
    fontSize: 16,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: 250,
    borderRadius: 30,
  },
  button: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: 250,
    backgroundColor: "#c71585",
    color: '#000000',
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 20,
  },
  TexteButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    backgroundColor: "#c71585",
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  TexteButtonText: {
    marginTop: 150,
    color: '#000000',
    fontSize: 12,
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