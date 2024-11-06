// Firebase configuration
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJqRWsL_xt4Yd9Yj_3_SGujZjBZ4kJ9jw",
    authDomain: "appweb-9f7a5.firebaseapp.com",
    projectId: "appweb-9f7a5",
    storageBucket: "appweb-9f7a5.firebasestorage.app",
    messagingSenderId: "804750575474",
    appId: "1:804750575474:web:bb84a617bd96a6d1433feb",
    measurementId: "G-EYKK8ERR3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);



  

// Додавання нової книги
document.getElementById('addBookForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const bookTitle = document.getElementById('bookTitle').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
  
    const newBookRef = push(ref(database, 'books'));
    set(newBookRef, {
      title: bookTitle,
      author: bookAuthor,
      reviews: []
    }).then(() => {
      document.getElementById('addBookForm').reset();
      alert("Книга додана");
    }).catch((error) => {
      console.error("Помилка додавання книги", error);
    });
  });
  

  const bookListRef = ref(database, 'books');
  onValue(bookListRef, (snapshot) => {
    const books = snapshot.val();
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    for (const id in books) {
      const book = books[id];
      const bookElement = document.createElement('div');
      bookElement.textContent = `${book.title} - ${book.author}`;
      bookList.appendChild(bookElement);
    }
  });
  