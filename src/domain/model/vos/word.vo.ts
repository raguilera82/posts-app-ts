export class WordVO {

    get value(): string {
        return this.word;
    }

    private constructor(private word: string) {}

    static create(word: string) {
        return new WordVO(word);
    }

}