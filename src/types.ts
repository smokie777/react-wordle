export interface KeyboardLetterType {
  letter: string;
  color: string;
  col: number;
}

export type BoardLetterRow = (BoardLetterType | null)[];
export interface BoardLetterType {
  letter: string;
  color: string;
}
