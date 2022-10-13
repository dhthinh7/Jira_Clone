import { GET_TASK_LIST } from "../contains/contains";

const initialState = {
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
  console.log("mmmmmmmmm", action.taskDetailModal)
  switch (action.type) {
    case GET_TASK_LIST:
      return {...state, taskDetailModal: action.taskDetailModal};
    default:
      return { ...state };
  }
};
