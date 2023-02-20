import React, { useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";

function NodeGraph() {
  const endpoint = document.querySelector('#endpoint');
  const baseurl = document.querySelector('#base');
  const url = `${endpoint.textContent}${baseurl.textContent}`

  let dataTesting;
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
        nodes: [
          articles.map(article => ({
            id: article.getAttribute('id'),
            name: article.getAttribute('id'),
            href: article.querySelector('a').getAttribute('href')
          })
        )],
        links: [
          articles.map(article => ({
            source: article.getAttribute('id'),
            target: article.getAttribute('id'),
          })
        )]
      }
      return data
    })
    .then(data => { // I think I need to understand how to assign variables outside the function (callback hell)
      const graphData = useMemo(() => { // cache the data
        return {
          nodes: data.nodes,
          links: data.links
        };
      }, []);
      console.log(graphData)
    
      // const handleNodeClick = (node) => { // click and redirect to the href
      //   window.location.href = node.href;
      // };
    
      // return(
      //   <ForceGraph2D // draw it with 2D graph with the nodes and links
      //     graphData={graphData}
      //     onNodeClick={handleNodeClick}
      //   />
      // )
    })

  // console.log(dataTesting)

  // // console.log('testing!!!')
  // const data = { // the data structure required for node graph
  //   nodes: [
  //     {
  //       id: "0",
  //       isClusterNode: true,
  //       name: "project, idea, user",
  //       size: 9.785932721712538,
  //       href: `${url}/0_self/1993/09/01/software.html`
  //     },
  //     {
  //       id: "project",
  //       name: "project",
  //       centrality: 0.10021091790578693,
  //       degrees: 35,
  //       href: "http://127.0.0.1:4000/blog/0_self/project.html"
  //     },
  //     {
  //       id: "idea",
  //       name: "idea",
  //       centrality: 0.03469693187854244,
  //       degrees: 29,
  //       href: "http://127.0.0.1:4000/blog/0_self/idea.html"
  //     },
  //     {
  //       id: "user",
  //       name: "user",
  //       centrality: 0.025406514132413013,
  //       degrees: 27,
  //       href: "http://127.0.0.1:4000/blog/0_self/user.html"
  //     },
  //   ],
  //   links: [
  //     {
  //       source: "0",
  //       target: "0"
  //     },
  //   ]
  // };

  // const graphData = useMemo(() => { // cache the data
  //   return {
  //     nodes: data.nodes,
  //     links: data.links
  //   };
  // }, []);

  // const handleNodeClick = (node) => { // click and redirect to the href
  //   window.location.href = node.href;
  // };

  // return(
  //   <ForceGraph2D // draw it with 2D graph with the nodes and links
  //     graphData={graphData}
  //     onNodeClick={handleNodeClick}
  //   />
  // )
}

export default NodeGraph;
