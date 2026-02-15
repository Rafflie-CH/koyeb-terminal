import http from "http";
import fs from "fs";
import { WebSocketServer } from "ws";
import pty from "node-pty";

const server = http.createServer((req,res)=>{
  res.writeHead(200,{"Content-Type":"text/html"});
  res.end(fs.readFileSync("./index.html"));
});

const wss = new WebSocketServer({ server });

wss.on("connection",(ws)=>{
  const shell = pty.spawn("bash",[],{
    name:"xterm-color",
    cols:120,
    rows:40,
    cwd:process.env.HOME,
    env:process.env
  });

  shell.onData(d=>ws.send(d));
  ws.on("message",m=>shell.write(m.toString()));
  ws.on("close",()=>shell.kill());
});

server.listen(3000,()=>console.log("terminal hidup"));
