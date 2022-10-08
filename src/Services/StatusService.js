import { baseServices } from "./baseServices";

class StatusService extends baseServices {
  getAll = () => this.get('Status/getAll');
}

export const statusService = new StatusService();