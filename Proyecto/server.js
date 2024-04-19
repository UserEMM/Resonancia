const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

//modules
const bodyparser = require("body-parser")
const path = require('path');

//controller
const { createUser, validateUser,validateQuestion, validateEmail,updateUserRecovery, inactiveAccount, createItems, getItemsByCategory, getItemById, createOrder, serviceOrder,
    createAccountToken, validateCreationToken, sendLocal, DeleteToken, createLog, getDollarValue, findIdDocument,validateIdDocument} = require("../Proyecto/server/controller/controller");

const connectDB = require('./server/database/connection');
const app = express();

dotenv.config( {path:'config.env'} )
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongodb conexion
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//Users
app.post("/create-user", createUser);
app.post("/validate-email", validateEmail);
app.post("/validate-id-document", validateIdDocument);
app.post("/validate-user", validateUser);
app.post("/send-local", sendLocal);
app.post('/recover-account', updateUserRecovery);
app.post('/inactive-account', inactiveAccount);
app.post('/validate-question', validateQuestion);

//Items
app.post("/create-item", createItems);
app.get('/get-item/:category', getItemsByCategory);
app.get('/get-item-by-id/:id', getItemById);

//Orders
app.post('/create-order', createOrder);
app.post('/service-order', serviceOrder);


//Tokens
app.post('/create-account-token', createAccountToken);
app.post('/validate-creation-token', validateCreationToken);
app.post('/delete-token', DeleteToken);


//logs
app.post("/create-log", createLog);

//cors
app.use(cors());

//valor usd
app.post("/getDollarValue", getDollarValue);

//cedula
app.post("/findIdDocument", findIdDocument);



//listening
app.listen(PORT, () => {
    console.log(`The server is working at port: http://localhost:${PORT}`);
});/* port env*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`);
    next();
});