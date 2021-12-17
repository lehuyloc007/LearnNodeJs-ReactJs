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
        throw(err.message)
    }
}
const addNewStudent = async (newStudent) => {
    try {
        console.log(newStudent)
        if(!newStudent.name || !newStudent.age) throw new Error('Info Student is empty');
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
        throw(err.message)
    }
}
const findStudentById = (allStudent, idStudent) => allStudent.findIndex(({ id }) => id === idStudent)
const updateStudent = async (student) => {
    try {
        const { id: studentId, ...dataUpdateStudent} = student;
        if(!studentId) {
            throw new Error('StudentId is empty found');
        };
        const allStudent = await getAllStudents();
        const indexStudent = findStudentById(allStudent, studentId);
        if (indexStudent === -1) {
            throw new Error('StudentId not found');
        }
        const newStudent = allStudent.map(studentItem => {
            if(studentItem.id === studentId) {
                return {
                    ...studentItem,
                    ...dataUpdateStudent
                }
            }
            return  studentItem;
        });
        await writeFileStudents(newStudent);
    } catch(err) {
        throw(err.message)
    }
}

const deleteStudent = async (studentId) => {
    try {
        if(!studentId) {
            throw new Error('StudentId is empty found');
        };
        const allStudent = await getAllStudents();
        const indexStudent = findStudentById(allStudent, studentId);
        if (indexStudent === -1) {
            throw new Error('StudentId not found');
        }
        allStudent.splice(indexStudent, 1);
        await writeFileStudents(allStudent);
    }catch(err) {
        throw(err.message)
    }
}

//get all
studentRouter.get('/all', (req, res) => {
    getAllStudents().then(data => {
        res.send(data)
    })
})

//add new
studentRouter.post('/', (req, res)=>{
    addNewStudent(req.body).then(data => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})

//update
studentRouter.post('/update', (req, res)=>{
    updateStudent(req.body).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    });
})

//delete
studentRouter.post('/delete', (req, res)=>{
    deleteStudent(req.body.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
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