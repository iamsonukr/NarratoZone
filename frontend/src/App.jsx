import { useState } from 'react'

import CreateUser from './pages/Createuser/CreateUser'
import UserList from './pages/UserList/UserList'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
// import TeamManagement from './pages/TeamManagement/TeamManagement'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>



    <div className="app-component">
      <Sidebar/>
      <Routes>
        {/* <Route path="/create" element={<CreateUser />}/> */}
        <Route path="/create/:id?" element={<CreateUser />}/>
        <Route path='/' element={<UserList/>}/>
        <Route path='/list' element={<UserList/>}/>
        {/* <Route path='/team-management' element={<TeamManagement/>}/> */}
      </Routes>
    </div>
    </>
  )
}

export default App
