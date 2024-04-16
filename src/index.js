import './style.css';
import { Project } from './ProjectFactory.js';
import { Todo } from './TodoFactory.js';
import { ScreenController } from './ScreenController.js';
import { StorageController } from './StorageController.js';

const storageController = new StorageController();
ScreenController(storageController);


// let testProject = Project('testProject');
// console.log(testProject.getName());
// testProject.addTodo(Todo('testTodo'));
// testProject.addTodo(Todo('testTodo2'));

// console.log(testProject.getProjectArray()[0].id);
// testProject.removeTodo(testProject.getProjectArray()[0].id)
// console.log(testProject.getProjectArray());