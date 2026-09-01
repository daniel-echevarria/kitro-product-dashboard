import { Routes, Route } from 'react-router-dom';
import { OverviewPage } from './pages/Overview';
import { ProductsPage } from './pages/Products';
import { Layout } from './layout';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
