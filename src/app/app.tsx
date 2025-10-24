import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/shared/components/layout/layout';
import axios from 'axios';
import Garage from './garage';

axios.defaults.baseURL = 'http://localhost:3000/';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Garage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
