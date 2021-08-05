import { checkOffensiveWords } from './check-offensive-word';
import { IdVO } from '../model/vos/id.vo';
import { LevelVO } from '../model/vos/level.vo';
import { WordVO } from '../model/vos/word.vo';
import { OffensiveWord, OffensiveWordType } from './../model/entities/offensive-word.entity';

describe('Check Offensive Word', () => {

    it ('should find one offensive word', () => {

        const content = 'Esto es una caca';
        const offensiveWord: OffensiveWordType = {
            id: IdVO.create(),
            level: LevelVO.create(3),
            word: WordVO.create('caca')
        };

        const offensiveWords: OffensiveWord[] = checkOffensiveWords(content, [new OffensiveWord(offensiveWord)]);
        expect(offensiveWords.length).toBe(1);

    });

    it ('should find one offensive word with level', () => {

        const content = 'Esto es una caca';
        const offensiveWord: OffensiveWordType = {
            id: IdVO.create(),
            level: LevelVO.create(3),
            word: WordVO.create('caca')
        };

        const offensiveWords: OffensiveWord[] = checkOffensiveWords(content, [new OffensiveWord(offensiveWord)], 3);
        expect(offensiveWords.length).toBe(1);

    });

    it ('should not find one offensive word with level', () => {

        const content = 'Esto es una caca';
        const offensiveWord: OffensiveWordType = {
            id: IdVO.create(),
            level: LevelVO.create(3),
            word: WordVO.create('caca')
        };

        const offensiveWords: OffensiveWord[] = checkOffensiveWords(content, [new OffensiveWord(offensiveWord)], 1);
        expect(offensiveWords.length).toBe(0);

    });

    it ('should not find offensive word because there are not offensive words', () => {

        const content = 'Esto es una caca';

        const offensiveWords: OffensiveWord[] = checkOffensiveWords(content, [], 1);
        expect(offensiveWords.length).toBe(0);

    });

});