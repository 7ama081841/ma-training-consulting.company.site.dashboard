import React, { useEffect, useRef, useState } from 'react'
import { CButton } from '@coreui/react'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from 'axios'

const TestimonyComponent = ({ item, setReRender, setTestimony }) => {
  const headerfileRef = useRef(null)
  const [fileURL, setFileURL] = useState(null)
  const [testimonyData, settestimonyData] = useState({})

  useEffect(() => {
    settestimonyData(item)
  }, [])

  const handleChangeTestimonyDataData = (e) => {
    const { name, value } = e.target
    settestimonyData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleClickHeaderFile = () => {
    headerfileRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      settestimonyData((prevState) => ({
        ...prevState,
        image: file,
      }))

      const url = URL.createObjectURL(file)
      setFileURL(url)
    }
  }

  const handleUpdateTestimonyData = async (e) => {
    e.preventDefault()

    try {
      // Upload files to Firebase Storage
      const uploadFile = async (file, filePath) => {
        const storageRef = ref(storage, filePath)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
      }

      const image_url = testimonyData.image
        ? await uploadFile(testimonyData.image, `E-Trainings/images/${testimonyData.image.name}`)
        : null

      const dataToSubmit = {
        ...testimonyData,
        image: !fileURL ? testimonyData.image : image_url,
      }

      const res = await axios.patch(
        // `http://localhost:5000/api/update-Testimony/${item?._id}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/update-Testimony/${item?._id}`,
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteTestimonyData = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.delete(
        // `http://localhost:5000/api/delete-Testimony/${item?._id}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/delete-Testimony/${item?._id} `,
      )

      if (res.data) {
        setTestimony([])
        setReRender(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="input-group mb-3">
        <label htmlFor="name" className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
          nom
        </label>
        <input
          name="name"
          onChange={handleChangeTestimonyDataData}
          type="text"
          value={testimonyData.name}
          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
        />
      </div>

      <div className="input-group mb-3">
        <label htmlFor="description" className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2">
          description
        </label>
        <textarea
          className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
          required
          name="description"
          onChange={handleChangeTestimonyDataData}
          value={testimonyData.description}
        ></textarea>
      </div>

      <div className="input-group mb-3">
        <label htmlFor="job_title" className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
          titre du poste
        </label>
        <input
          name="job_title"
          onChange={handleChangeTestimonyDataData}
          type="text"
          value={testimonyData.job_title}
          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
        />
      </div>
      <div
        style={{
          width: '250px',
        }}
        className="tm-product-img-dummy mx-auto"
      >
        {fileURL || testimonyData.image ? (
          <img
            style={{
              width: '100%',
              height: '100%',
            }}
            id="bg-video"
            src={fileURL ? fileURL : testimonyData.image}
            type="video/mp4"
          />
        ) : (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '.5px solid',
              width: '200px',
              height: '175px',
              justifyContent: 'center',
              margin: 'auto',
            }}
          >
            <i className="fas fa-5x fa-cloud-upload-alt text-center"></i>
          </span>
        )}
      </div>
      <div className="custom-file mt-3 mb-3">
        <input
          ref={headerfileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <input
          type="button"
          className="btn btn-primary d-block mx-auto"
          value="Upload ..."
          onClick={handleClickHeaderFile}
        />
      </div>
      <div className="input-group mb-3 d-flex justify-content-center">
        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 d-flex justify-content-around ">
          <CButton onClick={handleDeleteTestimonyData} color="danger" variant="outline">
            supprimer
          </CButton>
          <button onClick={handleUpdateTestimonyData} className="btn btn-primary">
            modifier
          </button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default TestimonyComponent
