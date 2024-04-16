import { v4 as uuidv4 } from 'uuid';

export class CreateProject {
    constructor(name) {
        this.name = name;
    }
    
    // private properties

    // properties
    id = uuidv4();
    todoArray = [];

    // getters
    // get todoArray() {
    //     return this.todoArray;
    // }

    // methods
    addTodo(todo) {
        return this.todoArray.push(todo);
    }

    removeTodo(id) {
        return this.todoArray = this.todoArray.filter(elem => elem.id !== id)
    }
}




//TODO: Clear this up when certain not needed
// function CreateProject (name) {

//     // define array to store todos
//     let todoArray = [];

//     // properties
//     const id = uuidv4();
//     const getTodoArray = () => todoArray;

//     // methods
//     const addTodo = (todo) => todoArray.push(todo);
//     const removeTodo = (id) => {
//         todoArray = todoArray.filter(x => x.id !== id);
//     };

//     // const displayTodos = () => todoArray;
//     // const deleteTodo = (todo) => {
//     //     let x = todoArray[0];
//     //     todoArray.forEach(obj => {
//     //         Object.keys(obj).forEach(key => {
//     //             if (obj[key] === todo) {
//     //                 let index = todoArray.indexOf(obj);
//     //                 console.log(index);
//     //                 todoArray.splice(index, 1);
//     //             };
//     //         });
//     //     })
//     // };

//     return { name, getTodoArray, addTodo, /*displayTodos,*/ removeTodo, id };
// };