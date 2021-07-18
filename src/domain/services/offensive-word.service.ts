import { Inject, Service } from 'typedi';
import { OffensiveWord, OffensiveWordType } from '../model/entities/offensive-word.entity';
import { OffensiveWordRepository } from '../repositories/offensive-word.repository';

@Service()
export class OffensiveWordService {

    offensiveWordRepository: OffensiveWordRepository;

    constructor(@Inject('OffensiveWordRepository') offensiveWordRepository: OffensiveWordRepository) {
        this.offensiveWordRepository = offensiveWordRepository;
    }

    persist(offensiveWord: OffensiveWordType): void {
        const offensiveWordEntity = new OffensiveWord(offensiveWord);
        this.offensiveWordRepository.save(offensiveWordEntity);
    }
}