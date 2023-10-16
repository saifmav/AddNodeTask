import React, { useEffect, useState } from 'react';
import '../styles/Table.css';
import { useDispatch, useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { downloadDocument, deleteDoc, getDocuments } from '../action';
import { CloudArrowDownIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Modal } from './Model';

const Table = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state: any ) => state.documents) || []
  const [docs, setDocs] = useState<any>([])
  const [show, setShow] = useState(false);


  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  const capitalizeFirstLetter = (array: any) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      let capitalizedElement = element.charAt(0).toUpperCase() + element.slice(1);
      newArray.push(capitalizedElement);
    }
    return newArray;
  }

  const renderTableHeader = () => {
    if (documents.length > 0) {
      let capitalizedHeader = capitalizeFirstLetter([...Object.keys(documents[0]), 'preview', 'download', 'delete']);
      return capitalizedHeader.map((key: any, index: any) => <th key={index}>{key}</th>);
    }
  };

  const previewHandler:any = (uuid: Number)=>{
   const data = documents.find((dt: any) => dt.uuid === uuid)
   const docs: any = { uri: require(`../uploads/${data.filename}`) };
   setShow(true);
   setDocs([docs]);
  }

  const renderTableData = () => {
    return documents.map((row:any, index:any) => {      
      return (
        <tr key={index}>
          {Object.values(row).map((value:any, i:any) => (
            <td key={i}>{value}</td>
        ))}
         <td  onClick={()=>previewHandler(row.uuid)}>
            <EyeIcon style={{color: "#60a5fa", width: 32, height: 32, paddingTop: 30, paddingBottom: 30}}/>
         </td>
         <td  onClick={()=> dispatch(downloadDocument(row.uuid))}>
            <CloudArrowDownIcon style={{color: "#4ade80", width: 32, height: 32, paddingTop: 30, paddingBottom: 30}}/>
         </td>
         <td onClick={() => dispatch(deleteDoc(row.uuid))}>
            <TrashIcon style={{color: "#f87171", width: 32, height: 32, paddingTop: 30, paddingBottom: 30}}/>
         </td>
        </tr>
      );
    });
  };

 return (
   <div style={{ position: "relative" }}>
     <table className="table">
       <thead>{renderTableHeader()}</thead>
       <tbody>{renderTableData()}</tbody>
     </table>
     <Modal onClose={() => setShow(false)} show={show} children={<DocViewer
       documents={docs}
       initialActiveDocument={docs[0]}
       pluginRenderers={DocViewerRenderers}
     />} />
   </div>
 );
};

export default Table