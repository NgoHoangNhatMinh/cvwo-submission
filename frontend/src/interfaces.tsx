export interface Post {
    id: number;
    topic: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    category_id: number;
}

export interface PostData {
    post: {
        topic: string;
        content: string;
        category_id: number;
    }
}

export interface Comment {
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    post_id: number;
}

export interface CommentData {
    comment: {
        content: string;
        user_id: number;
        post_id: number;
    }
}

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryData {
    category: {
        name: string;
        description: string;
    }
}

export interface User {
    id: number;
    email: string;
    username: string;
    created_at: string;
}