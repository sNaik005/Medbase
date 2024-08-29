import LoginStamp from '../models/LoginStamp.js';
import Orglogin from '../models/OrgLogin.js'
import Userlogin from '../models/UserLogin.js';
// var hash = require('object-hash');
// import objectHash from "../../medibase-backend/node_modules/object-hash"
import objectHash from "object-hash"
import qr from 'qrcode';


export const checkUserCredForOtp = async(req, res )=>{
   try {
    const {uniqueId, password} = req.body;
    const uidhash= objectHash.MD5(uniqueId);
    console.log(uidhash)
 
    let user = await Userlogin.findOne({uniqueId:uidhash});
    console.log(user)
    if(!user){
        return res.status(404).json({Error : "No user with the id found"})
    }
    if(user.password==password){
        return res.status(200).json({flag : true});
    }
    else{
        return res.status(400).json({Error : "bad Credentials"})
    }
   } catch (error) {
    console.error(err.message);
    res.status(500).send({error});
   }

    
}




const clients = [];

const sendToClients = (data) => {
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`));
};


export const orgLogin = async(req , res)=>{

    // Assuming req.body contains the data
 const { orgDetails } = req.body;
 const { orgId, password } = JSON.parse(orgDetails);
 
 console.log(orgId);  
 console.log(password); 
 
     try {
         let org = await Orglogin.findOne({orgId});
         if(!org){
             return res.status(400).json({Error : "No organisation with the id found"})
         }
         if(org.password==password){
             qr.toDataURL(orgId, (err, url) => {
                 if (err) return res.status(500).json({ error: 'Error generating QR code' });
                 return  res.status(200).json({ url, org} );
             });
         }
     } catch (error) {
         console.error(err.message);
         res.status(500).send({error});
     }
 }
 
 const authorizedUsers = ['Dr. Himanshu Rathod', "Dr. Mrinal Thakur"];


 export const validateAppUser = async(req, res)=>{

    const { qrData } = req.body;

    const {username , status} = JSON.parse(qrData)
    console.log(username);
    console.log(status);
    // Check if the scanned QR data is valid
    if (authorizedUsers.includes(username)) {
        // Log the login time stamp 
        console.log(`User ${username} logged in`);
        const loginStamp = new LoginStamp({
            orgId : 'H1001', personName : username
        })

        // const addedLoginStamp  = await loginStamp.save();
        sendToClients({ message: 'App Validation Successfull', username });
        res.sendStatus(200);
        // if(addedLoginStamp){
        // }
    } else {
        res.status(401).json({ error: 'kahitri problem aahe' });
    }
 }

export const sendResponseToClients = async(req, res)=>{
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Capture the client's id
    const clientId = Date.now();

    // Add client to the array of connected clients
    clients.push({ id: clientId, res });

    // Remove client when connection is closed
    req.on('close', () => {
        const index = clients.findIndex(client => client.id === clientId);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
}