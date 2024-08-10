import React, { useRef, useState, useEffect } from 'react'
import Axios from 'axios'
import '../../assets/styles/E-Trainings.css'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const Avantage = ({ setReRender }) => {
  const [avantageData, setAvantageData] = useState({
    grand_grand: '',
    titre_parti_1_gauche: '',
    description_parti_1_gauche: '',
    titre_parti_2_gauche: '',
    description_parti_2_gauche: '',
    titre_parti_3_gauche: '',
    description_parti_3_gauche: '',
    titre_parti_1_droite: '',
    description_parti_1_droite: '',
    titre_parti_2_droite: '',
    description_parti_2_droite: '',
    titre_parti_3_droite: '',
    description_parti_3_droite: '',
    avantage_image: '',
  })

  const avantage_imageRef = useRef(null)
  const [fileURL, setFileURL] = useState(null)

  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL)
      }
    }
  }, [fileURL])

  const handleChangeavantage_image = (e) => {
    if (fileURL) {
      URL.revokeObjectURL(fileURL)
    }
    const file = e.target.files[0]
    if (file) {
      const newFileURL = URL.createObjectURL(file)
      setAvantageData((prevState) => ({
        ...prevState,
        avantage_image: file,
      }))
      setFileURL(newFileURL)
    }
  }

  const handleClickavantage_image = () => {
    avantage_imageRef.current.click()
  }

  const handleChangeAvantageData = (e) => {
    const { name, value } = e.target
    setAvantageData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmitAvantageData = async (e) => {
    e.preventDefault()

    console.log('avantageData', avantageData)

    try {
      const uploadFile = async (file, filePath) => {
        const storageRef = ref(storage, filePath)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
      }

      const file_url = avantageData.avantage_image
        ? await uploadFile(
            avantageData.avantage_image,
            `E-Trainings/videos/${avantageData.avantage_image.name}`,
          )
        : null

      const dataToSubmit = {
        ...avantageData,
        avantage_image: file_url,
      }

      console.log('dataToSubmit', dataToSubmit)

      const res = await Axios.post(
        // 'http://localhost:5000/api/add-class-3',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/add-class-3',
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        // setReRender(true)
        location.reload()
      }
    } catch (error) {
      console.error('Error during data submission:', error)
    }

    setAvantageData({
      grand_grand: '',
      titre_parti_1_gauche: '',
      description_parti_1_gauche: '',
      titre_parti_2_gauche: '',
      description_parti_2_gauche: '',
      titre_parti_3_gauche: '',
      description_parti_3_gauche: '',
      titre_parti_1_droite: '',
      description_parti_1_droite: '',
      titre_parti_2_droite: '',
      description_parti_2_droite: '',
      titre_parti_3_droite: '',
      description_parti_3_droite: '',
      avantage_image: '',
    })
    setFileURL(null)
    setReRender(true)
  }

  return (
    <div className="Header">
      <div className="container">
        <div className="row tm-content-row tm-mt-big">
          <div className="col-12 tm-col-big">
            <div
              style={{
                padding: '14px',
              }}
              className="tm-block h-100"
            >
              <h2 className="tm-block-title"> Class 3 </h2>
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-xl-7 col-lg-7 col-md-12">
                    <form onSubmit={handleSubmitAvantageData} className="tm-edit-product-form">
                      <div className="input-group mb-3">
                        <label
                          htmlFor="grand_grand"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          grand titre
                        </label>
                        <input
                          name="grand_grand"
                          onChange={handleChangeAvantageData}
                          value={avantageData.grand_grand}
                          type="text"
                          className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                        />
                      </div>

                      {/*<div className="input-group mb-3">
                        <label
                          htmlFor="Heading_2_start_text"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          titre 2
                        </label>
                        <input
                          name="Heading_2_start_text"
                          onChange={handleChangeAvantageData}
                          type="text"
                          value={avantageData.Heading_2_start_text}
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
                          onChange={handleChangeAvantageData}
                          type="text"
                          value={avantageData.Heading_2_end_text}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>*/}

                      <div
                        className="mb-3"
                        style={{
                          border: '.5px solid',
                          padding: '10px',
                        }}
                      >
                        <p className="text-center">côté gauche</p>
                        <hr
                          className="mb-2"
                          style={{
                            width: '50%',
                            margin: 'auto',
                          }}
                        />
                        <div className="parti 1">
                          <p className="text-center">parti 1</p>

                          <div className="input-group mb-3">
                            <label
                              htmlFor="titre_parti_1_gauche"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              titre
                            </label>
                            <input
                              name="titre_parti_1_gauche"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.titre_parti_1_gauche}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>

                          <div className="input-group mb-3">
                            <label
                              htmlFor="description_parti_1_gauche"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                              required
                              name="description_parti_1_gauche"
                              onChange={handleChangeAvantageData}
                              value={avantageData.description_parti_1_gauche}
                            ></textarea>
                          </div>

                          {/* <div className="input-group mb-3">
                            <label
                              htmlFor="leftRectangleLink"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              Nom du Lien
                            </label>
                            <input
                              name="leftRectangleLink"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.leftRectangleLink}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>*/}
                          <hr />
                        </div>

                        <div className="parti 2">
                          <p className="text-center">parti 2</p>
                          <div className="input-group mb-3">
                            <label
                              htmlFor="titre_parti_2_gauche"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              titre
                            </label>
                            <input
                              name="titre_parti_2_gauche"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.titre_parti_2_gauche}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>

                          <div className="input-group mb-3">
                            <label
                              htmlFor="description_parti_2_gauche"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                              required
                              name="description_parti_2_gauche"
                              onChange={handleChangeAvantageData}
                              value={avantageData.description_parti_2_gauche}
                            ></textarea>
                          </div>

                          {/* <div className="input-group mb-3">
                            <label
                              htmlFor="middleRectangleLink"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              Nom du Lien
                            </label>
                            <input
                              name="middleRectangleLink"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.middleRectangleLink}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>*/}
                          <hr />
                        </div>

                        <div className="parti 2">
                          <p className="text-center">parti 3</p>
                          <div className="input-group mb-3">
                            <label
                              htmlFor="titre_parti_3_gauche"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              titre
                            </label>
                            <input
                              name="titre_parti_3_gauche"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.titre_parti_3_gauche}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>

                          <div className="input-group mb-3">
                            <label
                              htmlFor="description_parti_3_gauche"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                              required
                              name="description_parti_3_gauche"
                              onChange={handleChangeAvantageData}
                              value={avantageData.description_parti_3_gauche}
                            ></textarea>
                          </div>

                          <hr />
                        </div>
                      </div>

                      <div
                        className="mb-3"
                        style={{
                          border: '.5px solid',
                          padding: '10px',
                        }}
                      >
                        <p className="text-center">côté droite</p>
                        <hr
                          className="mb-2"
                          style={{
                            width: '50%',
                            margin: 'auto',
                          }}
                        />
                        <div className="parti 1">
                          <p className="text-center">parti 1</p>

                          <div className="input-group mb-3">
                            <label
                              htmlFor="titre_parti_1_droite"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              titre
                            </label>
                            <input
                              name="titre_parti_1_droite"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.titre_parti_1_droite}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>

                          <div className="input-group mb-3">
                            <label
                              htmlFor="description_parti_1_droite"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                              required
                              name="description_parti_1_droite"
                              onChange={handleChangeAvantageData}
                              value={avantageData.description_parti_1_droite}
                            ></textarea>
                          </div>

                          {/* <div className="input-group mb-3">
                            <label
                              htmlFor="leftRectangleLink"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              Nom du Lien
                            </label>
                            <input
                              name="leftRectangleLink"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.leftRectangleLink}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>*/}
                          <hr />
                        </div>

                        <div className="parti 2">
                          <p className="text-center">parti 2</p>
                          <div className="input-group mb-3">
                            <label
                              htmlFor="titre_parti_2_droite"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              titre
                            </label>
                            <input
                              name="titre_parti_2_droite"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.titre_parti_2_droite}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>

                          <div className="input-group mb-3">
                            <label
                              htmlFor="description_parti_2_droite"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                              required
                              name="description_parti_2_droite"
                              onChange={handleChangeAvantageData}
                              value={avantageData.description_parti_2_droite}
                            ></textarea>
                          </div>

                          {/* <div className="input-group mb-3">
                            <label
                              htmlFor="middleRectangleLink"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              Nom du Lien
                            </label>
                            <input
                              name="middleRectangleLink"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.middleRectangleLink}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>*/}
                          <hr />
                        </div>

                        <div className="parti 2">
                          <p className="text-center">parti 3</p>
                          <div className="input-group mb-3">
                            <label
                              htmlFor="titre_parti_3_droite"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                            >
                              titre
                            </label>
                            <input
                              name="titre_parti_3_droite"
                              onChange={handleChangeAvantageData}
                              type="text"
                              value={avantageData.titre_parti_3_droite}
                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            />
                          </div>

                          <div className="input-group mb-3">
                            <label
                              htmlFor="description_parti_3_droite"
                              className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                              required
                              name="description_parti_3_droite"
                              onChange={handleChangeAvantageData}
                              value={avantageData.description_parti_3_droite}
                            ></textarea>
                          </div>

                          <hr />
                        </div>
                      </div>

                      <div className="input-group mb-3 d-flex justify-content-center ">
                        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 text-center">
                          <button type="submit" className="btn btn-primary">
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 mx-auto mb-4 text-center">
                    <div
                      style={{
                        textAlign: 'center',
                      }}
                      className="tm-product-img-dummy mx-auto"
                    ></div>
                    {fileURL ? (
                      <img
                        style={{
                          width: '100%',
                        }}
                        id="bg-video"
                        src={fileURL}
                      />
                    ) : (
                      <i
                        style={{
                          border: '.5px solid',
                          padding: '35px',
                        }}
                        className="fas fa-5x fa-cloud-upload-alt"
                      ></i>
                    )}
                    <div className="custom-file mt-3 mb-3">
                      <input
                        ref={avantage_imageRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChangeavantage_image}
                        style={{ display: 'none' }}
                      />
                      <input
                        type="button"
                        className="btn btn-primary d-block mx-auto"
                        value="Upload ..."
                        onClick={handleClickavantage_image}
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

export default Avantage
