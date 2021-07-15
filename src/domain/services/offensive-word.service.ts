import { OffensiveWord, OffensiveWordType } from '../model/entities/offensive-word.entity';
import { OffensiveWordRepository } from '../repositories/offensive-word.repository';

export class OffensiveWordService {

    constructor(private offensiveWordRepository: OffensiveWordRepository) {}

    persist(offensiveWord: OffensiveWordType): void {
        const offensiveWordEntity = new OffensiveWord(offensiveWord);
        this.offensiveWordRepository.save(offensiveWordEntity);
    }
}