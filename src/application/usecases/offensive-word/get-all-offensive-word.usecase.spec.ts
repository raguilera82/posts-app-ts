jest.mock('./../../../infrastructure/repositories/offensive-word.repository.mongo', () => {
    return {
        OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
            return {
                getAll: jest.fn().mockImplementation(() => [
                    new OffensiveWord({id: IdVO.create(), word: WordVO.create('Test'), level: LevelVO.create(3)})
                ])
            };
        })
    };
});

import 'reflect-metadata';
import {GetAllOffensiveWordsUseCase} from './get-all-offensive-word.usecase';
import Container from 'typedi';
import {OffensiveWordRepositoryMongo} from './../../../infrastructure/repositories/offensive-word.repository.mongo';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { LevelVO } from '../../../domain/model/vos/level.vo';
import {validate} from 'uuid';
import { OffensiveWord } from '../../../domain/model/entities/offensive-word.entity';
import { WordVO } from '../../../domain/model/vos/word.vo';

describe('Get All offensive word Use Case', () => {
    it('should get all offensive word from repository', async () => {

        const repository = new OffensiveWordRepositoryMongo();
        Container.set('OffensiveWordRepository', repository);
        const useCase: GetAllOffensiveWordsUseCase = Container.get(GetAllOffensiveWordsUseCase);
        const offensiveWords = await useCase.execute();
        expect(repository.getAll).toHaveBeenCalled();
        expect(offensiveWords[0].level).toBe(3);
        expect(offensiveWords[0].word).toEqual('Test');
        expect(validate(offensiveWords[0].id)).toBe(true);
    });

});