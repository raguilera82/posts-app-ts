import {WordVO} from './word.vo';
describe('Word VO', () => {

    it('should create', () => {
        const newWorld = 'World';
        const word: WordVO = WordVO.create(newWorld);
        expect(word.value).toEqual(newWorld);
    });

});