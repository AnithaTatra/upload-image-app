import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {

    const [userInfo, setUserInfo] = useState({
        file: [],
        filePreview: null,
    });

    const handleInputChange = (event) => {
        setUserInfo({
            ...userInfo,
            file: event.target.files[0],
            filePreview: URL.createObjectURL(event.target.files[0]),
        });
    }
    const [isSuccess, setSuccess] = useState(null);
    const submit = () => {
        const formData = new FormData()
        formData.append('myImg', userInfo.file);
        axios.post("http://localhost:5000/upload_img", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
            console.warn(res);
            if (res.data.success === 1) {
                setSuccess("Image upload successfully")
            }


        })

    }

    return (
        <div className="container mr-60">

            <div className="formDesign">
                {isSuccess !== null ? <h4> {isSuccess} </h4> : null}
                <div className="form-row">
                    <label className="text-white">Select Image :</label>
                    <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <button type="submit" className="btn btn-dark" onClick={() => submit()}> Save </button>
                </div>
            </div>

            {userInfo.filePreview !== null ?
                <img className="PreviewImg" src={userInfo.filePreview} alt="UploadImage" />
                : null}
        </div>
    )
}
export default App;