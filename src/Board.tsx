import { BoardLetterRow } from "./types";
import { colors, genLetterColorStyles } from "./colors";
import "./Board.css";

export const Board = ({ board }: { board: BoardLetterRow[] }) => {
  return (
    <div className="board">
      {board.map((boardRow, rowIndex) => (
        <div key={rowIndex} className="board_row">
          {boardRow.map((i, colIndex) =>
            i ? (
              <div
                key={colIndex}
                className="board_row_letter"
                style={{
                  ...genLetterColorStyles(i.color),
                  border: `2px solid ${
                    i.color === "white" ? colors.lightGray : i.color
                  }`,
                }}
              >
                <div>{i.letter}</div>
              </div>
            ) : (
              <div
                key={colIndex}
                className="board_row_letter"
                style={{ border: `2px solid ${colors.lightGray}` }}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};
