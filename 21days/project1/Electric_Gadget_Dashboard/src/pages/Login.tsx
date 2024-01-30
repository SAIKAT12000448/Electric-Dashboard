import  {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../redux/api/apiSlice';
// import Swal from 'sweetalert2'
const Login = () => {
const {data,error,isLoading} = useGetUserQuery(undefined);
console.log(error);
console.log(isLoading);

  const navigate = useNavigate();

//   const location = useLocation();
  const [formData, setFormData] = useState({
    account_email: '',
    account_password: '',
  });
  



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();
    try {
        if(data.account_email === formData.account_email && data.account_password === formData.account_password){
            localStorage.setItem('email',data.account_email);
            alert('Logged in successfully');
            navigate('/');
        }
        else{
            alert("couldn't find user")
        }

       
    } catch (error) {
      console.error('Error:', error);
    
    }
  };

  return (
    <div style={{ backgroundColor: '#040404' }} className="min-h-screen flex items-center justify-center">
      <div style={{ width: '516px', height: "667px", borderRadius: '20.11px' }} className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', height: '180px' }}>
    <h1 className='text-3xl '>Electro🙈</h1>

          {/* <img style={{ width: '200px', height: '200px' }} src={QUIRKY} alt="" /> */}
        </div>
        <form onSubmit={handleSubmit}>

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
          </div>

          <div className="mt-6 text-center">
            <button
             
              type="submit"
              style={{ backgroundColor: '#FBBD0A', marginBottom: '20px' }}
              className="text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
          <Link to='/signup'> <h1 className='text-gray-800 font-medium text-center'>New User! Please <span className='text-blue-400 text-bold'>sign up</span></h1></Link>
          
      </div>
    </div>
  );
};

export default Login;
 