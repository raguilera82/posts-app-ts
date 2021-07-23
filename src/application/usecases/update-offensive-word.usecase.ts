import { Service } from 'typedi';
import { OffensiveWord, OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { IdRequest } from './id.request';
import { OffensiveWordRequest } from './offensive-word.request';

@Service()
export class UpdateOffensiveWordUseCase {

    constructor(private offensiveWordService: OffensiveWordService) {}

    async execute(id: IdRequest, offensiveWordRequest: OffensiveWordRequest): Promise<void> {
        const offensiveWordData: OffensiveWordType = {
            id: IdVO.createWithUUID(id),
            word: WordVO.create(offensiveWordRequest.word),
            level: LevelVO.create(offensiveWordRequest.level)
        };
        const offensiveWord = new OffensiveWord(offensiveWordData);
        await this.offensiveWordService.update(offensiveWord);

    }

}