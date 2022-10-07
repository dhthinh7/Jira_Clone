import { baseServices } from "./baseServices";

class ProjectService extends baseServices {
  getAllProject = () => this.get('/Project/getAllProject');
}

export const projectService = new ProjectService();