import { Provider } from "react-redux";
import { ColorModeProvider } from "./contexts/ThemeContext";
import store from "./store.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";

const query_client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    }
  }
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={query_client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ColorModeProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/auth' element={<LoginPage />} />
              <Route path="/notes" element={<HomePage />} />
              <Route index element={<Navigate to="auth" />} />
            </Routes>
          </BrowserRouter>
        </ColorModeProvider>
      </QueryClientProvider>
    </Provider>
  );

}

export default App
