import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/layout/PageTransition";
import { PrinterLoader } from "./components/ui/PrinterLoader";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { MakerDashboardLayout } from "./components/layout/MakerDashboardLayout";

const Home = lazy(() => import("./pages/Home"));
const ProductCatalog = lazy(() => import("./pages/Products/ProductCatalog"));
const MakerCatalog = lazy(() => import("./pages/Makers/MakerCatalog"));
const MakerProfile = lazy(() => import("./pages/Makers/MakerProfile"));
const ProductDetails = lazy(() => import("./pages/Products/ProductDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const DashboardStore = lazy(() => import("./pages/Dashboard/Store/index"));
const DashboardProducts = lazy(
  () => import("./pages/Dashboard/Products/index"),
);
const DashboardOrders = lazy(() => import("./pages/Dashboard/Orders/index"));
const DashboardRequests = lazy(
  () => import("./pages/Dashboard/Requests/index"),
);

const DashboardOrderDetails = lazy(
  () => import("./pages/Dashboard/Orders/OrderDetails"),
);

const DashboardRequestDetails = lazy(
  () => import("./pages/Dashboard/Requests/RequestDetails"),
);

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
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <Login />
                </PageTransition>
              </Suspense>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <MakerDashboardLayout>
                  <Suspense fallback={<PageLoader />}>
                    <PageTransition>
                      <Dashboard />
                    </PageTransition>
                  </Suspense>
                </MakerDashboardLayout>
              }
            />
            <Route
              path="/dashboard/store"
              element={
                <MakerDashboardLayout>
                  <Suspense fallback={<PageLoader />}>
                    <PageTransition>
                      <DashboardStore />
                    </PageTransition>
                  </Suspense>
                </MakerDashboardLayout>
              }
            />
            <Route
              path="/dashboard/products"
              element={
                <MakerDashboardLayout>
                  <Suspense fallback={<PageLoader />}>
                    <PageTransition>
                      <DashboardProducts />
                    </PageTransition>
                  </Suspense>
                </MakerDashboardLayout>
              }
            />
            <Route
              path="/dashboard/orders"
              element={
                <MakerDashboardLayout>
                  <Suspense fallback={<PageLoader />}>
                    <PageTransition>
                      <DashboardOrders />
                    </PageTransition>
                  </Suspense>
                </MakerDashboardLayout>
              }
            />
            <Route
              path="/dashboard/orders/:id"
              element={
                <MakerDashboardLayout>
                  <Suspense fallback={<PageLoader />}>
                    <PageTransition>
                      <DashboardOrderDetails />
                    </PageTransition>
                  </Suspense>
                </MakerDashboardLayout>
              }
            />
            <Route
              path="/dashboard/requests"
              element={
                <MakerDashboardLayout>
                  <Suspense fallback={<PageLoader />}>
                    <PageTransition>
                      <DashboardRequests />
                    </PageTransition>
                  </Suspense>
                </MakerDashboardLayout>
              }
            />
            <Route
              path="/dashboard/requests/:id"
              element={
                <MakerDashboardLayout>
                  <Suspense fallback={<PageLoader />}>
                    <PageTransition>
                      <DashboardRequestDetails />
                    </PageTransition>
                  </Suspense>
                </MakerDashboardLayout>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};
