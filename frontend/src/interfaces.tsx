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
        user_id: number;
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

export interface Comment {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}