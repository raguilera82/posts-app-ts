import { logger } from './../../../infrastructure/config/logger';
import { ExceptionWithCode } from './../../../domain/model/exception-with-code';
import { NicknameVO } from '../../../domain/model/vos/nickname.vo';
import { AuthorService } from './../../../domain/services/author.service';
import { TitleVO } from './../../../domain/model/vos/title.vo';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { Post, PostType } from './../../../domain/model/entities/post.entity';
import { PostService } from './../../../domain/services/post.service';
import { ContentVO } from '../../../domain/model/vos/content.vo';
import { Service } from 'typedi';

@Service()
export class CreatePostUseCase {

    constructor(private postService: PostService, private authorService: AuthorService) {}

    async execute(request: CreatePostRequest): Promise<CreatePostResponse> {

        logger.debug(JSON.stringify(request));

        const author = await this.authorService.getByNickname(NicknameVO.create(request.authorNickname));
        console.log(author);
        if (!author) {
            throw new ExceptionWithCode(404, 'Author not found');
        }

        const postData: PostType = {
            id: IdVO.create(),
            title: TitleVO.create(request.title),
            content: ContentVO.create(request.content),
            author,
            comments: []
        };

        await this.postService.create(new Post(postData));

        return {id: postData.id.value};

    }

}

export type CreatePostRequest = {
    title: string;
    content: string;
    authorNickname: string;
}

export type CreatePostResponse = {
    id: string;
}