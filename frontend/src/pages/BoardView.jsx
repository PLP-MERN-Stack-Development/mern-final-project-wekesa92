import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import TaskCard from '../components/TaskCard'

export default function BoardView(){
  const { id } = useParams()
  const [board, setBoard] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    api.get(`/boards/${id}`).then(r=>setBoard(r.data)).catch(()=>{})
    api.get(`/tasks/board/${id}`).then(r=>setTasks(r.data)).catch(()=>{})
  },[id])

  const columns = ['todo','inprogress','done']

  return (
    <div className="page board-view">
      <h2>{board?.title}</h2>
      <div className="columns">
        {columns.map(col=> (
          <div key={col} className="column">
            <h4>{col}</h4>
            {tasks.filter(t=>t.column===col).map(t=> <TaskCard key={t._id} task={t} />)}
          </div>
        ))}
      </div>
    </div>
  )
}
