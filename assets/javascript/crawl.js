const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const visited = new Set();
const queue = ['http://localhost:4000/blog/self/2023/02/04/software.html'];
const domain = 'http://localhost:4000'
const structure = {};

// I am going to use DFS concept to solve this graph like problem. Start from a single webpage: https://ycchenvictor.github.io/blog/

function storeAsFile(result) {
  // Convert JSON data to a string
  const jsonString = JSON.stringify(result);

  // Write the JSON data to a file
  fs.writeFile('nodeGraph.json', jsonString, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

function desiredFormat(structure) {
  const nodes = Object.keys(structure).map((value, index) => {
    return {id: index + 1, name: value}
  })
  const links = Object.entries(structure).map(([key, value]) => {
    return value.map((item) => {
      return {source: getIdFromNodeName(key), target: getIdFromNodeName(item)}
    })
  }).flat()

  function getIdFromNodeName(name) {
    result = nodes.find(node => node.name === name)
    if(result) {
      return result['id']
    } else {
      null
    }
  }

  return { nodes: nodes, links: links }
}

function crawl() { // Promise in this function
  const childNodes = [];
  const url = queue.shift();
  if (!url || visited.has(url)) {
    return Promise.resolve(structure); // resolve with returning the final structure
  }
  visited.add(url);
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        const $ = cheerio.load(body);
        $('a').each((i, link) => {
          const href = $(link).attr('href');
          if (href && href.startsWith('/blog') && href.endsWith('html')) {
            const absoluteUrl = domain + href;
            childNodes.push(absoluteUrl);
            queue.push(absoluteUrl);
          }
        });
        structure[url] = childNodes;
        resolve(crawl()); // resolve with calling this function again
      }
    });
  });
}

// currently, just store the result as a JSON file in frontend.
crawl().then((structure) => storeAsFile(desiredFormat(structure)))
