import { Service } from 'typedi';
import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { OffensiveWordRequest } from './offensive-word.request';
import { OffensiveWordResponse } from './offensive-word.response';

@Service()
export class CreateOffensiveWordUseCase {

    constructor(private offensiveWordService: OffensiveWordService) {}

    async execute(offensiveWordRequest: OffensiveWordRequest): Promise<OffensiveWordResponse> {
        const offensiveWordData: OffensiveWordType = {
            id: IdVO.create(),
            word: WordVO.create(offensiveWordRequest.word),
            level: LevelVO.create(offensiveWordRequest.level)
        };
        
        await this.offensiveWordService.persist(offensiveWordData);

        return Promise.resolve({
            id: offensiveWordData.id.value,
            word: offensiveWordData.word.value,
            level: offensiveWordData.level.value
        });
    }

}