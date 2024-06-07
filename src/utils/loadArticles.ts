const fetchFileContent = async (file) => {
  const response = await fetch(file.content);
  const content = await response.text();
  return {
    url: file.filename.replace('.md', ''),
    content
  };
};

const importAllFilesAndFetchContent = async (
  filePath: string | null = null
) => {
  const context = require.context('../posts-submodule', true, /\.md$/);
  let files;
  if (!filePath) {
    files = context
      .keys()
      .map((filename) => {
        return {
          filename,
          content: context(filename)
        };
      })
      .filter((file) => !file.filename.includes('in-progress'));
  } else {
    files = [
      {
        filename: filePath,
        content: context(filePath)
      }
    ];
  }
  const contentPromises = files.map(fetchFileContent);
  return Promise.all(contentPromises);
};

const fileUrls = require
  .context('../posts-submodule', true, /\.md$/)
  .keys()
  .map((filePath) => {
    return filePath.replace('.md', '');
  });

export { fileUrls, importAllFilesAndFetchContent };
