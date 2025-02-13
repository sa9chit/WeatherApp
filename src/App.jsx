import "./App.css";
import { Header } from "./Header";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Hero /> */}
    </div>
  );
}

export default App;
