import {useLocation} from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import "./StudentResult.css";
import 'bootstrap/dist/css/bootstrap.css';
export const StudentResult = () =>{
    const navigate = useNavigate();
    const navigateTostudentlogin = () => {
        // 👇️ navigate to /studentlogin
        navigate('/studentLogin');
      };
    const {state} = useLocation();
    return <> 
        <Navbar />
        <div className='col'>
        <p>
            RollNumber : {state.rollno}
            <br />
            <br />
            Name : {state.name}
            <br />
            <br />
            Date-of-Birth : {state.dob}
            <br />
            <br />
            Score : {state.score}
            <br />
            <br />
        </p>
        <div>
             <button class="btn btn-info" onClick={navigateTostudentlogin}>Back</button>
        </div>
    </div>
    </>
}