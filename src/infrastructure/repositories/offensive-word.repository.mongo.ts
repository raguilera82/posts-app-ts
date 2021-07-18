import { Service } from 'typedi';
import { OffensiveWord } from '../../domain/model/entities/offensive-word.entity';
import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { OffensiveWordModel } from './offensive-word.schema';

@Service()
export class OffensiveWordRepositoryMongo implements OffensiveWordRepository {
    
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