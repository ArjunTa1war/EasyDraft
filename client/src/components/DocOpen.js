import React, {useContext,useState, useEffect} from 'react';
import docContext from '../context/document/docContext';
import ReactQuill from 'react-quill';
import {Link, useParams} from "react-router-dom"
import {useNavigate} from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

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

export default function DocOpen(props) {
  const {id} = useParams();
  const host = process.env.REACT_APP_PORT;
  const [data,setData] = React.useState({});
  const [value, setValue] = useState(data.textfile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/getdoc/${id}`);
        const jsonData = await response.json();
        setData(jsonData.doc);
        setValue(jsonData.doc.textfile);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  
  const context = useContext(docContext);
  const {editdoc,deletedoc} = context;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handledelete = async(ev)=>{
    deletedoc(id);
    props.showAlert("Succesfully Deleted","success");
  }
 
  const handleshare = async(ev)=>{
    ev.preventDefault();
    setIsModalOpen(true);
  }

  let navigate = useNavigate();

  const handleedit = async(ev)=>{
    ev.preventDefault();
    await editdoc(id,value)
    props.showAlert("Succesfully edited","success");
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    const response = await fetch(`${host}/sharedoc`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ share: email, docid:id })
    });
    const json = await response.json();
    if(!json.success){
      props.showAlert("No such email exists on the Easy Draft","danger");
    }
    else{
      props.showAlert("Doc succesfully shared with the user","success");
      setIsModalOpen(false);
    }
  };
  
  return (
  <div>
  <div className="container-lg my-4 pt-20">
    <div className="flex justify-center">
      <div className="w-full md:w-8/12 bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(243, 242, 243, 0.9)' }}>
        <h2 className="text-3xl font-semibold text-center mb-6 text-black-600">
          Edit Your doc
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
        <div className="flex justify-center space-x-4">
      <Link
        onClick={handledelete}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full md:w-[200px] transition duration-300 ease-in-out transform hover:scale-105 text-center"
        to="/showalldocs"
        role="button"
      >
        Delete Doc
      </Link>
      <Link
        onClick={handleshare}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full md:w-[200px] transition duration-300 ease-in-out transform hover:scale-105 text-center"
        to="/opendoc"
        role="button"
      >
        Share Doc
      </Link>
      <Link
        onClick={handleedit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full md:w-[200px] transition duration-300 ease-in-out transform hover:scale-105 text-center"
        to="/opendoc"
        role="button"
      >
        Save Doc
      </Link>
    </div>
      </div>
    </div>
  </div>  
  {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 animate-fade-in" onClick={handleModalClose}></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-hidden animate-slide-up">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-semibold">Share with the user</p>
              <button className="modal-close p-2 hover:bg-red-500 hover:text-white rounded-full" onClick={handleModalClose}>
                &times;
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  📧 Enter Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter user's email"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      )}
</div>

  )
}
