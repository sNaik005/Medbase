// import admin from 'firebase-admin'
// import serviceAccount from "../firebaseServiceKey.json" assert { type: "json" };


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://human-medical-ecosystem-default-rtdb.firebaseio.com",
//   storageBucket: "gs://human-medical-ecosystem.appspot.com/genome"
// });

// const bucket = admin.storage().bucket();

export const uploadGenomeFile =  async (req, res) => {
    try {
    console.log(req.file);
      const file = req.file;
      const textId = req.body.textId;

      const uniqueFileName = `${textId}`;
      const fileUpload = bucket.file(`${uniqueFileName}`);
  
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });
  
      stream.on('error', (err) => {
        console.error('Error uploading to Firebase bucket: ', err);
        res.status(500).json({ error: 'Failed to upload file' });
      });
  
      stream.on('finish', () => {
        res.status(200).send('File uploaded successfully');
      });
  
      stream.end(file.buffer);
    } catch (error) {
      console.error('Error uploading file: ', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  };