import fs from 'fs';
import path from 'path';

const fetchFileContent = async (file: { content: string; filename: string }) => {
  try {
    const content: string = fs.readFileSync(file.content, 'utf-8');
    return {
      url: file.filename.replace('.md', ''),
      content
    };
  } catch (error) {
    console.error(`Failed to fetch file content: ${String(error)}`);
    throw error;
  }
};

const createFileObject = (directory: string, filename: string) => ({
  filename,
  content: path.join(directory, filename)
});

const importAllFilesAndFetchContent = async () => {
  const directory = path.resolve(__dirname, '../posts-submodule');
  const files = fs.readdirSync(directory)
    .filter((filename) => filename.endsWith('.md') && !filename.includes('in-progress'))
    .map((filename) => createFileObject(directory, filename));
  const contentPromises = files.map(fetchFileContent);
  return Promise.all(contentPromises);
};

const importFileAndFetchContent = async (filePath: string) => {
  const directory = path.resolve(__dirname, '../posts-submodule');
  const files = fs.readdirSync(directory)
    .filter((filename) => filename.includes(filePath.replace('../posts-submodule', '')))
    .map((filename) => createFileObject(directory, filename));
  const contentPromises = files.map(fetchFileContent);
  return Promise.all(contentPromises);
};

const getArticleUrls = () => {
  const directory = path.resolve(__dirname, '../posts-submodule');
  return fs.readdirSync(directory)
    .filter((filename) => filename.endsWith('.md') && !filename.includes('in-progress'))
    .map((filename) => filename.replace('.md', '').replace('.', ''));
};

const articleUrls = getArticleUrls();

export {
  articleUrls,
  importAllFilesAndFetchContent,
  importFileAndFetchContent
};
