import { Provider } from "react-redux";
import { ColorModeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";
import store from "./store.tsx";
// import HomePage from "./pages/HomePage";

function App() {
  return (
    <Provider store={store}>
      <ColorModeProvider>
        <HomePage />
      </ColorModeProvider>
    </Provider>
  );

}

export default App
