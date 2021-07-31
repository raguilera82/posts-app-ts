import { CreateAuthorUseCase } from './../../application/usecases/authors/create-author.usecase';
import { Container } from 'typedi';
import { body, validationResult } from 'express-validator';
import express from 'express';

const router = express.Router();

router.post('/api/authors',
    body('name').notEmpty(),
    body('nickname').notEmpty(),
    async (req: express.Request, res: express.Response) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {name, nickname} = req.body;

            const useCase = Container.get(CreateAuthorUseCase);
            await useCase.execute({name, nickname});

            return res.status(201).json({status: 'Created'});


        }catch(err) {
            return res.status(err.code).json({error: err.message});
        }

    });

export { router as authorsRouter };