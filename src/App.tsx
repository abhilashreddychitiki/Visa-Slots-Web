import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Pricing from './pages/Pricing';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Layout>
      <Analytics />
    </Router>
  );
}

export default App;
