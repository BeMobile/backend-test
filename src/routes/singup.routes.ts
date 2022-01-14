import  { Router } from "express";
import { Singup } from "../model/Singup";

const routes = Router();

const users: Singup[] = [];

routes.post('/singup', (req, res) => {
  const { email, password } = req.body;

  const create = new Singup();

  Object.assign(create, { 
    email, 
    password,
    created_at: new Date()
  });
  users.push(create)

  return res.status(201).json({create});
});
export { routes }