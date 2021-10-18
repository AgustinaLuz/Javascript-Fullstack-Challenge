import "./App.css";
import Header from "./components/Header/header";
import Entries from "./components/entries";
import Amount from "./components/amount";

function App() {
  return (
    <div>
      <Header/>
      <Amount/>
      <Entries/>
    </div>
  );
}
export default App;
