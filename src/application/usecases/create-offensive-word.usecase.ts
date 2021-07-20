import { Service } from 'typedi';
import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { OffensiveWordRequest } from './offensive-word.request';

@Service()
export class CreateOffensiveWordUseCase {

    constructor(private offensiveWordService: OffensiveWordService) {}

    execute(offensiveWordRequest: OffensiveWordRequest): void {
        const offensiveWordData: OffensiveWordType = {
            id: IdVO.create(),
            word: WordVO.create(offensiveWordRequest.word),
            level: LevelVO.create(offensiveWordRequest.level)
        };
        this.offensiveWordService.persist(offensiveWordData);
    }

}