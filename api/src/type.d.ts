export interface NewsFromFrontend {
  title: string,
  image: string | null,
  description: string,
  datetime: string,
}

export interface CommentFromFrontend {
  newsId: number,
  author: string
  comment: string,
}