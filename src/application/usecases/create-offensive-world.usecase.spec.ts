import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import {CreateOffensiveWordUseCase} from './create-offensive-word.usecase';
import { OffensiveWordRepositoryMemory } from './../../infrastructure/repositories/offensive-word.repository.memory';
import { mock, instance, when, verify } from 'ts-mockito';
import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';

describe('Create offensive word Use Case', () => {

    it('should create offensive word and persist', () => {

        const mockRepository = mock<OffensiveWordRepository>();
        const spyRepository = jest.spyOn(mockRepository, 'save');
        const useCase: CreateOffensiveWordUseCase = new CreateOffensiveWordUseCase(new OffensiveWordService(mockRepository));
        useCase.execute();
        expect(spyRepository).toBeCalled();

    });

});