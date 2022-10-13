import React from "react";

export default function HeaderDetail(props) {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb px-0" style={{ backgroundColor: 'white' }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <li className="breadcrumb-item">Project management</li>
          <li className="breadcrumb-item active" aria-current="page">{props.projectName}</li>
        </ol>
      </nav>
    </div>
  )
}
