<template>
    <div class="offset-4">
        <h1>Sign in</h1>
        <p><input type="text" placeholder="Email" v-model="email"/></p>
        <p><input type="password" placeholder="Password" v-model="password"/></p>
        <p><button @click="signin">Sign in via Firebase</button></p>
    </div>
</template>

<script setup>
import {ref} from "vue"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
import { getFirestore,doc, getDoc  } from "firebase/firestore";

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const db = getFirestore();


const signin = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async(data) => {
        const user = auth.currentUser;
        if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;

          if (role === "admin") {
            alert("You are logged in as Admin");
          } else {
            alert("You are logged in as Member");
          }
        }
      }
        console.log("firebase sign in successful")
        router.push("/")
        console.log(auth.currentUser)
    }).catch((error) => {
        console.log(error.code);
    })
};
</script>