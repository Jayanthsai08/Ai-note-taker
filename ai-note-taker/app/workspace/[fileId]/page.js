"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import TextEditor from '../_components/TextEditor';
import { useQueries, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

function Workspace() {
const {fileId} = useParams()
const fileInfo=useQuery(api.fileStorage.GetFileRecord,{
fileId:fileId
})

useEffect(() => {
    console.log("File Info Object:", fileInfo); // Check full response
}, [fileInfo]);

console.log(fileInfo?.fileUrl);

  return (
    <div>
        <WorkspaceHeader/>
    <div className='grid grid-cols-2 gap-3'>
        <div >
        <TextEditor/>
        </div>
        <div>
        <PdfViewer fileUrl={fileInfo?.fileUrl}/>
        </div>
    </div>
    </div>
  )
}

export default Workspace
