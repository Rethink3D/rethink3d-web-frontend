import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AppRoutes } from "./AppRoutes";
import { useState, useEffect } from "react";
import { PrinterLoader } from "./components/ui/PrinterLoader";
import { CookieConsent } from "./components/CookieConsent";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoad) {
    return <PrinterLoader />;
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
