const amqp = require('amqplib');
const mongoose = require('mongoose');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/crmappdb', { useNewUrlParser: true, useUnifiedTopology: true });

const communicationLogSchema = new mongoose.Schema({
    customer_id: mongoose.Schema.Types.ObjectId,
    message: String,
    status: String
});

const CommunicationLog = mongoose.model('CommunicationLog', communicationLogSchema);

async function consumeQueue(queue) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const { logId, message } = JSON.parse(msg.content.toString());
            const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
            axios.post('http://localhost:3000/deliveryreceipt', { communicationLogId: logId, status })
                .then(() => {
                    console.log('Delivery status updated');
                    channel.ack(msg);
                })
                .catch(err => {
                    console.error('Error updating delivery status:', err);
                });
        }
    });
}

consumeQueue('campaign_queue');

console.log('Campaign consumer started...');
