import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import TestimonyComponent from './TestimonyComponent'

const AddTestimony = () => {
  const [reRender, setReRender] = useState(false)
  const [fileURL, setFileURL] = useState(null)
  const [title, setTitle] = useState('')
  const [titleId, setTitleId] = useState('')
  const [checkTitle, setCheckTitle] = useState([])
  const [testimony, setTestimony] = useState([])
  const [testimonyData, settestimonyData] = useState({
    image: '',
    description: '',
    name: '',
    job_title: '',
  })

  useEffect(() => {
    if (reRender) {
      setReRender(false)
      getTestimonyData()
    }
  }, [reRender])

  const handleSubmitTestimonyData = async (e) => {
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
        image: image_url,
      }

      const res = await axios.post(
        // 'http://localhost:5000/api/add-Testimony',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/add-Testimony',
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        settestimonyData({
          image: '',
          description: '',
          name: '',
          job_title: '',
        })
        setFileURL(null)
        getTestimonyData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitTitleTestimonyData = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        // 'http://localhost:5000/api/add-Title-Testimony',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/add-Title-Testimony',
        { title },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        setTitle(res.data.title.title)
        getTitleTestimonyData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateTitleTestimonyData = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.patch(
        // `http://localhost:5000/api/update-Title-Testimony/${titleId}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/update-Title-Testimony/${titleId}`,
        { title },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        setTitle(res.data.title.title)
        getTitleTestimonyData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getTitleTestimonyData = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-Title-Testimony',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-Title-Testimony',
      )

      if (res.data) {
        setTitleId(res.data[0]._id)
        setCheckTitle(res.data)
        setTitle(res.data[0].title)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getTestimonyData = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-Testimony',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-Testimony',
      )

      if (res.data) {
        setTestimony(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTitleTestimonyData()
    getTestimonyData()
  }, [])

  const handleChangeTestimonyDataData = (e) => {
    const { name, value } = e.target
    settestimonyData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const headerfileRef = useRef(null)

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

  return (
    <div className="testimony">
      <div className="container">
        <div className="row tm-content-row tm-mt-big">
          <div className="col-12 tm-col-big">
            <div className="tm-block h-100 my-5 ">
              <h2 className="tm-block-title">Class 5</h2>
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-12">
                    <form onSubmit={handleSubmitTestimonyData} className="tm-edit-product-form">
                      <div className="input-group mb-3">
                        <label
                          htmlFor="title"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          grand titre
                        </label>
                        <input
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          value={title}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                        {checkTitle.length > 0 ? (
                          <button onClick={updateTitleTestimonyData} className="btn btn-primary">
                            modifier titre
                          </button>
                        ) : (
                          <button
                            onClick={handleSubmitTitleTestimonyData}
                            className="btn btn-primary"
                          >
                            Ajouter titre
                          </button>
                        )}
                      </div>

                      <div>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="name"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
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
                          <label
                            htmlFor="description"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                          >
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
                          <label
                            htmlFor="job_title"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
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
                          {fileURL ? (
                            <img
                              style={{
                                width: '100%',
                                height: '100%',
                              }}
                              id="bg-video"
                              src={fileURL}
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
                          <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 text-center">
                            <button type="submit" className="btn btn-primary">
                              Ajouter
                            </button>
                          </div>
                        </div>
                        <hr />

                        {testimony.length > 0 &&
                          testimony.map((item, index) => (
                            <TestimonyComponent
                              item={item}
                              setReRender={setReRender}
                              setTestimony={setTestimony}
                            />
                          ))}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTestimony
