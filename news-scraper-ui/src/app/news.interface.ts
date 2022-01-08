export interface IArticles {
  title: string;
  url: string;
  source?: string;
}
export interface INewsSource {
  source: string;
  url: string;

}
export interface IScrapPayload {
  keyword: string;
  newsSources: INewsSource[]
}
