const express = require('express');
const port = 9000;
const path = require('path');
const db = require('./config/mongoose');
const app = express();
const ToDoList = require('./model/todolist');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

// Route to render the home view with the To-Do List from the database
app.get('/', async function(req, res) {
    try {
        // Fetch to-do list from the database using Mongoose
        const toDoList = await ToDoList.find({});
        return res.render('home', {
            title: 'To-Do-List',
            ToDoList: toDoList  // Pass the fetched list from the database
        });
    } catch (err) {
        console.log('Error while fetching to-do list:', err);
        return res.status(500).send('Internal Server Error');
    }
});

// Practice route example
app.get('/practice', function(req, res) {
    console.log('This is the practice page');
    return res.render('practice');  // Assuming you have a 'practice.ejs' file in the 'views' folder
});

// Route to handle the form submission and create a new to-do item in the database
app.post('/create-to-do-list', async function(req, res) {
    try {
        // Using Mongoose to create a new to-do item
        const newTask = await ToDoList.create({
            listitem: req.body.listitem,
            time: req.body.time
        });
        console.log('New task created:', newTask);
        return res.redirect('back');
    } catch (err) {
        console.log('Error occurred while adding the task:', err);
        return res.status(500).send('Internal Server Error');
    }
});
app.post('/delete-to-do-list', async function(req, res) {
    try {
        const taskId = req.body.id;
        await ToDoList.findByIdAndDelete(taskId);
        console.log('Task deleted with ID:', taskId);
        return res.redirect('back');
    } catch (err) {
        console.log('Error occurred while deleting the task:', err);
        return res.status(500).send('Internal Server Error');
    }
});


app.listen(port, function(err) {
    if (err) {
        console.log('Error occurred:', err);
    } else {
        console.log('Successfully running the server on port', port);
    }
});
