import { Service } from 'typedi';
import { OffensiveWord, OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { OffensiveWordModel } from './offensive-word.schema';

@Service()
export class OffensiveWordRepositoryMongo implements OffensiveWordRepository {
    
    async getAll(): Promise<OffensiveWord[]> {
        const offensiveWordsMongo = await OffensiveWordModel.find({});
        
        return offensiveWordsMongo.map((ofModel: any) => {
            const offensiveWordData: OffensiveWordType = {
                id: IdVO.createWithUUID(ofModel.id),
                level: LevelVO.create(ofModel.level),
                word: WordVO.create(ofModel.word)
            };
            return new OffensiveWord(offensiveWordData);
        });
    }
    
    save(offensiveWord: OffensiveWord): void {
        const newOffensiveWord = {
            id: offensiveWord.id,
            word: offensiveWord.word,
            level: offensiveWord.level
        };
        const offensiveWordModel = new OffensiveWordModel(newOffensiveWord);
        offensiveWordModel.save();
    }

}