jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo', () => {
    return {
        OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
            return {
                getAll: jest.fn().mockImplementation(() => [
                    {id: '6c7f7ca1-518b-4c2d-af99-6f3d07817875', word: 'Test', level: 3}
                ])
            };
        })
    };
});

import 'reflect-metadata';
import {GetAllOffensiveWordsUseCase} from './get-all-offensive-word.usecase';
import Container from 'typedi';
import {OffensiveWordRepositoryMongo} from './../../infrastructure/repositories/offensive-word.repository.mongo';

describe('Get All offensive word Use Case', () => {

    it('should get all offensive word from repository', async () => {
        const repository = new OffensiveWordRepositoryMongo();
        Container.set('OffensiveWordRepository', repository);
        const useCase: GetAllOffensiveWordsUseCase = Container.get(GetAllOffensiveWordsUseCase);
        const offensiveWords = await useCase.execute();
        expect(repository.getAll).toHaveBeenCalled();
        expect(offensiveWords[0].level).toBe(3);
        expect(offensiveWords[0].word).toEqual('Test');
    });

});