import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/layout/PageTransition";
import { PrinterLoader } from "./components/ui/PrinterLoader";
import { ScrollToTop } from "./components/utils/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const ProductCatalog = lazy(() => import("./pages/Products/ProductCatalog"));
const MakerCatalog = lazy(() => import("./pages/Makers/MakerCatalog"));
const MakerProfile = lazy(() => import("./pages/Makers/MakerProfile"));
const ProductDetails = lazy(() => import("./pages/Products/ProductDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => <PrinterLoader />;

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <Home />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/products"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <ProductCatalog />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/products/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <ProductDetails />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/makers"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <MakerCatalog />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/makers/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <MakerProfile />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <Contact />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <NotFound />
                </PageTransition>
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};
