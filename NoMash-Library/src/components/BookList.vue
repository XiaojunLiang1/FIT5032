<template>
    <div >
        <h1 class="text-center">Books with ISBN bigger than 1000</h1>
        <ul class="text-center">
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="updateBook(book.id)">Update</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, orderBy, getDocs, updateDoc, doc, deleteDoc, limit } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000)
        , orderBy('isbn','desc'), limit(3));
        //const q = query(collection(db, 'books'))
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    const updateBook = async (id) => {
      const newName = prompt("Enter new name for the book:");
      if (newName) {
        try {
          const bookRef = doc(db, 'books', id);
          await updateDoc(bookRef, {
            name: newName
          });
          console.log(`Book ${id} updated successfully`);
          fetchBooks();
        } catch (error) {
          console.error('Error updating book: ', error);
        }
      }
    };

    const deleteBook = async (id) => {
      try {
        const bookRef = doc(db, 'books', id);
        await deleteDoc(bookRef);
        console.log(`Book ${id} deleted successfully`);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      updateBook,
      deleteBook
    };
  },
};
</script>