import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screen';


describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>,
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
  });
});
