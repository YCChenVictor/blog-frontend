const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const randomColor = require('randomcolor');

const domain = 'http://localhost:3000'
const queue = ['http://localhost:3000/blog/software/main'];
const visited = new Set();
const structure = {};

// I am going to use DFS concept to solve this graph like problem. Start from a single webpage: https://ycchenvictor.github.io/blog/
// This way can only be used in physical DOM. For virtual DOM, we need to create a backend server to do scraper such as puppeteer
function crawl(queue, visited, domain) { // Promise in this function
  const childNodes = [];
  let url = queue.shift();
  if (!url) {
    return Promise.resolve(structure); // resolve with returning the final structure
  } else {
    if (!visited.has(url)) {
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
                childNodes.push(href);
                queue.push(absoluteUrl);
              }
            });
            const parentNode = url.replace(domain, "")
            structure[parentNode] = childNodes;
            resolve(crawl(queue, visited, domain)); // resolve with calling this function again
          }
        });
      });
    } else {
      return crawl(queue, visited, domain);
    }
  }
}

function storeAsFile(result) {
  // Convert JSON data to a string
  const jsonString = JSON.stringify(result);

  // Write the JSON data to a file
  fs.writeFile('../src/data/nodeGraph.json', jsonString, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

function desiredFormat(structure) {
  console.log(structure)
  let nodes
  let links
  nodes = Object.keys(structure).map((value, index) => {
    let name
    const matches = value.match(/\/([^\/]+)\.html$/);
    if(matches !== null) {
      name = matches[1]
    } else {
      name = value
    }
    return {
      id: index + 1,
      name: name,
      url: value,
      group: getGroupFrom(value),
    }
  })
  nodes = giveColorByGroupTo(nodes)
  links = Object.entries(structure).map(([key, value]) => {
    return value.map((item) => {
      const source = getIdFromNodeName(key)
      const target = getIdFromNodeName(item)
      if(source && target) {
        return {source: source, target: target}
      }
    })
  }).flat().filter(obj => obj !== undefined)

  function getIdFromNodeName(url) {
    result = nodes.find(node => node.url === url)
    if(result) {
      return result['id']
    } else {
      null
    }
  }

  function getGroupFrom(url) {
    return url.split("/")[2]
  }

  function giveColorByGroupTo(nodes) {
    const groups = [...new Set(nodes.map(node => node.group))];
    const colors = randomColor({ count: groups.length });
    nodes.map((node) => {
      node.color = colors[groups.indexOf(node.group)]
    })
    return nodes
  }

  return { nodes: nodes, links: links }
}

// currently, just store the result as a JSON file in frontend.
crawl(queue, visited, domain).then((structure) => {
  storeAsFile(desiredFormat(structure))
})
