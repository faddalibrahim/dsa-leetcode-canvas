import React from "react";

interface ArrayInputProps {
  setCellValues: React.Dispatch<React.SetStateAction<number[] | string[]>>;
}
const ArrayInput = ({ setCellValues }: ArrayInputProps) => {
  return (
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
  );
};

export default ArrayInput;
