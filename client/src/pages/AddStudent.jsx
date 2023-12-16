import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import 'bootstrap/dist/css/bootstrap.css';
export const AddStudent =() =>{
    //for checking user is login or logout
    const {isLoggedIn} = useAuth();

    const [student,setStudent]=useState({
        rollno : "",
        name : "",
        dob : "",
        score : "",
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
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
        const response = await fetch(`http://localhost:5001/teacher/addStudent`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });
        if (response.ok) {
            const res_data= await response.json();
            console.log("res from server " , res_data);
            storeTokenInLS(res_data.token);
            setStudent({rollno : "", name : "", dob : "", score :""});
            navigate("/studentdetails");
        }else{
        const error_message= await response.json();
        console.log(response);
        alert(await error_message.message);
    }
}
    catch(error){
        console.log("AddStudent ",error);
    }
    };
    if(isLoggedIn){
    
    return <>
    <Navbar />
    <section>
        <main>
            <div >
                <div >
                    <div className='AddRecord-Image'>
                        <img src='./public/images/Studentadd.png' alt='Adding Student in RMS' width="200" height="200" />
                    </div>
                    <div className='addRecord-form'>
                        <h1 className='main-heading mb-3'>Add New Result</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='rollno'>RollNumber</label>
                                <input 
                                type='text' 
                                name='rollno' 
                                placeholder='Enter rollnumber' 
                                id='rollno' 
                                required
                                autoComplete='off'
                                value={student.rollno}
                                onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input 
                                type='text' 
                                name='name' 
                                placeholder='Enter name' 
                                id='name' 
                                required
                                autoComplete='off'
                                value={student.name}
                                onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor='dob'>Date-Of-Birth</label>
                                <input 
                                type='text' 
                                name='dob' 
                                placeholder='Enter dob [DD/MM/YYYY]' 
                                id='dob' 
                                required
                                pattern='[0-9]{2}/[0-9]{2}/[0-9]{4}' title="Pattern[DD/MM/YYYY]"
                                autoComplete='off'
                                value={student.dob}
                                onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor='score'>Score</label>
                                <input 
                                type='number' 
                                name='score' 
                                placeholder='Enter score' 
                                id='Score'
                                min="0" 
                                required
                                autoComplete='off'
                                value={student.score}
                                onChange={handleInput}
                                />
                            </div>
                            <br />
                            <button type='Submit' className='btn btn-submit' class="btn btn-info" >Add Result</button>
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