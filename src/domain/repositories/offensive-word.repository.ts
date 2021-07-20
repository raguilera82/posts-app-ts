import { OffensiveWord } from '../model/entities/offensive-word.entity';

export interface OffensiveWordRepository {

    save(offensiveWord: OffensiveWord): void;

    getAll(): Promise<OffensiveWord[]>;

}