const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

console.log("connectDB =", connectDB);
console.log("type =", typeof connectDB);

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));

app.get("/", (req, res) => res.send("CRM API Running..."));

const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// ... all your app.use('/api/...') routes first ...

app.use(notFound);      // catches unknown routes → 404
app.use(errorHandler);  // catches all errors passed via next(err)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));