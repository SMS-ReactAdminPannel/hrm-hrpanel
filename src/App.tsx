import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./pages/auth/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <>
      <BrowserRouter>
      <PrimeReactProvider>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AuthProvider>
      </PrimeReactProvider>
      </BrowserRouter>
    </>
  );
}

export default App

