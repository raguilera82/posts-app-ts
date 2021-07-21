import { Service } from 'typedi';
import { IdVO } from '../../domain/model/vos/id.vo';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { IdRequest } from './id.request';

@Service()
export class DeleteOffensiveWordUseCase {

    constructor(private offensiveWordService: OffensiveWordService) {}

    execute(idRequest: IdRequest): void {

        this.offensiveWordService.delete(IdVO.createWithUUID(idRequest));

    }

}