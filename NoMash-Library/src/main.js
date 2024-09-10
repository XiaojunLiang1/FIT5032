// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAaspieOh7_F2hhathaRwUe-ekcx-MZHI",
  authDomain: "fit5032-applied-xiaojun.firebaseapp.com",
  projectId: "fit5032-applied-xiaojun",
  storageBucket: "fit5032-applied-xiaojun.appspot.com",
  messagingSenderId: "901247874447",
  appId: "1:901247874447:web:b6de6b8a613b7b069247fa"
};

// Initialize Firebase
initializeApp(firebaseConfig);


// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')

