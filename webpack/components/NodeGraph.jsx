// import React, { useMemo, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

function NodeGraph() {
  const nodes = [
    { id: 1, name: 'Node 1' },
    { id: 2, name: 'Node 2' },
    { id: 3, name: 'Node 3' }
  ];
  
  const links = [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 1 }
  ];
  
  return <ForceGraph2D
    graphData={{ nodes, links }}
    nodeLabel="name"
  />
    // Promise.all([ // Try to scrape local files

    //   fetch("http://localhost:3000/items/get"),
    //   fetch("http://localhost:3000/contactlist/get"),
    //   fetch("http://localhost:3000/itemgroup/get")
    // ])
    //   .then(([items, contactlist, itemgroup]) => {
    //     ReactDOM.render(
    //         <Test items={items} contactlist={contactlist} itemgroup={itemgroup} />,
    //         document.getElementById('overview');
    //     );
    //   }).catch((err) => {
    //       console.log(err);
    //   });
    
    // nodes.forEach(node => {
    //   fetch(node.href)
    //     .then(response => {
    //       response.text()
    //     })
    //     .then(html => {
    //       console.log(html)
    //       // const parser = new DOMParser();
    //       // const doc = parser.parseFromString(html, 'text/html');
    //       // console.log(doc)
    //     })
    // })
    // fetch(`http://localhost:4000/blog/ruby/2021/02/04/overview.html`)
    //   .then(response => {
    //     response.text()
    //   })
    //   .then(html => {
    //     console.log(html)
    //     // const parser = new DOMParser();
    //     // const doc = parser.parseFromString(html, 'text/html');
    //     // console.log(doc)
    //   })
  
    // fetch(`${url}/articles`)
    //   .then(response => response.text())
    //   .then(html => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(html, 'text/html');
    //     const articlesNode = doc.querySelector('#articles');
    //     const articles = Array.from(articlesNode.querySelectorAll('div')).filter(div => div.querySelector('div'));
    //     return articles
    //   })
    //   .then(articles => {
    //     const nodes = articles.map(article => ({
    //       id: article.getAttribute('id'),
    //       name: article.getAttribute('id'),
    //       href: article.querySelector('a').getAttribute('href')
    //     }))
    //     articles.forEach(article => { // try to create the links here (I think this fetch should be in another fetch)
    //       const href = article.querySelector('a').getAttribute('href')
    //       console.log(`${endpoint.textContent}${href}`)
    //       fetch(`http://localhost:4000/blog/ruby/2021/02/04/overview.html`)
    //         .then(response => {
    //           response.text()
    //         })
    //         .then(html => {
    //           console.log(html)
    //           // const parser = new DOMParser();
    //           // const doc = parser.parseFromString(html, 'text/html');
    //           // console.log(doc)
    //         })
    //     })
    //     const data = {
    //       nodes: articles.map(article => ({
    //           id: article.getAttribute('id'),
    //           name: article.getAttribute('id'),
    //           href: article.querySelector('a').getAttribute('href')
    //         })
    //       ),
    //       links: articles.map(article => ({
    //           source: article.getAttribute('id'),
    //           target: article.getAttribute('id'),
    //         })
    //       )
    //     }
    //     setData(data)
    //   })
  // }, [])

  // const handleNodeClick = (node) => { // click and redirect to the href
  //   window.location.href = node.href;
  // };

  // return(
  //   <ForceGraph2D // draw it with 2D graph with the nodes and links
  //     graphData={data}
  //     onNodeClick={handleNodeClick}
  //   />
  // )
}

export default NodeGraph;
