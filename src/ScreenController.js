import { CreateProject } from "./ProjectFactory";
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
    UpdateDisplay();

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
    UpdateDisplay();
  });

  // logic to display projects in sidebar
  function UpdateDisplay() {
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
      // create an li to list the project
      const projectElement = document.createElement("li");
      projectElement.textContent = project.name;

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
  UpdateDisplay();

  // create the bin icons
  function CreateBin() {
    const binImg = new Image();
    binImg.src = Bin;
    binImg.style.width = "14px";
    binImg.classList.add("bin-icon");
    return binImg;
  }

  // logic to handle creation and deletion of todos
  
}
