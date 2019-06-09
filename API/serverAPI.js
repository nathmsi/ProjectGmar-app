//android emulator 


// $ npm install ngrok -g
// $ ngrok http 1337
// ngrok
//const server  = 'http://db6da288.ngrok.io'



const server = 'http://192.168.1.14:1337'


// Mahon
//const server = 'http://192.168.43.173:1337'


const dbRegister = async (phone) => {
  return fetch(server + '/user/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone: phone })
  })
    .then((response) => response.text())
    .catch((error) => console.log('error funtion dbRegister ' + error));
}


const dbLogin = async (phone) => {
  return fetch(server + '/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone : phone })
  })
    .then((response) => response.json())
    .catch((error) => console.log('error funtion dbLogin' + error));
    
}


const dbVoicemail = async (token) => {
  return fetch(server + '/voicemail', {
    headers: {
      'Authorization': token
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => console.log('error funtion dbVoicemail ' + error));
}

const dbPushToken = async (pushToken , token) => {
  return fetch(server + '/user/pushToken', {
    method: 'POST',
    headers: {
      'Authorization': token
    },
    body: JSON.stringify({ pushToken : pushToken})
  })
    .then((response) => response.json())
    .catch((error) => console.log('error funtion dbPostToken' + error));
    
}




export {
  dbLogin,
  dbRegister,
  dbVoicemail,
  dbPushToken
}