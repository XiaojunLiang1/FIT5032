/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const axios = require("axios");

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const boooksCollection = admin.firestore().collection("books");
      const snapshot = await boooksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("error counting books");
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const boooksCollection = admin.firestore().collection("books");
      const snapshot = await boooksCollection.get();
      const books = snapshot.docs.map((doc) =>{
        const data = doc.data();
        return {
          isbn: data.isbn,
          name: data.name,
        };
      });
      res.status(200).send({books});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("error counting books");
    }
  });
});

exports.getAllBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error getting books");
    }
  });
});

exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {isbn, name} = req.body;
      const boooksCollection = admin.firestore().collection("books");
      await boooksCollection.add({
        isbn: isbn,
        name: name,
      });
      res.status(200).send("success added");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error adding");
    }
  });
});

const apikey = "537c0b22024b711e2ee6b0548da58ee3";

exports.getWeatherByCity = onRequest((req, res) => {
  cors(req, res, async () => {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({error: "City name is required"});
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try {
      const response = await axios.get(url);
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      res.status(500).json({error: "Error fetching weather data"});
    }
  });
});

exports.getWeatherByCoords = onRequest((req, res) => {
  cors(req, res, async () => {
    const {lat, lon} = req.query;

    if (!lat || !lon) {
      // eslint-disable-next-line max-len
      return res.status(400).json({error: "Latitude and longitude are required"});
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

    try {
      const response = await axios.get(url);
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      res.status(500).json({error: "Error fetching weather data"});
    }
  });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
