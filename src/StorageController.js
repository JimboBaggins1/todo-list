export class StorageController {
    // projects = [];
    updateProjectArray(projectArray) {
        localStorage.setItem("projects", JSON.stringify(projectArray));
        // this.projects = projectArray;
    }

    displayStoredProjects() {
        return JSON.parse(localStorage.getItem("projects"));
    }

    checkForStoredData() {
        if (localStorage.length == 0) {
            return null;
        } else {
            return this.displayStoredProjects();
        }

    }
}