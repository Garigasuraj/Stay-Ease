const mongoose = require('mongoose')
const data = require('./data.js')
const { ref, required } = require('joi')
const { description, type } = require('../serverValidation/joiValidation.js')
const server_file = require('../index.js')

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/AirBNB') // /AirBNB is a path which data get stores
}

main().then(()=>{
    console.log("Successfully connected to DB")
})
.catch((err)=>{
    console.log("error connectong to Database")
})

const review_reference = async()=>{
    
}

const insert_data = async ()=>{
    try{
        await airBnb.deleteMany({})
        await Review.deleteMany({})
        await airBnb.insertMany(data.listingdata)
        console.log("Data inserted successfull")
    }
    catch (err){
        console.log(`Error inserting the Data: ${err}`)
    }
}
// insert_data()
// console.log(data)
{
    //// Schema
// const test_1 = mongoose.Schema({ // Child collection
//     name: String, email: String,
//     orders: [
//         {type: mongoose.Schema.Types.ObjectId, ref:'comments'}
//     ]
// })
// const test_2 = mongoose.Schema({ // Parent collection
//     product: String, amount: Number,
//     orderDate: String, user: [{type: mongoose.Schema.Types.ObjectId, ref:'user'}]
// })

  //// Middleware
// test_1.post('findOneAndDelete',async (doc)=>{ 
//     console.log("The doc: "+doc)
//     try{
//         if(doc.orders.length){ // doc.orders is an array
//             await comment.deleteMany({_id: {$in : doc.orders}})
//         }
//     }
//     catch(error){
//         console.log(error)
//     }
// })

// Creating an test relation collection

  //// Model
// const user = mongoose.model('user',test_1)
// const comment = mongoose.model('comments',test_2)

  //// Data insertion
// const test_2_function = async()=>{
//     try {
//         const insert_data_1 = await user.insertMany([
//             {
//                 "name": "John Doe",
//                 "email": "john.doe@example.com",
//             },
//             {
//                 "name": "Jane Smith",
//                 "email": "jane.smith@example.com",
                
//             },
//             {
//                 "name": "Alice Johnson",
//                 "email": "alice.johnson@example.com",
//             },
//             {
//                 "name": "Bob Brown",
//                 "email": "bob.brown@example.com",
//             }
//         ]
//         )
//         // const insert_data_2 = await comment.insertMany([
//         //     {
//         //         "product": "Laptop",
//         //         "amount": 1500,
//         //         "orderDate": "2024-09-25T00:00:00Z",
//         //     },
//         //     {
//         //         "product": "Smartphone",
//         //         "amount": 800,
//         //         "orderDate": "2024-09-30T00:00:00Z",
//         //     },
//         //     {
//         //         "product": "Tablet",
//         //         "amount": 300,
//         //         "orderDate": "2024-10-05T00:00:00Z",

//         //     },
//         //     {
//         //         "product": "Smartwatch",
//         //         "amount": 200,
//         //         "orderDate":"2024-10-05T00:00:00Z",

//         //     },
//         //     {

//         //         "product": "Headphones",
//         //         "amount": 150,
//         //         "orderDate": "2024-10-05T00:00:00Z",
//         //     },
//         //     {
//         //         "product": "Camera",
//         //         "amount": 1000,
//         //         "orderDate": "2024-10-05T00:00:00Z",
//         //     }
//         // ]
//         // )
     
//     } catch (error) {
//         console.log(error)
//     }
// }

   //// Creating relationship
// async function insert(){
//     let user_dataa = await user.find({name: 'Alice Johnson'})
//     let orders_data = await comment.find({product:'Laptop'})
//     try {
//         orders_data.map((ele,index) =>{
//             orders_data[index].user.push(user_dataa[0]._id)
//             if(user_dataa[index] !== undefined){
//                 user_dataa[index].orders.push(ele._id)
//             }
//         })
//         for(let data of orders_data){await data.save()}
//         for(let data of user_dataa){await data.save()}
//     } catch (error) {
//         console.log(error)
//     }
// }

    //// Cascade Delete
// // delete_data()  
// async function delete_data() {
//     try{
//         await user.findOneAndDelete({name: 'Alice Johnson'})
//         console.log("successfully deleted")
//     }
//     catch(error){
//         console.log(error)
//     }
// }

   //// using the popluate
// const findUser = async()=>{
//     let data = await user.findOne({name: 'John Doe'}).populate('orders')
    
//     console.log(data)
// }
//// findUser()

// init()

// function init(){
//     test_2_function()
// }
    }
module.exports = main