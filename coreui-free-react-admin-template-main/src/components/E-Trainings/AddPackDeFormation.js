import React, { useRef, useState, useEffect } from 'react'
import Axios from 'axios'
import '../../assets/styles/E-Trainings.css'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const AddPackDeFormation = ({ getPackDeFormation }) => {
  const [price, setPrice] = useState({
    regular: '',
    sale: '',
  })
  const [avantage, setAvantage] = useState({
    name: '',
    state: true,
  })
  const [avantageData, setAvantageData] = useState({
    title_1: '',
    title_2: '',
    title_3: '',
    image: '',
    date: '',
    form_title: '',
    button_name: '',
    description: '',
    avantages: [],
  })

  const hendleDeleteAvantage = (index) => {
    setAvantageData((prevState) => ({
      ...prevState,
      avantages: prevState.avantages.filter((_, i) => i != index),
    }))
  }

  const avantage_imageRef = useRef(null)
  const [fileURL, setFileURL] = useState(null)

  useEffect(() => {
    console.log('avantageData', avantageData)
  }, [avantageData])

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
        image: file,
      }))
      setFileURL(newFileURL)
    }
  }

  const handleChangeprice = (e) => {
    e.preventDefault()

    setAvantageData((prevState) => ({
      ...prevState,
      price,
    }))

    setPrice({
      regular: '',
      sale: '',
    })
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

  const handleChangePriceData = (e) => {
    const { name, value } = e.target
    setPrice((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    if (name === 'regular') {
      if (isNaN(value) || value === '') {
        tempErrors.regular = 'Ce devrait être un nombre'
        setPrice((prevState) => ({
          ...prevState,
          regular: '',
        }))
      }
    }

    if (name === 'sale') {
      if (isNaN(value) || value === '') {
        tempErrors.sale = 'Ce devrait être un nombre'
        setPrice((prevState) => ({
          ...prevState,
          sale: '',
        }))
      }
    }
  }

  const handleChangeAvantages = (e) => {
    const { name, value } = e.target
    setAvantage((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddAvantage = (e) => {
    e.preventDefault()

    if (avantage.name === '') {
      return
    }

    setAvantageData((prevState) => ({
      ...prevState,
      avantages: [...prevState.avantages, avantage],
    }))

    setAvantage((prevState) => ({
      ...prevState,
      name: '',
    }))
  }

  const toggleAvantageState = (index) => {
    setAvantageData((prevState) => ({
      ...prevState,
      avantages: prevState.avantages.map((avantage, i) =>
        i === index ? { ...avantage, state: !avantage.state } : avantage,
      ),
    }))
  }

  const handleSubmitAvantageData = async (e) => {
    e.preventDefault()

    try {
      const uploadFile = async (file, filePath) => {
        const storageRef = ref(storage, filePath)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
      }

      const file_url = avantageData.image
        ? await uploadFile(avantageData.image, `E-Trainings/images/${avantageData.image.name}`)
        : null

      const dataToSubmit = {
        ...avantageData,
        image: file_url,
      }

      const res = await Axios.post(
        // 'http://localhost:5000/api/add-PackDeFormation',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/add-PackDeFormation',
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        setReRender(true)
      }
    } catch (error) {
      console.error('Error during data submission:', error)
    }

    setAvantageData({
      title_1: '',
      title_2: '',
      title_3: '',
      image: '',
      date: '',
      form_title: '',
      button_name: '',
      description: '',
      avantages: [],
    })
    setPrice({
      regular: '',
      sale: '',
    })
    setFileURL(null)
    getPackDeFormation()
  }

  return (
    <div className="Header mb-3 ">
      <div className="container">
        <div className="row tm-content-row tm-mt-big">
          <div className="col-12 tm-col-big">
            <div
              style={{
                padding: '14px',
              }}
              className="tm-block h-100"
            >
              <h2 className="tm-block-title"> Class 6 </h2>
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-xl-7 col-lg-7 col-md-12">
                    <form onSubmit={handleSubmitAvantageData} className="tm-edit-product-form">
                      <div>
                        <p className="text-center">interface 1</p>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="title_1"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre ( parti 1 )
                          </label>
                          <input
                            name="title_1"
                            onChange={handleChangeAvantageData}
                            value={avantageData.title_1}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="title_2"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre ( parti 2 )
                          </label>
                          <input
                            name="title_2"
                            onChange={handleChangeAvantageData}
                            value={avantageData.title_2}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="title_3"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre ( parti 3 )
                          </label>
                          <input
                            name="title_3"
                            onChange={handleChangeAvantageData}
                            value={avantageData.title_3}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="form_title"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre de formulaire
                          </label>
                          <input
                            name="form_title"
                            onChange={handleChangeAvantageData}
                            value={avantageData.form_title}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="button_name"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            nom du button
                          </label>
                          <input
                            name="button_name"
                            onChange={handleChangeAvantageData}
                            value={avantageData.button_name}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="title_3"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            choisir date
                          </label>
                          <input
                            name="date"
                            onChange={handleChangeAvantageData}
                            value={avantageData.date}
                            type="date"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <hr />
                      </div>

                      <div>
                        <p className="text-center">interface 2</p>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="description"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                            required
                            name="description"
                            onChange={handleChangeAvantageData}
                            value={avantageData.description}
                          ></textarea>
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="regular"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            prix régulier
                          </label>
                          <input
                            name="regular"
                            onChange={handleChangePriceData}
                            value={price.regular}
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="sale"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            prix de vente
                          </label>
                          <input
                            name="sale"
                            onChange={handleChangePriceData}
                            value={price.sale}
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center ">
                          <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 text-center">
                            <button onClick={handleChangeprice} className="btn btn-primary">
                              Ajouter Le Prix
                            </button>
                          </div>
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="regular"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            prix régulier
                          </label>
                          <s> {avantageData?.price?.regular} </s>
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="sale"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            prix de vente
                          </label>
                          <p> {avantageData?.price?.sale} </p>
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="name"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            Avantage
                          </label>
                          <input
                            name="name"
                            onChange={handleChangeAvantages}
                            value={avantage.name}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                          <button onClick={handleAddAvantage} className="btn btn-primary">
                            Ajouter une Avantage
                          </button>
                        </div>

                        {avantageData.avantages.length > 0 &&
                          avantageData.avantages.map((item, index) => (
                            <div
                              onClick={() => toggleAvantageState(index)}
                              key={index}
                              style={{
                                display: ' flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                              className="input-group mb-3"
                            >
                              <label
                                htmlFor="name"
                                className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                              >
                                Avantage {index + 1}
                              </label>
                              {item.state ? (
                                <p
                                  style={{
                                    lineHeight: '2.3',
                                    margin: '0px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {' '}
                                  {item.name}{' '}
                                </p>
                              ) : (
                                <s
                                  style={{
                                    lineHeight: '2.3',
                                    margin: '0px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {' '}
                                  {item.name}{' '}
                                </s>
                              )}

                              <i
                                style={{
                                  cursor: 'pointer',
                                }}
                                onClick={() => hendleDeleteAvantage(index)}
                                className="fas fa-trash-alt tm-trash-icon"
                              ></i>
                            </div>
                          ))}

                        <hr />
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

export default AddPackDeFormation
