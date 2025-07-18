import mongoose from "mongoose";

async function dbCall() {
    const database_url = process.env.DB_URL
    await mongoose.connect(database_url)
}


export {
    dbCall
}