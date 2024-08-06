import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {selectPlayers} from "../../../features/players/playerSlice";
import {useSelector} from "react-redux";
import {Stack} from "@mui/material";
import ParticipantCard from "../../cards/ParticipantCard";

function ShowMatchDetails(props) {
  const [match, setMatch] = useState({});
  const [partners, setPartners] = useState([])
  const [recommendations, setRecommendations] = useState([])

  const {id} = useParams();

  const players = useSelector(selectPlayers);

  const display = () => {
    console.log(recommendations)
  }

  useEffect(() => {
    axios
      .get(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/match/${id}`)
      .then((res) => {
        setMatch(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowMatchDetails');
      })
  }, [])

  useEffect(() => {
    let temp = [];

    if (match.members !== undefined) {
      players.players.forEach((player) => {
        if (match.members.includes(player._id)) {
          temp.push(player)
        }
      })
    }

    if (temp.length > 0 && partners.length === 0)
      setPartners(temp)

  }, [match.members, players.players])

  const handleRecChange = (id, value) => {
    const newRec = {
      watcher: id,
      movies: value
    }
    let formatted = {}
    newRec.movies.forEach((movie) => {
      // const recommender =
      //   (movie.hasOwnProperty("recommender")) ? movie.recommender : partners.filter((value) => {
      //     return value !== newRec.watcher
      //   })[0]
      const rec = {
        id: movie.id,
        title: movie.title,
        poster: movie.poster
      }
      if (formatted.hasOwnProperty(movie.recommender))
        formatted[movie.recommender].push(rec)
      else
        formatted[movie.recommender] = [rec]
    })

    let final = []
    for (const [key, value] of Object.entries(formatted)) {
      final.push({
        watcher: id,
        recommender: key,
        movies: value
      })
    }

    let recommendationsCopy = [...recommendations]
    final.forEach((entry) => {
      let updated = (entry.recommender === undefined || entry.recommender === "undefined");
      for (let i = 0; i < recommendationsCopy.length; i++) {
        if (entry.recommender === undefined || entry.recommender === "undefined") {
          updated = true;
        } else if (recommendationsCopy[i].watcher === entry.watcher &&
          recommendationsCopy[i].recommender === entry.recommender) {
          recommendationsCopy[i] = entry;
          updated = true;
        }
      }
      if (!updated) recommendationsCopy.push(entry);
    })

    console.log(recommendationsCopy)
    setRecommendations(recommendationsCopy)
  }

  const playerList =
    partners.length === 0
      ? 'there is no player record!'
      : partners.map((player, k) =>
        ParticipantCard({
          onChange: handleRecChange,
          player: player,
          key: k,
          partners: partners.filter(value => value._id !== player._id)
        }));

  return (
    <div className='ShowPlayerDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br/> <br/>
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Player List
            </Link>
          </div>
          <br/>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Partners for {match.month}, {match.year}</h1>
            <hr/>
            <button onClick={display}>Click Me</button>
            <br/>
          </div>
          <Stack direction="row" sx={{"width": "100%"}}>
            {playerList}
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default ShowMatchDetails;