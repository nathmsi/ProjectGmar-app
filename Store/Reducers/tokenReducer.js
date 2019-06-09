import CacheStore from 'react-native-cache-store' 

const initialState = { mytoken: '', voicemails: [] }

function toggleToken(state = initialState, action) {
  switch (action.type) {
    case 'tokenid':
              addToStorage(action.value)
              return { ...state, mytoken: action.value };
   case 'voicemails':
              let myVoicemails = state.voicemails
              addToStorageVoicemails(myVoicemails)
              return { ...state, voicemails: myVoicemails };
    case 'voicemailsAdd':
              let voicemails = state.voicemails
              if (action.value !== null && !voicemailExists(action.value.id,voicemails))
                voicemails.unshift(action.value)
              addToStorageVoicemails(voicemails)
              return { ...state, voicemails: voicemails };
    case 'voicemailsDelete':
              let Voicemails = state.voicemails
              while (voicemailExists(action.value,Voicemails) ) {
                Voicemails = state.voicemails.filter(x => { return x.id !== action.value })
              }
              addToStorageVoicemails(Voicemails)
              return { ...state, voicemails: Voicemails };
    case 'voicemailsDeleteAll' :
              addToStorageVoicemails(null)
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

function voicemailExists(id , voicemails) {
  return voicemails.some(function(elem) {
    return elem.id === id;
  }); 
}




export default toggleToken