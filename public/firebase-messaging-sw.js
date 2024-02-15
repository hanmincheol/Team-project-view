import firebase from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyDaoRQlGo6oghhkTmRIqrqEPWofr1BSm9E",
  authDomain: "webpushtest-c99b3.firebaseapp.com",
  projectId: "webpushtest-c99b3",
  storageBucket: "webpushtest-c99b3.appspot.com",
  messagingSenderId: "992191789757",
  appId: "1:992191789757:web:5c7cbed7fbfccf2355d5d4",
  measurementId: "G-N7SX341HTV",
}

const app = firebase.initializeApp
(firebaseConfig)

const messaging = getMessaging(app)

getToken(messaging, { vapidKey: "BIa23R2xZe0qRZYDcY5aXlxcBOFiujw7Vs-RLTPwEjQqmXAFgXNjRfWjBrjN_E0WWg6yUMmXncdutQN8zmbHqpmIATT7U66CLC5vc6J9T5dGEE1hDYyZSK1I27A0" })
  .then(currToken => {
    localStorage.setItem("pushtoken", currToken)
    if (currToken) {
      Notification.requestPermission().then(permission=>{
        if (permission === 'granted') { //알림 권한이 승인됨
            
        }
      })
      
    }
  })
