import CacheStore from 'react-native-cache-store'
const initialState = { mytoken: '', voicemails: [] }

function toggleToken(state = initialState, action) {
  switch (action.type) {
    case 'tokenid':
              addToStorage(action.value)
              return { ...state, mytoken: action.value };
    case 'voicemails':
              let voicemails = state.voicemails
              if (action.value !== null && !voicemailExists(action.value.id,voicemails))
                voicemails.push(action.value)
              addToStorageVoicemails(voicemails)
              return { ...state, voicemails: voicemails };
    case 'voicemailsDelete':
              voicemails = state.voicemails
              if (action.value !== null ) {
                voicemails = state.voicemails.filter(x => { return x.id != action.value })
              }
              addToStorageVoicemails(voicemails)
              return { ...state, voicemails: voicemails };
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