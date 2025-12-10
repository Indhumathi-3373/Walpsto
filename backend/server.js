 const http=require('http');
 const filesystem=require('fs')
 //const server=http.createServer((req,res)=>{
    //console.log(req)
     //console.log(req.url) we can get uri ,which uri we are requeting for through this url
     // process.exit(); to stop the server's listener that means event loop{(ctrl+c)}
     //console.log(req.method) browser sends request for accessing information if we getting infromation from the server means use post 
     //console.log(req.headers) it contains info about where request comes from ,what kind of data it accept,where we send info 
 //});
 const server=http.createServer((req,res)=>{
 //response to the request
    const method=req.method;
    const url=req.url;
    if(url==='/'){
    res.setHeader('content-type','text/html') // for sending response to browser and we should give the primary info for how to show the data and we can send type of data like html data or json
    res.write('<html>')  // we can send data to browser using write method
    res.write('<head><title>hello from server</title></head>') 
    res.write('<body><form action="/message" method="POST"> <input type="text" name="username"><input type="submit" name="send"></form></body>')
    res.write('</html>')
    return res.end();  // it is used to end the response process    
   }
   //redirecting
   if(url==='/message' && method =='POST'){

      //for large data browser sends info as small parts so we have bought the data as small parts(memory chunk)
      req.on('data',(chunk)=>{
       console.log('chunk:');
       console.log(chunk)
      })// we can know the data brought from browser and get data from browser,call back function for after getting the data which statement should show
      filesystem.writeFileSync('createfile.txt','file created ')//create file
     res.setHeader('Location','/') //redirected to the above if statement
     res.statusCode=302;// redirect code
     return res.end() 
   }

   res.write('<html>')
   res.write('<body><h1>Hello World</h1></body>')
   res.write('</html>')
   res.end();
 });
 server.listen(8080);