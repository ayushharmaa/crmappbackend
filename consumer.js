const amqp = require('amqplib');
const mongoose = require('mongoose');
const CommunicationLog = require('./models/Communicationlog.js');

mongoose.connect('mongodb://localhost:27017/crmappdb', { useNewUrlParser: true, useUnifiedTopology: true });

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    total_spends: Number,
    visit_count: Number,
    last_visit: Date
});

const orderSchema = new mongoose.Schema({
    customer_id: mongoose.Schema.Types.ObjectId,
    order_amount: Number,
    order_date: Date
});

const Customer = mongoose.model('Customer', customerSchema);
const Order = mongoose.model('Order', orderSchema);

async function consumeQueue(queue, model) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content.toString());
            const document = new model(data);
            document.save((err) => {
                if (err) {
                    console.error('Error saving document:', err);
                } else {
                    console.log('Document saved successfully');
                }
                channel.ack(msg);
            });
        }
    });
}

async function consumeQueue(queue) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const { logId, message } = JSON.parse(msg.content.toString());
  
        // Simulate sending message to vendor API
        const status = Math.random() < 0.9 ? 'SENT' : 'FAILED'; // 90% success rate
  
        await CommunicationLog.findByIdAndUpdate(logId, { status });
  
        console.log(`Message for logId ${logId} has been processed with status ${status}`);
        channel.ack(msg);
      }
    });
  }





  consumeQueue('campaign_queue',CommunicationLog);
consumeQueue('customer_queue', Customer);
consumeQueue('order_queue', Order);

console.log('Consumer started...');
