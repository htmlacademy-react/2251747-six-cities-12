import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import FavoriteEmptyScreen from './favorites-empty';
import { render, screen } from '@testing-library/react';

describe('Copmonent FavoriteEmptyScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <FavoriteEmptyScreen />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
