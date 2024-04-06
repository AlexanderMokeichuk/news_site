export interface News {
  title: string,
  description: string,
  image: File | null,
}

export interface NewsFromBackend extends News{
  id: number,
  datetime: string,
}

export interface NewsFromBackendId extends NewsFromBackend {
  description: string,
}

export interface CommentForm {
  author: string,
  comment: string,
}

export interface Comment extends CommentForm {
  newsId: number
}

export interface CommentFromBackend extends Comment {
  id: number,
  news_id: number,
}