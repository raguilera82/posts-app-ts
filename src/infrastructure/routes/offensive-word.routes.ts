import express from 'express';
import { CreateOffensiveWordUseCase } from '../../application/usecases/create-offensive-word.usecase';
import { IdVO } from '../../domain/model/vos/id.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { v4 } from 'uuid';
import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import Container from 'typedi';

const router = express.Router();

router.get('/api/offensive-word', (req, res) => {
    const useCase = Container.get(CreateOffensiveWordUseCase);
    const offensiveWordData: OffensiveWordType = {
        id: IdVO.create(v4()),
        word: WordVO.create('Caca web'),
        level: LevelVO.create(1)
    };
    useCase.execute(offensiveWordData);
    return res.send('Created!');
});

export { router as offensiveWordRouter };