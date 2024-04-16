export class StorageController {
    projects = [];
    updateProjectArray(projectArray) {
        localStorage.setItem("projects", JSON.stringify(projectArray));
        this.projects = projectArray;
    }


}