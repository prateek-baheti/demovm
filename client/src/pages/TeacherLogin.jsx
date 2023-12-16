import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export const TeacherLogin =() =>{
    const [teacher,setTeacher]=useState({
        teacherId : "",
        password : "",
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    //Handling The Input values 
    const handleInput= (e) =>{
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setTeacher({
            ...teacher,
            [name] : value,
        });
    };
    //hamdling form submission
    const handleSubmit= async (e) =>{
        e.preventDefault();
        console.log(teacher);
        try{
            const response = await fetch(`http://localhost:5001/teacher/teacherlogin`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacher),
            });
            if (response.ok) {
                const res_data= await response.json();
                console.log("res from server " , res_data);
                storeTokenInLS(res_data.token);
                setTeacher({ teacherId : "", password : ""});
                navigate("/studentdetails");
                window.location.reload();
            }
            else{
                const error_message= await response.json();
                alert(error_message.message);
            }
        }
        catch(error){
            console.log("TeacherLogin ",error);
        }
    
    };
    
    return <>
    <Navbar />
    <section>
        <main>
            <div className='section-login'>
                <div>
                    <div className='login-image'>
                        <img src='./public/images/Teacheradd.png' alt='Logging Teacher in RMS' width="200" height="200" />
                    </div>
                    <div className='LogginTeacher-form'>
                        <h1 className='main-heading mb-3'>Teacher Login</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='teacherId'>TeacherId</label>
                                <input 
                                type='text' 
                                name='teacherId' 
                                placeholder='Enter teacherId' 
                                id='teacherId' 
                                required
                                autoComplete='off'
                                value={teacher.teacherId}
                                onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input 
                                type='password' 
                                name='password' 
                                placeholder='Enter Password' 
                                id='password' 
                                required
                                autoComplete='off'
                                value={teacher.password}
                                onChange={handleInput}
                                />
                            </div>
                            <br />
                            <button type='Submit'  class="btn btn-info">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
};