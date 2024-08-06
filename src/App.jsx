import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css";

import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPlayers} from "./features/players/playerSlice";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import ShowPlayerList from "./components/pages/player/ShowPlayerList";
import UpdatePlayerInfo from "./components/pages/player/UpdatePlayerInfo";
import CreatePlayer from "./components/pages/player/CreatePlayer";
import ShowPlayerDetails from "./components/pages/player/ShowPlayerDetails";
import ShowMonthsList from "./components/pages/match/ShowMonthsList";
import ShowMatchList from "./components/pages/match/ShowMatchList";
import ShowMatchDetails from "./components/pages/match/ShowMatchDetails";
import CreateMatch from "./components/pages/match/CreateMatch";
import CreateMonth from "./components/pages/match/CreateMonth";
import CreateExchange from "./components/pages/exchange/CreateExchange";
import MovieSearch from "./components/pages/player/MovieSearch";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getPlayers());
    },
    [])

  return (
    <Router>
      <div>
        <Navigation/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/players/' element={<ShowPlayerList/>}/>
          <Route path='/players/edit-player/:id' element={<UpdatePlayerInfo/>}/>
          <Route path='/players/create-player' element={<CreatePlayer/>}/>
          <Route path='/players/show-player/:id' element={<ShowPlayerDetails/>}/>
          <Route exact path='/match/' element={<ShowMonthsList/>}/>
          <Route path='/match/show-match/:month/:year' element={<ShowMatchList/>}/>
          <Route path='/match/show-match/:id' element={<ShowMatchDetails/>}/>
          <Route path='/match/create-match' element={<CreateMatch/>}/>
          <Route path='/match/create-month' element={<CreateMonth/>}/>
          <Route path='/newExchange' element={<CreateExchange/>}/>
          <Route path='/movies/search' element={<MovieSearch/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
