#! /usr/bin/env node

// sudo npm link

/**
 * inject the script element in html file
 * captain-reload --inject or -i
 *
 * extract the script element from html file
 * captain-reload --extract or -e
 */

/**
 * CAPTAIN-RELOAD.JS
 *
 * A simple Node.js command line tool to inject or extract the live-reload script element depending on production or development need.
 *
 * TODO :
 *
 * - support most of existing scripts reload elements, add them to an array 'reloads' for extraction
 * - take argument after --inject|-i to target the specific script element injection
 * - support a specific html file path
 */
const [,, args] = process.argv;
const fs = require('fs');
const path = 'index.html';
const reload = '<script src="//localhost:9091/livereload.js"></script>';
const beforeInjectTag = '</body>';
const injectRegExp = new RegExp('(\\s+)' + beforeInjectTag);
const injection = `\n\u00A0\u00A0\u00A0\u00A0${reload}\n\u00A0\u00A0${beforeInjectTag}`;
const extractRegExp = new RegExp('(\\s+)' + reload);

const help = `CAPTAIN-RELOAD.JS HELP
inject the script element in html file
captain-reload --inject or -i

extract the script element from html file
captain-reload --extract or -e
`;

if (args !== undefined) {
  let extract = false;
  let inject = false;

  if (~args.indexOf('-e') || ~args.indexOf('--extract')) {
    extract = true;
  }
  if (~args.indexOf('-i') || ~args.indexOf('--inject')) {
    inject = true;
  }

  if (extract) {
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (!err) {
        const extracted = data.replace(extractRegExp, '');
        if (data === extracted) {
          console.error('captain-reload.js : no reload script element found.');
        } else {
          fs.writeFile('index.html', extracted, 'utf8', (err) => {
            if (err) console.error(err);
            else console.info('captain-reload.js : extraction done.');
          });
        }
      } else {
        console.error(`captain-reload.js : ${err}`);
      }
    });
  } else if (inject) {
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (!err) {
        if (!~data.indexOf(reload)) {
          const injected = data.replace(injectRegExp, injection);
          fs.writeFile('index.html', injected, 'utf8', (err) => {
            if (err) console.error(err);
            else console.info('captain-reload.js : injection done.');
          });
        } else {
          console.info('captain-reload.js : reload script already in file, no injection done.');
        }
      } else {
        console.error(`captain-reload.js : ${err}`);
      }
    });
  }
} else {
  console.log(help);
}
