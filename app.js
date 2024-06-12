const express = require('express');
const app = express();
 const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");
const amqp = require('amqplib');




const Customer = require("./models/Customer.js");
const Order = require("./models/Order.js");
const CommunicationLog = require('./models/Communicationlog.js');




dotenv.config();
app.use(bodyParser.json());
app.set("models", path.join(__dirname,"models"));
app.set("view models" , "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 8080;



main().then(()=> {console.log("connection successful");

}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/crmappdb');
}


//for Customer

app.get("/customers", async (req, res) => {
    try {
        let customers = await Customer.find();
        res.render("index.ejs", { customers });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});






//create 

app.post("/customers",(req,res)=>{
    let{name,email,phone,total_spends,last_visit,visit_count} = req.body;
    let newCustomer = new Customer({
        name: name,
        email: email,
        phone:phone,
        total_spends:total_spends,
        last_visit: new Date(),
        visit_count:visit_count

        
    });
    
    newCustomer.save().then(res => {console.log("Customer info Saved")}).catch((err )=>{
        console.log(err);
    });
    res.render("customer.ejs");
});

app.get("/customers/new",(req,res) => {
    res.render("new.ejs");
});


app.get("/",(req,res)=> {
    
    res.render("home.ejs");
});

app.listen(8080, () =>{
    console.log("server is listening on port 8080");
});







// Order

app.get("/customers/createorder", (req, res) => {
    res.send("Awesome!All Good"); 
});

app.post('/customers/createorder', async (req, res) => {
    try {
        const { customer_id, order_amount, order_date } = req.body;

        
        const customer = await Customer.findById(customer_id);

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        
        const order = new Order({
            customer_id: customer._id,
            order_amount:customer.total_spends,
            order_date: new Date(order_date)
        });

        

        
        await order.save();

        
        customer.total_spends += order_amount;
        customer.last_visit = new Date(order_date);
        customer.visit_count += 1;
        await customer.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});








 //amqplib

 async function publishToQueue(queue, message) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    setTimeout(() => {
        connection.close();
    }, 1000);
}




app.post("/customers", (req, res) => {
    const { name, email, phone, total_spends, visit_count, last_visit } = req.body;
    if (!name || !email || !phone || !total_spends || !visit_count || !last_visit) {
        return res.status(400).send('Invalid input');
    }
    const newCustomer = { name, email, phone, total_spends, visit_count, last_visit: new Date(last_visit) };
    publishToQueue('customer_queue', newCustomer)
        .then(() => res.send('Customer data is being processed'))
        .catch(err => res.status(500).send(err.toString()));
});





app.post('/createorder', (req, res) => {
    const { customer_id, order_amount, order_date } = req.body;
    if (!customer_id || !order_amount || !order_date) {
        return res.status(400).send('Invalid input');
    }
    const newOrder = { customer_id, order_amount, order_date: new Date(order_date) };
    publishToQueue('order_queue', newOrder)
        .then(() => res.send('Order data is being processed'))
        .catch(err => res.status(500).send(err.toString()));
});




app.post('/sendcampaign', async (req, res) => {
    const { audience, messageTemplate } = req.body;
  
    try {
      const customers = await Customer.find(audience);
      const logs = customers.map(customer => ({
        customer_id: customer._id,
        message: messageTemplate.replace('{name}', customer.name),
        status: 'PENDING'
      }));
  
      const savedLogs = await CommunicationLog.insertMany(logs);
  
      savedLogs.forEach(log => {
        publishToQueue('campaign_queue', { logId: log._id, message: log.message });
      });
  
      res.status(200).send({ success: true, logs: savedLogs });
    } catch (error) {
      res.status(500).send(error);
    }
  });


  app.get('/logs', async (req, res) => {
    try {
      const logs = await CommunicationLog.find().populate('customer_id');
      res.render('logs.ejs', { logs });
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.post('/deliveryreceipt', (req, res) => {
    const { communicationLogId, status } = req.body;
    CommunicationLog.findByIdAndUpdate(communicationLogId, { status }, (err, log) => {
        if (err) return res.status(500).send(err);
        res.send({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});



