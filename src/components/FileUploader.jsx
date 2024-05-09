import React, { useState, useEffect } from 'react';
import '../styles/FileUploader.css';

function FileUploader() {
    const [file, setFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [uploadingMessage, setUploadingMessage] = useState('');
    const [fileName, setFileName] = useState('Choose a file');
    const uploadUrl = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}/api/upload`;

    useEffect(() => {
        // Reset state when modal is opened
        if (modalOpen) {
            setFile(null);
            setFileName('Choose a file');
            setResponseMessage('');
            setUploadingMessage('');

        }
    }, [modalOpen]);

    const handleFileChange = (event) => {
        setResponseMessage('')
        const uploadedFile = event.target.files[0];
        if (uploadedFile && uploadedFile.type === 'text/csv') {
            setFile(uploadedFile);
            setFileName(uploadedFile.name);
        } else {
            alert('Please upload a CSV file.');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'text/csv') {
            setFile(droppedFile);
            setFileName(droppedFile.name);
        } else {
            alert('Please upload a CSV file.');
        }
    };

    const handleCancel = () => {
        setFile(null);
        setModalOpen(false);
        setFileName('Choose a file');
        setResponseMessage('');
        setUploadingMessage('');
    };

    const handleSubmit = async () => {
        if (!file) {
            alert('Please upload a file first.');
            return;
        }

        setUploadingMessage('Uploading file...');

        const formData = new FormData();
        const filename = file.name;
        const timestamp = new Date().getTime();
        formData.append('csv', file, `${filename}_${timestamp}`);

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Cache-Control': 'no-cache'
                  }
            });

            if (response.ok) {
                const data = await response.json();
                setResponseMessage(data.message);
                setSuccessModalOpen(true);
                setModalOpen(false);
            } else {
                const error = await response.json();
                setResponseMessage(error.message);
            }
        } catch (error) {
            setResponseMessage('An error occurred while uploading the file:', error);
        }
        finally {
            setUploadingMessage('');
        }
    };

    return (
        <div className="FileUploader">
            <button onClick={() => setModalOpen(true)} className='buttonstyle'>Upload File</button>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content" onDragOver={handleDragOver} onDrop={handleDrop}>
                        <div className='dropStyles '>

                            <label htmlFor="fileInput" className="custom-file-upload">
                                <input type="file" id="fileInput" accept=".csv" onChange={handleFileChange} />
                                <span id="fileLabelText">Choose File</span>
                                {file && <p>{fileName}</p>}
                            </label>
                            <p className='paragraph'>Drag & drop your file here or Browse to upload</p>
                        </div>
                        <button type="button" className='buttonModal' onClick={handleSubmit}>Ok</button>
                        <button type="button" className='buttonModal' onClick={handleCancel}>Cancel</button>
                        {uploadingMessage && <p>{uploadingMessage}</p>}
                        {responseMessage && <p>{responseMessage}</p>}
                    </div>
                </div>
            )}

            {successModalOpen && (
                <div className="success-modal">
                    <div className="success-modal-content">
                        <span className="success-close" onClick={() => setSuccessModalOpen(false)}>&times;</span>
                        <p>{responseMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileUploader;
