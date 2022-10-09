import { baseServices } from "./baseServices";

class ProjectService extends baseServices {
  getAllProject = () => this.get('Project/getAllProject');
  removeUser = (userIdProject) => this.post('Project/removeUserFromProject', userIdProject);
  assignUserProject = (user) => this.post('Project/assignUserProject', user);
  getProjectDetail = (projectId) => this.get(`Project/getProjectDetail?id=${projectId}`);
  createTask = (objectTask) => this.post('Project/createTask', objectTask);
}

export const projectService = new ProjectService();