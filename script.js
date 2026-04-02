// nodejs is a js runtime environment that allows us to run js code outside the browser.
const fs = require('node:fs');

fs.writeFile('hello.txt', 'hello kase ho ', function (err) {
    if (err) console.error(err);
    else console.log('File created successfully!');
});

fs.appendFile('hello.txt', 'ma badiya hu', function (err) {
    if (err) console.error(err);
    else console.log('File append successfully!');
});

fs.rename('hello.txt', 'greet.txt', function (err) {
    if (err) console.error(err);
    else console.log('File renamed successfully!')
});

fs.copyFile('greet.txt', './copy/greet_copy.txt', function (err) {
    if (err) console.error(err);
    else console.log('File copied successfully!')
});

fs.unlink('greet.txt', function (err) {
    if (err) console.error(err);
    else console.log('File deleted successfully!')
});

fs.rmdir('./copy', function (err) {
    if (err) console.error(err);
    else console.log('Directory deleted successfully!')
});
it remove the file but if the file is not empty it will throw an error so we can use fs.rm also to remove the directory and all its contents
fs.rm('./copy', { recursive: true }, function (err) {
    if (err) console.error(err);
    else console.log('Directory and its contents deleted successfully!')
});

fs.readFile('greet.txt', "utf8", function (err, data) {
    if (err) console.error(err);
    else console.log(data);
});


fs.mkdir('./new_directory', { recursive: true }, function (err) {
    if (err) console.error(err);
    else console.log('Directory created successfully!');
});

fs.readdir('./Backend/hello.txt', "utf8", function (err, files) {
    if (err) console.error(err.message);
    else console.log(files);
});