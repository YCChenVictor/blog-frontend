import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ArticleList from '../src/components/ArticleList';

describe('ArticleList', () => {
  it('renders ArticleList component without crashing', () => {
    const articleSettings = {
      article1: { url: 'http://example.com/1', category: 'Category 1' },
      article2: { url: 'http://example.com/2', category: 'Category 2' },
    };

    const component = renderer.create(
        <ArticleList articleSettings={articleSettings} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });
});
