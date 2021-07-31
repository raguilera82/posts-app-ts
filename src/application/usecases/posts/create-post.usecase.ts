import { NameAuthorVO } from './../../../domain/model/vos/name-author.vo';
import { TitleVO } from './../../../domain/model/vos/title.vo';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { PostType } from './../../../domain/model/entities/post.entity';
import { PostService } from './../../../domain/services/post.service';
import { ContentVO } from '../../../domain/model/vos/content.vo';
export class CreatePostUseCase {

    constructor(private postService: PostService) {}

    execute(request: CreatePostRequest) {

        /* const postData: PostType = {
            id: IdVO.create(),
            title: TitleVO.create(request.title),
            content: ContentVO.create(request.content),
            author: null,
            comments: []
        }; */

    }

}

export type CreatePostRequest = {
    title: string;
    content: string;
    author: string;
}