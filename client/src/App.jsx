import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { TeacherLogin } from './pages/TeacherLogin';
import { AddTeacher } from './pages/AddTeacher';
import { AddStudent } from './pages/AddStudent';
import { StudentDetails } from './pages/StudentDetails';
import { Logout } from './pages/Logout';
import { StudentLogin } from './pages/StudentLogin';
import { StudentResult } from './pages/StudentResult';
import { UpdateStudent } from './pages/UpdateStudent';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacherLogin" element={<TeacherLogin />} />
          <Route path="/addTeacher" element={<AddTeacher />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/studentdetails" element={<StudentDetails />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/studentresult" element={<StudentResult />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/updateStudent/' element={<UpdateStudent />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
