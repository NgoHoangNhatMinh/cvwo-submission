export interface Post {
    id: number;
    topic: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface PostData {
    post: {
        topic: string;
        content: string;
    }
}