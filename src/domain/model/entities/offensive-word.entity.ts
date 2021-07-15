import { IdVO } from '../vos/id.vo';
import { LevelVO } from '../vos/level.vo';
import { WordVO } from '../vos/word.vo';

export type OffensiveWordType = {
    id: IdVO;
    word: WordVO;
    level: LevelVO;
}


export class OffensiveWord {

    constructor(private offensiveWord: OffensiveWordType) {}

    get id(): string {
        return this.offensiveWord.id.value;
    }

    get word(): string {
        return this.offensiveWord.word.value;
    }

    get level(): number {
        return this.offensiveWord.level.value;
    }

}