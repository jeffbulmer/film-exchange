import {Link} from 'react-router-dom';
import '../../App.css';
import {Avatar, Container} from "@mui/material";
import MovieSearch from "../pages/player/MovieSearch";

const ParticipantCard = (props) => {
  const player = props.player;
  const key = props.key;
  const partners = props.partners;

  // const [films, setFilms] = useState([])

  const handleRecommendationsChange = (value) => {
    props.onChange(player._id, value)
  }

  return (
    <Container
      key={key}
      maxWidth={"lg"}
      style={{"textAlign": "-webkit-center"}}>
      <div className='desc'>
        <Avatar alt={player.name} src={`/images/${player._id}.jpg`}/>
        <h2>
          <Link to={`/players/show-player/${player._id}`}>{player.name}</Link>
        </h2>

        {/*<button onClick={display}>Click Me</button>*/}
        <MovieSearch
          rChange={handleRecommendationsChange}
          id={player._id}
          watcher={props.player.name}
          partners={partners}/>
      </div>
    </Container>
  );
};

export default ParticipantCard;