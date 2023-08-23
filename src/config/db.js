import mongoose from "mongoose";

const password = '0138';

mongoose.connect(`mongodb+srv://leozarzar:${password}@base.4w5i4lj.mongodb.net/AdopetDB`)

let db = mongoose.connection;

export default db;