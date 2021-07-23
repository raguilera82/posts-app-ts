import { AnyObject } from 'mongoose';
import { OffensiveWord, OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { OffensiveWordModel } from './offensive-word.schema';
export class OffensiveWordRepositoryMongo implements OffensiveWordRepository {
    
    async update(offensiveWord: OffensiveWord): Promise<void> {
        await OffensiveWordModel.findOneAndUpdate({id: offensiveWord.id.value}, 
            {word: offensiveWord.word.value, level: offensiveWord.level.value});
    }
    
    async getAll(): Promise<OffensiveWord[]> {
        const allOffensiveWords = await OffensiveWordModel.find({}).exec();
        return allOffensiveWords.map((ofModel: AnyObject) => {
            const offensiveWordData: OffensiveWordType = {
                id: IdVO.createWithUUID(ofModel.id),
                level: LevelVO.create(ofModel.level),
                word: WordVO.create(ofModel.word)
            };
            return new OffensiveWord(offensiveWordData);
        });
    }

    async getById(id: IdVO): Promise<OffensiveWord> {
        const offensiveWordDB = await OffensiveWordModel.findOne({id: id.value}).exec();

        const offensiveWordData: OffensiveWordType = {
            id: IdVO.createWithUUID(offensiveWordDB.id),
            word: WordVO.create(offensiveWordDB.word),
            level: LevelVO.create(offensiveWordDB.level)
        };

        return new OffensiveWord(offensiveWordData);
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