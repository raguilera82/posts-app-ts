import { OffensiveWord } from '../../domain/model/entities/offensive-word.entity';
import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';

export class OffensiveWordRepositoryMemory implements OffensiveWordRepository {
    
    save(offensiveWord: OffensiveWord): void {
        console.log('Salvo ', offensiveWord);
    }

}