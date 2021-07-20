import { Inject, Service } from 'typedi';
import { OffensiveWord, OffensiveWordType } from '../model/entities/offensive-word.entity';
import { OffensiveWordRepository } from '../repositories/offensive-word.repository';

@Service()
export class OffensiveWordService {

    constructor(@Inject('OffensiveWordRepository') private offensiveWordRepository: OffensiveWordRepository) {}

    persist(offensiveWord: OffensiveWordType): void {
        const offensiveWordEntity = new OffensiveWord(offensiveWord);
        this.offensiveWordRepository.save(offensiveWordEntity);
    }

    async getAll(): Promise<OffensiveWord[]> {
        const offensiveWords = await this.offensiveWordRepository.getAll();
        return offensiveWords;
    }
}