import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AppRoutes } from "./AppRoutes";
import { CookieConsent } from "./components/CookieConsent";

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
      <CookieConsent />
    </Router>
  );
}

export default App;
