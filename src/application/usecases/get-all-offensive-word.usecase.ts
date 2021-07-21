import { Service } from 'typedi';
import { OffensiveWord } from '../../domain/model/entities/offensive-word.entity';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { OffensiveWordResponse } from './offensive-word.response';

@Service()
export class GetAllOffensiveWordsUseCase {

    constructor(private offensiveWordService: OffensiveWordService) {}

    async execute(): Promise<OffensiveWordResponse[]> {
        const offensiveWords: OffensiveWord[] = await this.offensiveWordService.getAll();
        const offensiveWordResponse: OffensiveWordResponse[] = offensiveWords.map(of => {
            return {word: of.word.value, level: of.level.value};
        });
        return offensiveWordResponse;
    }

}