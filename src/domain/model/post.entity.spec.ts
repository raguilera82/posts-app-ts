import { uuid } from 'uuidv4';
import { ContentVO } from './content.vo';
import { IdVO } from './id.vo';
import { Post, PostEntity } from './post.entity';
import { TitleVO } from './title.vo';
describe('Post Entity', () => {
    it('create post', () => {
        try {
            const title: TitleVO = TitleVO.create('Mi titulo de posts');
            const id: IdVO = IdVO.create(uuid());
            const content: ContentVO = 
                  ContentVO.create(`Lorem Ipsum is simply dummy text of the printing 
                  and typesetting industry.`);
            const postData: Post = {
                id,
                title,
                content,
                comments: []
            };
            const post = new PostEntity(postData);
            console.log(post.title);

        }catch(error) {
            console.log(error);
        }
        
    });
});