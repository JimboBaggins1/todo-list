import './style.css';
import { CreateProject } from './ProjectFactory.js';
import { CreateTodo } from './TodoFactory.js';
import { ScreenController } from './ScreenController.js';
import { StorageController } from './StorageController.js';

const storageController = new StorageController();
ScreenController(storageController);


// let testProject = CreateProject('testProject');
// console.log(testProject.getName());
// testProject.addTodo(CreateTodo('testTodo'));
// testProject.addTodo(CreateTodo('testTodo2'));

// console.log(testProject.getProjectArray()[0].id);
// testProject.removeTodo(testProject.getProjectArray()[0].id)
// console.log(testProject.getProjectArray());