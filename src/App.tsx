import { Provider } from "react-redux";
import { ColorModeProvider } from "./contexts/ThemeContext";
//import HomePage from "./pages/HomePage";
import store from "./store.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
          {/* <HomePage /> */}
          <LoginPage />
        </ColorModeProvider>
      </QueryClientProvider>
    </Provider>
  );

}

export default App
