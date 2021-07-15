import { ContentVO } from './content.vo';

describe('Content VO' , () => {
    it('shoud error when content is too long', () => {
        const content = '20dmJvDgROaIEYKhxwcgMcTLPw1Sa232y8QK9nkYofyYuEPWILlzHcmSankHUBVMjvD2j88kYZ6so9ZejsvYR9PGLbDgFn45NcA7ujFrYNvHOmf5KloXp58kOlUYIbwlqeEhFOqAxJTrgmSAJ7jBIa70ewQErBZb4roJ6Kn4NU3DmGGKx67Vg1Mt2eApmjabrLpENMBuRa5TDZB6fqFnzWZXGiDwTr2DjOEbVV7Qa0wBvJPv089c3l5lBrDjczY1dCpY2fUkZx4r9ZFvmquxPZoY7YHDn9ukLqRXFIlW8bcnm';
        expect(() => ContentVO.create(content))
            .toThrow('Te sobran 1 caracteres');
    });

    it('shoud error when comment is too short', () => {
        const content = 'tOWJhMSxAKVDI4sB5P0ie2eGAPw3coa59dlMIATeNlvcw40a2';
        expect(() => ContentVO.create(content))
            .toThrow('Te faltan 1 caracteres');
    });

    it('should create comment with min characteres', () => {
        const content = '8xwkUqh3NHOyrZ9TfJxokT7haKdGZCFQAMjWl9kXt8OGTW4Ljl';
        const created = ContentVO.create(content);
        expect(created.value).toEqual(content);
    });

    it('should create comment with max characteres', () => {
        const content = 'KuuOqbQfsj5CXF9fd9iW10jpJI52cMuxGU2FeXKHq84FfkBmyhcvmTVc8Mk3sT1iM4mj3DHQOa0AoFM3hZPUb5uOGl0QRp83bqBk9coZbd59hDBhazv4HbV8gVIBfnD3z4givAit8EBt3EdHRryILqytjXrdfBvhAB6dBrNXY7dUgUv5maFMd5GBGW7WR20eHAC1AXZJbYhqjkO19uiXJfdZpPy8NdkhKBl5hOfQpKlczDankBSDDOTjnkaDNZep2HMC5WTfEsztpBDmuZgPVyhaA3wjy8Ie5Qh1WV0d846g';
        const created = ContentVO.create(content);
        expect(created.value).toEqual(content);
    });
});