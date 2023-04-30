import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import LoadingScreen from './loading';
import { render, screen } from '@testing-library/react';

describe('Component LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <LoadingScreen />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
