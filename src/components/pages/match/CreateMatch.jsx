import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

//put into general spot to be reused
const getAllMembers = async () => {
  try {
    // use data destructuring to get data from the promise object
    const {data: response} = await axios.get('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players');
    return response;
  } catch (error) {
    console.log(error);
  }
};

const CreateMatch = (props) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [match, setMatch] = useState({
    members: [],
    month: '',
    year: 0,
  });

  useEffect(() => {
    getAllMembers().then(data => {
        const options = data.map((member) => {
          return {value: member._id, label: member.name}
        })
        setMembers(Array.from(new Set(options)));
      }
    );

  }, [])

  function getMonth(m) {
    switch (m) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "Unknown";
    }
  }

  const dateOnChange = (e) => {
    const m = getMonth(e.getMonth());

    setMatch({
      ...match,
      month: m,
      year: e.getFullYear()
    })

    setDate(e);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(match)

    axios.post('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/match', match)
      .then((res) => {
        setMatch({
          ...match,
          members: [],
        });

        navigate("/match/create-match");
      })
      .catch((err) => {
        console.log("Error in CreateMatch!");
      });


  };

  return (
    <div className='CreateMatch'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br/>
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Match List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Match</h1>
            <p className='lead text-center'>Create New Match</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                {/*<input*/}
                {/*    type='text'*/}
                {/*    placeholder='Player IDs'*/}
                {/*    name='members'*/}
                {/*    className='form-control'*/}
                {/*    value={match.members}*/}
                {/*    onChange={onChange}*/}
                {/*    />*/}
                <Select
                  defaultValue={[]}
                  isMulti
                  name="players"
                  options={members}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(choice) => setMatch({
                    ...match,
                    members: (choice).map((member) => {
                      return member.value;
                    })
                  })}
                  isOptionDisabled={() => match.members.length >= 3}
                />
              </div>
              <br/>
              <DatePicker
                selected={date}
                onChange={dateOnChange}
              />
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
}

export default CreateMatch;