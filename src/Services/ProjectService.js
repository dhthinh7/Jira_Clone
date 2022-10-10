import { baseServices } from "./baseServices";

class ProjectService extends baseServices {
  getAllProject = () => this.get('Project/getAllProject');
  removeUser = (userIdProject) => this.post('Project/removeUserFromProject', userIdProject);
  assignUserProject = (user) => this.post('Project/assignUserProject', user);
  getProjectDetail = (projectId) => this.get(`Project/getProjectDetail?id=${projectId}`);
  createTask = (objectTask) => this.post('Project/createTask', objectTask);
  deleteProject = (projectId) => this.delete(`Project/deleteProject?projectId=${projectId}`);
  updateProject = (projectUpdate) => this.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
}

export const projectService = new ProjectService();