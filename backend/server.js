// Conjunto Churrasco Tábua + Faca + Garfo (g 44x30): price_1OQaYNKEH2NVkDD3R3HcMJDt

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OPeiiKEH2NVkDD3gWRP9YoBuIicjOmRnO3lq4TZBzgvB6qZFmSoa7tBQOyZV6r2PE2ypBxHtwhrd9llQfWs7x7400uDJFuPqY"
);

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000!"));
