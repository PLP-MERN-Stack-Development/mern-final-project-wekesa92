import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [boards, setBoards] = useState([])

  useEffect(()=>{
    api.get('/boards').then(r=>setBoards(r.data)).catch(()=>setBoards([]))
  },[])

  return (
    <div className="page">
      <h2>Your Boards</h2>
      <div className="boards">
        {boards.map(b=> (
          <div key={b._id} className="board-card">
            <h3>{b.title}</h3>
            <p>{b.description}</p>
            <Link to={`/boards/${b._id}`}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
