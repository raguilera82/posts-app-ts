import { WordVO } from './../model/vos/word.vo';
import { OffensiveWord } from '../model/entities/offensive-word.entity';
import { IdVO } from '../model/vos/id.vo';

export interface OffensiveWordRepository {

    save(offensiveWord: OffensiveWord): Promise<void>;

    getAll(): Promise<OffensiveWord[]>;

    getById(id: IdVO): Promise<OffensiveWord | null>;

    getByWord(word: WordVO): Promise<OffensiveWord | null>;

    delete(id: IdVO): Promise<void>;

    update(offensiveWord: OffensiveWord): Promise<void>;

    deleteAll(): Promise<void>;

}