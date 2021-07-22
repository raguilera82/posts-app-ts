jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo');

import 'reflect-metadata';
import {DeleteOffensiveWordUseCase} from './delete-offensive-word.usecase';
import Container from 'typedi';
import {OffensiveWordRepositoryMongo} from './../../infrastructure/repositories/offensive-word.repository.mongo';
import { IdVO } from '../../domain/model/vos/id.vo';

describe('Delete offensive word Use Case', () => {

    it('should delete offensive word', () => {
        const repository = new OffensiveWordRepositoryMongo();
        Container.set('OffensiveWordRepository', repository);
        const useCase: DeleteOffensiveWordUseCase = Container.get(DeleteOffensiveWordUseCase);
        useCase.execute(IdVO.create().value);
        expect(repository.delete).toHaveBeenCalled();

    });

});