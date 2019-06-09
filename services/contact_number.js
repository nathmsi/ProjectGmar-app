import { Permissions } from 'expo';
import * as Contacts from 'expo-contacts';


const getNameContactByPhone =  async (phone) => {

    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
    });
      
      if (data.length > 0) {
        const contact = data[0];
        console.log(contact);
      }
      

};