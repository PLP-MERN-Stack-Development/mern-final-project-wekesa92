import React from 'react'

export default function TaskCard({ task }){
  return (
    <div className="task-card">
      <h5>{task.title}</h5>
      <p>{task.description}</p>
    </div>
  )
}
