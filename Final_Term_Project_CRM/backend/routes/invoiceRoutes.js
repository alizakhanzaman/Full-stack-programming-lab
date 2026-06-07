const express = require("express");
const router = express.Router();
const {
  generateInvoice,
  saveInvoice,
  getSavedInvoices,
  getInvoiceById,
} = require("../controllers/invoiceController");
const { protect } = require("../middleware/authMiddleware");

router.get("/saved", protect, getSavedInvoices);
router.get("/saved/:id", protect, getInvoiceById);
router.post("/save", protect, saveInvoice);
router.get("/:id", protect, generateInvoice);

module.exports = router;