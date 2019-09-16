import CacheStore from 'react-native-cache-store'

const initialState = { mytoken: '', voicemails: [] }

function toggleToken(state = initialState, action) {
  let voicemails = []
  switch (action.type) {
    case 'tokenid':
      addToStorage(action.value)
      return { ...state, mytoken: action.value };
    case 'voicemails':
      voicemails = action.value
      addToStorageVoicemails(voicemails)
      return { ...state, voicemails: voicemails };
    case 'voicemail_Add':
      voicemails = state.voicemails
      if (action.value !== null) {
        voicemails.push(action.value)
      }
      addToStorageVoicemails(voicemails)
      return { ...state, voicemails: voicemails };
    case 'voicemail_Delete':
      let index = state.voicemails.map(x => {
        return x.id;
      }).indexOf(action.value);
      state.voicemails.splice(index, 1);
      //voicemails = state.voicemails.filter(x => { return x.id !== action.value })
      addToStorageVoicemails(state.voicemails)
      return { ...state, voicemails: state.voicemails }
    case 'voicemail_Delete_All':
      return { ...state, voicemails: [] };
    default:
      return state
  }
}


function addToStorage(value) {
  CacheStore.set('token', value, null);
}



 function addToStorageVoicemails(value) {
   CacheStore.set('voicemails', null, null);
   CacheStore.set('voicemails', value, null);
 }

// function voicemailExists(id, voicemails) {
//   return voicemails.some(function (elem) {
//     return elem.id === id;
//   });
// }




export default toggleToken