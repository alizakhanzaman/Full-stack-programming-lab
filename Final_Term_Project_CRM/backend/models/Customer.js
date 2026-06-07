//CUSTOMER MODEL/SCHEMA (BLUEPRINT FOR CUSTOMER DOCUMENTS IN MONGODB)

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, //trim removes extra spaces before/after
    email: { type: String, required: true, unique: true, lowercase: true }, //NO duplicates, always lowercase
    phone: { type: String, required: true },
    company: { type: String, default: "" },  //optional
    address: { type: String, default: "" },  //optional
    status: {
      type: String,
      enum: ["Lead", "Active", "Inactive"], //enum to select only one of these values
      default: "Lead",
    },
    services: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //links to the User who created this customer (for ownership and access control)
  },
  { timestamps: true } // timestamps: true automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Customer", customerSchema);