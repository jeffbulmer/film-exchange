import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {useNavigate} from 'react-router-dom';

const CreatePlayer = () => {
    const navigate = useNavigate();
    const [player, setPlayer] = useState({
        name: '',
        discord_username: '',
        letterboxd_username: '',
    });

    const onChange = (e) => {
        setPlayer({...player, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //TODO: store this url somewhere else.
        axios.post('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players', player)
            .then(() => {
                setPlayer({
                    name: '',
                    discord_username: '',
                    letterboxd_username: '',
                });

                navigate("/players/");
            })
            .catch(() => {
                console.log('Error in CreatePlayer!');
            });
    };

    return (
        <div className='CreatePlayer'>
            <div className='container'>
                <div className={"page-title"}>
                    <br/>
                    <Link to='/' className='btn btn-outline-warning float-left'>
                        Show Player List
                    </Link>
                    <h1 className='display-4 text-center'>Add Player</h1>
                </div>
                <div className='row'>

                    <div className='col-md-8 m-auto'>

                        <p className='lead text-center'>Create New Player</p>

                        <form noValidate onSubmit={onSubmit}>
                            <div className='form-group'>
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
                                <input
                                    type='text'
                                    placeholder='Letterboxd Account'
                                    name='letterboxd_username'
                                    className='form-control'
                                    value={player.letterboxd_username}
                                    onChange={onChange}
                                />
                            </div>
                            <input
                                type='submit'
                                className='btn btn-outline-warning btn-block mt-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlayer;