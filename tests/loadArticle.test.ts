// loadArticles.test.ts
import { importAllFilesAndFetchContents } from '../src/utils/loadArticles';

describe('importAllFilesAndFetchContents', () => {
  it('should fetch contents of all markdown files', async () => {
    const result = await importAllFilesAndFetchContents();

    expect(result).toEqual([
      { url: 'test1', content: '# Test 1\nThis is the content of test1.md.' },
      { url: 'test2', content: '# Test 2\nThis is the content of test2.md.' },
    ]);
  });
});
