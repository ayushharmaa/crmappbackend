const mongoose = require('mongoose');

const communicationLogSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    message: String,
    status: { type: String, default: 'PENDING' }
});

const CommunicationLog = mongoose.model('CommunicationLog', communicationLogSchema);

module.exports = CommunicationLog;
