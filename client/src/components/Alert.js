import React from 'react'

export default function Alert(props) {
    const capitalize = (word)=>{
    if(word==="danger")word="error"
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    if (!props.alert) return null;
    console.log(props);
    return (
    <div style={{ zIndex: '999', position: 'static' }}className='pt-16'>
      
     {props.alert&&<div className={`px-4 py-3 leading-normal text-${props.alert.type === "danger" ? "red" : "green"}-700 ${props.alert.type === "danger" ? "bg-red-100" : "bg-green-100"} rounded-lg`} role="alert">
     <p className="font-bold">{capitalize(props.alert.type) }</p>
     <p>{props.alert.msg}</p>
    </div>}

    </div>
  )
}
