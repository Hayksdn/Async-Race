import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Garage from './garage';
import { Layout } from '@/shared/components/layout/layout';
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
