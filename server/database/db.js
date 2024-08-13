import mongoose, { connect } from 'mongoose';
import 'dotenv/config'


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}`);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Connection error", err);
        process.exit(1);
    }
}

export default connectDB;
