import {v4 as uuidv4 } from 'uuid';

export function CreateTodo (title, dueDate, priority, description/*, notes*/) {


    // properties
    const id = uuidv4();
    // const getTitle = () => title;
    // const getDueDate = () => dueDate;
    // const getPriority = () => priority;
    // const getDescription = () => description;
    // const getNotes =() => notes;

    // methods
    const editTitle = (newTitle) => title = newTitle; 
    const editDueDate = (newDueDate) => dueDate = newDueDate;
    const editPriority = (newPriority) => priority = newPriority;
    const editDescription = (newDescription) => description = newDescription;
    // const editNotes = (newNotes) => notes = newNotes;
    // const displayTodo = () => {
    //     return { title, dueDate, priority, description/*, notes*/ };
    // };


    return { title, dueDate, priority, description, /*getNotes,*/ editTitle, editDueDate, editPriority, editDescription, /*editNotes, displayTodo,*/ id };
};