import { OffensiveWord, OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { OffensiveWordModel } from './offensive-word.schema';
export class OffensiveWordRepositoryMongo implements OffensiveWordRepository {
    
    async update(offensiveWord: OffensiveWord): Promise<void> {
        await OffensiveWordModel.findOneAndUpdate({id: offensiveWord.id.value}, 
            {word: offensiveWord.word.value, level: offensiveWord.level.value});
    }
    
    async getAll(): Promise<OffensiveWordType[]> {
        return OffensiveWordModel.find({});
    }

    async getById(id: IdVO): Promise<OffensiveWordType> {
        return OffensiveWordModel.findOne({id: id.value});
    }
    
    save(offensiveWord: OffensiveWord): void {
        const newOffensiveWord = {
            id: offensiveWord.id.value,
            word: offensiveWord.word.value,
            level: offensiveWord.level.value
        };
        const offensiveWordModel = new OffensiveWordModel(newOffensiveWord);
        offensiveWordModel.save();
    }

    async delete(id: IdVO): Promise<void> {
        await OffensiveWordModel.findOneAndRemove({id: id.value});
    }

    

}