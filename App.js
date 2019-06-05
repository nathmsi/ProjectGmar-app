// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// App.js

import React from 'react'
import RootNavigator from './Navigation/Navigation'
import { Provider } from 'react-redux'
import {store  } from './Store/configureStore'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
           <RootNavigator/>
      </Provider>
    )
  }
} 


