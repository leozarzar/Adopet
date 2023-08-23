import express from 'express';
import PetController from '../controllers/petsController.js';

const router = express.Router();

router
    .get("/Pets", PetController.listPets)
    .get("/Pets/:id", PetController.getPet)
    .post("/Pets", PetController.addPet)
    .patch("/Pets/:id", PetController.updatePet)
    .put("/Pets/:id", PetController.replacePet)
    .delete("/Pets/:id", PetController.deletePet)

export default router;