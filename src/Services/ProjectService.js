import { baseServices } from "./baseServices";

class ProjectService extends baseServices {
  getAllProject = () => this.get('Project/getAllProject');
  removeUser = (userIdProject) => this.post('Project/removeUserFromProject', userIdProject);
  assignUserProject = (user) => this.post('Project/assignUserProject', user);
}

export const projectService = new ProjectService();