var fs = require('fs');
const path = require('path');

const dataStudent = `[
    { 
        "id":  1, 
        "name": "Nguyen Van Be",
        "age": 23, 
        "gender": "Female",
        "department": "History"
    },
    { 
        "id":  2, 
        "name": "Nguyen Van An",
        "age": 16, 
        "gender": "Female",
        "department": "Maths"
    },
    { 
        "id":  3, 
        "name": "Nguyen Van Ce",
        "age": 21, 
        "gender": "Male",
        "department": "History"
    }
]`;

/*--- create file ---*/
fs.writeFile(path.resolve(__dirname, 'students.json'), dataStudent, function(err) {
    if(err) return console.log(err);
    console.log('Create file: students.js success');
})

/*--- read file ---*/
// fs.readFile(path.resolve(__dirname, 'students.json'), 'utf8', (err, data) => {
//     if(err) return console.log(err);
//     data = JSON.parse(data);
//     console.log('List studentd: ');
//     data.forEach(item => {
//         console.log('name:' + item.name + ' age:'+ item.age + ' gender:'+ item.gender + ' department:'+ item.department)
//     });
        /*--- filter in file ---*/
//     console.log('List studentd age>18: ');
//     data.forEach(item => {
//            if(item.age > 18) console.log('name:' + item.name + ' age:'+ item.age + ' gender:'+ item.gender + ' department:'+ item.department)
//     });
       
// })

/*--- update file ---*/
// fs.readFile(path.resolve(__dirname, 'students.json'), 'utf8', (err, data) => {
//     if(err) return console.log(err);
//     data = JSON.parse(data);
//     data.push({"id":  4, "name": "Nguyen Van De","age": 29, "gender": "Male", "department": "History"});
//     data = JSON.stringify(data)
//     fs.writeFile(path.resolve(__dirname, 'students.json'), data, function (err) {
//         if (err) throw err;
//         console.log('Updated success!');
//     });
// })

/*--- delete file ---*/
// fs.unlinkSync(path.resolve(__dirname, 'students.json'), function (err) {
//     if (err) throw err;
//     console.log('Delete file Success!');
// });

