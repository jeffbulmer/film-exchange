import '../../App.css';

const MonthCard = (props) => {
  const month = props.month._id;
  console.log(month);

  return (
    <div className='card-container'>
      {/*<Card variant="outlined">*/}
      {/*    <Link to={`/match/show-match/${month.month}/${month.year}`}>{month.month}, {month.year}</Link>*/}
      {/*</Card>*/}
      {/*<img*/}
      {/*    src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'*/}
      {/*    alt='Month'*/}
      {/*    height={200}*/}
      {/*/>*/}
      {/*<div className='desc'>*/}
      {/*    <h2>*/}
      {/*        <Link to={`/match/show-match/${month.month}/${month.year}`}>{month.month}, {month.year}</Link>*/}
      {/*    </h2>*/}
      {/*</div>*/}
    </div>
  );
};

export default MonthCard;