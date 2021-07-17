import { OffensiveWord, OffensiveWordType } from './domain/model/entities/offensive-word.entity';
import { IdVO } from './domain/model/vos/id.vo';
import { connectToDB } from './infrastructure/config/mongo';
import {v4} from 'uuid';
import { WordVO } from './domain/model/vos/word.vo';
import { LevelVO } from './domain/model/vos/level.vo';
import { OffensiveWordRepositoryMongo } from './infrastructure/repositories/offensive-word.repository.mongo';

connectToDB();

const offensiveWordData: OffensiveWordType = {
    id: IdVO.create(v4()),
    word: WordVO.create('Caca'),
    level: LevelVO.create(3)
};

const offensiveWord: OffensiveWord = new OffensiveWord(offensiveWordData);

const repository: OffensiveWordRepositoryMongo = new OffensiveWordRepositoryMongo();
repository.save(offensiveWord);


console.log('App started');