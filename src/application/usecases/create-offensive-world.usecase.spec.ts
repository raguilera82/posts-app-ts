import {CreateOffensiveWordUseCase} from './create-offensive-word.usecase';
import { mock } from 'ts-mockito';
import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { IdVO } from '../../domain/model/vos/id.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { v4 } from 'uuid';
import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';

describe('Create offensive word Use Case', () => {

    it.skip('should create offensive word and persist', () => {

        const mockRepository = mock<OffensiveWordRepository>();
        const spyRepository = jest.spyOn(mockRepository, 'save');
        const useCase: CreateOffensiveWordUseCase = new CreateOffensiveWordUseCase();
        const offensiveWordData: OffensiveWordType = {
            id: IdVO.create(v4()),
            word: WordVO.create('Caca'),
            level: LevelVO.create(1)
        };
        useCase.execute(offensiveWordData);
        expect(spyRepository).toBeCalled();

    });

});