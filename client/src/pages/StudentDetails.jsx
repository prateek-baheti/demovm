import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import './StudentDetails.css';
import 'bootstrap/dist/css/bootstrap.css';

 export const StudentDetails = () =>{

  const navigate = useNavigate();
  // redirect to /updateStudent page for Updating Records 
  const handleUpdate = (studentRoll) => {
    // Logic for updating student where passing rollno for updating records
    navigate("/updateStudent" ,{state:{rollno : studentRoll },replace:true});
    console.log(`Update student with ID: ${studentRoll}`);
  };
 //handle button for redirect to /addStudent page for adding records
  const handleAddStudent = () => {
    navigate("/addStudent");
  }
   //handle button for Deleting records
  const handleDelete = async (studentId) => {
    // Logic for deleting student
    try{
      const response = await fetch(`http://localhost:5001/teacher/deleteStudent/${studentId}`,{
        method:"DELETE",
    });
      if (response.ok) {
          const res_data= await response.json();
          console.log("res from server " , res_data);
          navigate("/studentdetails");
          window.location.reload();
      }
      console.log(response);
  }
  catch(error){
      console.log("DeleteStudent ",error);
  }
  };
  
const [students,setStudents]=useState([]);
useEffect(() => {
//logic for fetching all records for backend
  const students1 = async () =>{
  try{
      const students = await fetch(`http://localhost:5001/teacher/studentdetails`,{
          method:"GET",
      });

      const student= await students.json();
      setStudents(student);

      if (students.ok) {
          const res_data= await students.json();
          //console.log("RES_DATA",res_data);
      }

  }catch(error){
      console.log(error);
  }};
  //calling fetch all records function
  students1();
},[]);


    return <>
    <Navbar />
    <section>
        <main>
          <div>
                <button className='right-container' class="btn btn-info"  onClick={() => handleAddStudent()}>
                Add Record
                </button>  
            <div className='tablediv'>
            <table className="table-studentdetails">
                <thead>
                <tr>
                    <th scope="col">RollNo</th>
                    <th scope="col">Name</th>
                    <th scope="col">dob</th>
                    <th scope="col">score</th>
                  </tr>
                </thead>
                <tbody>
                {students.map((element) => (
              <tr key={element._id} className="head">
                <td>{element.rollno}</td>
                <td>{element.name}</td>
                <td>{element.dob}</td>
                <td>{element.score}</td>
                <td>
                <button onClick={() => handleUpdate(element.rollno)}>
                <img style={{ margin: '0px 20px' }} src="https://img.icons8.com/material-outlined/30/000000/edit.png" alt="Edit" />
                </button>
                <button onClick={() => handleDelete(element.rollno)}>
                <img style={{ margin: '0px 20px' }} src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" alt="Delete" />
                </button>
                </td>
              </tr>
            ))}
            </tbody>
            </table>
            </div>
          </div>
        </main>
    </section>
    </>
};