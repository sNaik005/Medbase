import express from "express";
import multer from "multer";
import { spawn } from "child_process";
import temp from "temp";
import fs from "fs";
import cors from 'cors'
import Connection from "./db.js";
import mongoose from "mongoose";
import Person from "./models/Person.js";
import bodyParser from "body-parser";
import Route from "./route.js"
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'; 
import admin from 'firebase-admin'
import serviceAccount from "./firebaseServiceKey.json" assert { type: "json" };


firebase.initializeApp({
  apiKey: "AIzaSyDtvC5L1Shb8YCK9L06pULuLuXxeDZUJvc",
  authDomain: "human-medical-ecosystem.firebaseapp.com",
  databaseURL: "https://human-medical-ecosystem-default-rtdb.firebaseio.com",
  projectId: "human-medical-ecosystem",
  storageBucket: "human-medical-ecosystem.appspot.com",
  messagingSenderId: "729868141304",
  appId: "1:729868141304:web:6c5ff8d9afc711d78b710d"
})




const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 6001;
Connection();


app.use(express.json());


const storage = multer.memoryStorage(); // Store the uploaded image in memory
const upload = multer({ storage: storage });


// api for processing the fingerprint image 
app.post("/process-fingerprint-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }


    const imageBuffer = req.file.buffer;

    // Create a temporary file to store the image buffer
    temp.track(); // Initialize the temp library
    const tempFilePath = temp.path({ suffix: ".jpg" });
    fs.writeFileSync(tempFilePath, imageBuffer);

    console.log(tempFilePath);
    // Execute the Python script as a child process with the temporary file path
    const pythonProcess = spawn('python', ['algo.py', tempFilePath]);

    // Pipe the image buffer to the Python process's stdin
    pythonProcess.stdin.write(imageBuffer);
    pythonProcess.stdin.end();

   // Handle the response data from your Python script as needed
const response = await new Promise((resolve) => {
  let jsonData = '';

  pythonProcess.stdout.on('data', (data) => {
    jsonData += data.toString();

    // Split the data by newlines
    const lines = jsonData.split('\n');

    // Process each line separately
    lines.forEach((line) => {
      if (line.trim() !== '') {
        try {
          const parsedData = JSON.parse(line);
          resolve(parsedData); // Resolve with the parsed JSON
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });

    // Keep any remaining data for the next iteration
    jsonData = lines.pop() || '';
  });
});

    // console.log(response);
    // Here, you can send the response back to the client or perform other actions.

    // Delete the temporary file after processing
    temp.cleanupSync();
    
    res.json(response);
  } catch (error) {
    console.error("Error processing fingerprint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// api for processing iris image
app.post("/process-iris-image", upload.single("image"), async (req, res) => {
  console.log("Bhola");
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }


    const imageBuffer = req.file.buffer;

    // Create a temporary file to store the image buffer
    temp.track(); // Initialize the temp library
    const tempFilePath = temp.path({ suffix: ".jpg" });
    fs.writeFileSync(tempFilePath, imageBuffer);

    console.log(tempFilePath);
    // Execute the Python script as a child process with the temporary file path
    const pythonProcess = spawn('python', ['irisalgo.py', tempFilePath]);

    // Pipe the image buffer to the Python process's stdin
    pythonProcess.stdin.write(imageBuffer);
    pythonProcess.stdin.end();

   // Handle the response data from your Python script as needed
const response = await new Promise((resolve) => {
  let jsonData = '';

  pythonProcess.stdout.on('data', (data) => {
    jsonData += data.toString();

    // Split the data by newlines
    const lines = jsonData.split('\n');

    // Process each line separately
    lines.forEach((line) => {
      if (line.trim() !== '') {
        try {
          const parsedData = JSON.parse(line);
          resolve(parsedData); // Resolve with the parsed JSON
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });

    // Keep any remaining data for the next iteration
    jsonData = lines.pop() || '';
  });
});

    // console.log(response);
    // Here, you can send the response back to the client or perform other actions.

    // Delete the temporary file after processing
    temp.cleanupSync();
    
    res.json(response);
  } catch (error) {
    console.error("Error processing Iris:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/fetchFingeprintDetails", async (req, res)=>{
  try {
    // checking the Person;
    console.log("Fingerprint");
    console.log(req.body);
  

    const details = await Person.findOne({fingerprint: req.body.matchedImageName});


    // console.log(details.name);
    if(details){
    return res.status(200).send(details)
    }
    else{
      return res.status(204).json({msg: "No Match Found"});
    }
} catch (error) {
    return res.status(500).json({msg: "Some error occured" , log: error.message});
    
}
})

app.post("/fetchIrisDetails", async (req, res) => {
  try {
    console.log("Iris"); // Logging for debugging purposes
    console.log(req.body); // Logging the request body for debugging

    const details =  await Person.findOne({iris: req.body.matchedImageName });

    if (details) {
      return res.status(200).send(details);
    } else {
      return res.status(204).json({ msg: "No Match Found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Some error occurred", log: error.message });
  }
});






app.post("/addDetails", async(req, res)=>{
  try {
    const newPerson = new Person(
       
    );
      newPerson.save();
      return res.status(200).json({msg: 'New Person added succesfully!'});
  } catch (error) {
    return res.status(500).json({msg: "Some error occured" , log: error.message});
  }
})
app.post("/fetchIndiMedicalRecords", async (req, res) => {
  try {
     
      
      // Establish MongoDB connection
      await Connection();

      const db = mongoose.connection.db;

      // // Define collections you want to query
      // const collections = ['TestRecords', 'VaccineRecords', 'ClinicalRecords','HospitalAdmitRecord']; // Add more collections if needed

      const collection =  db.collection('ClinicalRecords');
      const query = { patientId: 'P0001' }; 
      const documents = await collection.find(query).toArray();
      console.log(documents);
      let results = documents;

      // // Iterate through collections and perform query
      // for (const collectionName of collections) {
      //     const collection =  db.collection('ClinicalRecords');
      //     const query = { patientId: 'P0001' }; 
      //     const documents = await collection.find(query).toArray();
      //     console.log(documents);
      //     results = results.concat(documents);
      // }

      // Send response to the frontend
      res.status(200).json(results);

      // Close the MongoDB connection
      
     
  } catch (error) {
      console.error('Error fetching medical records:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// genome file upload

app.post("/uploadGenomeFile", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file);
    const personId = req.body.personId; //unique id
    console.log(personId);
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${personId}_genome`); // Changed file name to match your requirement

    // Set metadata including content type
    const metadata = {
      contentType: req.file.mimetype // Set the content type based on the uploaded file
    };

    // Upload the file with metadata
    fileRef.put(req.file.buffer, metadata)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(async downloadURL => {
        console.log("File available at", downloadURL);
        const updatedDoc = await Person.findOneAndUpdate({ uniqueId: personId }, { genomeFile: downloadURL }, { new: true });

        if (updatedDoc) {
            console.log('genomeFile field updated successfully');
            res.status(200).json({ downloadURL });
        } else {
            console.error('Error updating genomeFile field: Document not found');
            res.status(404).json({ error: 'Document not found' });
        }
      })
      .catch(error => {
        console.error('Error uploading genome file:', error);
        res.status(500).json({ error });
      });
  } catch (error) {
    console.error('Error uploading genome file:', error);
    res.status(500).json({ error });
  }
});

app.use('/', Route)

app.listen(port, () => {
  console.log(`Backend server running on Port: ${port}`);
});


