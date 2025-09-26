
export type PostData = {
    id: string;
    title: string;
    content: string;
    date: string;

    status: 'draft' | 'finished';
}
