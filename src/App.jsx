import "./App.scss";
import { Header } from "./components/molecules/Header/Header";
import { ThemeToggle } from "./components/molecules/ThemeToggle/ThemeToggle";
import { TictactoeTable } from "./components/organisms/TictactoeTable/TictactoeTable";
import { HistoryProvider } from "./context/HistoryContext";

function App() {
  return (
    <HistoryProvider>
      <div className="App">
        <Header />
        <TictactoeTable />
        <ThemeToggle />
      </div>
    </HistoryProvider>
  );
}

export default App;
