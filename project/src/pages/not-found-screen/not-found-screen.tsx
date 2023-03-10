import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Page Not Found </h1>
      <p style={{textAlign:'center'}}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
}
export default NotFoundScreen;
