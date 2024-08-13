import mongoose, { connect } from 'mongoose';

const uri = 'mongodb+srv://personalgauravrajhans:kbgaurav004@file-sharing-app.uoa1c.mongodb.net/?retryWrites=true&w=majority&appName=file-sharing-app'; // Replace with your MongoDB URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Connection error", err);
        process.exit(1);
    }
}

export default connectDB;
