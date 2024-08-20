const importAll = (r: __WebpackModuleApi.RequireContext) => {
  return r.keys().map(r);
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

const importAllFilesAndFetchContent = () => {
  const modules = importAll(require.context('../posts-submodule/concept', false, /\.md$/));
  const files = Object.keys(modules).map((filename) => ({
    filename,
    content: modules
  }));
  console.log(files);
  debugger
  // const contentPromises = files.map(fetchFileContent);
  // return Promise.all(contentPromises);
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
  importAllFilesAndFetchContent,
  // importFileAndFetchContent
};
