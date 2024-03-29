import { v4 as uuidv4 } from 'uuid';

export function CreateProject (name) {

    // define array to store todos
    let todoArray = [];

    // properties
    const id = uuidv4();
    const getTodoArray = () => todoArray;

    // methods
    const addTodo = (todo) => todoArray.push(todo);
    const removeTodo = (id) => {
        todoArray = todoArray.filter(x => x.id !== id);
    };

    // const displayTodos = () => todoArray;
    // const deleteTodo = (todo) => {
    //     let x = todoArray[0];
    //     todoArray.forEach(obj => {
    //         Object.keys(obj).forEach(key => {
    //             if (obj[key] === todo) {
    //                 let index = todoArray.indexOf(obj);
    //                 console.log(index);
    //                 todoArray.splice(index, 1);
    //             };
    //         });
    //     })
    // };

    return { name, getTodoArray, addTodo, /*displayTodos,*/ removeTodo, id };
};