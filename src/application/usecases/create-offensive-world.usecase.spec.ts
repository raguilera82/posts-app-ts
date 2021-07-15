import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import {CreateOffensiveWordUseCase} from './create-offensive-word.usecase';
import { OffensiveWordRepositoryMemory } from './../../infrastructure/repositories/offensive-word.repository.memory';

describe('Create offensive word Use Case', () => {

    it('should create offensive word and persist', () => {

        const useCase: CreateOffensiveWordUseCase = new CreateOffensiveWordUseCase(new OffensiveWordService(new OffensiveWordRepositoryMemory()));
        useCase.execute();

    });

});