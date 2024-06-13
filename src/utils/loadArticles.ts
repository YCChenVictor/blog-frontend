const fetchFileContent = async (file) => {
  try {
    const response = await fetch(file.content);
    const content = await response.text();
    return {
      url: file.filename.replace('.md', ''),
      content
    };
  } catch (error) {
    console.error(`Failed to fetch file content: ${error}`);
    throw error;
  }
};

const createFileObject = (context, filename) => ({
  filename,
  content: context(filename)
});

const importAllFilesAndFetchContent = async () => {
  const context = require.context('../posts-submodule', true, /\.md$/);
  const files = context
    .keys()
    .map((filename) => createFileObject(context, filename))
    .filter((file) => !file.filename.includes('in-progress'));
  const contentPromises = files.map(fetchFileContent);
  return Promise.all(contentPromises);
};

// should utilize single file import, currently just load all files
const importFileAndFetchContent = async (filePath) => {
  const context = require.context('../posts-submodule', true, /\.md$/);
  const files = context
    .keys()
    .map((filename) => createFileObject(context, filename))
    .filter((file) =>
      file.filename.includes(filePath.replace('../posts-submodule', ''))
    );
  const contentPromises = files.map(fetchFileContent);
  return Promise.all(contentPromises);
};

const articleUrls = require
  .context('../posts-submodule', true, /\.md$/)
  .keys()
  .map((filePath) => {
    return filePath.replace('.md', '').replace('.', '');
  });

export {
  articleUrls,
  importAllFilesAndFetchContent,
  importFileAndFetchContent
};
