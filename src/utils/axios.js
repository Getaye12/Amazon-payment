import axios from "axios"
  
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/clone-front-end-9c150/us-central1/api'
    // cloud fn url
})

export default instance



////////////======
/////=====
// const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors");
// const stripe = require('stripe')('sk_test_51Nd8Q6Im0Vvf9lD7f0RE1ifCDG8lZKb8VuQbzPcFNkIq848yzvTAzxFLHTy7C2SCXTbmjDQ7kOSNNAfOSY7IO90C003AnWhICp');
// // - App config
// const app = express();
// // - Middlewares
// app.use(cors({origin: true}));
// app.use(express.json());
// app.get("/", (request, response) => response.status(200).send(" Getaye!!!!")); 

//  app.post("/payments/create", async (request, response) => {
//   const total = request.query.total;
// console.log("Payment Request Recieved for this amount >>> ", total);
// const paymentIntent = await stripe.paymentIntents.create({
//     amount: total, // subunits of the currency
//     currency: "usd",
//   });

//   // OK - Created
//   response.status(201).send({
//     clientSecret: paymentIntent.client_secret,
//   }); 
// });

// // - Listen command
// exports.api = functions.https.onRequest(app);