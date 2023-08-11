const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Nd8Q6Im0Vvf9lD7f0RE1ifCDG8lZKb8VuQbzPcFNkIq848yzvTAzxFLHTy7C2SCXTbmjDQ7kOSNNAfOSY7IO90C003AnWhICp");
// - App config
const app = express();
// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());
app.get("/", (request, response) => response.status(200).send(" Getaye!!!!"));

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


// ==========
app.post("/payments/create", async (request, response) => {
  try {
    const {total} = request.body;
    console.log("Payment Request Received for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });

    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    response.status(500).send({
      error: "Failed to create payment intent",
    });
  }
});

// - Listen command
exports.api = functions.https.onRequest(app);
