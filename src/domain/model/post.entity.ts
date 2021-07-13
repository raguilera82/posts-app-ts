import { Author } from './author.entity';
import { Comment } from './comment.entity';
import { ContentVO } from './content.vo';
import { IdVO } from './id.vo';
import { TitleVO } from './title.vo';

export type Post = {
    id: IdVO;
    title: TitleVO;
    content: ContentVO;
    author?: Author;
    comments?: Comment[];
}

export class PostEntity {

    constructor(private post: Post) {}

    get id(): string {
        return this.post.id.value;
    }

    get title(): string {
        return this.post.title.value;
    }

    get content(): string {
        return this.post.content.value;
    }

}