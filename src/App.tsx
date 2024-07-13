import { useCallback, useEffect, useRef, useState } from "react";
import { words } from "./wordleWords";
import { colors } from "./colors";
import { BoardLetterRow, KeyboardLetterType } from "./types";
import { Keyboard } from "./Keyboard";
import { Board } from "./Board";
import { all5LetterWords } from "./all5LetterWords";
import "./App.css";

const App = () => {
  const wordRef = useRef(words[~~(Math.random() * words.length)]);
  const rowRef = useRef(0); // 0 to 6
  const colRef = useRef(0); // 0 to 5
  const [board, setBoard] = useState<BoardLetterRow[]>(
    Array(6)
      .fill(null)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_) => Array(5).fill(null))
  );
  const [keyboard, setKeyboard] = useState<KeyboardLetterType[]>([
    ..."QWERTYUIOP"
      .split("")
      .map((letter) => ({ letter, color: colors.lightGray, col: 0 })),
    ..."ASDFGHJKL"
      .split("")
      .map((letter) => ({ letter, color: colors.lightGray, col: 1 })),
    ...[
      { letter: "ENTER", color: colors.lightGray, col: 2 },
      ..."ZXCVBNM"
        .split("")
        .map((letter) => ({ letter, color: colors.lightGray, col: 2 })),
      { letter: "BACKSPACE", color: colors.lightGray, col: 2 },
    ],
  ]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [status, setStatus] = useState("");
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onKeyboardKeyPress = useCallback(
    (letter: string) => {
      if (isGameWon || isGameLost) {
        return;
      }
      if (letter === "BACKSPACE") {
        if (colRef.current >= 1) {
          setBoard(
            board.map((row, rowIndex) =>
              rowIndex === rowRef.current
                ? row.map((item, colIndex) =>
                    colIndex === colRef.current - 1 ? null : item
                  )
                : row
            )
          );
          colRef.current = colRef.current - 1;
        }
      } else if (letter === "ENTER") {
        if (colRef.current === 5) {
          const submittedWord = board[rowRef.current]
            .map((i) => i?.letter)
            .filter(Boolean)
            .join("");
          const isValid5LetterWord = Object.prototype.hasOwnProperty.call(
            all5LetterWords,
            submittedWord
          );
          if (!isValid5LetterWord) {
            setStatus(`${submittedWord} is not a valid 5-letter word!`);
            if (statusTimeoutRef.current) {
              clearTimeout(statusTimeoutRef.current);
            }
            statusTimeoutRef.current = setTimeout(() => {
              setStatus("");
            }, 5000);
            return;
          }
          const newBoardRow: BoardLetterRow = [];
          let newKeyboard = [...keyboard];
          const newGreenLetters: string[] = []; // yellow can't overwrite green.
          board[rowRef.current].forEach((boardItem, colIndex) => {
            if (boardItem) {
              if (!wordRef.current.includes(boardItem.letter)) {
                // letter is not in word. turn dark gray
                newBoardRow.push({
                  letter: boardItem.letter,
                  color: colors.darkGray,
                });
                newKeyboard = newKeyboard.map((keyboardItem) =>
                  keyboardItem.letter === boardItem.letter &&
                  keyboardItem.color === colors.lightGray
                    ? { ...keyboardItem, color: colors.darkGray }
                    : keyboardItem
                );
              } else {
                if (wordRef.current[colIndex] === boardItem.letter) {
                  // letter is in word, and in correct place. turn green
                  newGreenLetters.push(boardItem.letter);
                  newBoardRow.push({
                    letter: boardItem.letter,
                    color: colors.green,
                  });
                  newKeyboard = newKeyboard.map((keyboardItem) =>
                    keyboardItem.letter === boardItem.letter
                      ? { ...keyboardItem, color: colors.green }
                      : keyboardItem
                  );
                } else {
                  // letter is in word, but in wrong place. turn yellow
                  newBoardRow.push({
                    letter: boardItem.letter,
                    color: colors.yellow,
                  });
                  newKeyboard = newKeyboard.map((keyboardItem) =>
                    keyboardItem.letter === boardItem.letter &&
                    keyboardItem.letter !== colors.green &&
                    !newGreenLetters.includes(keyboardItem.letter)
                      ? { ...keyboardItem, color: colors.yellow }
                      : keyboardItem
                  );
                }
              }
            }
          });
          setBoard(
            board.map((boardRow, index) =>
              index === rowRef.current ? newBoardRow : boardRow
            )
          );
          setKeyboard(newKeyboard);
          if (submittedWord === wordRef.current) {
            setIsGameWon(true);
          } else if (rowRef.current === 5) {
            setIsGameLost(true);
          }
          rowRef.current = rowRef.current + 1;
          colRef.current = 0;
        }
      } else {
        if (rowRef.current <= 5 && colRef.current <= 4) {
          setBoard(
            board.map((row, rowIndex) =>
              rowIndex === rowRef.current
                ? row.map((item, colIndex) =>
                    colIndex === colRef.current
                      ? { letter, color: colors.white }
                      : item
                  )
                : row
            )
          );
          colRef.current = colRef.current + 1;
        }
      }
    },
    [board, isGameLost, isGameWon, keyboard]
  );

  useEffect(() => {
    // Handler function to be called when a key is pressed
    const handleKeypress = (event: KeyboardEvent) => {
      const key = event.key;
      if (/^[a-zA-Z]$/.test(key) || key === "Enter" || key === "Backspace") {
        onKeyboardKeyPress(key.toUpperCase());
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeypress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [onKeyboardKeyPress]);

  // console.log({
  //   word: wordRef.current,
  //   row: rowRef.current,
  //   col: colRef.current,
  //   board,
  //   keyboard,
  // });

  return (
    <div className="app">
      <Board board={board} />
      <div className="status">
        {isGameWon && (
          <div className="status status--win">Congratulations! You win!</div>
        )}
        {isGameLost && (
          <div className="status status--lose">
            Sorry! You lose. The word was: {wordRef.current}.
          </div>
        )}
        {status && <div className="status">{status}</div>}
      </div>
      <Keyboard keyboard={keyboard} onKeyboardKeyPress={onKeyboardKeyPress} />
    </div>
  );
};

export default App;
