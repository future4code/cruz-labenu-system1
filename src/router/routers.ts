import express from 'express';
import Controller from '../controllers/Controller'
const Router = express.Router();

Router.put('/student', Controller.student.create)

export default Router