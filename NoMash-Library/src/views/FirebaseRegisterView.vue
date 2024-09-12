<template>
    <div class="offset-4">
        <h1>Create an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email"/></p>
        <p><input type="password" placeholder="Password" v-model="password"/></p>
        <p><button @click="register">Save to Firebase</button></p>
    </div>
    
</template>

<script setup>
import {ref} from "vue"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
import { getFirestore, doc, setDoc } from "firebase/firestore";

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const db = getFirestore();

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async(data) => {
        const user = data.user;
        let role = "user";
        if (email.value === "admin@admin.com") {
            role = "admin";
        }
        try {
            await setDoc(doc(db, "users", user.uid), {
                email:user.email,
                role: role
            });
            console.log("firebase register successful")
        } catch (error) {
            console.error("error")
        }
        router.push("/FireLogin")
    }).catch((error) => {
        console.log(error.code);
    })
};
</script>