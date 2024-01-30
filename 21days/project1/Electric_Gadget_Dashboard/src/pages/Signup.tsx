
import { Link, useNavigate} from 'react-router-dom';
import {  useState } from 'react';
import { useSignUpMutation } from '../redux/api/apiSlice';



const Signup = () => {

    const [postSignup,{isError,isLoading,isSuccess}] = useSignUpMutation();
    console.log(isError);
    console.log(isLoading);
    console.log(isSuccess);
    const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    account_name: '',
    account_email: '',
    account_password: '',
    confirm_password:''
  });

//   const navigate = useNavigate();
//   const location = useLocation();
  // const[PasswordsMatchError,setPasswordsMatchError] = useState(false);
  // const[response,setResponse] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };



console.log(formData);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        postSignup(formData);
        alert('seccessfully created user1');  
        localStorage.setItem('email',formData.account_email)  ;
        setFormData({
            account_name: '',
            account_email: '',
            account_password: '',
            confirm_password:''
        })
        navigate('/');
    }
    catch(error){
        alert("Email is already in use");
    }
    
  
  };

  return (
    <div style={{backgroundColor:'#0f0f0e'}} className=" min-h-screen flex items-center justify-center">
    <div style={{ width: '516px' ,height:"667px",borderRadius:'20.11px'}} className="bg-gray-100 p-8 rounded-lg shadow-md">
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%',alignItems:'center', height: '180px' }}>
    <h1 className='text-3xl '>Electro🙈</h1>
  {/* <img style={{ width: '200px', height: '200px' }} src={QUIRKY} alt="" /> */}
</div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        
          <input
            type="text"
            id="account_name"
            name="account_name"
            placeholder='Name'
            value={formData.account_name}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
        
          <input
            type="text"
            id="account_email"
            name="account_email"
            placeholder='Email'
            value={formData.account_email}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

    

     


        <div className="mb-4">
          {/* <label htmlFor="account_password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label> */}
          <input
            type="password"
            id="account_password"
            name="account_password"
            placeholder='password'
            value={formData.account_password}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
          />
          <div className="mb-4 mt-6">
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder='Confirm Password'
            value={formData.confirm_password}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        </div>

  

        <div className="mt-6 text-center">
          <button
            type="submit"
            style={{backgroundColor:'#FBBD0A'}}
            className="text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </div>

    
          <div className='mt-5 text-center'>
            <Link className='text-black' to='/login'>Already signed Up! please <span className='text-blue-400 text-bold	'>Login</span></Link>
          </div>
      </form>

    </div>
  </div>
  );
};

export default Signup;
