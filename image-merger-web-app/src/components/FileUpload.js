// FileUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Typography } from '@mui/material';

function FileUpload({ onFileUpload }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    onFileUpload(acceptedFiles[0]);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Paper {...getRootProps()} style={{ padding: '20px', textAlign: 'center', cursor: 'pointer', border: "5px solid black" }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <Typography>Drop the file for this layer here ...</Typography> :
          <Typography>Drag 'n' drop a file here, or click to select a file</Typography>
      }
    </Paper>
  );
}

export default FileUpload;
