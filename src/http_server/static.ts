import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

export const httpServer = http.createServer((req, res) => {
  const __dirname = path.resolve(path.dirname(''));
  const partFilePath = req.url === '/' ? '/front/index.html' : `/front${req.url}`;

  const filePath = `${__dirname}${partFilePath}`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});
