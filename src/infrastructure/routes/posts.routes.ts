import 'reflect-metadata';

import { User } from './../../domain/model/entities/user.entity';
import { DeleteCommentRequest, DeleteCommentUseCase } from './../../application/usecases/comments/delete-comment.usecase';
import { logger } from './../config/logger';
import { AddCommentUseCase, AddCommentRequest, AddCommentResponse } from './../../application/usecases/comments/add-comment.usecase';
import { CreatePostUseCase, CreatePostRequest } from './../../application/usecases/posts/create-post.usecase';
import { body, validationResult } from 'express-validator';
import express from 'express';
import { Container } from 'typedi';
import { Role } from '../../domain/model/vos/role.vo';
import { hasRole } from '../middlewares/roles';
import passport from 'passport';

const router = express.Router();

router.post('/api/posts', 
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('authorNickname').notEmpty(),
    passport.authenticate('jwt', {session: false}), hasRole([Role.PUBLISHER, Role.ADMIN]),
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

router.put('/api/posts/:idPost/comment', 
    body('nicknameComment').notEmpty(),
    body('contentComment').notEmpty(),
    passport.authenticate('jwt', {session: false}), hasRole([Role.PUBLISHER, Role.ADMIN]),
    async(req: express.Request, res: express.Response) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const idPost = req.params.idPost;
            const nicknameComment = req.body.nicknameComment;
            const contentComment = req.body.contentComment;

            const useCase = Container.get(AddCommentUseCase);
            const request: AddCommentRequest = {
                postId: idPost,
                contentComment,
                nicknameComment
            };
            logger.debug(`LLamo a Add Comment Use Case con ${JSON.stringify(request)}`);
            const response:AddCommentResponse  = await useCase.execute(request);
            res.status(200).json({status: 'Comment added', ...response});

        }catch(err) {
            logger.error(err);
            return res.status(err.code).json({error: err.message});
        }

    });

router.delete('/api/posts/:idPost/comment/:idComment',
    passport.authenticate('jwt', {session: false}), 
    hasRole([Role.PUBLISHER, Role.ADMIN]),
    async(req: express.Request, res: express.Response) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const idPost = req.params.idPost;
            const idComment = req.params.idComment;
            const user = req.user as User;

            const useCase = Container.get(DeleteCommentUseCase);
            const request: DeleteCommentRequest = {
                idPost,
                idComment,
                user
            };
            
            await useCase.execute(request);
            res.status(200).json({status: 'Comment deleted'});

        }catch(err) {
            logger.error(err);
            return res.status(err.code).json({error: err.message});
        }

    });


export {router as postsRouter};