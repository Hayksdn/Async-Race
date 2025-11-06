import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/shared/components/layout/layout';
import axios from 'axios';
import Garage from './garage';
import Winners from './winners';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Garage />} />
          <Route path="/winners" element={<Winners />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
