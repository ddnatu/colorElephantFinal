const express = require('express')
const app = express();

var fs = require('fs');
const fileUpload = require('express-fileupload');
var busboy = require('connect-busboy'); //middleware for form/file upload

// var bodyParser = require('body-parser');
// app.use(bodyParser());
// app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));
app.use(busboy());

var path = require('path');
app.use(express.static('public'))

var __dirname = 'public';
app.get('/', function (req, res) {
  res.sendFile('public/index.html');
})

// default options 
//app.use(fileUpload());

// fs.stat("image.jpg", function(err, stats) {
//     restler.post("http://posttestserver.com/post.php", {
//         multipart: true,
//         data: {
//             "folder_id": "0",
//             "filename": restler.file("image.jpg", null, stats.size, null, "image/jpg")
//         }
//     }).on("complete", function(data) {
//         console.log(data);
//     });
// });




app.post('/upload', function (req, res) {
 // console.log('req', req);
  // if (!req.body)
  //   return res.status(400).send('No files were uploaded.');
  //   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  //   let sampleFile = req.body;

  //   // Use the mv() method to place the file somewhere on your server 
  //   sampleFile.mv('/D:/Workspace/filename.txt', function(err) {
  //     if (err)
  //       return res.status(500).send(err);

  //     res.send('File uploaded!');
  //   });

  // if (req.busboy) {
  //   req.busboy.on("file", function (fieldName, fileStream, fileName, encoding, mimeType) {
  //     //Handle file stream here
  //     console.log('filename', fileName);
  //   });
  //   return req.pipe(req.busboy);
  // } else {
  //   console.log('error busboy');
  //   return req.pipe(req.busboy);
  // }

//         var fstream;
//         req.pipe(req.busboy);
//         req.busboy.on('file', function (fieldname, file, filename) {
//             console.log("Uploading: " + filename);

//             //Path where image will be uploaded
//             fstream = fs.createWriteStream(__dirname + '/img/' + filename);
//             file.pipe(fstream);
//             fstream.on('close', function () {    
//                 console.log("Upload Finished of " + filename);              
//                 res.redirect('back');           //where to go next
//             });
//         });
//     });

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/files/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                // res.redirect('back');           //where to go next
                res.send({});
            });
        });
    });

  

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
