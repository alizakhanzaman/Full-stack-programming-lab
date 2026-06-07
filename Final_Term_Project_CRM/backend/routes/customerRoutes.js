const express = require("express");
const router = express.Router();
const {
  getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer,
} = require("../controllers/customerController");
const { protect } = require("../middleware/authMiddleware");

// "protect" is placed BEFORE the controller function/every route. So, it runs first and checks the token

// GET all / POST new  =  /api/customers

router.route("/")
.get(protect, getCustomers)    //read all customers (with optional search and filter)
.post(protect, createCustomer); //create new customer

// GET one / PUT update / DELETE  =  /api/customers/:id

router.route("/:id")
  .get(protect, getCustomer) //read one
  .put(protect, updateCustomer) //update one
  .delete(protect, deleteCustomer); //delete/remove one

module.exports = router;