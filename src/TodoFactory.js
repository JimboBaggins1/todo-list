import {v4 as uuidv4 } from 'uuid';

export class CreateTodo {
    constructor(name, dueDate, priority, description) {
        this.name = name,
        this.dueDate = dueDate,
        this.priority = priority,
        this.description = description
    }

    // properties
    id = uuidv4();

    //TODO: Clear this up when certain not needed
    // // setters
    // set name(newName) {
    //     this.name = newName;
    // }

    // set dueDate(newDate) {
    //     this.dueDate = newDate;
    // }

    // set priority(newPriority) {
    //     this.priority = newPriority;
    // }

    // set description(newDescription) {
    //     this.description = newDescription;
    // }
}








//TODO: Clear this up when certain not needed
// function CreateTodo (title, dueDate, priority, description/*, notes*/) {


//     // properties
//     const id = uuidv4();
//     let _title = title;

//     const getTitle = () => _title;
//     // const getDueDate = () => dueDate;
//     // const getPriority = () => priority;
//     // const getDescription = () => description;
//     // const getNotes =() => notes;
//     // methods
//     const editTitle = (newTitle) => _title = newTitle; 
//     const editDueDate = (newDueDate) => dueDate = newDueDate;
//     const editPriority = (newPriority) => priority = newPriority;
//     const editDescription = (newDescription) => description = newDescription;
//     // const editNotes = (newNotes) => notes = newNotes;
//     // const displayTodo = () => {
//     //     return { title, dueDate, priority, description/*, notes*/ };
//     // };


//     return { getTitle, title, dueDate, priority, description, /*getNotes,*/ editTitle, editDueDate, editPriority, editDescription, /*editNotes, displayTodo,*/ id };
// };