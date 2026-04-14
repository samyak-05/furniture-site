import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;

if(!mongoURL){
    throw new Error("MONGO_URL is not defined in environment variables");
}

let cache = global.mongoose;

if(!cache){
    cache = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () =>{
    if(cache.conn){
        return cache.conn;
    }

    if(!cache.promise){
        cache.promise = mongoose.connect(mongoURL).then((conn) =>
            conn.connection
    );
    }

    try{
        const conn = await cache.promise;
        return conn;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}

export default connectDB;