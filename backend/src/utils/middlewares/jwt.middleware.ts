import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ERROR_MSG } from '../constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decode = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });

        req['user'] = decode;
      } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: ERROR_MSG.INVALID_TOKEN,
        });
      }
    }
    next();
  }
}
