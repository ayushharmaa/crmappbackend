const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true , maxLength: 100},
    email: { type: String },
    phone: { type: String },
    total_spends: { type: Number, required: true },
    last_visit: { type: Date, required: true },
    visit_count: { type: Number, required: true },
});


const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
