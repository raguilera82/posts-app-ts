import { SignUpUseCase } from './../../application/usecases/sign-up.usecase';
import { Container } from 'typedi';
import { CreateOffensiveWordUseCase } from '../../application/usecases/create-offensive-word.usecase';
import { GetAllOffensiveWordsUseCase } from '../../application/usecases/get-all-offensive-word.usecase';
import { OffensiveWordResponse } from '../../application/usecases/offensive-word.response';


const populate = async () => {
    const useCaseGetAll = Container.get(GetAllOffensiveWordsUseCase);
    const offensiveWords: OffensiveWordResponse[] = await useCaseGetAll.execute();

    if (offensiveWords.length === 0) {
        const useCase = Container.get(CreateOffensiveWordUseCase);
        useCase.execute({word: 'App', level: 3});
    }

    const signUpUseCase = Container.get(SignUpUseCase);
    await signUpUseCase.execute({email: 'hola@hola.com', password: 'password'});

};

export { populate as populateDatabases };