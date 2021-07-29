const mongoose  = require('mongoose');
const Product = require('./models/product');

const products =  [
    {
         name: 'Drone',
         price: '3000',
         img: 'https://images.unsplash.com/photo-1506947411487-a56738267384?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
         desc: 'a waterproof motor frame, flight and motor controllers, motors, transmitter and receiver, propellers, and a battery or any ot'

    },
    {
         name: 'Laptop',
         price: '60000',
         img: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
         desc: 'a waterproof motor frame, flight and motor controllers, motors, transmitter and receiver, propellers, and a battery or any ot'

    },
    {
         name: 'HP Laptops',
         price: '50000',
         img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
         desc: 'a waterproof motor frame, flight and motor controllers, motors, transmitter and receiver, propellers, and a battery or any ot'

    },
    {
         name: 'Jackets',
         price: '500',
         img: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
         desc: 'a waterproof motor frame, flight and motor controllers, motors, transmitter and receiver, propellers, and a battery or any ot'

    },
    {
         name: 'Keyboard',
         price: '50000',
         img: 'https://images.unsplash.com/photo-1560762484-813fc97650a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8a2V5Ym9hcmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
         desc: 'a waterproof motor frame, flight and motor controllers, motors, transmitter and receiver, propellers, and a battery or any ot'

    },
]

async function seedDB(){
      
    await Product.insertMany(products);
    console.log("DB Seeded");
}

module.exports = seedDB;