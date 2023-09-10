import React, { useState ,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import DocState from './context/document/docState'
import Docshome from './components/Docshome';
import suprsend from "@suprsend/web-sdk";
import "./index.css"
import Login from './components/login';
import Register from './components/Register';
import Preferences from './preferences';
import Alldocs from './components/Alldocs';
import DocOpen from './components/DocOpen';
import Alert from './components/Alert'
import Loader from './components/Loader'
suprsend.init(process.env.REACT_APP_WKEY,process.env.REACT_APP_WSECRET);

export default function App() {
  const [alert,setAlert] = React.useState(null);
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const host  = process.env.REACT_APP_PORT;
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },2500);
  }

  useEffect(() => {
    setTimeout(async() => {
      const response = await fetch(`${host}/starting`,{
        method : "GET",
        headers:{
          'Content-Type':"application/json",
        }
      })
      const json = await response.json();
      setDatabaseConnected(true);
    }, 2000); 
    return () => {
    };
  }, []);

  if (!databaseConnected) {
    return <Loader />;
  }
  return (
    <DocState>
      <div style={{ position: 'relative' }}>
       <Navbar showAlert = {showAlert} />
       <div style={{ position: 'absolute', right: '2%' }}>
       <Alert alert={alert} />
       </div>
       <Routes>
       <Route exact path="/" element = {<Docshome showAlert={showAlert} />} />
       <Route exact path="/login" element = {<Login showAlert = {showAlert} />} />
       <Route exact path="/signup" element = {<Register showAlert = {showAlert}/>} />
       <Route exact path="/showalldocs" element = {<Alldocs/>} />
       <Route exact path="/userpreference" element = {<Preferences />} />
       <Route exact path="/opendoc/:id" element = {<DocOpen showAlert={showAlert} />} />
       </Routes>
      </div>
    </DocState>
  )
}
