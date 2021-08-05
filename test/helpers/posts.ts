import { CreatePostResponse, CreatePostUseCase } from './../../src/application/usecases/posts/create-post.usecase';
import { Container } from 'typedi';

export const createPost = async (): Promise<string> => {

    const useCase = Container.get(CreatePostUseCase);
    const createPostRequest = {
        authorNickname: 'Cervantes',
        content: 'En un lugar de la Mancha de cuyo nombre no quiero acordarme...',
        title: 'El Quijote'
    };
    const response: CreatePostResponse = await useCase.execute(createPostRequest);
    return response.id;

};