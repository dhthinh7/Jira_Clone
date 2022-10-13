import React, { useEffect } from "react";
import HeaderDetail from "../../Components/Kanboard/HeaderDetail";
import KanboardInfor from "../../Components/Kanboard/KanboardInfor";
import KanBoardContent from "../../Components/Kanboard/KanBoardContent";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/contains/contains";
import { useDispatch, useSelector } from "react-redux";

export default function Kanboard(props) {
  let { projectDetail } = useSelector(state => state.ProjectReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    let { projectId } = props.match.params;
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId
    })
  }, []);
  
  return <div className="ml-72 px-16 pt-10 w-full">
    <HeaderDetail projectName={projectDetail.projectName} />
    <KanboardInfor projectDetail={projectDetail} />
    <KanBoardContent projectDetail={projectDetail} />
  </div>;
}
