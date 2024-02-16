import Icons from "@/components/icons/Icons";

export const EXPAND = "expand";
export const COLLAPSE = "collapse";
export const SLIDE = "slide";
export const UNDO = "undo";
export const REDO = "redo";
export const RESET = "reset";

const Controls = [
  {
    icon: <Icons.CollapseWindow />,
    actionType: COLLAPSE,
  },
  {
    icon: <Icons.ExpandWindow />,
    actionType: EXPAND,
  },
  {
    icon: <Icons.SlideWindow />,
    actionType: SLIDE,
  },
  {
    icon: <Icons.Undo />,
    actionType: UNDO,
  },
  {
    icon: <Icons.Redo />,
    actionType: REDO,
  },
  {
    icon: <Icons.Reset />,
    actionType: RESET,
  },
];

export default Controls;
