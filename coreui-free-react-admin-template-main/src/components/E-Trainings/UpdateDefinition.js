import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const UpdateDefinition = ({ checkClass_2, chackClass2Data }) => {
  console.log('checkClass_2', checkClass_2)
  const [fileURL, setFileURL] = useState(null)
  const [definitionData, setDefinitionData] = useState({
    great_text: checkClass_2?.great_text,
    mini_paragraph: checkClass_2?.mini_paragraph,
    Advantages_1_Title: checkClass_2?.Advantages_1_Title,
    Advantages_1_text: checkClass_2?.Advantages_1_text,
    Advantages_2_Title: checkClass_2?.Advantages_2_Title,
    Advantages_2_text: checkClass_2?.Advantages_2_text,
    Advantages_3_Title: checkClass_2?.Advantages_3_Title,
    Advantages_3_text: checkClass_2?.Advantages_3_text,
    video_link: checkClass_2?.video_link,
    video_cover: checkClass_2?.video_cover,
  })

  const handleSubmitDefinitionData = async (e) => {
    e.preventDefault()

    console.log('definitionData', definitionData)
    try {
      // Upload files to Firebase Storage
      const uploadFile = async (file, filePath) => {
        const storageRef = ref(storage, filePath)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
      }

      const video_cover_url = definitionData.video_cover
        ? await uploadFile(
            definitionData.video_cover,
            `E-Trainings/images/${definitionData.video_cover.name}`,
          )
        : null

      const dataToSubmit = {
        ...definitionData,
        video_cover: video_cover_url,
      }

      const res = await axios.post(
        `http://localhost:5000/api//update-class-2/${checkClass_2._id}`,
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        console.log('res.data', res.data)

        setDefinitionData({
          great_text: '',
          mini_paragraph: '',
          Advantages_1_Title: '',
          Advantages_1_text: '',
          Advantages_2_Title: '',
          Advantages_2_text: '',
          Advantages_3_Title: '',
          Advantages_3_text: '',
          video_link: '',
          video_cover: null,
        })

        setFileURL(null)

        chackClass2Data()
      }
    } catch (error) {
      console.log(error)
    }

    if (definitionData) {
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
        video_cover: file,
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
              <h2 className="tm-block-title">Class 2</h2>
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-xl-7 col-lg-7 col-md-12">
                    <form onSubmit={handleSubmitDefinitionData} className="tm-edit-product-form">
                      {/* <div className="input-group mb-3">
                        <label
                          htmlFor="heding_6"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          Heading 6
                        </label>
                        <input
                          name="heding_6"
                          onChange={handleChangeDefinitionData}
                          value={definitionData.heading_6}
                          type="text"
                          className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                        />
                      </div>*/}

                      <div className="input-group mb-3">
                        <label
                          htmlFor="great_text"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          grand titre
                        </label>
                        <input
                          name="great_text"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData.great_text}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="mini_paragraph"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                        >
                          description
                        </label>
                        <textarea
                          className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          required
                          name="mini_paragraph"
                          onChange={handleChangeDefinitionData}
                          value={definitionData.mini_paragraph}
                        ></textarea>
                      </div>

                      <div>
                        <p className="text-center">sous-titre 1</p>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="Advantages_1_Title"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            Titre
                          </label>
                          <input
                            name="Advantages_1_Title"
                            onChange={handleChangeDefinitionData}
                            type="text"
                            value={definitionData.Advantages_1_Title}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="Advantages_1_text"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            description
                          </label>
                          <input
                            name="Advantages_1_text"
                            onChange={handleChangeDefinitionData}
                            type="text"
                            value={definitionData.Advantages_1_text}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <hr />
                      </div>

                      <div>
                        <p className="text-center">sous-titre 2</p>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="Advantages_2_Title"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            Titre
                          </label>
                          <input
                            name="Advantages_2_Title"
                            onChange={handleChangeDefinitionData}
                            type="text"
                            value={definitionData.Advantages_2_Title}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="Advantages_2_text"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            description
                          </label>
                          <input
                            name="Advantages_2_text"
                            onChange={handleChangeDefinitionData}
                            type="text"
                            value={definitionData.Advantages_2_text}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <hr />
                      </div>

                      <div>
                        <p className="text-center">sous-titre 3</p>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="Advantages_3_Title"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            Titre
                          </label>
                          <input
                            name="Advantages_3_Title"
                            onChange={handleChangeDefinitionData}
                            type="text"
                            value={definitionData.Advantages_3_Title}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="Advantages_3_text"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            description
                          </label>
                          <input
                            name="Advantages_3_text"
                            onChange={handleChangeDefinitionData}
                            type="text"
                            value={definitionData.Advantages_3_text}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <hr />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="video_link"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          Lien de videos
                        </label>
                        <input
                          name="video_link"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData.video_link}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3 d-flex justify-content-center">
                        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 text-center">
                          <button type="submit" className="btn btn-primary">
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 mx-auto mb-4 text-center ">
                    <div className="tm-product-img-dummy mx-auto">
                      {fileURL || definitionData.video_cover ? (
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          autoPlay
                          muted
                          loop
                          id="bg-video"
                          src={fileURL ? fileURL : definitionData.video_cover}
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
                          video cover
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

                    <div className="tm-product-img-dummy mx-auto mt-5">
                      {definitionData.video_link ? (
                        <iframe
                          width="100%"
                          src={`https://www.youtube.com/embed/${
                            definitionData.video_link.split('watch?v=')[1]
                          }?si=3_Ef_Lfdsvf7MpH_`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <i
                          style={{
                            border: '.5px solid',
                            padding: '50px',
                          }}
                          className="fas fa-5x fa-cloud-upload-alt"
                        ></i>
                      )}
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

export default UpdateDefinition
