const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId,  required: true },
    order_amount: { type: Number, required: true },
    order_date: { type: Date, required: true },
});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
