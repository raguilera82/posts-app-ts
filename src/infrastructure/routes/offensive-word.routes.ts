import { hasRole } from './../middlewares/roles';
import express from 'express';
import { CreateOffensiveWordUseCase } from '../../application/usecases/create-offensive-word.usecase';
import Container from 'typedi';
import { GetAllOffensiveWordsUseCase } from '../../application/usecases/get-all-offensive-word.usecase';
import { OffensiveWordRequest } from '../../application/usecases/offensive-word.request';
import { OffensiveWordResponse } from '../../application/usecases/offensive-word.response';
import { DeleteOffensiveWordUseCase } from '../../application/usecases/delete-offensive-word.usecase';
import { IdRequest } from '../../application/usecases/id.request';
import { UpdateOffensiveWordUseCase } from '../../application/usecases/update-offensive-word.usecase';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import { Role } from '../../domain/model/vos/role.vo';

const router = express.Router();

/**
 * @openapi
 * /offensive-word:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/api/offensive-word', 
    passport.authenticate('jwt', {session: false}), hasRole([Role.ADMIN, Role.USER  ]),
    async (req: express.Request, res: express.Response) => {
        const useCase = Container.get(GetAllOffensiveWordsUseCase);
        const offensiveWords: OffensiveWordResponse[] = await useCase.execute();
        return res.status(200).json(offensiveWords);
    });

router.post('/api/offensive-word', 
    body('word').notEmpty().escape(), 
    body('level').notEmpty().isNumeric(), 
    passport.authenticate('jwt', {session: false}), hasRole([Role.ADMIN]),
    async (req: express.Request, res: express.Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { word, level } = req.body;
        const offensiveWordRequest: OffensiveWordRequest = {
            word,
            level
        };
        const useCase = Container.get(CreateOffensiveWordUseCase);
        const offensiveWordResponse = await useCase.execute(offensiveWordRequest);
        return res.status(201).send(offensiveWordResponse);
    });

router.delete('/api/offensive-word/:id', async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const idDelete: IdRequest = req.params?.id;
        const useCase = Container.get(DeleteOffensiveWordUseCase);
        await useCase.execute(idDelete);
        return res.send('Deleted!');

    }catch(err) {
        return res.status(err.code).json({error: err.message});
    }
});

router.put('/api/offensive-word/:id', async (req, res) => {
    try {

        const idUpdate: IdRequest = req.params.id;
        const { word, level } = req.body;
        const offensiveWordRequest: OffensiveWordRequest = {word, level};
        const useCase = Container.get(UpdateOffensiveWordUseCase);
        await useCase.execute(idUpdate, offensiveWordRequest);
        return res.send('Updated!');

    }catch(err) {
        return res.status(err.code).json({error: err.message});
    }
    
});

export { router as offensiveWordRouter };