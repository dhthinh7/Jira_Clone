import { baseServices } from "./baseServices";

class PriorityService extends baseServices {
  getAll = () => this.get('Priority/getAll');
}

export const priorityService = new PriorityService();