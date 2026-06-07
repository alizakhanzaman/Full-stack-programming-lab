const Customer = require("../models/Customer");
const Invoice = require("../models/Invoice");

exports.generateInvoice = async (req, res) => {
  // Find the customer by ID
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });

  // Build an invoice object from customer data
  const invoice = {
    invoiceNumber: `INV-${Date.now()}`,  // Date.now() = current timestamp in ms = unique number
    date: new Date().toLocaleDateString(), //today's date in "MM/DD/YYYY" format
    customer: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      address: customer.address,
    },
    services: customer.services || "General Services",
    totalAmount: customer.totalAmount || 0,
    status: customer.status,
  };

  res.json(invoice); // send back to frontend to display
};

//SAVE TO DATABASE - when user clicks "Save Invoice" button on invoice details page, frontend sends invoice data to this route to save in MongoDB
exports.saveInvoice = async (req, res) => {
  try {
    const { invoiceNumber, customerId, customerName, customerEmail, customerPhone, customerCompany, customerAddress, services, totalAmount, status, date } = req.body;

    const existing = await Invoice.findOne({ invoiceNumber }); // Check if an invoice with the same number already exists (to prevent duplicates)
    if (existing) return res.status(400).json({ message: "Invoice already saved" });

    // Save to MongoDB invoices collection
    const invoice = await Invoice.create({
      invoiceNumber,
      customer: customerId,
      customerName,
      customerEmail,
      customerPhone,
      customerCompany,
      customerAddress,
      services,
      totalAmount,
      status,
      date,
    });

    res.status(201).json({ message: "Invoice saved successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all saved invoices (for listing in "Saved Invoices" page)
exports.getSavedInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 }); // newest first
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single invoice by ID (for viewing details)
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id); // Find invoice by its unique ID
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};