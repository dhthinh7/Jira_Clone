import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_ALL_COMMENTS_SAGA, GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../redux/contains/contains";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './KanBoardContent.scss';


export default function KanBoardContent(props) {

  const { projectDetail } = props;
  const [projectDetailState, setProjectDetailState] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setProjectDetailState({ ...projectDetail });
  }, [projectDetail])

  const handleDragEnd = (result) => {
    let { projectId, taskId } = JSON.parse(result.draggableId);
    let { source, destination } = result;

    if (!result.destination) {
      return;
    }

    // Make sure that drop position and drag position is different
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    // Create a tag drag - copy and find the index of the dragged item to temp tagDrag
    let tagDrag = projectDetailState.lstTask[source.droppableId - 1].lstTaskDeTail[source.index]
    let indexDrop = projectDetailState.lstTask[source.droppableId - 1].lstTaskDeTail.findIndex(item => item.taskId === tagDrag.taskId);

    // Remove the dragged item from projectDetailState
    projectDetailState.lstTask[source.droppableId - 1].lstTaskDeTail.splice(indexDrop, 1);

    // Drop to here
    projectDetailState.lstTask[destination.droppableId - 1].lstTaskDeTail.splice(destination.index, 0, tagDrag);

    setProjectDetailState({ ...projectDetailState });

    // Dispatch action to API to Saga
    dispatch({
      type: UPDATE_STATUS_TASK_SAGA,
      taskUpdateStatus: {
        "taskId": taskId,
        "statusId": destination.droppableId,
        "projectId": projectId
      }
    })

  }

  const renderCardTaskList = () => {
    return <DragDropContext onDragEnd={handleDragEnd}>
      {
        projectDetailState?.lstTask?.map((taskListDetail, index) => {
          return <Droppable key={index} droppableId={taskListDetail.statusId}>
            {(provided) => {
              return <div className="card" style={{ width: '17rem', height: 'auto' }} >
                <div className="card-header">
                  {taskListDetail.statusName}
                </div>
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  key={index}
                  className="list-group list-group-flush" style={{ height: '100%', backgroundColor: 'rgba(0,0,0,.03)' }}>
                  {taskListDetail.lstTaskDeTail.map((task, index) => {
                    return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({ projectId: task.projectId, taskId: task.taskId })}>
                      {(provided) => {
                        return <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={index} className="list-group-item h-24" data-toggle="modal" data-target="#infoModal" onClick={() => {
                            dispatch({ type: GET_TASK_DETAIL_SAGA, taskId: task.taskId });
                            dispatch({ type: GET_ALL_COMMENTS_SAGA, taskId: task.taskId });
                          }}>
                          <p className="font-weight-300">
                            {task.taskName}
                          </p>
                          <div className="block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="block-left">
                              <p className="text-danger m-0">{task.priorityTask.priority}</p>
                            </div>
                            <div className="block-right">
                              <div className="avatar-group flex">
                                {task.assigness.slice(0, 3).map((mem, index) => {
                                  return <div className="avatar mr-1 hover:-translate-y-2 transition-transform duration-200" key={index}>
                                    <img src={mem.avatar} alt={mem.avatar} className="w-8 rounded-full" />
                                  </div>
                                })}
                                {task.assigness.length > 3 ? <div className="w-8 rounded-full text-center" style={{ backgroundColor: '#DDDDDD' }}>...</div> : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                      }}
                    </Draggable>
                  })}
                  {provided.placeholder}
                </div>
              </div>
            }}
          </Droppable>
        })}
    </DragDropContext>
  }

  return <div className="jr-board-content content" style={{ display: 'flex' }}>
    {renderCardTaskList()}
  </div>
}
