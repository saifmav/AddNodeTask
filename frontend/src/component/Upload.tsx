import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uploadDocuments } from '../action';
import '../styles/Upload.css'
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify'
const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<any>();
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit: any = (event: any) => {
    if(files.length > 0){
       event.preventDefault();
       dispatch(uploadDocuments(files));
      setFiles([]);
      ref.current.value = "";
    }else{
      toast.warn("Empty file cannot be uploaded!")
    }
    
  };

  return (
    <form style={{ display: "flex", justifyContent: "start", alignItems: "center", marginLeft: 10 }}>
      <input type="file" multiple onChange={handleFileChange} ref={ref} />
      <div onClick={handleSubmit}>
        <CloudArrowUpIcon style={{ color: "#3b82f6", width: 32, height: 32, paddingTop: 30, paddingBottom: 30 }} />
      </div>
    </form>
  );
};

export default Upload;
