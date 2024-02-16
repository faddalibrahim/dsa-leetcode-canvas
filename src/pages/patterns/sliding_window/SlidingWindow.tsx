// libraries
import { useEffect, useRef, useState } from "react";

// styles
import "./sliding-window.css";

// components
import Panel from "./Panel";
import ArrayInput from "./ArrayInput";
import ControlButtons from "./ControlButtons";
import * as ActionTypes from "./Controls";
import * as ControlFunctions from "./ControlFunctions";

export default function SlidingWindow() {
  // refs
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const slidingWindowRef = useRef<HTMLDivElement>(null);

  const cellRefs = useRef<Map<string | number, HTMLDivElement> | null>(null);

  // states
  const [cellValues, setCellValues] = useState<number[] | string[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const [cellWidth, setCellWidth] = useState<number>(56);
  const [gapBetweenCells, setGapBetweenCells] = useState<number>(0);

  useEffect(() => {
    const cellWidth = getComputedStyle(containerRef.current!).getPropertyValue(
      "--cell-width"
    );
    const gapBetweenCells = getComputedStyle(
      containerRef.current!
    ).getPropertyValue("--gap-between-cells");
    setCellWidth(parseInt(cellWidth));
    setGapBetweenCells(parseInt(gapBetweenCells));
    console.log(cellWidth);
  }, []);

  /**
   * Get the map of cell references in the DOM
   *
   * @returns {Map<string | number, HTMLDivElement>} - The map of cells
   */

  function getCellsMap() {
    if (!cellRefs.current) {
      cellRefs.current = new Map<string | number, HTMLDivElement>();
    }
    return cellRefs.current;
  }

  /**
   * Executes the specified action type
   * and highlights the cells in the window view
   *
   * @param actionType - The type of action to execute
   */

  function executeAction(actionType: string) {
    let startIndex: number, endIndex: number;

    switch (actionType) {
      case ActionTypes.EXPAND: {
        if (willGoOutOfBounds()) return;
        [startIndex, endIndex] = ControlFunctions.expand(
          slidingWindowRef,
          cellWidth,
          gapBetweenCells
        );
        break;
      }
      case ActionTypes.COLLAPSE: {
        if (willCollapseToZero()) return;
        [startIndex, endIndex] = ControlFunctions.collapse(
          slidingWindowRef,
          cellWidth,
          gapBetweenCells
        );
        break;
      }
      case ActionTypes.SLIDE: {
        if (willGoOutOfBounds()) return;
        [startIndex, endIndex] = ControlFunctions.slide(
          slidingWindowRef,
          cellWidth,
          gapBetweenCells
        );
        break;
      }
      case ActionTypes.RESET: {
        [startIndex, endIndex] = ControlFunctions.reset(
          slidingWindowRef,
          cellWidth
        );
        break;
      }
      default:
        throw new Error("Invalid Action");
    }

    highlightCellsInWindowView(startIndex, endIndex);
  }

  function willCollapseToZero(): boolean {
    return slidingWindowRef?.current?.clientWidth === cellWidth;
  }

  /**
   * Checks if the sliding window will go out of bounds of the frame.
   *
   * @returns {boolean} - true if the window will go out of bounds, false otherwise
   */

  function willGoOutOfBounds(): boolean {
    const windowSpace =
      (slidingWindowRef?.current?.offsetLeft ?? 0) +
      (slidingWindowRef?.current?.clientWidth ?? 0);
    const frameWidth = frameRef?.current?.clientWidth ?? 0;

    console.log(windowSpace, frameWidth, windowSpace === frameWidth);

    return windowSpace >= frameWidth;
  }

  /**
   * Highlights cells in the window view based on the start and end cell indices.
   *
   * @param startCell - The index of the starting cell
   * @param endCell - The index of the ending cell
   */

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

  return (
    <div id="sliding-window-container" ref={containerRef}>
      <Panel />

      <div id="canvas">
        <ArrayInput setCellValues={setCellValues} />
        {cellValues.length > 0 ? (
          <div id="frame" ref={frameRef}>
            {cellValues.map((value, index) => (
              <div
                key={`cell-${index}${value}`}
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
        ) : (
          <h1 className="text-[#aaa] text-xl">Enter some of values above</h1>
        )}

        <ControlButtons executeAction={executeAction} />
      </div>
    </div>
  );
}
