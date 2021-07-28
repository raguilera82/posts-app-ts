import { User } from './../../domain/model/entities/user.entity';
import express from 'express';
import { Role } from '../../domain/model/vos/role.vo';

export const hasRole = (role: Role) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const user = req.user as User;
        const roleUser = user.role.value;

        if (roleUser === role) {
            next();
            return;
        }
        return res.status(403).json('Not allowed');
    };
}; 