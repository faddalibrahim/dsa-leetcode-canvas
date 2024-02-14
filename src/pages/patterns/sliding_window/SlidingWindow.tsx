// libraries
import { useRef, useState } from "react";

// components
import AnimationControlBtns from "./AnimationControlBtns";

// styles
import "./sliding-window.css";

export default function SlidingWindow() {
  // refs and state
  const frameRef = useRef<HTMLDivElement>(null);
  const slidingWindowRef = useRef<HTMLDivElement>(null);
  const animationControlBtns = useRef<Map<
    string | number,
    HTMLButtonElement
  > | null>(null);
  const cellRefs = useRef<Map<string | number, HTMLDivElement> | null>(null);

  // states
  const [cellValues, setCellValues] = useState<number[] | string[]>([
    1, 2, 3, 4, 5,
  ]);

  function getButtonsMap() {
    if (!animationControlBtns.current) {
      animationControlBtns.current = new Map<
        string | number,
        HTMLButtonElement
      >();
    }
    return animationControlBtns.current;
  }

  function getCellsMap() {
    if (!cellRefs.current) {
      cellRefs.current = new Map<string | number, HTMLDivElement>();
    }
    return cellRefs.current;
  }

  function executeAction(buttonTitle: string) {
    switch (buttonTitle) {
      case "expand window":
        expand();
        break;
      case "collapse window":
        collapse();
        break;
      case "slide window":
        slide();
        break;
      case "reset":
        reset();
        break;
      default:
        throw new Error("Invalid Action");
    }
  }

  function willGoOutOfBounds(): boolean {
    const windowSpace =
      (slidingWindowRef?.current?.offsetLeft ?? 0) +
      (slidingWindowRef.current?.clientWidth ?? 0);
    const frameWidth = frameRef?.current?.clientWidth;

    return windowSpace === frameWidth;
  }

  function willCollapseToZero(): boolean {
    return slidingWindowRef?.current?.clientWidth === 80;
  }

  function highlightCellsInWindowView(startCell: number, endCell: number) {
    for (let i = 0; i < cellValues.length; i++) {
      const map = getCellsMap();
      const cell = map.get(i);

      if (i >= startCell && i < endCell) {
        cell?.classList.add("highlight");
      } else {
        cell?.classList.remove("highlight");
      }
    }
  }

  function expand() {
    if (willGoOutOfBounds()) return;
    if (slidingWindowRef?.current?.clientWidth) {
      const newWindowWidth = slidingWindowRef?.current?.clientWidth + 80;
      slidingWindowRef.current.style.width = `${newWindowWidth}px`;

      const startIndex = slidingWindowRef.current.offsetLeft / 80;
      const endIndex = startIndex + newWindowWidth / 80;

      highlightCellsInWindowView(startIndex, endIndex);
    }
  }

  function collapse() {
    if (willCollapseToZero()) return;
    if (slidingWindowRef?.current?.clientWidth) {
      const newWindowOffsetLeft = slidingWindowRef.current.offsetLeft + 80;
      slidingWindowRef.current.style.left = `${newWindowOffsetLeft}px`;

      const newWindowWidth = slidingWindowRef.current.clientWidth - 80;
      slidingWindowRef.current.style.width = `${newWindowWidth}px`;

      const startIndex = newWindowOffsetLeft / 80;
      const endIndex = startIndex + newWindowWidth / 80;

      highlightCellsInWindowView(startIndex, endIndex);
    }
  }

  function slide() {
    if (willGoOutOfBounds()) return;

    if (slidingWindowRef?.current?.clientWidth) {
      const newWindowOffsetLeft = slidingWindowRef?.current?.offsetLeft + 80;
      slidingWindowRef.current.style.left = `${newWindowOffsetLeft}px`;

      const startIndex = newWindowOffsetLeft / 80;
      const endIndex = startIndex + slidingWindowRef.current.clientWidth / 80;

      highlightCellsInWindowView(startIndex, endIndex);
    }
  }

  function reset() {
    if (slidingWindowRef?.current?.clientWidth) {
      slidingWindowRef.current.style.left = "0";
      slidingWindowRef.current.style.width = "80px";

      highlightCellsInWindowView(0, 1);
    }
  }

  return (
    <div id="sliding-window-container">
      <div id="history">history</div>

      <div id="canvas">
        <div id="cell-values">
          <input
            type="text"
            onChange={(e) => {
              const newCellValue = e.target.value;
              const newCellValueArray = [...newCellValue]
                .map((cellValue) => cellValue.trim())
                .filter((cellValue) => cellValue.length > 0);
              setCellValues(newCellValueArray);
            }}
          />
        </div>
        <div id="frame" ref={frameRef}>
          {cellValues.map((value, index) => (
            <div
              className={`cell ${index === 0 ? "highlight" : ""}`}
              ref={(node) => {
                const map = getCellsMap();
                node
                  ? map.set(index, node as HTMLDivElement)
                  : map.delete(index);
              }}
            >
              {value}
            </div>
          ))}
          <div id="sliding-window" ref={slidingWindowRef}></div>
        </div>
        <div id="action-btns">
          {AnimationControlBtns.map((btn) => (
            <button
              key={btn.title}
              title={btn.title}
              onClick={() => executeAction(btn.title)}
              ref={(node) => {
                const map = getButtonsMap();
                node
                  ? map.set(btn.title, node as HTMLButtonElement)
                  : map.delete(btn.title);
              }}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
