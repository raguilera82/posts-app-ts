import { Author } from './author.entity';

export type Comment = {
    author: Author;
    content: string;
    timestamp: string;
}