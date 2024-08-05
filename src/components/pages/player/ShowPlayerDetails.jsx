import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../../../App.css';
import axios from 'axios';

function ShowPlayerDetails(props) {
  const [player, setPlayer] = useState({});
  const [matches, setMatches] = useState({})

  //move to general utility function
  const [players, setPlayers] = useState({})

  const {id} = useParams();

  useEffect(() => {
    axios
      .get(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players/${id}`)
      .then((res) => {
        setPlayer(res.data);
      })
      .catch(() => {
        console.log('Error from ShowPlayerDetails');
      });
    axios
      .get(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players/${id}/stats`)
      .then((res) => {
        // console.log(Object.keys(res.data))
        setMatches(res.data)
      });
    axios
      .get(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players/`)
      .then((res) => {
        // console.log(Object.keys(res.data))
        setPlayers(res.data)
      })
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players/${id}`)
      .then(() => {
        console.log('Error from ShowPlayerDetails_deleteClick');
      });
  };

  const PlayerItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
        <tr>
          <th scope='row'>1</th>
          <td>Name</td>
          <td>{player.name}</td>
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>Discord Username</td>
          <td>{player.discord_username}</td>
        </tr>
        <tr>
          <th scope='row'>3</th>
          <td>Letterboxd Username</td>
          <td>{player.letterboxd_username}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )

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
            <h1 className='display-4 text-center'>Player's Record</h1>
            <p className='lead text-center'>View Player's Info</p>
            <hr/>
            <br/>
          </div>
          <div className='col-md-10 m-auto'>{PlayerItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(player._id);
              }}
            >
              Delete Player
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-player/${player._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Player
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowPlayerDetails;