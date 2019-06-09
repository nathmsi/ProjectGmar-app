// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout'

const ListPhone = ({ voicemails, handlePhoneSeleceted  }) => {

    const swipeBtns = [{
        text: 'Delete',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { handleDeleteByPhone(voicemail.phone) }
    }]
    let phone = voicemails[0].phone


    return (
        <TouchableOpacity onPress={()=> handlePhoneSeleceted(voicemails)}>
            <View style={styles.container}>
                    <View style={styles.main_container}>
                        <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/notification/ultraviolet/50/3498db' }} />
                        <Text style={styles.phone}><Text style={{ fontWeight: "bold" }}> Telephone </Text> {phone}</Text>
                    </View>
            </View>
        </TouchableOpacity>
    )
}






const styles = StyleSheet.create({
    container: {
        padding: 14,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
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
        color: "#3498db",
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