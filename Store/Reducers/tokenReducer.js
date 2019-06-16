import CacheStore from 'react-native-cache-store' 

const initialState = { mytoken: '', voicemails: [] }

function toggleToken(state = initialState, action) {
  let voicemails = []
  switch (action.type) {
    case 'tokenid':
              addToStorage(action.value)
              return { ...state, mytoken: action.value };
   case 'voicemails':
              voicemails = state.voicemails
              addToStorageVoicemails(voicemails)
              return { ...state, voicemails: voicemails };
    case 'voicemailsAdd':
              voicemails = state.voicemails
              if (action.value !== null && !voicemailExists(action.value.id,voicemails))
                voicemails.unshift(action.value)
              addToStorageVoicemails(voicemails)
              return { ...state, voicemails: voicemails };
    case 'voicemailsDelete':
              voicemails = state.voicemails
              while (voicemailExists(action.value,voicemails) ) {
                voicemails = state.voicemails.filter(x => { return x.id !== action.value })
              }
              addToStorageVoicemails(voicemails)
              return { ...state, voicemails: voicemails };
    case 'voicemailsDeleteAll' :
              addToStorageVoicemails(null)
              return { ...state, voicemails: [] };
    case 'voicemailsReadTrue' :
              voicemails = state.voicemails
              voicemails = state.voicemails.filter(x => { 
                  if ( x.id === action.value)  x.read = true
                  return x
                })
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