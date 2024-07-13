import { KeyboardLetterType } from "./types";
import { genLetterColorStyles } from "./colors";
import "./Keyboard.css";

export const Keyboard = ({
  keyboard,
  onKeyboardKeyPress,
}: {
  keyboard: KeyboardLetterType[];
  onKeyboardKeyPress: (letter: string) => void;
}) => {
  return (
    <div className="keyboard">
      <div className="keyboard_row keyboard_row--top">
        {keyboard
          .filter((i) => i.col === 0)
          .map((i) => (
            <div
              key={i.letter}
              className="keyboard_letter"
              style={genLetterColorStyles(i.color)}
              onClick={() => onKeyboardKeyPress(i.letter)}
            >
              <div>{i.letter}</div>
            </div>
          ))}
      </div>
      <div className="keyboard_row keyboard_row--middle">
        {keyboard
          .filter((i) => i.col === 1)
          .map((i) => (
            <div
              key={i.letter}
              className="keyboard_letter"
              style={genLetterColorStyles(i.color)}
              onClick={() => onKeyboardKeyPress(i.letter)}
            >
              <div>{i.letter}</div>
            </div>
          ))}
      </div>
      <div className="keyboard_row keyboard_row--bottom">
        {keyboard
          .filter((i) => i.col === 2)
          .map((i) => (
            <div
              key={i.letter}
              className={`keyboard_letter ${
                i.letter === "ENTER" ? "keyboard_letter--enter" : ""
              } ${
                i.letter === "BACKSPACE" ? "keyboard_letter--backspace" : ""
              }`.trim()}
              style={genLetterColorStyles(i.color)}
              onClick={() => onKeyboardKeyPress(i.letter)}
            >
              <div>{i.letter === "BACKSPACE" ? "⌫" : i.letter}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
