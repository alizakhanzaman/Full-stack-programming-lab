
const Customer = require("../models/Customer");

//READ ALL CUSTOMERS (with optional search and filter)

exports.getCustomers = async (req, res) =>{
  const { search, status } = req.query; // req.query = URL parameters like ?search=ali&status=Active
  
  let query = {}; //Empty query means "get evrything"

  // Add search filter if provided
  if (search) query.name = { $regex: search, $options: "i" };
  // $regex = pattern matching (find names CONTAINING the word)
  // $options: "i" = ignore uppercase/lowercase
  // So "ali" matches "Ali Hassan", "Aliza", "Syed Ali"


  // Add status filter if provided
  if (status && status !== "All") query.status = status;
  // Exact match — only "Lead" OR "Active" OR "Inactive"

  
  // Find matching customers, newest first
  const customers = await Customer.find(query).sort({ createdAt: -1 });
  res.json(customers);
};

exports.getCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  res.json(customer);
};


//CREATE NEW CUSTOMER

exports.createCustomer = async (req, res) => {
  const { name, email, phone, company, address, status, services, totalAmount } = req.body;
  // Validate required fields
  if (!name || !email || !phone)
    return res.status(400).json({ message: "Name, email, and phone are required" });

  // Save to MongoDB
  const customer = await Customer.create({
    name, email, phone, company, address, status, services, totalAmount,
    createdBy: req.user._id, // who added this customer (from JWT)
  });
  res.status(201).json(customer); //201=successfully created
};

//UPDATE CUSTOMER/edit

exports.updateCustomer = async (req, res) => {
  
  // findByIdAndUpdate = find by ID, update with new data, return NEW version
  const customer = await Customer.findByIdAndUpdate(
    req.params.id, // the ID from URL: /customers/64abc123
    req.body,      // new data from the form
    {new: true, runValidators: true,} 
    //new: true = return the updated document 
    //runValidators: true = run schema validators to see if it still pass
  );
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  res.json(customer);
};


//DELETE CUSTOMER
exports.deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  // finds the customer by ID and deletes it in one step
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  res.json({ message: "Customer deleted successfully" });
};