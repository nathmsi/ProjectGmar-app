// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout'

colorRead =  '#f5f5f5'

const ListPhone = ({ voicemails, handlePhoneSeleceted, handleDeleteAllByPhone }) => {


    let phone = voicemails[0].phone
    let count = 0 
    let notRead = <></>

    const swipeBtns = [{
        text: 'Delete',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { handleDeleteAllByPhone(phone) }
    }]

    
    voicemails.forEach(element => {
        if (element.read === false){
            count++
        }
    });
    if( count > 0 ){
         notRead = <Text style={styles.phone}><Text style={{ fontWeight: "bold" }}>({count})</Text></Text>
         colorRead =  '#FFFFFF'
    }

    return (
        <View style={styles.container}>
            <Swipeout
                right={swipeBtns}
                autoClose={true}
                backgroundColor='transparent'>
                <TouchableOpacity onPress={() => handlePhoneSeleceted(voicemails)}>
                    <View style={styles.main_container}>
                        <Image style={styles.icon} source={ require('../assets/image/personnage.jpg') } />
                        <Text style={styles.phone}><Text style={{ fontWeight: "bold" }}> {phone} </Text> </Text>
                        {notRead}
                    </View>
                </TouchableOpacity>
            </Swipeout>
        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        padding: 14,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    main_container: {
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        borderRadius: 8,
    },
    icon: {
        width: 45,
        height: 45,
    },
    description: {
        fontSize: 13,
        color: "#3498db",
        marginLeft: 10,
    },
    phone: {
        fontSize: 15,
        color: "#000000",
        marginLeft: 10,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: "#0277BD",
    },

})



export default ListPhone