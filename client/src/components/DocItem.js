import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import docContext from '../context/document/docContext';

export default function DocItem(props) {
  var own = "Owner";
  var date = props.doc.date;
  const host = process.env.REACT_APP_PORT;
  
  const [name,setName] = React.useState("temp");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/getdocowner`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({ id: props.doc.author })
        });
        const json = await response.json();
        setName(json.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  


  const context = useContext(docContext);
  function convertToPlain(html){
      var tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  let navigate = useNavigate();
  
  const handleClick = ()=>{
    navigate(`/opendoc/${props.doc._id}`);
  }

  return (
    <div onClick={handleClick} className="container-sm mx-auto mb-12 cursor-pointer" style={{ maxWidth: "60%" }}>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform" style={{ minHeight: '11rem', backgroundColor: 'rgba(243, 242, 243, 0.9)' }} >
      {/* Upper Layer */}
      <div className="py-2 px-4 text-white font-bold flex justify-between" style={{ backgroundColor: "rgba(59, 64, 82, 0.8)" }}>
        <div>{`Author: ${name}`}</div>
        <div>
          <strong>Last Edit: </strong>
          {new Date(props.doc.updatedAt).toLocaleString()}
        </div>
      </div>
  
      <div className="p-4">
        <div className="min-h-40">
          <p>
            {convertToPlain(props.doc.textfile).length > 200
              ? `${convertToPlain(props.doc.textfile).slice(0, 200)}...`
              : convertToPlain(props.doc.textfile)}
          </p>
          <footer className="mt-auto text-gray-600 text-sm">
            Created on: {new Date(date).toLocaleString()}
          </footer>
        </div>
      </div>
    </div>
  </div>
  )
}
