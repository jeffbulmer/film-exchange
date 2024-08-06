import {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import DatePicker from "react-datepicker";
import MatchCard from "../../cards/MatchCard";

const getAllMembers = async () => {
  try {
    // use data destructuring to get data from the promise object
    const {data: response} = await axios.get('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/players');
    return response;
  } catch (error) {
    console.log(error);
  }
};

const CreateMonth = (props) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [nextMatch, setNextMatch] = useState({
    members: [],
    month: getMonth(date.getMonth()),
    year: date.getFullYear(),
  });
  const [matches, setMatches] = useState([]);

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

    setNextMatch({
      ...nextMatch,
      month: m,
      year: e.getFullYear()
    })

    setDate(e);
  }

  useEffect(() => {
    getAllMembers().then(data => {
        const options = data.map((member) => {
          return {value: member._id, label: member.name}
        })
        setMembers(Array.from(new Set(options)));
      }
    );

  }, [])

  const onSubmitMatch = (e) => {
    e.preventDefault();
    setMatches([
      ...matches,
      nextMatch
    ]);

    setMembers(
      members.filter((member) => {
        return !(member.value in nextMatch.members)
      })
    )
    var membersUpdates = members;
    nextMatch.members.forEach(function (p) {
      membersUpdates = membersUpdates.filter(member => member.value !== p);
    });

    console.log(membersUpdates)

    setMembers(membersUpdates);

    setNextMatch({
      members: [],
      month: getMonth(date.getMonth()),
      year: date.getFullYear(),
    })

    console.log(matches)
    console.log(members)
  }

  const onSubmitAll = (e) => {
    e.preventDefault();

    let finalMatches = matches.filter((match) => {
      return match.members.length > 1
    })

    finalMatches.forEach(match => {
      match.month = nextMatch.month
      match.year = nextMatch.year
    })

    console.log(finalMatches);
    finalMatches.forEach((match) =>
      axios.post('https://if7v5jmdpn56xum7yismhkpwhi0vtgks.lambda-url.us-east-1.on.aws/api/match', match)
    )

    navigate("/match");
  }
  const matchList =
    matches.length === 0
      ? 'there is no match record!'
      : matches.map((match, k) => <MatchCard match={match} showTime={false} key={k}/>);

  return (
    <div className='CreateMonth'>
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
          <form noValidate onSubmit={onSubmitMatch}>
            <Select
              defaultValue={[]}
              isMulti
              name="players"
              options={members}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(choice) => setNextMatch({
                ...nextMatch,
                members: (choice).map((member) => {
                  return member.value;
                })
              })}
              isOptionDisabled={() => nextMatch.members.length >= 3}
            />
            <br/>
            <DatePicker
              selected={date}
              onChange={dateOnChange}
            />
            <br/>
            <input
              type='submit'
              className='btn btn-outline-warning btn-block mt-4'
            />
          </form>

        </div>
        <div>
          <button
            type='button'
            onClick={onSubmitAll}
          >Click Me
          </button>
        </div>
      </div>
      <div className='list'>{matchList}</div>
    </div>
  )
}

export default CreateMonth;