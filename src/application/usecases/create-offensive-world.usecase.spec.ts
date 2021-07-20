jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo');

import 'reflect-metadata';
import {CreateOffensiveWordUseCase} from './create-offensive-word.usecase';
import Container from 'typedi';
import {OffensiveWordRepositoryMongo} from './../../infrastructure/repositories/offensive-word.repository.mongo';
import { OffensiveWordRequest } from './offensive-word.request';

describe('Create offensive word Use Case', () => {

    it('should create offensive word and persist', () => {
        const repository = new OffensiveWordRepositoryMongo();
        Container.set('OffensiveWordRepository', repository);
        const useCase: CreateOffensiveWordUseCase = Container.get(CreateOffensiveWordUseCase);
        const offensiveWordData: OffensiveWordRequest = {
            word: 'Caca',
            level: 1
        };
        useCase.execute(offensiveWordData);
        expect(repository.save).toHaveBeenCalled();

    });

});