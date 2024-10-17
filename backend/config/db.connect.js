import mongoose from 'mongoose'

const connectDB=async()=>{
    try{
        // await mongoose.connect(process.env.DB_URL)
        await mongoose.connect('mongodb+srv://victoriastark357:ON8eRcsGn9mzbcSc@blogcluster.dz8zo.mongodb.net/?retryWrites=true&w=majority&appName=BlogCluster')
        .then(()=>{
            console.log("DB CONNECTED")
        })
    }
    catch{
        console.log('Error connecting database')
    }

}

export default connectDB