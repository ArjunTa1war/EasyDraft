import React from 'react'
import suprsend from "@suprsend/web-sdk";
import {useNavigate} from 'react-router-dom';

export default function Register(props) {
   const port = process.env.REACT_APP_PORT;
   const [formData,setFormData] = React.useState({
        email:"",
        name : "",
        password:"",
    })
    let navigate = useNavigate();

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const response = await fetch(`${port}/register`,{
          method : "POST",
          headers : {
             'content-type':'application/json'            
          },
          body : JSON.stringify({email : formData.email,name : formData.name
            ,password : formData.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          localStorage.setItem('token' , json.authtoken);
          props.showAlert("Succesfully Registered","success");
          suprsend.identify(formData.email);
          navigate("/");
        }
        else{
          props.showAlert("User may already exists","danger");
        }
    }
    
    function handleChange(event){
        const {name,value} = event.target;
        setFormData((prev)=>{
          return{
             ...prev,
             [name]:value
          }
        })
     }

  return (
    <div className="mx-auto max-w-screen-md mt-16 pt-16">
<div className="bg-white shadow-md rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(243, 242, 243, 0.9)' }}>
    <h4 className="text-primary font-semibold text-2xl text-center text-white py-4" style={{ backgroundColor: "rgba(59, 64, 82, 0.8)" }}>Register Page</h4>
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-6">
        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          value={formData.name}
          name="name"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
      </div>

      <button type="submit" className="my-3 w-full py-2 px-4  hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"  style={{backgroundColor:"#8293f5"}}>
        Submit
      </button>
    </form>
  </div>
</div>
  )
}
