import { Service } from 'typedi';
import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';

@Service()
export class CreateOffensiveWordUseCase {

    constructor(private offensiveWordService: OffensiveWordService) {}

    execute(offensiveWordData: OffensiveWordType): void {
        this.offensiveWordService.persist(offensiveWordData);
    }

}