import { CreateProject } from "./ProjectFactory";
import { CreateTodo } from "./TodoFactory";
import Bin from "./images/bin-icon.svg";
import Edit from "./images/edit-icon.svg";
export function ScreenController() {
  // create array to store projects. Initialise with default project
  let projectArray = [];
  addProject("Today");

  // get element to append to
  const listContainer = document.querySelector(".list-container");

  // logic to handle creation and deletion of projects
  const openProjectModalBtn = document.getElementById("addNewProject");
  const projectModal = document.getElementById("addProjectModal");
  const closeProjectModalBtn = document.getElementById("projectCancelBtn");
  const addProjectBtn = document.getElementById("projectConfirmBtn");
  // TODO move this
  const mainContentContainer = document.querySelector(".main-content");

  // logic to handle creation and deletion of todos
  const openTodoModalBtn = document.getElementById("addNewTodo");
  const todoModal = document.getElementById("addTodoModal");
  const closeTodoModalBtn = document.getElementById("todoCancelBtn");
  const addTodoBtn = document.getElementById("todoConfirmBtn");

  // function to reset project modal
  const resetProjectModal = () => {
    document.getElementById("projectModalForm").reset();
  };

  // add new project to array
  function addProject(projectName) {
    projectArray.push(new CreateProject(projectName));
  }

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

    // set added project as active
    ClearClass("selected");

    const addedProject = projectArray[projectArray.length - 1];
    const addedElem = document.getElementById(addedProject.id);
    addedElem.classList.add("selected");
    console.log(`Added proj = `);
    console.log(addedProject);
    UpdateSidebarDisplay();
    UpdateMainDisplay(addedProject);
    // DBG:
    // console.log(projectArray);
  });

  // remove existing project
  document.addEventListener("click", (event) => {
    const target = event.target;
    const activeProject = FindActiveProject();
    console.log(`active proj ID: ${activeProject.id}`);
    // check if clicking on bin icon
    if (target.matches(".bin-icon")) {
      const idToRemove = target.getAttribute("data-project-id");
      removeProject(idToRemove);
      console.log(idToRemove);
      UpdateSidebarDisplay();

      // Handles updating main display if the project that was just deleted was also the active project
      if (activeProject.id === idToRemove) {
        console.log(
          "Deleted active project. Setting default project as active..."
        );
        UpdateMainDisplay(FindActiveProject());
      }
    }


  });

  // navigate between projects
  listContainer.addEventListener("click", (event) => {
    const target = event.target;

    // check if clicking on project container
    if (target.matches(".project")) {
      UpdateSidebarDisplay();
      ClearClass("selected");
      const activeProjectId = target.getAttribute("id");
      const selectedElem = document.getElementById(activeProjectId);
      console.log(selectedElem);
      selectedElem.classList.add("selected");
      projectArray.forEach((project) => {
        if (project.id === activeProjectId) {
          mainContentContainer.textContent = project.name;
          UpdateMainDisplay(project);
        }
      });
    }

    // check if clicking on todo bin icon
    if (target.matches(".todo-edit")) {
      UpdateSidebarDisplay();
      UpdateMainDisplay(FindActiveProject());
      // console.log(activeProject);
      // clear all todos that are currently selected
      ClearClass("selected-todo");
      // clear addModalSave from addTodoBtn
      ClearClass("addModalSave");
      // set todo edit button as selected
      const todoId = target.getAttribute("data-todo-id");
      // console.log(todoId);
      const activeTodoEditBtn = document.querySelector(
        `[data-todo-id="${todoId}"]`
      );
      activeTodoEditBtn.classList.add("selected-todo");
      // console.log(activeTodoEditBtn);

      // set addTodoBtn to edit mode
      addTodoBtn.classList.add("editModalSave");

      todoModal.showModal();
      // const todoArray = activeProject.todoArray;
      // todoArray.forEach((todo) => {
      //   if (todo.id === todoId) {
      //   }
      //   UpdateMainDisplay(activeProject);
      // });
    }
  });

  // navigate between projects
  // listContainer.addEventListener("click", (event) => {
  //   const target = event.target;

  //   // check if clicking on project container
  //   if (target.matches(".project")) {
  //     UpdateSidebarDisplay();
  //     ClearClass("selected");
  //     const activeProjectId = target.getAttribute("id");
  //     const selectedElem = document.getElementById(activeProjectId);
  //     console.log(selectedElem);
  //     selectedElem.classList.add("selected");
  //     projectArray.forEach((project) => {
  //       if (project.id === activeProjectId) {
  //         mainContentContainer.textContent = project.name;
  //         UpdateMainDisplay(project);
  //       }
  //     });
  //   };
  // });

  // generic clear class function
  function ClearClass(classToRemove) {
    const formattedClassToRemove = "." + classToRemove;
    Array.from(document.querySelectorAll(formattedClassToRemove)).forEach(
      (elem) => elem.classList.remove(classToRemove)
    );
  }

  // logic to update main content display
  function UpdateMainDisplay(projectObj) {
    // clear current display
    mainContentContainer.textContent = "";

    // create heading with project title
    const projectHeader = document.createElement("h1");
    projectHeader.textContent = projectObj.name;
    mainContentContainer.appendChild(projectHeader);

    // check if project contains todos
    if (projectObj.todoArray.length === 0) {
      console.log(projectObj.todoArray);
      return;
    }

    // create container for all todos
    const todoGroupContainer = document.createElement("div");
    todoGroupContainer.classList.add("todo-group-container");

    // loop through the todos in current project
    console.log(projectObj.todoArray);
    projectObj.todoArray.forEach((todo) => {
      const todoContainer = document.createElement("div");
      todoContainer.setAttribute("id", todo.id);
      todoContainer.classList.add("todo");

      const todoTitle = document.createElement("h2");
      todoTitle.classList.add("todo-title");
      todoTitle.textContent = todo.name;

      const todoDescription = document.createElement("p");
      todoDescription.classList.add("todo-description");
      todoDescription.textContent = todo.description;

      const todoPriority = document.createElement("h3");
      todoPriority.classList.add("todo-priority");
      todoPriority.textContent = todo.priority;

      const todoDate = document.createElement("h3");
      todoDate.classList.add("todo-date");
      todoDate.textContent = todo.dueDate;

      const editIcon = CreateEditBtn("28px");
      editIcon.setAttribute("data-todo-id", todo.id);
      editIcon.classList.add("todo-edit");

      const binIcon = CreateBin("28px");
      binIcon.setAttribute("data-todo-id", todo.id);
      binIcon.classList.add("todo-bin");


      todoContainer.appendChild(todoTitle);
      todoContainer.appendChild(todoDescription);
      todoContainer.appendChild(todoPriority);
      todoContainer.appendChild(todoDate);
      todoContainer.appendChild(editIcon);
      todoContainer.appendChild(binIcon);

      todoGroupContainer.appendChild(todoContainer);
    });

    mainContentContainer.appendChild(todoGroupContainer);
  }

  // logic to display projects in sidebar
  function UpdateSidebarDisplay() {
    const selectedElem = document.querySelector(".selected");
    let selectedElemId = null;
    if (selectedElem) {
      selectedElemId = selectedElem.getAttribute("id");
    }
     
    // clear display
    listContainer.textContent = "";

    // loop through projects in projectArray and display in sidebar.
    projectArray.forEach((project, index) => {
      // create a container div for the project and the bin elements
      const projectContainer = document.createElement("div");
      projectContainer.classList.add("project-container");

      // create an li to list the project
      const projectElement = document.createElement("li");
      projectElement.textContent = project.name;
      projectElement.classList.add("project");
      projectElement.setAttribute("id", project.id);

      // ensure retain which element is selected
      if (project.id === selectedElemId) {
        projectElement.classList.add("selected");
      }

      // append project li to the projectContainer div
      projectContainer.appendChild(projectElement);

      // special case: If NOT default project create the bin icon. Set data-project-id as the unique project id, used to identify which bin is being clicked to remove project
      if (index !== 0) {
        const binIcon = CreateBin("14px");
        binIcon.setAttribute("data-project-id", project.id);
        projectContainer.appendChild(binIcon);
      }

      // append both to the listContainer
      listContainer.appendChild(projectContainer);
    });
  }
  UpdateSidebarDisplay();

  // create the bin icons
  function CreateBin(binSize) {
    const binImg = new Image();
    binImg.src = Bin;
    binImg.style.width = binSize;
    binImg.classList.add("bin-icon");
    return binImg;
  }

  function CreateEditBtn(size) {
    const editImg = new Image();
    editImg.src = Edit;
    editImg.style.width = size;
    editImg.classList.add("edit-todo");
    return editImg;
  }

  // function to reset todo modal
  const resetTodoModal = () => {
    document.getElementById("todoModalForm").reset();
  };

  // add new todo
  function addNewTodo(project, name, dueDate, priority, description) {
    console.log(project);
    project.addTodo(new CreateTodo(name, dueDate, priority, description));
    console.log(project.todoArray);
  }

  // remove existing todo
  function removeTodo(id) {
    const activeProject = FindActiveProject();

  }

  // reset todo modal
  todoModal.addEventListener("close", resetTodoModal);

  // open todo modal
  openTodoModalBtn.addEventListener("click", () => {
    todoModal.showModal();
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
    const todoPriority = document.querySelector(
      'input[name="todo_priority"]:checked'
    ).value;
    const todoDescription = document.getElementById("description").value;
    const project = FindActiveProject();
    addNewTodo(project, todoTitle, todoDate, todoPriority, todoDescription);
    todoModal.close();
    UpdateMainDisplay(project);
  });


  // function to find active project
  function FindActiveProject() {
    // get active project
    let activeProject = null;
    let activeProjectElem = document.querySelector(".selected");
    console.log(activeProjectElem);
    if (!activeProjectElem) {
      console.log(
        "No active project found. Setting default project as active..."
      );
      // set default project to active
      activeProjectElem = document.getElementById(projectArray[0].id);
      activeProjectElem.classList.add("selected");
      activeProject = projectArray[0];
      return activeProject;
    }
    const activeProjectId = activeProjectElem.getAttribute("id");

    // find the active project in projectArray
    projectArray.forEach((project) => {
      if (project.id === activeProjectId) {
        activeProject = project;
      }
    });
    return activeProject;
  }
}
