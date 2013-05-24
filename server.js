var http=require('http').createServer(handler);
var io=require('socket.io').listen(http);
var fs=require('fs');
var sys=require('sys');

http.listen(process.env.PORT);
sys.puts("Server Listening on "+process.env.PORT);

function handler(request,response)
{
    fs.readFile("index.html",function(err,data){
        if(err)
        {
            response.writeHeader(500,{"Content-Type":"text/plain"});
            return response.end("Error in loading index.html");
        }
        else
        {
            response.writeHeader(200,{"Content-Type":"text/html","Content-Length":data.length});
            response.end(data);
        }
    });
}

io.sockets.on('connection',function(socket){
    socket.on('message',function(data){
        console.info(data);
        socket.send("[ECHO] "+data);
    });
});