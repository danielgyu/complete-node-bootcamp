const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

////////////////////////////// SERVER 
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const slugs = productData.map(el => slugify(el.productName, {lower : true}));
console.log(slugs);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    const pathN = req.url;

    const { query, pathname } = url.parse(req.url, true);
    console.log(query.id);

    if (pathName === '/data') {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
    };
});

server.listen(5000, "127.0.0.1", () => {
    console.log("listening to request on port 5000");
});



////////////////////////////// FILE SYSTEM

// Blocking & synchronous way
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");
const readOut = fs.readFileSync("./txt/output.txt", "utf-8");
console.log(readOut);
*/


// Non blocking & async way
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
    console.log(data);
});
console.log("Will read file!");
*/


// Callback chaining
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(data2);
        fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
            console.log(data3);
            fs.writeFile("./txt/final.txt", `${data2}/${data3}`, "utf-8", err => {
                console.log("file has been written");
            });
        });
    });
});
console.log("Will read file!");
*/

