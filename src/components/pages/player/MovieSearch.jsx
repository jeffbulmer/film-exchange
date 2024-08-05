import {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import {MenuItem, Select} from "@mui/material";

function MovieSearch(props) {

  const partners = props.partners;

  const [myOptions, setMyOptions] = useState([])

  const [selection, setSelection] = useState([])

  const [recommendations, setRecommendations] = useState([])
  const [ids, setIds] = useState([])

  const handleChange = (event) => {
    const {value} = event.currentTarget;

    axios
      .post('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/movies/search', {query: value})
      .then((res) => {
        setMyOptions(res.data.results);
      })
      .catch(() => {
        console.log('Error from MovieSearch');
      });
  }

  const handleChangeRecommender = (event) => {
    // console.log(event.target)
    const newRecs = recommendations.map((value) => {
      if (value.id === event.target.name) {
        // console.log({...value, recommender: event.target.value})
        return {...value, recommender: event.target.value}
      } else
        return {...value}
    })
    setRecommendations(newRecs)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/movies/get/' + selection.value)
      .then((res) => {
        if (res.data.success === false) {
          console.log("Invalid movie selected!")
        } else {
          if (ids.includes("" + res.data.id))
            console.log("Movie has already been recommended!")
          else {
            setIds([
              ...ids, "" + res.data.id
            ])
            setRecommendations([
              ...recommendations,
              {
                id: "" + res.data.id,
                title: res.data.title,
                poster: res.data.poster_path
              }
            ])
          }
        }
      })
      .catch((err) => {
        console.log('Error from MovieSearch onSubmit')
        console.log(err)
      })
  }

  useEffect(() => {
    props.rChange(recommendations)
  }, [recommendations])

  const partnerOptions =
    partners.map((partner, k) => {
      return <MenuItem value={partner._id} key={k}>{partner.name}</MenuItem>
    })

  const movieList =
    recommendations.length === 0
      ? 'there are no recommendations!'
      : recommendations.map((movie, k) => {
        return <div className={"recommendation"} key={k}>
          <h2 key={"" + movie.id}>{movie.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w185${movie.poster}`}/>
          <h3>Recommended by
            <Select
              name={"" + movie.id}
              // value={""}
              onChange={handleChangeRecommender}>
              {partnerOptions}
            </Select>
          </h3>
        </div>
        // ParticipantCard({player: player})
      });


  return (
    <div>
      <form noValidate onSubmit={onSubmit}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={myOptions.map((option) => {
              return {
                label: option.title,
                value: option.id,
              }
            }
          )}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.value} value={option.value}>
                {option.label}
              </li>
            );
          }}
          onChange={(event, value) => setSelection(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Recommend a film to " + props.watcher}
              name={"movieSearch"}
              value={""}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              onChange={handleChange}
            />
          )}
        />
        <input
          type='submit'
          className='btn btn-outline-warning btn-block mt-4'
        />
      </form>
      {movieList}

    </div>
  );
}

export default MovieSearch;

