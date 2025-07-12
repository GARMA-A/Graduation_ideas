import { ColorModeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";
// import HomePage from "./pages/HomePage";


function App() {
  return (
    <ColorModeProvider>
      <HomePage />
    </ColorModeProvider>
  );

}

export default App
