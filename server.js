const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {exec}=require('node:child_process');
const root=__dirname;
const files={'/':'index.html','/index.html':'index.html','/logo.png':'logo.png','/students.enc.json':'students.enc.json'};
const mime={'html':'text/html; charset=utf-8','png':'image/png','json':'application/json; charset=utf-8'};
const server=http.createServer((req,res)=>{
 const name=files[(req.url||'').split('?')[0]];
 if(!name){res.writeHead(404);res.end('Not found');return;}
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('Content-Type',mime[name.split('.').pop()]);
 fs.createReadStream(path.join(root,name)).on('error',()=>{res.writeHead(500);res.end('Error')}).pipe(res);
});
server.listen(0,'127.0.0.1',()=>{
 const url='http://localhost:'+server.address().port+'/';
 console.log('School contact guide: '+url);
 if(process.platform==='win32')exec('start "" "'+url+'"');
});
