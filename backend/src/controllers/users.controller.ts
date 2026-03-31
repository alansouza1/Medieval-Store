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

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: '"username" and "password" are required' });
    }

    const user = await this.userService.login({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    const secret = process.env.JWT_SECRET || 'mysecret';
    const token = Jwt.sign({ data: { id: user.id, username: user.username } }, secret);

    res.status(200).json({ token });
  };
}

export default UsersController;