const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;