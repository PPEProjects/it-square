interface User {
    id: string
    name: string
    avatar: string
    slug: string
}

export type UserDocument = Partial<Omit<User, 'id'>> & { id: string }
