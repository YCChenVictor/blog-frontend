import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Dashboard from '../src/components/Dashboard';
import NodeGraph from '../src/components/NodeGraph';
import SearchBar from '../src/components/SearchBar';
import { TextEncoder, TextDecoder } from 'util';

jest.doMock('../src/components/NodeGraph', () => {
  return () => <div>NodeGraph mock</div>;
});
jest.doMock('../src/components/SearchBar', () => () => (
  <div>SearchBar mock</div>
));
jest.mock('../src/data/software/nodeGraph.json', () => ({ test: 'test' }));

describe('Dashboard', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Dashboard category="software" loggedIn={true} />
    );
    expect(getByText('Draw Again')).toBeInTheDocument(); // use Draw Again to check whether the graph is rendered
  });

  it('renders NodeGraph', () => {
    const { container } = render(
      <Dashboard category="software" loggedIn={true} />
    );
    expect(container.querySelector('#node-graph')).toBeInTheDocument();
  });

  it('renders SearchBar', () => {
    const { container } = render(
      <Dashboard category="software" loggedIn={true} />
    );
    expect(container.querySelector('#search-bar')).toBeInTheDocument();
  });
});
