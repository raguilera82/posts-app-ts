import {OffensiveWordType, OffensiveWord} from './offensive-word.entity';
import { IdVO } from '../vos/id.vo';
import { WordVO } from '../vos/word.vo';
import { LevelVO } from '../vos/level.vo';

describe('Offensive Word', () => {

    it('should create', () => {
        const offensiveWordData: OffensiveWordType = {
            id: IdVO.create(),
            word: WordVO.create('Caca'),
            level: LevelVO.create(1)
        };

        const offensiveWord = new OffensiveWord(offensiveWordData);

        expect(offensiveWord.id).toEqual(offensiveWordData.id.value);
        expect(offensiveWord.word).toEqual(offensiveWordData.word.value);
        expect(offensiveWord.level).toEqual(offensiveWordData.level.value);
    });

});