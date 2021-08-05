import { logger } from '../../../infrastructure/config/logger';
import { checkOffensiveWords } from '../../services/check-offensive-word';
import { OffensiveWord } from '../entities/offensive-word.entity';
import { ExceptionWithCode } from './../exception-with-code';
export class ContentCommentVO {

    private static readonly MIN_LENGTH = 10;
    private static readonly MAX_LENGTH = 200;

    get value(): string {
        return this.content;
    }

    private constructor(private content: string) {}

    static create(content: string, offensiveWords: OffensiveWord[] = []): ContentCommentVO {
        const long = content.length;
        if (content.length < this.MIN_LENGTH) {
            throw new ExceptionWithCode(400, `Te faltan ${this.MIN_LENGTH - long} caracteres`);
        }
        if (content.length > this.MAX_LENGTH) {
            throw new ExceptionWithCode(400, `Te sobran ${long - this.MAX_LENGTH} caracteres`);
        }
        const offensiveWordsFound = checkOffensiveWords(content, offensiveWords);
        if (offensiveWordsFound.length > 0) {
            logger.debug(JSON.stringify(offensiveWordsFound));
            throw new ExceptionWithCode(400, 'Existen palabras ofensivas');
        }
        return new ContentCommentVO(content);
    }

}