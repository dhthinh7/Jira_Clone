import { baseServices } from "./baseServices";

class CommentServices extends baseServices {
  getAllComments = (taskId) => this.get(`Comment/getAll?taskId=${taskId}`);
  insertComment = (objectComment) => this.post('Comment/insertComment', objectComment);
  updateComment = (id, contentComment) => this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`);
  deleteComment = (idComment) => this.delete(`Comment/deleteComment?idComment=${idComment}`); 
}

export const commentServices = new CommentServices();