import express from 'express';
import usersRouter from './usersRoutes.js';
import petsRouter from './petsRoutes.js';

const routes = (app) => {

    app.route('/').get( (req,res) => {
        
        res.status(200).send({titulo: "Adopet - root"});
    })

    app.use(

        express.json(),
        usersRouter,
        petsRouter
    )
}

export default routes;