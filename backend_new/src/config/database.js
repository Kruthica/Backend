import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        console.log('MONGODB_URI:', process.env.MONGODB_URI);
        const connectioInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected: 
            ${connectioInstance.connection.host}`);

    }catch(error){
        console.log("MongoDB connection error:", error);
        process.exit(1)
    }
}

export default connectDB;