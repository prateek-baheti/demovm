import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
export const AddTeacher =() =>{

    const {isLoggedIn} = useAuth();

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
    //handling form submission
    const handleSubmit= async (e) =>{
        e.preventDefault();
        console.log(teacher);
        try{
            const response = await fetch(`http://localhost:5001/teacher/addteacher`,{
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
                navigate("/teacherLogin");
            }
            console.log(response);
        }
        catch(error){
            console.log("AddTeacher ",error);
        }
    
    };
    
    if(isLoggedIn){
    
    return <>
    <Navbar />
    <section>
        <main>
            <div className='section-login'>
                <div>
                    <div className='addteacher-image'>
                        <img src='./public/images/AddTeacher.png' alt='Adding Teacher in RMS' width="250" height="250" />
                    </div>
                    <div className='addTeacher-form'>
                        <h1 className='main-heading mb-3'>Teacher Registration</h1>
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
                            <button type='Submit' className='btn btn-submit' class="btn btn-info">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
    }
    else{
        return <>
        <Navbar />
        <section>
            <main>
                <div className='section-registration'>
                    <div className='container grid grid-two-cols'>
                        <h1>Please Login First </h1>
                    </div>
                </div>
            </main>
        </section>
        </>
    }
};