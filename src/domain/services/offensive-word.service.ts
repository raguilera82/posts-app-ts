import { Inject, Service } from 'typedi';
import { OffensiveWord, OffensiveWordType } from '../model/entities/offensive-word.entity';
import { IdVO } from '../model/vos/id.vo';
import { LevelVO } from '../model/vos/level.vo';
import { WordVO } from '../model/vos/word.vo';
import { OffensiveWordRepository } from '../repositories/offensive-word.repository';

@Service()
export class OffensiveWordService {

    constructor(@Inject('OffensiveWordRepository') private offensiveWordRepository: OffensiveWordRepository) {}

    persist(offensiveWord: OffensiveWordType): void {
        const offensiveWordEntity = new OffensiveWord(offensiveWord);
        this.offensiveWordRepository.save(offensiveWordEntity);
    }

    async getAll(): Promise<OffensiveWord[]> {
        const of = await this.offensiveWordRepository.getAll();
        
        return of.map((ofModel: any) => {
            const offensiveWordData: OffensiveWordType = {
                id: IdVO.createWithUUID(ofModel.id),
                level: LevelVO.create(ofModel.level),
                word: WordVO.create(ofModel.word)
            };
            return new OffensiveWord(offensiveWordData);
        });
    }

    delete(id: IdVO): void {
        this.offensiveWordRepository.delete(id);
    }

    async update(offensiveWord: OffensiveWord): Promise<void> {
        const offensiveWordOriginal = await this.offensiveWordRepository.getById(offensiveWord.id);
        
        const offensiveWordMerge: OffensiveWordType = {
            id: offensiveWord.id,
            word: WordVO.create(offensiveWord.word.value ?? offensiveWordOriginal.word.value),
            level: LevelVO.create(offensiveWord.level.value ?? offensiveWordOriginal.level.value)
        };
        await this.offensiveWordRepository.update(new OffensiveWord(offensiveWordMerge));
    }
}