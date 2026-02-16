export type Item = {
  link: string;
  title?: string;
  date?: string;
  content?: string;
};
export type Pages = {
    [key: string] : Item[]
}