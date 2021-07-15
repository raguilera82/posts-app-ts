import { TimestampVO } from './timestamp.vo';

describe('Timestamp VO', () => {
    it('should create', () => {
        const timestamp: TimestampVO = TimestampVO.create();
        expect(timestamp.value).not.toBeNull();
    });
});