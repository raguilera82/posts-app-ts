jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo');

import 'reflect-metadata';
import {CreateOffensiveWordUseCase} from './create-offensive-word.usecase';
import { IdVO } from '../../domain/model/vos/id.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { v4 } from 'uuid';
import { OffensiveWordType } from '../../domain/model/entities/offensive-word.entity';
import Container from 'typedi';
import {OffensiveWordRepositoryMongo} from './../../infrastructure/repositories/offensive-word.repository.mongo';

describe('Create offensive word Use Case', () => {

    it('should create offensive word and persist', () => {
        const repository = new OffensiveWordRepositoryMongo();
        Container.set('OffensiveWordRepository', repository);
        const useCase: CreateOffensiveWordUseCase = Container.get(CreateOffensiveWordUseCase);
        const offensiveWordData: OffensiveWordType = {
            id: IdVO.create(v4()),
            word: WordVO.create('Caca'),
            level: LevelVO.create(1)
        };
        useCase.execute(offensiveWordData);
        expect(repository.save).toHaveBeenCalled();

    });

});