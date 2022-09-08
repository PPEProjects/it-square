export interface MentionReview {
    id: string
    name: string
    slug: string
}

export interface ReviewDocument {
    _id: string
    user: {
        id: string
        name: string
        avatar: string
    }
    rating: number
    content: string
    mentions: MentionReview[]

    createdAt: number
}
