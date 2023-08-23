import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
    {
        id:{type: String},
        nome: {type: String, required: true},
        idade: {type: String, required: true},
        porte: {type: String, required: true},
        traços: {type: String},
        cidade: {type: String},
        tutor: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
        foto: {type: String}
    }
)

const pets = mongoose.model('Pets', petSchema);

export default pets;