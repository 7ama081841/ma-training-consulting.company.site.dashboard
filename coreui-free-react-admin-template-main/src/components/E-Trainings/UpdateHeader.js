import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const UpdateHeader = ({ checkHeader, chackHeaderData }) => {
  const [reRenderUpdate, setReRenderUpdate] = useState(false)
  const [headerData, setHeaderData] = useState({
    Heading_6: checkHeader?.Heading_6,
    Heading_2_start_text: checkHeader?.Heading_2_start_text,
    Heading_2_end_text: checkHeader?.Heading_2_end_text,
    ButtonName: checkHeader?.ButtonName,
    theLeftRectangle: checkHeader?.theLeftRectangle,
    theMiddleRectangle: checkHeader?.theMiddleRectangle,
    theRightRectangle: checkHeader?.theRightRectangle,
    leftRectangleDescription: checkHeader?.leftRectangleDescription,
    middleRectangleDescription: checkHeader?.middleRectangleDescription,
    rightRectangleDescription: checkHeader?.rightRectangleDescription,
    leftRectangleLink: checkHeader?.leftRectangleLink,
    middleRectangleLink: checkHeader?.middleRectangleLink,
    rightRectangleLink: checkHeader?.rightRectangleLink,
    headerFile: checkHeader?.headerFile,
  })

  const headerfileRef = useRef(null)
  const [fileURL, setFileURL] = useState(null)

  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL)
      }
    }
  }, [fileURL])

  useEffect(() => {
    setHeaderData(checkHeader)
  }, [])

  useEffect(() => {
    if (reRenderUpdate === true) {
      setReRenderUpdate(false)
    }
  }, [reRenderUpdate])

  const handleChangeHeaderFile = (e) => {
    if (fileURL) {
      URL.revokeObjectURL(fileURL)
    }
    const file = e.target.files[0]
    if (file) {
      const newFileURL = URL.createObjectURL(file)
      setHeaderData((prevState) => ({
        ...prevState,
        headerFile: file,
      }))
      setFileURL(newFileURL)
    }
  }

  const handleClickHeaderFile = () => {
    headerfileRef.current.click()
  }

  const handleChangeHeaderData = (e) => {
    const { name, value } = e.target
    setHeaderData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmitHeaderData = async (e) => {
    e.preventDefault()

    try {
      const uploadFile = async (file, filePath) => {
        const storageRef = ref(storage, filePath)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
      }

      const file_url = headerData.headerFile
        ? await uploadFile(
            headerData.headerFile,
            `E-Trainings/videos/${headerData.headerFile.name}`,
          )
        : null

      const dataToSubmit = {
        ...headerData,
        headerFile: !fileURL ? headerData.headerFile : file_url,
      }

      const res = await axios.patch(
        // `http://localhost:5000/api/update-header/${checkHeader._id}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/update-header/${checkHeader._id}`,
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        // setReRenderUpdate(true)

        setHeaderData({
          Heading_6: '',
          Heading_2_start_text: '',
          Heading_2_end_text: '',
          ButtonName: '',
          theLeftRectangle: '',
          theMiddleRectangle: '',
          theRightRectangle: '',
          leftRectangleDescription: '',
          middleRectangleDescription: '',
          rightRectangleDescription: '',
          leftRectangleLink: '',
          middleRectangleLink: '',
          rightRectangleLink: '',
          headerFile: '',
        })
        setFileURL(null)
        location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="UpdateHeader">
      <div className="container">
        <div className="row tm-content-row tm-mt-big">
          <div className="col-12 tm-col-big">
            <div
              style={{
                padding: '14px',
              }}
              className=" tm-block h-100"
            >
              <h2 className="tm-block-title">Class 1</h2>
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-xl-7 col-lg-7 col-md-12">
                    <form onSubmit={handleSubmitHeaderData} className="tm-edit-product-form">
                      <div className="input-group mb-3">
                        <label
                          htmlFor="Heading_6"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          titre 1
                        </label>
                        <input
                          name="Heading_6"
                          onChange={handleChangeHeaderData}
                          value={headerData.Heading_6}
                          type="text"
                          className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="Heading_2_start_text"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          titre 2
                        </label>
                        <input
                          name="Heading_2_start_text"
                          onChange={handleChangeHeaderData}
                          type="text"
                          value={headerData.Heading_2_start_text}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label
                          htmlFor="Heading_2_end_text"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          titre 2
                        </label>
                        <input
                          name="Heading_2_end_text"
                          onChange={handleChangeHeaderData}
                          type="text"
                          value={headerData.Heading_2_end_text}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      {/* <div className="input-group mb-3">
                        <label
                          htmlFor="ButtonName"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          Nom du bouton
                        </label>
                        <input
                          name="ButtonName"
                          onChange={handleChangeHeaderData}
                          type="text"
                          value={headerData.ButtonName}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>*/}

                      <div className="parti 1">
                        <p className="text-center">parti 1</p>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="theLeftRectangle"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre
                          </label>
                          <input
                            name="theLeftRectangle"
                            onChange={handleChangeHeaderData}
                            type="text"
                            value={headerData.theLeftRectangle}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="leftRectangleDescription"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                            required
                            name="leftRectangleDescription"
                            onChange={handleChangeHeaderData}
                            value={headerData.leftRectangleDescription}
                          ></textarea>
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="leftRectangleLink"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            Nom du Lien
                          </label>
                          <input
                            name="leftRectangleLink"
                            onChange={handleChangeHeaderData}
                            type="text"
                            value={headerData.leftRectangleLink}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <hr />
                      </div>

                      <div className="parti 2">
                        <p className="text-center">parti 2</p>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="theMiddleRectangle"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre
                          </label>
                          <input
                            name="theMiddleRectangle"
                            onChange={handleChangeHeaderData}
                            type="text"
                            value={headerData.theMiddleRectangle}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="middleRectangleDescription"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                            required
                            name="middleRectangleDescription"
                            onChange={handleChangeHeaderData}
                            value={headerData.middleRectangleDescription}
                          ></textarea>
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="middleRectangleLink"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            Nom du Lien
                          </label>
                          <input
                            name="middleRectangleLink"
                            onChange={handleChangeHeaderData}
                            type="text"
                            value={headerData.middleRectangleLink}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <hr />
                      </div>

                      <div className="parti 3">
                        <p className="text-center">parti 3</p>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="theRightRectangle"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre
                          </label>
                          <input
                            name="theRightRectangle"
                            onChange={handleChangeHeaderData}
                            type="text"
                            value={headerData.theRightRectangle}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="rightRectangleDescription"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                            required
                            name="rightRectangleDescription"
                            onChange={handleChangeHeaderData}
                            value={headerData.rightRectangleDescription}
                          ></textarea>
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="rightRectangleLink"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            Nom du Lien
                          </label>
                          <input
                            name="rightRectangleLink"
                            onChange={handleChangeHeaderData}
                            type="text"
                            value={headerData.rightRectangleLink}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <hr />
                      </div>

                      <div className="input-group mb-3 d-flex justify-content-center">
                        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0  text-center">
                          <button type="submit" className="btn btn-primary">
                            modifier
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 mx-auto mb-4 text-center">
                    <div className="tm-product-img-dummy mx-auto">
                      {fileURL || checkHeader?.headerFile ? (
                        <video
                          style={{
                            width: '100%',
                          }}
                          autoPlay
                          muted
                          loop
                          id="bg-video"
                          src={fileURL ? fileURL : checkHeader.headerFile}
                          type="video/mp4"
                        ></video>
                      ) : (
                        <i
                          style={{
                            border: '.5px solid',
                            padding: '36px',
                          }}
                          className="fas fa-5x fa-cloud-upload-alt"
                        ></i>
                      )}
                    </div>
                    <div className="custom-file mt-3 mb-3">
                      <input
                        ref={headerfileRef}
                        type="file"
                        accept="video/*"
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

export default UpdateHeader
