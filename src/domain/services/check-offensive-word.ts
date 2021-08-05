import { OffensiveWord } from './../model/entities/offensive-word.entity';

export const checkOffensiveWords = (content: string, offensiveWords: OffensiveWord[], level = 5): OffensiveWord[] => {

    const words = content.toLocaleLowerCase().split(' ');
    let offensiveWordsFound: OffensiveWord[] = [];

    words.forEach(word => {
        const maybeOW = offensiveWords.find(ow => ow.word.value.toLocaleLowerCase() === word && ow.level.value <= level);
        if (maybeOW) {
            offensiveWordsFound = [...offensiveWordsFound, maybeOW];
        }
    });
    return offensiveWordsFound;
};