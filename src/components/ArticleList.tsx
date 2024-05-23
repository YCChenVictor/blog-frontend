import * as React from 'react';

interface ArticleSettings {
  [key: string]: {
    url: string;
    category: string;
  };
}

const ArticleList = ({
  articleSettings
}: {
  articleSettings: ArticleSettings;
}) => {
  const modifiedObject = Object.values(articleSettings).map((value, key) => {
    return (
      <div>
        <a key={key} href={value['url']}>
          {value['category']}
          {value['url']}
        </a>
      </div>
    );
  });
  return <div>{modifiedObject}</div>;
};

export default ArticleList;
