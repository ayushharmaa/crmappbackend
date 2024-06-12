const mongoose = require('mongoose');
const Customer = require("./models/Customer.js");


main().then(()=> {console.log("connection successful");

})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/crmappdb');
}




let allCustomers =[{
    name:"Ayush",
    email:"ayush123@mail",
    phone:"124574",
    total_spends:30000,
    last_visit: new Date(2020,3,9),   //time in UTC format
    visit_count:2

},{

    name:"Aakash",
    email:"skyworld1@mail",
    phone:"001245",
    total_spends:5000,
    last_visit: Date(2024,4,8),   
    visit_count:1

},{
    name:"Dhruv",
    email:"dhruvydread49@mail",
    phone:"78945",
    total_spends:50000,
    last_visit: Date(2021,2,16),   
    visit_count:5

},{
    name:"Ravince",
    email:"besoyaravince01@mail",
    phone:"789456",
    total_spends:8000,
    last_visit: new Date(2023,5,15),   
    visit_count:2

},{
    name:"Vaishnavi",
    email:"guptavaishnavi1142mail",
    phone:"784561",
    total_spends:96000,
    last_visit: new Date(2022,6,9),   
    visit_count:2

},{
    name:"Molly",
    email:"molly4sunshine@mail",
    phone:"8884571",
    total_spends:6500,
    last_visit: new Date(2024,2,14),   
    visit_count:1

},
{
    phone: "2515675",
    name: "Agnola",
    total_spends: 75012,
    email: "apawden2l@qq.com",
    visit_count: 3,
    last_visit: new Date(2021,6,3)
},
{
    phone: "1516211951",
    name: "Emelita",
    total_spends: 30659,
    email: "emullord2m@salon.com",
    visit_count: 5,
    last_visit: new Date(2022,9,14)
},
{
    phone: "7706430342",
    name: "Fair",
    total_spends: 19683,
    email: "fcramp2n@wordpress.com",
    visit_count: 6,
    last_visit: new Date()
},
{
    phone: "2661929560",
    name: "Shirlee",
    total_spends: 8470,
    email: "scorsham2o@ucoz.com",
    visit_count: 6,
    last_visit: new Date()
},
{
    phone: "1193873935",
    name: "Mil",
    total_spends: 59162,
    email: "mbowland2p@github.com",
    visit_count: 1,
    last_visit: new Date()
},
{
    phone: "5763735965",
    name: "Jeanie",
    total_spends: 64921,
    email: "jscading2q@google.it",
    visit_count: 5,
    last_visit: new Date()
},
{
    phone: "3619259684",
    name: "Cart",
    total_spends: 59971,
    email: "cdibdale2r@w3.org",
    visit_count: 6,
    last_visit: new Date()
},


    {
        name: "John Doe",
        email: "john.doe@mail.com",
        phone: "1234567890",
        total_spends: 12000,
        last_visit: new Date(2024, 0, 5),
        visit_count: 3
    },
    {
        name: "Jane Smith",
        email: "jane.smith@mail.com",
        phone: "9876543210",
        total_spends: 8000,
        last_visit: new Date(2024, 1, 20),
        visit_count: 2
    },
    {
        name: "Robert Brown",
        email: "robert.brown@mail.com",
        phone: "5551234567",
        total_spends: 15000,
        last_visit: new Date(2024, 2, 15),
        visit_count: 5
    },
    {
        name: "Emily White",
        email: "emily.white@mail.com",
        phone: "5559876543",
        total_spends: 9500,
        last_visit: new Date(2024, 3, 10),
        visit_count: 4
    },
    {
        name: "Michael Johnson",
        email: "michael.johnson@mail.com",
        phone: "5551237890",
        total_spends: 20000,
        last_visit: new Date(2024, 4, 5),
        visit_count: 6
    },
    {
        name: "Sarah Wilson",
        email: "sarah.wilson@mail.com",
        phone: "5559873210",
        total_spends: 7200,
        last_visit: new Date(2024, 5, 25),
        visit_count: 1
    },
    {
        name: "David Clark",
        email: "david.clark@mail.com",
        phone: "5556543210",
        total_spends: 13000,
        last_visit: new Date(2024, 6, 12),
        visit_count: 3
    },
    {
        name: "Anna Lewis",
        email: "anna.lewis@mail.com",
        phone: "5553216540",
        total_spends: 9000,
        last_visit: new Date(2024, 7, 18),
        visit_count: 2
    },
    {
        name: "Christopher Hall",
        email: "christopher.hall@mail.com",
        phone: "5559876541",
        total_spends: 16000,
        last_visit: new Date(2024, 8, 22),
        visit_count: 5
    },
    {
        name: "Jessica Allen",
        email: "jessica.allen@mail.com",
        phone: "5551234568",
        total_spends: 11000,
        last_visit: new Date(2024, 9, 30),
        visit_count: 4
    },
    {
        name: "Matthew Wright",
        email: "matthew.wright@mail.com",
        phone: "5557894561",
        total_spends: 14000,
        last_visit: new Date(2024, 10, 11),
        visit_count: 6
    },
    {
        name: "Olivia Green",
        email: "olivia.green@mail.com",
        phone: "5553219870",
        total_spends: 6000,
        last_visit: new Date(2024, 11, 2),
        visit_count: 1
    },
    {
        name: "Daniel King",
        email: "daniel.king@mail.com",
        phone: "5556547891",
        total_spends: 12500,
        last_visit: new Date(2024, 1, 25),
        visit_count: 3
    },
    {
        name: "Sophia Scott",
        email: "sophia.scott@mail.com",
        phone: "5559871234",
        total_spends: 7500,
        last_visit: new Date(2024, 2, 14),
        visit_count: 2
    },
    {
        name: "James Young",
        email: "james.young@mail.com",
        phone: "5551239876",
        total_spends: 17000,
        last_visit: new Date(2024, 3, 19),
        visit_count: 5
    },
    {
        name: "Isabella Baker",
        email: "isabella.baker@mail.com",
        phone: "5557893210",
        total_spends: 10000,
        last_visit: new Date(2024, 4, 27),
        visit_count: 4
    },
    {
        name: "William Perez",
        email: "william.perez@mail.com",
        phone: "5553214567",
        total_spends: 18000,
        last_visit: new Date(2024, 5, 14),
        visit_count: 6
    },
    {
        name: "Mia Roberts",
        email: "mia.roberts@mail.com",
        phone: "5559873214",
        total_spends: 8500,
        last_visit: new Date(2024, 6, 6),
        visit_count: 1
    },
    {
        name: "Lucas Turner",
        email: "lucas.turner@mail.com",
        phone: "5556549871",
        total_spends: 14500,
        last_visit: new Date(2024, 7, 30),
        visit_count: 3
    },
    {
        name: "Amelia Parker",
        email: "amelia.parker@mail.com",
        phone: "5551236549",
        total_spends: 7000,
        last_visit: new Date(2024, 8, 20),
        visit_count: 2
    }






];

Customer.insertMany(allCustomers);
