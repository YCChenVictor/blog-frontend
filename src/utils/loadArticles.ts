const importAll = (context: __WebpackModuleApi.RequireContext) => {
  return context.keys().map((key) => {
    return { url: key, staticUrl: context(key) as string };
  });
}

const fetchFileContent = (file: { content: string; filename: string }) => {
  try {
    const content: string = file.content;
    return {
      url: file.filename.replace('.md', ''),
      content
    };
  } catch (error) {
    console.error(`Failed to fetch file content: ${String(error)}`);
    throw error;
  }
};

const importAllFilesAndFetchContents = async (): Promise<{ url: string; content: string }[]> => {
  const markdownFiles = importAll(require.context('../posts-submodule/', true, /\.md$/));
  const fetchPromises = (markdownFiles as { url: string; staticUrl: string; }[]).map((markdownFile) =>
    fetch(markdownFile.staticUrl).then(response => response.text().then(content => ({ url: markdownFile.url, content })))
  );
  const fileContents = await Promise.all(fetchPromises);
  return fileContents;
};

// const importFileAndFetchContent = async (filePath: string) => {
//   const directory = path.resolve(__dirname, '../posts-submodule');
//   const files = fs.readdirSync(directory)
//     .filter((filename) => filename.includes(filePath.replace('../posts-submodule', '')))
//     .map((filename) => createFileObject(directory, filename));
//   const contentPromises = files.map(fetchFileContent);
//   return Promise.all(contentPromises);
// };

// const getArticleUrls = async () => {
//   const directory = path.resolve(__dirname, '../posts-submodule');
//   return fs.readdirSync(directory)
//     .filter((filename) => filename.endsWith('.md') && !filename.includes('in-progress'))
//     .map((filename) => filename.replace('.md', '').replace('.', ''));
// };

export {
  // getArticleUrls,
  importAllFilesAndFetchContents,
  // importFileAndFetchContent
};
