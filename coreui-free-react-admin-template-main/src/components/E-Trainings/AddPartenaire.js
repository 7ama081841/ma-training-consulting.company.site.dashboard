import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { CButton } from '@coreui/react'

const AddPartenaire = () => {
  const [reRender, setReRender] = useState(false)
  const [fileURL, setFileURL] = useState(null)
  const [testimony, setTestimony] = useState([])
  const [testimonyData, settestimonyData] = useState({
    image: '',
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
        // 'http://localhost:5000/api/add-Partenaire',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/add-Partenaire',
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

  const getTestimonyData = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-Partenaire',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-Partenaire',
      )

      if (res.data) {
        console.log('res.data', res.data)
        setTestimony(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTestimonyData()
  }, [])

  const handleDeleteTestimonyData = async (id) => {
    try {
      const res = await axios.delete(
        // `http://localhost:5000/api/delete-Partenaire/${id}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/delete-Partenaire/${id} `,
      )

      if (res.data) {
        setTestimony([])
        setReRender(true)
      }
    } catch (error) {
      console.log(error)
    }
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
              <h2 className="tm-block-title">Class 7</h2>
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-12">
                    <form onSubmit={handleSubmitTestimonyData} className="tm-edit-product-form">
                      <div>
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
                            <div key={index}>
                              <div
                                style={{
                                  width: '250px',
                                }}
                                className="tm-product-img-dummy mx-auto"
                              >
                                <img
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                  }}
                                  id="bg-video"
                                  src={item?.image}
                                  type="video/mp4"
                                />
                              </div>
                              <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 d-flex justify-content-around w-100 py-3 ">
                                <CButton
                                  onClick={() => handleDeleteTestimonyData(item?._id)}
                                  color="danger"
                                  variant="outline"
                                >
                                  supprimer
                                </CButton>
                              </div>
                            </div>
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

export default AddPartenaire
