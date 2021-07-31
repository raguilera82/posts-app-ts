import { User } from './../../domain/model/entities/user.entity';
import express from 'express';
import { Role } from '../../domain/model/vos/role.vo';

export const hasRole = (roles: Role[]) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> => {
        const user = req.user as User;
        const roleUser = user.role.value;

        const allow: boolean = roles.some(role => roleUser === role);

        if (allow) {
            next();
            return;
        }
        return res.status(403).json('Not allowed');
    };
}; 