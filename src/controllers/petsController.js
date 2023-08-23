import pets from "../models/Pet.js";
import users from "../models/User.js";

class PetController{

    static listPets = async (req,res) => {

        try {
            
            const result = await pets.find().populate('tutor','nome').exec();
            res.status(200).json(result)
        }
        catch (err) {

            res.status(500).send({message: `${err.message} - Não foi possível listar pets.`});
        }
    }

    static addPet = async (req,res) => {

        try {

            let pet = new pets(req.body);
            const tutor = pet.tutor;
            await users.findByIdAndUpdate(tutor, { $push: { pets: pet  } });
            const result = await pet.save();
            res.status(201).send(result.toJSON());

        } catch (err) {

            res.status(500).send({message: `${err.message} - Falha ao cadastrar pet.`});
        }
    }

    static getPet = async (req,res) => {

        try {

            const id = req.params.id;
            const result = await pets.findById(id);
            res.status(200).json(result)
        } 
        catch (err) {

            res.status(400).send({message: `${err.message} - Pet não encontrado.`});
        }
    }

    static updatePet = async (req,res) => {

        try{

            const id = req.params.id;
            await pets.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: 'pet atualizado com sucesso.'});
        }
        catch(err){

            res.status(500).send({message: `${err.message} - Falha ao atualizar pet.`});
        }

    }

    static replacePet = async (req,res) => {

        try{

            const id = req.params.id;
            await pets.findOneAndReplace({ _id: id }, req.body);
            res.status(200).send({message: 'Pet atualizado com sucesso.'});
        }
        catch(err){

            res.status(500).send({message: `${err.message} - Falha ao atualizar pet.`});
        }

    }

    static deletePet = async (req,res) => {

        try{

            const id = req.params.id;
            const pet = await pets.findById(id);
            await pets.findByIdAndDelete(id)
            await users.findByIdAndUpdate(pet.tutor, { $pull: [{ pets: pet  }] });
            res.status(200).send({message: 'Pet removido com sucesso.'});
        }
        catch(err){

            res.status(500).send({message: `${err.message} - Falha ao remover pet.`});
        }
    }

}

export default PetController;