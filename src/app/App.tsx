import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Garage from './garage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Garage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
