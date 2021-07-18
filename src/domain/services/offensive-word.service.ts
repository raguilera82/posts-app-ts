import { OffensiveWordRepositoryMongo } from '../../infrastructure/repositories/offensive-word.repository.mongo';
import { OffensiveWord, OffensiveWordType } from '../model/entities/offensive-word.entity';
import { OffensiveWordRepository } from '../repositories/offensive-word.repository';

export class OffensiveWordService {

    private offensiveWordRepository: OffensiveWordRepository;

    constructor() {
        this.offensiveWordRepository = new OffensiveWordRepositoryMongo();
    }

    persist(offensiveWord: OffensiveWordType): void {
        const offensiveWordEntity = new OffensiveWord(offensiveWord);
        this.offensiveWordRepository.save(offensiveWordEntity);
    }
}