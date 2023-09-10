import React, { useContext, useState,useEffect} from 'react';
import ReactQuill from 'react-quill';
import {Link} from "react-router-dom"
import suprsend from "@suprsend/web-sdk";
import 'react-quill/dist/quill.snow.css';
import docContext from '../context/document/docContext';
import {useNavigate} from 'react-router-dom';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};


export default function Docshome(props) {
  const context = useContext(docContext);
  const {addDoc} = context;
  const [value, setValue] = useState("<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>");
  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      console.log('');
    }
    else{
      navigate("/login");
    }
},[])

  const handleClick = async(ev)=>{
    ev.preventDefault();
    await addDoc(value);
    props.showAlert("Doc successfully created","success");
    const property = {
    }
    // suprsend.track("DOCCREATED", property);
    setValue("<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>");
  }
  
  return (
    <div className="container-lg my-4 pt-16">
    <div className="flex justify-center">
      <div className="w-full md:w-8/12 bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(243, 242, 243, 0.9)' }}>
        <h2 className="text-3xl font-semibold text-center mb-6 text-black-600">
          Create Your Content
        </h2>
        <div className="mb-6">
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={setValue}
            value={value}
            placeholder="Start typing here...."
            style={{ minHeight: "23rem" }}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full md:w-[200px] transition duration-300 ease-in-out transform hover:scale-105"
            type="button"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>  
);
  
}
