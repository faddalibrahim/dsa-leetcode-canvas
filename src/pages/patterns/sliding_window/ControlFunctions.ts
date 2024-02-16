/**
 * Expands the sliding window
 *
 * @param slidingWindowRef - Reference to the HTMLDivElement for the sliding window
 * @param cellWidth - Width of each cell
 * @param gapBetweenCells - Gap between cells
 * @returns A tuple containing the start and end indexes of the visible cells
 *
 * @throws {Error} if the slidingWindowRef is invalid
 */
export function expand(
  slidingWindowRef: React.RefObject<HTMLDivElement> | null,
  cellWidth: number,
  gapBetweenCells: number
): [number, number] {
  if (slidingWindowRef?.current?.clientWidth) {
    const newWindowWidth =
      slidingWindowRef?.current?.clientWidth + cellWidth + gapBetweenCells;
    slidingWindowRef.current.style.width = `${newWindowWidth}px`;

    const startIndex = Math.floor(
      slidingWindowRef.current.offsetLeft / cellWidth
    );
    const endIndex = Math.floor(
      startIndex + (newWindowWidth - gapBetweenCells) / cellWidth
    );

    return [startIndex, endIndex];
  }

  throw new Error("Invalid Action");
}

/**
 * Collapses the sliding window by adjusting its position and width based on the cell width and gap between cells
 *
 * @param slidingWindowRef - Ref object for the sliding window
 * @param cellWidth - Width of each cell
 * @param gapBetweenCells - Gap between cells
 *
 * @returns Array containing the start and end index of the visible cells after collapsing the window
 */

export function collapse(
  slidingWindowRef: React.RefObject<HTMLDivElement> | null,
  cellWidth: number,
  gapBetweenCells: number
): [number, number] {
  if (slidingWindowRef?.current?.clientWidth) {
    const newWindowOffsetLeft =
      slidingWindowRef.current.offsetLeft + cellWidth + gapBetweenCells;
    slidingWindowRef.current.style.left = `${newWindowOffsetLeft}px`;

    const newWindowWidth =
      slidingWindowRef.current.clientWidth - cellWidth - gapBetweenCells;
    slidingWindowRef.current.style.width = `${newWindowWidth}px`;

    const startIndex = Math.floor(newWindowOffsetLeft / cellWidth);
    const endIndex = Math.floor(startIndex + newWindowWidth / cellWidth);

    return [startIndex, endIndex];
  }

  throw new Error("Invalid Action");
}

/**
 * Slides the sliding window and returns the start and end index of the visible cells
 *
 * @param slidingWindowRef - Reference to the sliding window element
 * @param cellWidth - Width of each cell
 * @param gapBetweenCells - Gap between cells
 *
 * @returns Array containing start and end index of the visible cells
 */
export function slide(
  slidingWindowRef: React.RefObject<HTMLDivElement> | null,
  cellWidth: number,
  gapBetweenCells: number
): [number, number] {
  if (slidingWindowRef?.current?.clientWidth) {
    const newWindowOffsetLeft =
      slidingWindowRef?.current?.offsetLeft + cellWidth + gapBetweenCells;
    slidingWindowRef.current.style.left = `${newWindowOffsetLeft}px`;

    const startIndex = Math.floor(newWindowOffsetLeft / cellWidth);
    const endIndex = Math.floor(
      startIndex + slidingWindowRef.current.clientWidth / cellWidth
    );

    return [startIndex, endIndex];
  }

  throw new Error("Invalid Action");
}

/**
 * Resets the sliding window position and width.
 *
 * @param slidingWindowRef - Reference to the HTMLDivElement representing the sliding window
 * @param cellWidth - The width of a single cell in the sliding window
 *
 * @returns An array containing the new left and width values
 */
export function reset(
  slidingWindowRef: React.RefObject<HTMLDivElement> | null,
  cellWidth: number
): [number, number] {
  if (slidingWindowRef?.current?.clientWidth) {
    slidingWindowRef.current.style.left = "0";
    slidingWindowRef.current.style.width = `${cellWidth}px`;
  }

  return [0, 1];
}
