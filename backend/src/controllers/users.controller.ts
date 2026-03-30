import { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import UserService from '../services/users.service';

class UsersController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const user = { username, classe, level, password };

    await this.userService.create(user);

    const secret = 'mysecret';

    const token = Jwt.sign({ data: user }, secret);

    res.status(201).json({ token });
  };
}

export default UsersController;