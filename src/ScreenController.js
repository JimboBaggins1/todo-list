import { CreateProject } from "./ProjectFactory";
import { CreateTodo } from "./TodoFactory";
import Bin from "./images/bin-icon.svg";

export function ScreenController() {
  let projectArray = [];

  // get element to append to
  const listContainer = document.querySelector(".list-container");

  // warning message if there are no projects
  const warningMsg = document.createElement("h3");
  warningMsg.textContent =
    "Oops, looks like you don't have any active projects";

  // logic to handle creation and deletion of projects
  const openProjectModalBtn = document.getElementById("addNewProject");
  const projectModal = document.getElementById("addProjectModal");
  const closeProjectModalBtn = document.getElementById("projectCancelBtn");
  const addProjectBtn = document.getElementById("projectConfirmBtn");
  // TODO move this
  const mainContentContainer = document.querySelector(".main-content");

  // function to reset project modal
  const resetProjectModal = () => {
    document.getElementById("projectModalForm").reset();
  };

  // add new project to array
  const addProject = (projectName) => {
    projectArray.push(CreateProject(projectName));
  };

  // remove existing project from array
  const removeProject = (id) => {
    projectArray = projectArray.filter((x) => x.id !== id);
  };

  // reset projectModalForm
  projectModal.addEventListener("close", resetProjectModal);

  // open add project modal when addProjectBtn clicked
  openProjectModalBtn.addEventListener("click", () => {
    projectModal.showModal();
  });

  // close project modal when closeProjectModalBtn clicked
  closeProjectModalBtn.addEventListener("click", () => {
    projectModal.close();
  });

  // create new project when create addProjectBtn clicked
  addProjectBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const projectName = document.getElementById("project-name").value;
    addProject(projectName);
    projectModal.close();
    UpdateSidebarDisplay();

    // DBG:
    console.log(projectArray);
  });

  // remove existing project
  listContainer.addEventListener("click", (event) => {
    const target = event.target;

    // check if clicking on bin icon
    if (target.matches(".bin-icon")) {
      const idToRemove = target.getAttribute("data-project-id");
      removeProject(idToRemove);
    }
    UpdateSidebarDisplay();
  });

  // navigate between projects
  listContainer.addEventListener("click", (event) => {
    const target = event.target;

    // check if clicking on project container
    if (target.matches(".project")) {
      ClearClass(".selected");
      const activeProjectId = target.getAttribute("id");
      const selectedElem = document.getElementById(activeProjectId);
      console.log(selectedElem);
      selectedElem.classList.add("selected");
      projectArray.forEach(project => {
        if (project.id === activeProjectId) {
          mainContentContainer.textContent = project.name;
          UpdateMainDisplay(project);
        };
      });
    };
  });

  // generic clear class function
  function ClearClass(classToRemove) {
    Array.from(document.querySelectorAll(classToRemove)).forEach(
      elem => elem.classList.remove(classToRemove)
    );
  };

  // logic to update main content display
  function UpdateMainDisplay(projectObj) {
    // clear current display
    mainContentContainer.textContent = "";

    // create heading with project title
    const projectHeader = document.createElement("h1");
    projectHeader.textContent = projectObj.name;
    mainContentContainer.appendChild(projectHeader);

    // loop through the todos in current project
    const activeProject = FindActiveProject();
    if (activeProject.getTodoArray().length === 0) { return; };

    console.log(activeProject.getTodoArray());
    activeProject.getTodoArray().forEach(todo => {
      const todoContainer = document.createElement('div');
      todoContainer.setAttribute("id", todo.id);

      const todoTitle = document.createElement("h2");
      todoTitle.textContent = todo.title;

      const todoDate = document.createElement("h3");
      todoDate.textContent = todo.dueDate;

      const todoPriority = document.createElement("h3");
      todoPriority.textContent = todo.priority;

      const todoDescription = document.createElement("p");
      todoDescription.textContent = todo.description;

      todoContainer.appendChild(todoTitle);
      todoContainer.appendChild(todoDescription);
      todoContainer.appendChild(todoDate);
      todoContainer.appendChild(todoPriority);
      
      mainContentContainer.appendChild(todoContainer);
    });
  };

  // logic to display projects in sidebar
  function UpdateSidebarDisplay() {
    // clear display
    listContainer.textContent = "";

    // display projects currently in projectArray
    if (projectArray.length === 0) {
      listContainer.appendChild(warningMsg);
      return;
    }

    // loop through projects in projectArray and display in sidebar.
    projectArray.forEach((project) => {
      // create a container div for the project and the bin elements
      const projectContainer = document.createElement("div");
      projectContainer.classList.add("project-container");

      // create an li to list the project
      const projectElement = document.createElement("li");
      projectElement.textContent = project.name;
      projectElement.classList.add("project");
      projectElement.setAttribute("id", project.id);

      // create the bin icon. Set data-project-id as the unique project id, used to identify which bin is being clicked to remove project
      const binIcon = CreateBin();
      binIcon.setAttribute("data-project-id", project.id);

      // append project li and bin icon to the projectContainer div
      projectContainer.appendChild(projectElement);
      projectContainer.appendChild(binIcon);

      // append both to the listContainer
      listContainer.appendChild(projectContainer);
    });
  }
  UpdateSidebarDisplay();

  // create the bin icons
  function CreateBin() {
    const binImg = new Image();
    binImg.src = Bin;
    binImg.style.width = "14px";
    binImg.classList.add("bin-icon");
    return binImg;
  }

  // logic to handle creation and deletion of todos
  const openTodoModalBtn = document.getElementById("addNewTodo");
  const todoModal = document.getElementById("addTodoModal");
  const closeTodoModalBtn = document.getElementById("todoCancelBtn");
  const addTodoBtn = document.getElementById("todoConfirmBtn");

  // function to reset todo modal
  const resetTodoModal = () => {
    document.getElementById("todoModalForm").reset();
  };

  // add new todo
  function addNewTodo(project, title, dueDate, priority, description) {
    console.log(project);
    project.addTodo(CreateTodo(title, dueDate, priority, description));
    console.log(project.getTodoArray());
  };

  // remove existing todo
  function removeTodo(id) {

  };

  // reset todo modal
  todoModal.addEventListener("close", resetTodoModal);

  // open todo modal
  openTodoModalBtn.addEventListener("click", () => {
    todoModal.showModal()
  });

  // close todo modal
  closeTodoModalBtn.addEventListener("click", () => {
    todoModal.close();
  });

  // add new todo
  addTodoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const todoTitle = document.getElementById("title").value;
    const todoDate = document.getElementById("dueDate").value;
    const todoPriority = document.querySelector('input[name="todo_priority"]:checked').value;
    const todoDescription = document.getElementById("description").value;
    const project = FindActiveProject();
    addNewTodo(project, todoTitle, todoDate, todoPriority, todoDescription);
    todoModal.close();
    UpdateMainDisplay(project);
  });


  // function to find active project
  function FindActiveProject() {
    // get active project
    const activeProjectElem = document.querySelector(".selected");
    const activeProjectId = activeProjectElem.getAttribute("id");
    let activeProject;
    // TODO improve basic error handling
    if (!activeProjectElem) {
      console.log("No project selected");
      return;
    };

    // find the active project in projectArray
    projectArray.forEach(project => {
      if (project.id === activeProjectId) {
        activeProject = project;
      };
    });
    return activeProject;
  };
}
