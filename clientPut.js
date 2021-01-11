const http = require('http');
const postData = JSON.stringify({
    name: 'Vasya1',
    email: 'Vasya1@gmail',
    password:'3504'
  });
  const id = 2;
// const postData = `{
//     "name": "Oleg",
//     "email": "oleg@gmail",
//     "password":"3504"
//   }`;
// const postData = "name=oleg&email=oleg@gmail&password=3504"
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/users/${id}`,
    method: 'PUT',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Content-Length': Buffer.byteLength(postData)
    // }
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
  };
  
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(res.headers);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // Write data to request body
  req.write(postData);
  req.end();