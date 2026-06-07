//node seed.js - run this file to seed 20 customers into MongoDB

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("./models/Customer");

dotenv.config();

const customers = [
  { name: "Aliza Zaman", email: "aliza.zaman@gmail.com", phone: "+92-300-1234567", company: "TechSoft Pvt", address: "Blue Area, Islamabad", status: "Active", services: "Web Development", totalAmount: 85000 },
  { name: "Sara Ahmed", email: "sara.ahmed@outlook.com", phone: "+92-321-2345678", company: "Digital Hub", address: "Gulberg, Lahore", status: "Lead", services: "SEO Services", totalAmount: 30000 },
  { name: "Usman Malik", email: "usman.malik@yahoo.com", phone: "+92-333-3456789", company: "Nexgen Co", address: "Saddar, Karachi", status: "Active", services: "Mobile App Development", totalAmount: 120000 },
  { name: "Fatima Zahra", email: "fatima.zahra@company.pk", phone: "+92-345-4567890", company: "Media Works", address: "F-10, Islamabad", status: "Inactive", services: "Graphic Design", totalAmount: 25000 },
  { name: "Bilal Khan", email: "bilal.khan@business.com", phone: "+92-311-5678901", company: "Khan Traders", address: "Hayatabad, Peshawar", status: "Active", services: "E-commerce Development", totalAmount: 95000 },
  { name: "Ayesha Siddiqui", email: "ayesha.sid@gmail.com", phone: "+92-300-6789012", company: "Fashion Hub", address: "DHA, Lahore", status: "Lead", services: "Social Media Management", totalAmount: 18000 },
  { name: "Omar Farooq", email: "omar.farooq@techco.com", phone: "+92-321-7890123", company: "TechCo Ltd", address: "Clifton, Karachi", status: "Active", services: "Cloud Services", totalAmount: 200000 },
  { name: "Zainab Mirza", email: "zainab.mirza@studio.pk", phone: "+92-333-8901234", company: "Creative Studio", address: "G-9, Islamabad", status: "Lead", services: "Branding & Identity", totalAmount: 40000 },
  { name: "Hamza Qureshi", email: "hamza.q@solutions.com", phone: "+92-345-9012345", company: "Q Solutions", address: "Faisal Town, Lahore", status: "Active", services: "IT Consulting", totalAmount: 75000 },
  { name: "Nadia Iqbal", email: "nadia.iqbal@corp.pk", phone: "+92-311-0123456", company: "Iqbal Corp", address: "Model Town, Lahore", status: "Inactive", services: "Data Analytics", totalAmount: 55000 },
  { name: "Tariq Mehmood", email: "tariq.m@ventures.com", phone: "+92-300-1122334", company: "TM Ventures", address: "Johar Town, Lahore", status: "Active", services: "ERP System", totalAmount: 180000 },
  { name: "Hira Baig", email: "hira.baig@designs.pk", phone: "+92-321-2233445", company: "Baig Designs", address: "Bahria Town, Rawalpindi", status: "Lead", services: "UI/UX Design", totalAmount: 35000 },
  { name: "Kamran Sheikh", email: "kamran.s@exports.com", phone: "+92-333-3344556", company: "Sheikh Exports", address: "SITE Area, Karachi", status: "Active", services: "Logistics Software", totalAmount: 145000 },
  { name: "Sana Rashid", email: "sana.r@academy.edu", phone: "+92-345-4455667", company: "Rashid Academy", address: "Wah Cantt, Rawalpindi", status: "Lead", services: "LMS Development", totalAmount: 60000 },
  { name: "Adnan Butt", email: "adnan.butt@enterprise.pk", phone: "+92-311-5566778", company: "Butt Enterprise", address: "Township, Lahore", status: "Active", services: "CRM Integration", totalAmount: 110000 },
  { name: "Rabia Nawaz", email: "rabia.nawaz@marketing.com", phone: "+92-300-6677889", company: "Nawaz Marketing", address: "Saddar, Rawalpindi", status: "Active", services: "Digital Marketing", totalAmount: 65000 },
  { name: "Faisal Rehman", email: "faisal.r@systems.pk", phone: "+92-321-7788990", company: "Rehman Systems", address: "I-8, Islamabad", status: "Lead", services: "Network Setup", totalAmount: 45000 },
  { name: "Maira Hussain", email: "maira.h@solutions.com", phone: "+92-333-8899001", company: "Hussain Solutions", address: "Defence, Karachi", status: "Inactive", services: "Content Writing", totalAmount: 20000 },
  { name: "Zahid Chaudhry", email: "zahid.c@logistics.pk", phone: "+92-345-9900112", company: "Chaudhry Logistics", address: "Cantt, Lahore", status: "Active", services: "Fleet Management System", totalAmount: 175000 },
  { name: "Iqra Shahid", email: "iqra.shahid@consultancy.com", phone: "+92-311-0011223", company: "Shahid Consultancy", address: "F-7, Islamabad", status: "Lead", services: "Business Consultancy", totalAmount: 50000 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!!");
    await Customer.deleteMany({});  // clear old data
    console.log("Cleared existing customers.");
    await Customer.insertMany(customers);  // insert 20 at once
    console.log("20 customers seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seed Error:", error.message);
    process.exit(1);
  }
};

seed();