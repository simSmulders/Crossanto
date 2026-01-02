 export type Category = {
    id: string;
    name: string;
    description: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    _count: { words: number };
}

export type Word = {
    id: string;
    french: string;
    english: string;
    pronunciation: string;
    gender: string | null;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category?: Category;
}