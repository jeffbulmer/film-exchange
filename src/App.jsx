import reactLogo from "./assets/react.svg";
import "./App.css";

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPlayers} from "./features/players/playerSlice";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getPlayers());
    },
    [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="logo react" alt="React logo"/>

        <h1>Hello from Amplify</h1>
      </header>
    </div>
  );
}

export default App;
