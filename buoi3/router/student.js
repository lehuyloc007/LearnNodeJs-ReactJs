var fs = require('fs');
const path = require('path');
const uuid_v4 = require('uuid');
const express = require('express');



let studentRouter = express.Router();


const getAllStudents = async () => {
    try {
        const dataString = await fs.promises.readFile(path.resolve('./',"students.json"), 'utf-8');
        return JSON.parse(dataString)
    } catch (err) {
        return []
    }
}
const writeFileStudents = async (data) => {
    try {
        await fs.promises.writeFile(path.resolve('./',"students.json"), JSON.stringify(data));
        return 'success !'
    } catch (err) {
        throw(err)
    }
}
const addNewStudent = async (newStudent) => {
    try {
        if (!fs.existsSync(path.resolve('./',"students.json"))) {
            newStudent.id = uuid_v4.v4();
            const newData = [newStudent];
            await writeFileStudents(newData);
            return 0;
        }
        const lstStudent = await getAllStudents();
        newStudent.id = uuid_v4.v4();
        lstStudent.push(newStudent);
        await writeFileStudents(lstStudent);
    } catch (err) {
        throw(err)
    }
}
//const findStudentById = (allStudent, idStudent) => allStudent.find(({ id }) => id === idStudent)
const updateStudent = async (student) => {
    const { id: studentId, ... dataUpdateStudent} = student;
    if(!studentId) {
        throw new Error('User not found');
    };
    const allStudent = await getAllStudents();
    const newStudent = allStudent.map(studentItem => {
        if(studentItem.id === studentId) {
            return {
                ...studentItem,
                ...dataUpdateStudent
            }
        }
        return  studentItem;
    });
    await writeFileStudents(newStudent)
    // findStudentById(allStudent, id);
}

//get all
studentRouter.get('/all', (req, res) => {
    getAllStudents().then(data => {
        res.send(data)
    })
})

//add new
studentRouter.post('/', (req, res)=>{
    if (req.body.name && req.body.age) {
        addNewStudent(req.body).then(data => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
    } else {
        res.send('not name or not age')
    }
})

//update
studentRouter.post('/update', (req, res)=>{
    if (req.body.id || (req.body.name && req.body.age)) {
        updateStudent(req.body).then(data => {
            res.send(data)
        })
    } else {
        res.send('not name or not age')
    }
})


// studentRouter.get('/:id', (req, res)=>{
//     console.log(req.params);
//     res.send('all student all')
// })
// studentRouter.patch('/', (req, res)=>{
//     res.send('edit student')
// })
// studentRouter.delete('/', (req, res)=>{
//     res.send('delete student')
// })
// studentRouter.put('/', (req, res)=>{
//     res.send('edit student')
// })
module.exports = studentRouter