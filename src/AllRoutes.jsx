import React from 'react'
import {Routes ,Route, BrowserRouter} from 'react-router-dom'
import Login from './Components/AllPages/Login/Login'
import SignUp from './Components/AllPages/SignUp/SignUp'
import Inbox from './Components/AllPages/Inbox/Inbox'
import Outbox from './Components/AllPages/Outbox/Outbox'
import Trash from './Components/AllPages/Trash/Trash'
import ComposeMail from './Components/AllPages/ComposeMail/ComposeMail'

const AllRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Login/>}/>
          <Route  path='SignUp' element={<SignUp/>}/>
          <Route path="Inbox" element={<Inbox />} />
          <Route path="Outbox" element={<Outbox />} />
          <Route path="Trash" element={<Trash />} />
          <Route path="Mail" element={<ComposeMail />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes