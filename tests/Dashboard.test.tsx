import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Dashboard from '../src/components/Dashboard';
import NodeGraph from '../src/components/NodeGraph';
import SearchBar from '../src/components/SearchBar';

jest.doMock('../src/components/SearchBar', () => () => (
  <div>SearchBar mock</div>
));

describe('Dashboard', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Dashboard category="software" serverOn={true} />
    );
    expect(getByText('Draw Again')).toBeInTheDocument(); // use Draw Again to check whether the graph is rendered
  });

  it('renders SearchBar', () => {
    const { container } = render(
      <SearchBar />
    );
    expect(container.querySelector('#search-bar')).toBeInTheDocument();
  });
});
