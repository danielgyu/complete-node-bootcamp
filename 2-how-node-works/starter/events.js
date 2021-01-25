const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}
const myEmitter = new Sales();


myEmitter.on("newSale", () => {
    console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
    console.log("Customer name: Jonas");
});

myEmitter.on("newSale", stock => {
    console.log(`There are now ${stock} items left`)
});

console.log("---Separating on and emit---");

myEmitter.emit("newSale", 9);

///////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request received");
    res.end("request recieved");
})

server.on("request", (req, res) => {
    console.log("another request");
})

server.on("close", () => {
    console.log("Server closed");
})

server.listen(5000, "127.0.0.1", () => {
    console.log("Waiting for requests...");
});