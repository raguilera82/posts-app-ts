import { OffensiveWordType, OffensiveWord } from '../entities/offensive-word.entity';
import { ContentCommentVO } from './content-comment.vo';
import { ContentVO } from './content.vo';
import { IdVO } from './id.vo';
import { LevelVO } from './level.vo';
import { WordVO } from './word.vo';

describe('Content Comment VO' , () => {
    it('shoud error when comment is too long', () => {
        const contentComment = '7QCbSnN0rt37DxA57hNVxDxG6kJLRpiRo0DoVOP0ZYTiv5Pgc7KeFcRpVKVIkdD7gIr7bN5oFiLdy7n8UiaRmm5jsCIAQRzyU4nsQsGY769IF8HOIA0pteavZQYtKk0gJiD3A1hoDjmQDFAsNh44JLgI3WdASCgWbLMmePlElXnoNf7r8EeVtqpvKJ2eioctrSpitEpJy';
        expect(() => ContentCommentVO.create(contentComment))
            .toThrow('Te sobran 1 caracteres');
    });

    it('shoud error when comment is too short', () => {
        const contentComment = 'ETy24DDUB';
        expect(() => ContentCommentVO.create(contentComment))
            .toThrow('Te faltan 1 caracteres');
    });

    it('should create comment with min characteres', () => {
        const contentComment = 'ETy24DDUBR';
        const created = ContentCommentVO.create(contentComment);
        expect(created.value).toEqual(contentComment);
    });

    it('should create comment with max characteres', () => {
        const contentComment = '7QCbSnN0rt37DxA57hNVxDxG6kJLRpiRo0DoVOP0ZYTiv5Pgc7KeFcRpVKVIkdD7gIr7bN5oFiLdy7n8UiaRmm5jsCIAQRzyU4nsQsGY769IF8HOIA0pteavZQYtKk0gJiD3A1hoDjmQDFAsNh44JLgI3WdASCgWbLMmePlElXnoNf7r8EeVtqpvKJ2eioctrSpitEpJ';
        const created = ContentCommentVO.create(contentComment);
        expect(created.value).toEqual(contentComment);
    });

    it('should not create comment because exists offensive word', () => {
        const content = 'Esto no me gusta nada me parece una caca y no se corresponde con la realidad';
        const offensiveWord: OffensiveWordType = {
            id: IdVO.create(),
            word: WordVO.create('caca'),
            level: LevelVO.create(3)
        };
        
        expect(() =>  ContentCommentVO.create(content, [new OffensiveWord(offensiveWord)])).toThrow('Existen palabras ofensivas');
    });
});