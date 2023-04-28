const http = require('http');
const fs = require('fs');

// HTTP => (request, response)


http.createServer( (request,response) => {
    const file = request.url == '/' ?  './WWW/index.html' :`./WWW${request.url}`; //le quité el .html despues del ${request.url}
    //console.log(file);

    if(request.url == '/login'){
        let data = [];
        //patrón de observador que coloca un objeto listener observando o escuchando otro objeto y reaccionando
        //a los cambios que pueda tener ese objeto observado.
        request.on("data",value => {
            data.push(value);
        }).on("end", () => {
            let params = Buffer.concat(data).toString();
            response.write(params);
            response.end();
        });
    }
    //const data = fs.readFileSync("./WWW/index.html");
    //const data = fs.readFileSync(file);

    //vamos a hacerlo asíncrono
    fs.readFile(file, (err,data) => {
        //validar que lo que se leyó existe
        if(err){
            response.writeHead(404, {"Content-Type":"text/plane"});
            response.write("NOT FOUND");
            response.end();
        }
        else{
        const extension = request.url.split('.').pop();
        console.log(extension);
        switch(extension){
            case 'txt':
                response.writeHead(200, {"Content-Type":"text/plane"});
                break;
            case 'html':
                response.writeHead(200, {"Content-Type":"text/html"});
                break;
            case 'css':
                response.writeHead(200, {"Content-Type":"text/css"});
                break;
            case 'ico':
                response.writeHead(200, {"Content-Type":"image/x-icon"});
                break;
            case 'png':
                response.writeHead(200, {"Content-Type":"image/png"});
                break;
            case 'js':
                response.writeHead(200, {"Content-Type":"text/javascript"});
                break;   
            case 'jpeg':
                response.writeHead(200, {"Content-Type":"image/jpeg"});
                break;
            default:
                response.writeHead(200, {"Content-Type":"text/html"});
                break;
        }
        //response.writeHead(200, {"Content-Type":"text/html"});
        response.write(data);
        response.end();
        }
    });
    
    
} ).listen(4444);