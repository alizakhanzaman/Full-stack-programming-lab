const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String },
    customerCompany: { type: String },
    customerAddress: { type: String },
    services: { type: String, default: "General Services" },
    totalAmount: { type: Number, default: 0 },
    status: { type: String, enum: ["Lead", "Active", "Inactive"], default: "Active" },
    date: { type: String },
    savedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);