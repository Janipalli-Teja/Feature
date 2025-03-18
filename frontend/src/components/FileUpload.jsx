import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Select a file first!");
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:5000/api/files/upload", formData);
            alert("File uploaded!");
            fetchFiles();
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    const fetchFiles = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/files");
            setFiles(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div>
            <h2>File Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            <h3>Uploaded Files:</h3>
            <ul>
                {files.map((file) => (
                    <li key={file._id}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileUpload;
