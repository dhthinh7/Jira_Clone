import React from "react";
import ReactHtmlParser from "react-html-parser";

export default function KanboardInfor(props) {
  const { projectDetail } = props;
  const renderAvatar = () => {
    return <>
      {projectDetail.members?.slice(0, 10).map((user, index) => {
        return <div key={index} className="avatar">
          <img src={user.avatar} alt={user.avatar} className="w-7 h-7 rounded-full hover:-translate-y-2 duration-200 ease-in-out" />
        </div>

      })}
      {projectDetail.members?.length > 10 ? <div className="w-7 h-7 rounded-full hover:-translate-y-2 duration-200 ease-in-out bg-gray-300 text-center">...</div> : ''}
    </>
  }

  return <div>
    <h1 className="font-semibold text-xl">{projectDetail.projectName}</h1>
    <div>{ReactHtmlParser(projectDetail.description)}</div>
    <div className="info flex items-center p-4">
      <div className="avatar-group" style={{ display: 'flex' }}>
        {renderAvatar()}
      </div>
      <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
      <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
    </div>
  </div>;
}
