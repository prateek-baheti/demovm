import { useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useNavigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


export const StudentLogin =() =>{

    const [student,setStudent]=useState({
        rollno : "",
        dob : "",
    });

    const navigate = useNavigate();
    //const {storeTokenInLS} = useAuth();
    //Handling The Input values 
    const handleInput= (e) =>{
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setStudent({
            ...student,
            [name] : value,
        });
    };
    //hamdling form submission
    const handleSubmit= async (e) =>{
        e.preventDefault();
        console.log(student);
        try{
            const response = await fetch(`http://localhost:5001/student/studentlogin`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
            });
            if (response.ok) {
                const res_data= await response.json();
                const data = res_data.studentdetails;
                console.log("res from server " , res_data);
                setStudent({ rollno : "", dob : ""});
                navigate("/studentresult" ,{state:{rollno : data.rollno , name: data.name , dob : data.dob , score : data.score },replace:true});
            }
            else{
                const error_message= await response.json();
                alert(error_message.message);
            }
        }
        catch(error){

            console.log("StudentLogin ",error);
        }   
};

    
    return <>
    <Navbar />
    <section>
        <main>
            <div className='section-login'>
                <div className='container-login' >
                    <div className='login-image'>
                        <img src='./public/images/StudentLogin.png' alt='Logging Student in RMS' width="200" height="200" />
                    </div>
                    <div className='LogginStudent-form'>
                        <h1 className='main-heading mb-3'>Find Result</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='rollno'>RollNumber </label>
                                <input 
                                type='text' 
                                name='rollno' 
                                placeholder='Enter rollno' 
                                id='rollno' 
                                required
                                autoComplete='off'
                                value={student.rollno}
                                onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor='dob'>DOB </label>
                                <input 
                                type='text' 
                                name='dob' 
                                placeholder='Enter dob[DD/MM/YYYY]' 
                                id='dob' 
                                required
                                pattern='[0-9]{2}/[0-9]{2}/[0-9]{4}' title="Pattern[DD/MM/YYYY]"
                                autoComplete='off'
                                value={student.dob}
                                onChange={handleInput}
                                />
                            </div>
                            <br />
                            <button type='Submit' class="btn btn-info">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
};