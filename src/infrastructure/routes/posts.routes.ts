import { CreatePostUseCase, CreatePostRequest } from './../../application/usecases/posts/create-post.usecase';
import { body, validationResult } from 'express-validator';
import express from 'express';
import { Container } from 'typedi';

const router = express.Router();

router.post('/api/posts', 
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('authorNickname').notEmpty(),
    async(req: express.Request, res: express.Response) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const useCase = Container.get(CreatePostUseCase);
            const request: CreatePostRequest = {
                title: req.body.title,
                content: req.body.content,
                authorNickname: req.body.authorNickname
            };
            await useCase.execute(request);
            return res.status(201).json({status: 'Created'});

        }catch(err) {
            return res.status(err.code).json({error: err.message});
        }

    });

export {router as postsRouter};