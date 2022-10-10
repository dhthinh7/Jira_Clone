import { baseServices } from "./baseServices";

class ProjectCategoryService extends baseServices {
  getProjectCategory = () => this.get('ProjectCategory');
}

export const projectCategoryService = new ProjectCategoryService();