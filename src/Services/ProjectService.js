import { baseServices } from "./baseServices";

class ProjectService extends baseServices {
  getAllProject = () => this.get('Project/getAllProject');
  removeUser = (userIdProject) => this.post('Project/removeUserFromProject', userIdProject);
  assignUserProject = (user) => this.post('Project/assignUserProject', user);
  getProjectDetail = (projectId) => this.get(`Project/getProjectDetail?id=${projectId}`);
  createTask = (objectTask) => this.post('Project/createTask', objectTask);
  deleteProject = (projectId) => this.delete(`Project/deleteProject?projectId=${projectId}`);
  updateProject = (projectUpdate) => this.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
  // createProject = (objectProject) => this.post('Project/createProject', objectProject);
  createProjectAuthorization = (objectProject) => this.post('Project/createProjectAuthorize', objectProject);
  updateStatusTask = (taskStatusUpdate) => this.put(`Project/updateStatus`, taskStatusUpdate);
  getTaskDetail = (taskId) => this.get(`Project/getTaskDetail?taskId=${taskId}`);
}

export const projectService = new ProjectService();