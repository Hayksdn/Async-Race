import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GaragePage from './garage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GaragePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
