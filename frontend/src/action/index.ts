import { DELETE_DOCUMENT, SET_DOCUMENTS, UPLOAD_DOCUMENT } from '../constants';
import { Dispatch } from 'redux';
import { 
  fetchDocuments as fetchDocumentsAPI, 
  uploadDocuments as uploadDocumentsAPI, 
  downloadDocument as downloadDocumentAPI, 
  deleteDocument as deleteDocumentAPI,
  Document
} from '../api';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';



export const getDocuments: any = (documents: Document[]) =>  async (dispatch: Dispatch)=>{
  try {
    const document = await fetchDocumentsAPI();
    dispatch({
      type: SET_DOCUMENTS,
      payload: document
    });
  } catch (error) {
    console.error(error)
  }
}

export const uploadDocuments: any = (files: File[]) => async (dispatch: Dispatch)=>{
  try {
    const uploadedData = await uploadDocumentsAPI(files);
    dispatch({
      type: UPLOAD_DOCUMENT,
      payload: uploadedData
    });
    toast.success('files uploaded successfully!');
  } catch (error) {
    console.error(error)
  }
}

export const deleteDoc: any = (id: number) => async (dispatch: Dispatch)=>{
  try {
    alert('Are you sure want delete!');
    const docData = await deleteDocumentAPI(id);
    dispatch({
      type: DELETE_DOCUMENT,
    });
    dispatch(getDocuments(docData));
    toast.success(`file with ${id} is deleted succesfully`)
  } catch (error) {
    console.error(error)
  }
}

export const downloadDocument: any = (id: number) => {
    return async () => {
      const blob = await downloadDocumentAPI(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('files downloaded successfully!');
    }
} 
  