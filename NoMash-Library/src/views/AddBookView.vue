<template>
    <div>
        <h1 class="text-center">Add Book</h1>
        <div class="container d-flex justify-content-center">
            <form @submit.prevent="addBook">
            <div class="mb-3">
                <label for="isbn">ISBN: </label>
                <input type = "text" v-model="isbn" id="isbn" required />
            </div>
            <div class="mb-3">
                <label for="name">Name: </label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
        </div>
    </div>
    <BookList/>
</template>

<script>
import {ref} from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';
import axios from 'axios';

export default {
    setup() {
        const isbn = ref('');
        const name = ref('');

        const addBook = async() => {
            try {
                const isbnNumber = Number(isbn.value)
                if(isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }
                await axios.post('https://addbook-6amiscp6xa-uc.a.run.app', {
                    isbn: isbnNumber,
                    name: name.value
                });
                isbn.value = '';
                name.value = '';
                alert('Book added successfully!');
            } catch (error) {
                console.error('Error adding book: ', error)
            }
        }
        return {
            isbn,
            name,
            addBook
        }
    },
    components: {
            BookList
    }
}
</script>