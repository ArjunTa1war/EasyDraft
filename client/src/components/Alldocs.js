import React, { useContext, useEffect } from 'react'
import docContext from '../context/document/docContext'
import {useNavigate} from 'react-router-dom';
import DocItem from './DocItem';

export default function Alldocs(props) {
  const context = useContext(docContext);
  const {docs,getDoc} = context;
  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      getDoc();
    }
    else{
       navigate("/login");
    }
  },[])

  return (
   <div className='pt-16'>
  <div className="text-center my-10">
    <h2 className="text-3xl font-semibold mb-10 mt-8 text-white">Your Docs</h2>
    {docs.length === 0 && (
      <div className="container mx-auto text-white">No Notes To Show</div>
    )}
    {docs.map((doc) => {
      return <DocItem key={doc._id} doc={doc} />;
    })}
  </div>
</div>

  )
}
