import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';

export class CreateOffensiveWordUseCase {

    private offensiveWordService: OffensiveWordService

    constructor() {
        this.offensiveWordService = new OffensiveWordService();
    }

    execute(offensiveWordData: OffensiveWordType): void {
        this.offensiveWordService.persist(offensiveWordData);
    }

}