import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: 'AIzaSyA7NQv74nDrloKBTOGrssclH1lpLGrlVeY',
    authDomain: 'nuxt-blog-49903.firebaseapp.com',
    databaseURL: '<replace this>',
    projectId: 'nuxt-blog-49903',
    storageBucket: '<replace this>',
    messagingSenderId: '<replace this>',
    appId: '<replace this>'
}
const apps = getApps()
let firebaseApp
if (!apps.length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = apps[0]
}
const db = getFirestore(firebaseApp, {})
export { db }