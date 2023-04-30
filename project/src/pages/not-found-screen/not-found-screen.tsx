import { Link } from 'react-router-dom';

export default function NotFoundScreen(): JSX.Element {
  return (
    <section className="container" style={{textAlign: 'center'}}>
      <h1> Page Not Found </h1>

      <Link to="/"> Go to Home </Link>

    </section>
  );
}
