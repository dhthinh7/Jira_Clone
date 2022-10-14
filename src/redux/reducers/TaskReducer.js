import { CHANGE_ASSIGNES, CHANGE_TASK_MODAL, GET_TASK_LIST, REMOVE_USER_ASSIGN } from "../contains/contains";

const initialState = {
  // Data get from get task detail
  taskDetailModal: {
    "priorityTask":
    {
      "priorityId": 1,
      "priority": "High"
    },
    "taskTypeDetail":
    {
      "id": 2,
      "taskType": "new task"
    },
    "assigness": [],
    "lstComment": [],
    "taskId": 6017,
    "taskName": "Task 1",
    "alias": "task-1",
    "description": "",
    "statusId": "1",
    "originalEstimate": 0,
    "timeTrackingSpent": 0,
    "timeTrackingRemaining": 0,
    "typeId": 2,
    "priorityId": 1,
    "projectId": 8028
  }
};

export const TaskDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_LIST:
      return {...state, taskDetailModal: action.taskDetailModal};
    case CHANGE_TASK_MODAL:
      return {...state, taskDetailModal: {...state.taskDetailModal, [action.name] : action.value}};
    case REMOVE_USER_ASSIGN:
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)];
      return {...state};
    case CHANGE_ASSIGNES:
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelected];
      return {...state }
    default:
      return { ...state };
  }
};
