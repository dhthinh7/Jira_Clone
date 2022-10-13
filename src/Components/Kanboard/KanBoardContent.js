import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../redux/contains/contains";
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
                  className="list-group list-group-flush" style={{ height: '100%', backgroundColor: 'rgba(0,0,0,.03)'}}>
                  {taskListDetail.lstTaskDeTail.map((task, index) => {
                    return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({ projectId: task.projectId, taskId: task.taskId })}>
                      {(provided) => {
                        return <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={() => {
                            dispatch({ type: GET_TASK_DETAIL_SAGA, taskId: task.taskId });

                          }}>
                          <p className="font-weight-300">
                            {task.taskName}
                          </p>
                          <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                              <p className="text-danger">{task.priorityTask.priority}</p>
                            </div>
                            <div className="block-right">
                              <div className="avatar-group" style={{ display: 'flex' }}>
                                {task.assigness.map((mem, index) => {
                                  return <div className="avatar" key={index}>
                                    <img src={mem.avatar} alt={mem.avatar} />
                                  </div>
                                })}

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
