import express from 'express';
import UserController from '../controllers/usersController.js';

const router = express.Router();

router
    .get("/Users", UserController.listUsers)
    .get("/Users/:id", UserController.getUser)
    .post("/Users", UserController.addUser)
    .patch("/Users/:id", UserController.updateUser)
    .put("/Users/:id", UserController.replaceUser)
    .delete("/Users/:id", UserController.deleteUser)

export default router;