export class TimestampVO {

    private timestamp: string;

    get value(): string {
        return this.timestamp;
    }

    private constructor() {
        this.timestamp = Date.now().toString();
    }

    static create(): TimestampVO {
        return new TimestampVO();
    }

}