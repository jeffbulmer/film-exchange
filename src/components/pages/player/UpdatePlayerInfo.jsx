import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from "axios";
import '../../../App.css'

function UpdatePlayerInfo() {
    const [player, setPlayer] = useState({
        name: '',
        discord_username: '',
        letterboxd_username: ''
    });

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8082/api/players/${id}`)
            .then((res) => {
                setPlayer({
                    name: res.data.name,
                    discord_username: res.data.discord_username,
                    letterboxd_username: res.data.letterboxd_username,
                });
            })
            .catch(() => {
                console.log('Error from UpdatePlayerInfo');
            });
    }, [id]);

    const onChange = (e) => {
        setPlayer({...player, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: player.name,
            discord_username: player.discord_username,
            letterboxd_username: player.letterboxd_username
        };

        axios
            .put(`https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players/${id}`, data)
            .then(() => {
                navigate(`/show-player/${id}`);
            })
            .catch(() => {
                console.log('Error in UpdatePlayerInfo');
            });
    };

    return (
        <div className='UpdatePlayerInfo'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br/>
                        <Link to='/' className='btn btn-outline-warning float-left'>
                            Show Player List
                        </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Edit Player</h1>
                        <p className='lead text-center'>Update Player's Info</p>
                    </div>
                </div>

                <div className='col-md-8 m-auto'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                placeholder='Name of the Player'
                                name='name'
                                className='form-control'
                                value={player.name}
                                onChange={onChange}
                            />
                        </div>
                        <br/>

                        <div className='form-group'>
                            <label htmlFor='discord_username'>Discord Username</label>
                            <input
                                type='text'
                                placeholder='Discord Username'
                                name='discord_username'
                                className='form-control'
                                value={player.discord_username}
                                onChange={onChange}
                            />
                        </div>
                        <br/>

                        <div className='form-group'>
                            <label htmlFor='letterboxd_username'>Letterboxd Username</label>
                            <input
                                type='text'
                                placeholder='Letterboxd Username'
                                name='letterboxd_username'
                                className='form-control'
                                value={player.letterboxd_username}
                                onChange={onChange}
                            />
                        </div>
                        <br/>

                        <button
                            type='submit'
                            className='btn btn-outline-info btn-lg btn-block'
                        >
                            Update Player
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePlayerInfo;