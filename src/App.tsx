import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AppRoutes } from "./AppRoutes";
import { CookieConsent } from "./components/CookieConsent";
import Maintenance from "./pages/Maintenance/Maintenance";

function App() {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

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
