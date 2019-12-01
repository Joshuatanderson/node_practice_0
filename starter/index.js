// fs is a core module of node
const fs = require('fs');

const http = require('http');
const url = require('url');

//////////////////////////////
// FILE

// synch
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn} \nCreated on ${Date.now()}`

// fs.writeFileSync('./txt/output.txt', textOut )
// console.log('file written')

// async way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data0) => {
// 	fs.readFile(`./txt/${data0}.txt`, 'utf-8', (err, data1) => {
// 		console.log(data1)
// 		fs.readFile('./txt/append.txt', 'utf-8', (err, data2) => {
// 			console.log(data2)
// 			fs.writeFile('./txt/final.txt', `${data1} \n${data2}`, 'utf-8', err => {
// 				err && console.error(err)
// 				!err && console.log('your file has been written. 😇') 
// 			})
// 		})
// 	})
// })
// console.log('will read file')

////////////////////////////////
// SERVER

// creates server

// this code only runs when server is started.  It doesn't matter if it is sync or async
// __dirname is a variable that points to where current file is located
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// this code runs each time that the API is hit
const server = http.createServer((req, res) => {

	const pathName = req.url;

	if (pathName === '/' || pathName === '/overview') {
		res.end('this is the OVERVIEW')
	} else if (pathName === '/product') {
		res.end('this is the PRODUCT') 
	} else if (pathName === '/api') {
		res.writeHead(200, {'Content-type': 'application/json'});
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'myHeader': 'Hello World'
		});
		res.end('<h1>product not found</h1>')
	}
})

server.listen(8000, () => {
	
	console.log('listening to requests on: port 8000')
})

