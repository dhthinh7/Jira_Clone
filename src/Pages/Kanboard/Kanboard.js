import React, { useEffect } from "react";
import HeaderDetail from "../../Components/Kanboard/HeaderDetail";
import KanboardInfor from "../../Components/Kanboard/KanboardInfor";
import KanBoardContent from "../../Components/Kanboard/KanBoardContent";
import { GET_PROJECT_DETAIL_SHOW_LOADING_ONE_TIME } from "../../redux/contains/contains";
import { useDispatch, useSelector } from "react-redux";

export default function Kanboard(props) {
  let { projectDetail } = useSelector(state => state.ProjectReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    let { projectId } = props.match.params;
    dispatch({
      type: GET_PROJECT_DETAIL_SHOW_LOADING_ONE_TIME,
      projectId
    })
  }, []);
  
  return <div className="">
    <HeaderDetail projectName={projectDetail.projectName} />
    <KanboardInfor projectDetail={projectDetail} />
    <KanBoardContent projectDetail={projectDetail} />
  </div>;
}
