import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import View from './pages/View'
import Update from './pages/Update'
import Delete from './pages/Delete'
import FormExample from './pages/FormExample'

export default function App () {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contacts/view/:id" element={<View/>}/>
          <Route path="/contacts/delete/:id" element={<Delete/>}/>
          <Route path="/contacts/update/:id" element={<Update/>}/>
          <Route path="/form" element={<FormExample/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
