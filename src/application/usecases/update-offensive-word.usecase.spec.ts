jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo');

import 'reflect-metadata';
import {UpdateOffensiveWordUseCase} from './update-offensive-word.usecase';
import Container from 'typedi';
import {OffensiveWordRepositoryMongo} from './../../infrastructure/repositories/offensive-word.repository.mongo';
import { IdVO } from '../../domain/model/vos/id.vo';

describe('Update offensive word Use Case', () => {

    it('should update offensive word complete', async () => {
        const repository = new OffensiveWordRepositoryMongo();
        Container.set('OffensiveWordRepository', repository);
        const useCase: UpdateOffensiveWordUseCase = Container.get(UpdateOffensiveWordUseCase);
        await useCase.execute(IdVO.create().value, {word: 'Mod', level: 3});
        expect(repository.update).toHaveBeenCalled();

    });

});