const mongoose = require('mongoose');

const ToDoListSchema = new mongoose.Schema({
    listitem: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    },
    time: {
        type: String,
        required: true
    }
});

const ToDoList = mongoose.model('ToDoList', ToDoListSchema);

module.exports = ToDoList;
