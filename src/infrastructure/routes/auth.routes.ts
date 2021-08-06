import { logger } from './../config/logger';
import { SignUpAuthorUseCase, SignUpAuthorRequest } from './../../application/usecases/auth/sign-up-author.usecase';
import express from 'express';
import { body, validationResult } from 'express-validator';
import Container from 'typedi';
import { SignInRequest, SignInUseCase } from '../../application/usecases/auth/sign-in.usecase';
import { SignUpRequest, SignUpUseCase } from '../../application/usecases/auth/sign-up.usecase';
import passport from 'passport';
import { Role } from '../../domain/model/vos/role.vo';
import { hasRole } from '../middlewares/roles';

const router = express.Router();

router.post('/api/login',
    body('email').notEmpty(),
    body('password').notEmpty(), 
    async (req: express.Request, res: express.Response) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const useCase: SignInUseCase = Container.get(SignInUseCase);
            const {email, password} = req.body;
            const request: SignInRequest = {
                email,
                password
            };
            const token = await useCase.execute(request);
            if (token) {
                res.status(200).send({token});
            }else {
                res.status(401).send({error: 'Not permitted'});
            }
            

        }catch(err) {
            logger.error(err);
            return res.status(err.code).json({error: err.message});
        }
        
    });

router.post('/api/sign-up',
    body('email').notEmpty(),
    body('password').notEmpty(), 
    async (req: express.Request, res: express.Response) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const useCase: SignUpUseCase = Container.get(SignUpUseCase);
            const {email, password} = req.body;
            const request: SignUpRequest = {
                email,
                password
            };
            await useCase.execute(request);
            res.status(201).send({status: 'Created'});

        }catch(err) {
            return res.status(err.code).json({error: err.message});
        }
        
    });

router.post('/api/sign-up-author', 
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('nameAuthor').notEmpty(),
    body('nicknameAuthor').notEmpty(),
    passport.authenticate('jwt', {session: false}), hasRole([Role.ADMIN]),
    async(req: express.Request, res: express.Response) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const signUpAuthorUseCase = Container.get(SignUpAuthorUseCase);
            const request: SignUpAuthorRequest = {
                email: req.body.email,
                password: req.body.password,
                nameAuthor: req.body.nameAuthor,
                nicknameAuthor: req.body.nicknameAuthor
            };
            await signUpAuthorUseCase.execute(request);
            res.status(201).json({status: 'Created'});

        }catch(err) {
            logger.error(err);
            return res.status(err.code).json({error: err.message});
        }

    });
export { router as authRouter };