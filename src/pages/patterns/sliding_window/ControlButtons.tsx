import { useRef } from "react";
import Controls from "./Controls";

interface ControlButtonProps {
  executeAction: (action: string) => void;
}

const ControlButtons = ({ executeAction }: ControlButtonProps) => {
  const controlBtnsRef = useRef<Map<string | number, HTMLButtonElement> | null>(
    null
  );

  function getButtonsMap() {
    if (!controlBtnsRef.current) {
      controlBtnsRef.current = new Map<string | number, HTMLButtonElement>();
    }
    return controlBtnsRef.current;
  }

  return (
    <div id="control-buttons">
      {Controls.map(({ icon, actionType }) => (
        <div className="group relative" key={actionType}>
          <button
            key={actionType}
            title={actionType}
            onClick={() => executeAction(actionType)}
            ref={(node) => {
              const map = getButtonsMap();
              node
                ? map.set(actionType, node as HTMLButtonElement)
                : map.delete(actionType);
            }}
          >
            {icon}
          </button>
          <small className="group-hover:opacity-100 opacity-0 bg-green-100 text-green-800 px-2 py-1 rounded font-medium absolute w-max bottom-[-110%]">
            {actionType}
          </small>
        </div>
      ))}
    </div>
  );
};

export default ControlButtons;
