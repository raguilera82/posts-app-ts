import { OffensiveWord } from '../model/entities/offensive-word.entity';
import { IdVO } from '../model/vos/id.vo';

export interface OffensiveWordRepository {

    save(offensiveWord: OffensiveWord): void;

    getAll(): Promise<OffensiveWord[]>;

    getById(id: IdVO): Promise<OffensiveWord>;

    delete(id: IdVO): Promise<void>;

    update(offensiveWord: OffensiveWord): Promise<void>;

}