import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const UpdateCoursParticipantsInderface = ({
  getAllCoursParticipantsInderface,
  coursParticipantsInderface,
}) => {
  const [fileURL, setFileURL] = useState(null)
  const [definitionData, setDefinitionData] = useState({})

  const [oldInderfaceImageUrl, setOldInderfaceImageUrl] = useState(null)

  useEffect(() => {
    if (typeof definitionData.inderface_image === 'string') {
      setOldInderfaceImageUrl(definitionData.inderface_image)
    }
  }, [definitionData])

  useEffect(() => {
    setDefinitionData(coursParticipantsInderface)
    setOldInderfaceImageUrl(definitionData.inderface_image)
  }, [])

  const handleSubmitDefinitionData = async (e) => {
    e.preventDefault()

    try {
      let inderface_image_url = definitionData.inderface_image

      if (oldInderfaceImageUrl && fileURL) {
        const rerFile = ref(storage, oldInderfaceImageUrl)

        try {
          await deleteObject(rerFile)
          console.log('Old file deleted successfully.')
        } catch (error) {
          console.error('Failed to delete old file:', error)
        }
      }

      if (fileURL) {
        const uploadFile = async (file, filePath) => {
          const storageRef = ref(storage, filePath)
          await uploadBytes(storageRef, file)
          return getDownloadURL(storageRef)
        }

        inderface_image_url = await uploadFile(
          definitionData.inderface_image,
          `FormationParticipants/images/${definitionData.inderface_image.name}`,
        )
      }

      const dataToSubmit = {
        ...definitionData,
        inderface_image: inderface_image_url,
      }

      const res = await axios.patch(
        // `http://localhost:5000/api/update-cours-participants-inderface/${definitionData?._id} `,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/update-cours-participants-inderface/${definitionData?._id} `,
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        setFileURL(null)
        getAllCoursParticipantsInderface()
      }
    } catch (error) {
      console.error('An error occurred during the submission:', error)
    }
  }

  const handleChangeDefinitionData = (e) => {
    const { name, value } = e.target
    setDefinitionData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const headerfileRef = useRef(null)

  const handleClickHeaderFile = () => {
    headerfileRef.current.click()
  }

  const handleChangeHeaderFile = (e) => {
    if (fileURL) {
      URL.revokeObjectURL(fileURL)
    }
    const file = e.target.files[0]
    if (file) {
      const newFileURL = URL.createObjectURL(file)
      setDefinitionData((prevState) => ({
        ...prevState,
        inderface_image: file,
      }))
      setFileURL(newFileURL)
    }
  }

  return (
    <div className="Definition">
      <div className="container">
        <div className="row tm-content-row tm-mt-big">
          <div className="col-12 tm-col-big">
            <div className="tm-block h-100 my-5 ">
              <h2 className="tm-block-title">Modifier Formation Participants Page De Garde</h2>
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-xl-7 col-lg-7 col-md-12">
                    <form onSubmit={handleSubmitDefinitionData} className="tm-edit-product-form">
                      <div className="input-group mb-3">
                        <label
                          htmlFor="inderface_title_1"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          Titre partie 1
                        </label>
                        <input
                          name="inderface_title_1"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData?.inderface_title_1}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="inderface_title_2"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          Titre partie 2
                        </label>
                        <input
                          name="inderface_title_2"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData?.inderface_title_2}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="inderface_title_3"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          Titre partie 3
                        </label>
                        <input
                          name="inderface_title_3"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData?.inderface_title_3}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="inderface_button_name"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          nom du bouton
                        </label>
                        <input
                          name="inderface_button_name"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData?.inderface_button_name}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="inderface_description"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                        >
                          description
                        </label>
                        <textarea
                          className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          name="inderface_description"
                          onChange={handleChangeDefinitionData}
                          value={definitionData?.inderface_description}
                        ></textarea>
                      </div>

                      <div className="input-group mb-3 d-flex justify-content-center">
                        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 text-center">
                          <button type="submit" className="btn btn-primary">
                            Modifier
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 mx-auto mb-4 text-center ">
                    <div className="tm-product-img-dummy mx-auto">
                      {fileURL || definitionData.inderface_image ? (
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
                          <img
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                            id="bg-video"
                            src={fileURL ? fileURL : definitionData?.inderface_image}
                            type="video/mp4"
                          />
                        </span>
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
                          <i className="fas fa-5x fa-cloud-upload-alt"></i>
                        </span>
                      )}
                    </div>
                    <div className="custom-file mt-3 mb-3">
                      <input
                        ref={headerfileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChangeHeaderFile}
                        style={{ display: 'none' }}
                      />
                      <input
                        type="button"
                        className="btn btn-primary d-block mx-auto"
                        value="Upload ..."
                        onClick={handleClickHeaderFile}
                      />
                    </div>
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

export default UpdateCoursParticipantsInderface
