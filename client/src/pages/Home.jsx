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
                    <button className='primaryButton' onClick={() => handleToStudent()}>
                    StudentLogin
                    </button>
                    <button className='secondaryButton' onClick={() => handleToTeacher()}>
                    TeacherLogin
                    </button>
                    </td>
                </tr>
                </thead>
            </table>
            </div>
        </main>
    </section>
</>
)};