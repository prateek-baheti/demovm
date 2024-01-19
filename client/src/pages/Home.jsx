import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../store/auth';
import './Home.css';
import { Navbar } from '../components/Navbar';
export const Home =() =>{
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const handleToStudent = () => {
        navigate('/studentLogin');
        window.location.reload();
    }
    const handleToTeacher = () => {
        if(isLoggedIn){
        navigate("/studentdetails");
        }
        else{
        navigate("/teacherlogin");
    }}

    return( 
    <>
    <Navbar />
    <section>
        <main>
            <div className='tablediv'>
            <table className="table-studentdetails">
                <thead>
                <tr>
        <td>
            <label for="textField1">Text Field 1:</label>
            <input type="text" id="textField1"/>
        </td>
        <td>
            <button onclick="handleToStudent()">ADD EMPLOYEE</button>
        </td>
    </tr>
    <tr>
        <td>
            <label for="textField2">Text Field 2:</label>
            <input type="text" id="textField2"/>
        </td>
        <td>
            <button onclick="handleToTeacher()">ADD DEPT</button>
        </td>
    </tr>
                </thead>
            </table>
            </div>
        </main>
    </section>
</>
)};
