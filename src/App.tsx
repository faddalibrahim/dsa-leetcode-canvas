// libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// utils
import { HOME_PAGE, SLIDING_WINDOW, PAGE_NOT_FOUND } from "@/utils/routes";
import SlidingWindow from "@/pages/patterns/sliding_window/SlidingWindow";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={HOME_PAGE} element={<>Home</>} />
        <Route path={SLIDING_WINDOW} element={<SlidingWindow />} />
        <Route path={PAGE_NOT_FOUND} element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
