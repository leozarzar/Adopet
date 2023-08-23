import users from "../models/User.js";
import pets from "../models/Pet.js";

class UserController{

    static listUsers = async (req,res) => {

        try {

            //const result = await users.find().populate('autor','nome').exec();
            
            const result = await users.find().populate('pets', 'nome').exec();
            if(result.length === 0) res.status(500).send({message: 'Não foi encontrado nenhum usuário.'});
            else res.status(200).json(result)

        }
        catch (err) {

            res.status(500).send({message: `${err.message} - Não foi possível listar usuários.`});
        }
    }

    static addUser = async (req,res) => {

        try {

            let user = new users(req.body);
            const result = await user.save();
            res.status(201).send(result.toJSON());

        } catch (err) {

            res.status(500).send({message: `${err.message} - Falha ao cadastrar usuário.`});
        }
    }

    static getUser = async (req,res) => {

        try {

            const id = req.params.id;
            //const result = await users.findById(id);
            const result = await users.findById(id).populate('pets','nome').exec();
            

            res.status(200).json(result)
        } 
        catch (err) {

            res.status(400).send({message: `${err.message} - Usuário não encontrado.`});
        }
    }

    static updateUser = async (req,res) => {

        try{

            const id = req.params.id;
            await users.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: 'Usuário atualizado com sucesso.'});
        }
        catch(err){

            res.status(500).send({message: `${err.message} - Falha ao atualizar usuário.`});
        }

    }

    static replaceUser = async (req,res) => {

        try{

            const id = req.params.id;
            await users.findOneAndReplace({ _id: id }, req.body);
            res.status(200).send({message: 'Usuário atualizado com sucesso.'});
        }
        catch(err){

            res.status(500).send({message: `${err.message} - Falha ao atualizar usuário.`});
        }

    }


    static deleteUser = async (req,res) => {

        try{

            const id = req.params.id;
            await users.findByIdAndDelete(id);
            await pets.deleteMany({ tutor: id });
            res.status(200).send({message: 'Usuário removido com sucesso.'});
        }
        catch(err){

            res.status(500).send({message: `${err.message} - Falha ao remover usuário.`});
        }
    }

}

export default UserController;