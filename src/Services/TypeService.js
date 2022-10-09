import { baseServices } from "./baseServices";

class TypeService extends baseServices {
  getAll = () => this.get('TaskType/getAll');
}

export const typeService = new TypeService();