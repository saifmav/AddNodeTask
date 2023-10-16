
import React from 'react';
import Upload from './component/Upload';
import Table from './component/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <div style={{ padding: 40 }}>
        <h1 style={{ display: "flex", justifyContent: "center", color: "#6b7280" }}>Document Management System</h1>
        <Upload />
        <Table />
        <ToastContainer/>
      </div>
    </>
  );
};


export default App;

