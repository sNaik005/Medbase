
import { spawn } from "child_process";
import temp from "temp";
import fs from "fs";



export const processFingerprint = async(req, res)=>{
    try {
        if (!req.file) {
          return res.status(400).json({ error: "No image file uploaded." });
        }
    
    
        const imageBuffer = req.file.buffer;
    
        // Create a temporary file to store the image buffer
        temp.track(); // Initialize the temp library
        const tempFilePath = temp.path({ suffix: ".jpg" });
        fs.writeFileSync(tempFilePath, imageBuffer);
    
        console.log("Helloooooo");
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
    console.log("boii");
        console.log(response);
       
        temp.cleanupSync();
        
        res.json(response);
      } catch (error) {
        console.error("Error processing fingerprint:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}