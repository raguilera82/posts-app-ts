import { OffensiveWordType } from './../../src/domain/model/entities/offensive-word.entity';
import { OffensiveWordService } from './../../src/domain/services/offensive-word.service';
import { Container } from 'typedi';
import { IdVO } from '../../src/domain/model/vos/id.vo';
import { LevelVO } from '../../src/domain/model/vos/level.vo';
import { WordVO } from '../../src/domain/model/vos/word.vo';

export const addOffensiveWords = async () => {

    const offensiveWordService = Container.get(OffensiveWordService);
    const offensiveWordData: OffensiveWordType = {
        id: IdVO.create(),
        level: LevelVO.create(3),
        word: WordVO.create('caca')
    };
    await offensiveWordService.persist(offensiveWordData);

};