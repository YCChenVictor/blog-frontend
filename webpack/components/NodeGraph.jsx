import React, { useMemo, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

function NodeGraph() {
  const endpoint = document.querySelector('#endpoint');
  const baseurl = document.querySelector('#base');
  const url = `${endpoint.textContent}${baseurl.textContent}`;

  const [data, setData] = useState({nodes: [], links: []});
  useEffect(() => {
    fetch(`${url}/articles`)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articlesNode = doc.querySelector('#articles');
        const articles = Array.from(articlesNode.querySelectorAll('div')).filter(div => div.querySelector('div'));
        return articles
      })
      .then(articles => {
        const data = {
          nodes: articles.map(article => ({
              id: article.getAttribute('id'),
              name: article.getAttribute('id'),
              href: article.querySelector('a').getAttribute('href')
            })
          ),
          links: articles.map(article => ({ // add the links further
              source: article.getAttribute('id'),
              target: article.getAttribute('id'),
            })
          )
        }
        setData(data)
      })
  }, [])

  const handleNodeClick = (node) => { // click and redirect to the href
    window.location.href = node.href;
  };

  return(
    <ForceGraph2D // draw it with 2D graph with the nodes and links
      graphData={data}
      onNodeClick={handleNodeClick}
    />
  )
}

export default NodeGraph;
