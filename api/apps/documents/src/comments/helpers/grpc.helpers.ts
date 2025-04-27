import { DocumentComment } from "../entities/document-comment.entity";

export const transfromComment = (comment: DocumentComment) => {
    return {
        ...comment,
        createdAt: comment.createdAt.toISOString()
    };
};

export const transformCommentsArray = (comments: DocumentComment[]) => {
    return {
        comments: comments.map(comment => ({
            id: comment.id,
            message: comment.message,
            creatorId: comment.creatorId,
            createdAt: comment.createdAt.toISOString()
        }))
    };
};
