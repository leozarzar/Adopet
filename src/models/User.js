import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {   
        id:{type: String},
        nome: {type: String, required: true},
        email: {type: String, required: true},
        senha: {type: String, required: true},
        telefone: {type: String},
        cidade: {type: String},
        sobre: {type: String},
        foto: {type: String},
        pets: [
            { type: mongoose.Types.ObjectId, ref: "Pets" }
        ]
    }
);

const users = mongoose.model('Users', userSchema);

export default users;