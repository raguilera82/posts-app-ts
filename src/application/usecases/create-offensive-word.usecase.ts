import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { v4 } from 'uuid';
import { WordVO } from '../../domain/model/vos/word.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';

export class CreateOffensiveWordUseCase {

    constructor(private offensiveWordService: OffensiveWordService) {}

    execute(): void {
        const offensiveWordData: OffensiveWordType = {
            id: IdVO.create(v4()),
            word: WordVO.create('Caca'),
            level: LevelVO.create(1)
        };
        this.offensiveWordService.persist(offensiveWordData);
    }

}