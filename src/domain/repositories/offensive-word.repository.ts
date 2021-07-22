import { OffensiveWord, OffensiveWordType } from '../model/entities/offensive-word.entity';
import { IdVO } from '../model/vos/id.vo';

export interface OffensiveWordRepository {

    save(offensiveWord: OffensiveWord): void;

    getAll(): Promise<OffensiveWordType[]>;

    getById(id: IdVO): Promise<OffensiveWordType>;

    delete(id: IdVO): void;

    update(offensiveWord: OffensiveWord): Promise<void>;

}