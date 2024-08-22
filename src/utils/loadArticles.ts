const importAll = (context: __WebpackModuleApi.RequireContext) => {
  return context.keys().map((key) => {
    return { url: key, staticUrl: context(key) as string };
  });
}

const importAllFilesAndFetchContents = async (): Promise<{ url: string; content: string }[]> => {
  const markdownFiles = importAll(require.context('../posts-submodule/', true, /\.md$/));
  const fetchPromises = (markdownFiles as { url: string; staticUrl: string; }[]).map((markdownFile) =>
    fetch(markdownFile.staticUrl).then(response => response.text().then(content => ({ url: markdownFile.url.replace('.md', '').replace('.', ''), content })))
  );
  const fileContents = await Promise.all(fetchPromises);
  return fileContents;
};

export {
  importAllFilesAndFetchContents,
};
