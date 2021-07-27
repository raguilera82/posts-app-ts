import express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import Container from 'typedi';
import { SignInRequest, SignInUseCase } from '../../application/usecases/sign-in.usecase';
import { SignUpRequest, SignUpUseCase } from '../../application/usecases/sign-up.usecase';

const router = express.Router();

router.post('/api/login',
    body('email').notEmpty(),
    body('password').notEmpty(), 
    async (req: express.Request, res: express.Response) => {
        try {

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
            return res.status(err.code).json({error: err.message});
        }
        
    });

router.post('/api/sign-up',
    body('email').notEmpty(),
    body('password').notEmpty(), 
    async (req: express.Request, res: express.Response) => {
        try {

            const useCase: SignUpUseCase = Container.get(SignUpUseCase);
            const {email, password} = req.body;
            const request: SignUpRequest = {
                email,
                password
            };
            await useCase.execute(request);
            res.status(201).send({status: 'Created'});

        }catch(err) {
            console.log(err);
            return res.status(err.code).json({error: err.message});
        }
        
    });
export { router as authRouter };