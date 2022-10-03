// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { App } from 'vue'

export const FIREBASE_CONTEXT_CONSTANT = Symbol.for('firebase')
export const FIREBASE_ANALYTICS_CONSTANT = Symbol.for('firebase_analytics')

const plugin = {
  install(app: App) {

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyClwxnAjVYD5hgtIb6fPv2q7WpBKxBIBPE",
      authDomain: "it-square-faf8b.firebaseapp.com",
      databaseURL: "https://it-square-faf8b-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "it-square-faf8b",
      storageBucket: "it-square-faf8b.appspot.com",
      messagingSenderId: "804038723348",
      appId: "1:804038723348:web:2e305c536f783dd623e401",
      measurementId: "G-4G3BL27GFH"
    }

    const ctx = initializeApp(firebaseConfig)
    const analytics = getAnalytics(ctx)

    app.provide(FIREBASE_CONTEXT_CONSTANT, reactive(ctx))
    app.provide(FIREBASE_ANALYTICS_CONSTANT, reactive(analytics))
  }
}

export default plugin
