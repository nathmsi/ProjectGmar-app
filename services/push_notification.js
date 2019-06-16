import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

import { dbPushToken } from '../API/serverAPI'


export default async (mytoken) => {
    AsyncStorage.getItem('pushtoken').then(async (previousToken) => {
        console.log('previousToken : ' + previousToken)
        if (previousToken) {
            return;
        } else {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;

            // only ask if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            if (existingStatus !== 'granted') {
                // Android remote notification permissions are granted during the app
                // install, so this will only ask on iOS
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }

            // Stop here if the user did not grant permissions
            if (finalStatus !== 'granted') {
                return;
            }
            // Get the token that uniquely identifies this device
            let token = await Notifications.getExpoPushTokenAsync();

            console.log('NewToken : ' + token)
            await dbPushToken(token, mytoken)
            AsyncStorage.setItem('pushtoken', token)
        }
    })
}
