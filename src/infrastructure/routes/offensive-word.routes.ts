import express from 'express';
import { CreateOffensiveWordUseCase } from '../../application/usecases/create-offensive-word.usecase';
import { IdVO } from '../../domain/model/vos/id.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { v4 } from 'uuid';
import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import Container from 'typedi';
import { GetAllOffensiveWordsUseCase } from '../../application/usecases/get-all-offensive-word.usecase';
import { OffensiveWordRequest } from '../../application/usecases/offensive-word.request';
import { OffensiveWordResponse } from '../../application/usecases/offensive-word.response';

const router = express.Router();

router.get('/api/offensive-word', async (req, res) => {
    const useCase = Container.get(GetAllOffensiveWordsUseCase);
    const offensiveWords: OffensiveWordResponse[] = await useCase.execute();
    return res.status(200).json(offensiveWords);
});

router.post('/api/offensive-word', (req, res) => {
    const { word, level } = req.body;
    const offensiveWordRequest: OffensiveWordRequest = {
        word,
        level
    };
    const useCase = Container.get(CreateOffensiveWordUseCase);
    useCase.execute(offensiveWordRequest);
    return res.status(201).send('Created!');
});

export { router as offensiveWordRouter };