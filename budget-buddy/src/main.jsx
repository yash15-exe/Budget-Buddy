import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AllRecords from "./pages/AllRecords.jsx";
import AddFinanceRecord from "./components/AddFinanceRecord.jsx";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./pages/Layout.jsx";
import { Provider } from "react-redux";
import {store,persistor} from "./store/store.js";
import LoginForm from "./components/LoginForm.jsx";
import NotFound from "./components/NotFound.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="all-records" element={<AllRecords />} />
      <Route path="add-records" element={<AddFinanceRecord />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
