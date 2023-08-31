import React from 'react'
import {Routes ,Route, BrowserRouter} from 'react-router-dom'
import LoginPage from './Components/AllPages/login/LoginPage'
import SignUpPage from './Components/AllPages/signup/SignUpPage'
import Inbox from './Components/AllPages/inbox/Inbox'
import SentBox from './Components/AllPages/outbox/SentBox'
import Trash from './Components/AllPages/trash/Trash'
import ComposeMail from './Components/AllPages/compose-mail/ComposeMail'

const AllRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route  path='/' element={<LoginPage/>}/>
          <Route  path='SignUp' element={<SignUpPage/>}/>
          <Route path="Inbox" element={<Inbox />} />
          <Route path="SentBox" element={<SentBox />} />
          <Route path="Trash" element={<Trash />} />
          <Route path="Mail" element={<ComposeMail />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes