interface MarkdownFile { url: string; staticUrl: string };

const importAll = (context: __WebpackModuleApi.RequireContext) => {
  return context.keys().map((key) => {
    return { url: key, staticUrl: context(key) as string };
  });
}

const fetchMarkdownContent = async (markdownFile: { url: string; staticUrl: string; }): Promise<{ url: string; content: string }> => {
  const response = await fetch(markdownFile.staticUrl);
  const content = await response.text();
  return { url: markdownFile.url.replace('.md', '').replace('.', ''), content };
};

const importAllFilesAndFetchContents = async (markdownFiles: MarkdownFile[]): Promise<{ url: string; content: string }[]> => {
  // const markdownFiles = importAll(require.context('../posts-submodule/', true, /\.md$/));
  const fetchPromises = (markdownFiles as { url: string; staticUrl: string; }[]).map(fetchMarkdownContent);
  const fileContents = await Promise.all(fetchPromises);
  return fileContents;
};

export {
  importAllFilesAndFetchContents,
};

// interface MarkdownFile { url: string; staticUrl: string };

// const fetchMarkdownContent = async (markdownFile: MarkdownFile): Promise<{ url: string; content: string }> => {
//   const response = await fetch(markdownFile.staticUrl);
//   const content = await response.text();
//   return { url: markdownFile.url.replace('.md', '').replace('.', ''), content };
// };

// const importAllFilesAndFetchContents = async (markdownFiles: MarkdownFile[]): Promise<{ url: string; content: string }[]> => {
//   const fetchPromises = markdownFiles.map(fetchMarkdownContent);
//   const fileContents = await Promise.all(fetchPromises);
//   return fileContents;
// };

// export {
//   importAllFilesAndFetchContents,
// };

