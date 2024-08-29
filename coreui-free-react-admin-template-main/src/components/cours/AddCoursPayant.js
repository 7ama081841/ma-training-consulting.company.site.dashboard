import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { addCoursPayant } from '../redux/actions/coursPayantSlice'

const AddCoursPayant = ({ handleClose, categories }) => {
  //   const categorys = useSelector((state) => state.categories.categories)
  const [reRender, setReRender] = useState(false)
  const [certificateType, setCertificateType] = useState('')
  const [groupe, setGroupe] = useState('')
  const [lienDeGroupe, setLienDeGroupe] = useState('')
  const [errors, setErrors] = useState({})
  const [price, setPrice] = useState({
    regular: null,
    sale: null,
  })
  const [name, setName] = useState('')
  const [freeCoursData, setFreeCoursData] = useState({
    cour_image: null,
    cour_title: '',
    cour_description: '',
    cour_teacher: '',
    cour_video: '',
    cour_Categories: '',
    cour_groupes: [],
    cour_optionsList: [],
  })

  const dispatch = useDispatch()

  useEffect(() => {
    reRender && setReRender(false)
  }, [reRender])

  // function to set in nestend array (duble)
  const handleToggleAventageState = (optionIndex, aventageIndex) => {
    setFreeCoursData((prevState) => {
      const newFreeCoursData = { ...prevState }
      const newCourOptionsList = [...newFreeCoursData.cour_optionsList]
      const newOption = { ...newCourOptionsList[optionIndex] }
      const newAventageList = [...newOption.aventage]
      const newAventage = { ...newAventageList[aventageIndex] }

      // Toggle the state
      newAventage.state = !newAventage.state

      // Update the aventage list with the toggled state
      newAventageList[aventageIndex] = newAventage
      newOption.aventage = newAventageList

      // Update the options list with the updated option
      newCourOptionsList[optionIndex] = newOption
      newFreeCoursData.cour_optionsList = newCourOptionsList

      return newFreeCoursData
    })

    setReRender(true)
  }

  const handleAddAventage = (index) => {
    if (!name) {
      setErrors((prevState) => ({
        ...prevState,
        name: "le nom de l'aventure est requis",
      }))
      return
    }

    setFreeCoursData((prevState) => {
      const newFreeCoursData = { ...prevState }
      const newCourOptionsList = [...newFreeCoursData.cour_optionsList]
      const newOption = { ...newCourOptionsList[index] }

      if (!newOption.aventage) {
        newOption.aventage = []
      }

      if (!newOption.aventage.some((aventage) => aventage.name === name)) {
        newOption.aventage = [
          ...newOption.aventage,
          {
            name,
            state: false,
          },
        ]

        newCourOptionsList[index] = newOption
        newFreeCoursData.cour_optionsList = newCourOptionsList
      }

      return newFreeCoursData
    })

    setName('')
    setReRender(true)
  }

  const handleChangeAventageName = (e) => {
    setName(e.target.value)
  }

  const [fileURL, setFileURL] = useState('')
  const headerfileRef = useRef(null)

  const validate = () => {
    let tempErrors = {}
    if (!freeCoursData.cour_title) tempErrors.cour_title = 'Le titre est requis'
    if (!freeCoursData.cour_description) tempErrors.cour_description = 'La description est requise'
    if (!freeCoursData.cour_video) tempErrors.cour_video = "L'URL de la vidéo est requise"
    if (!freeCoursData.cour_Categories) tempErrors.cour_Categories = 'La catégorie est requise'
    if (!freeCoursData.cour_teacher) tempErrors.cour_teacher = 'Le nom de formateur est requis'
    if (freeCoursData.cour_groupes.length < 1) tempErrors.cour_groupes = 'Groupes requis'
    if (freeCoursData.cour_optionsList.length < 1)
      tempErrors.cour_optionsList = 'la liste des options est requise'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChangeGroupe = (e) => {
    setGroupe(e.target.value)
  }

  const handleChangeGroupeLink = (e) => {
    setLienDeGroupe(e.target.value)
  }

  const handleAddGroupe = () => {
    if (!groupe) {
      setErrors((prevState) => ({
        ...prevState,
        groupe: 'Groupe is required',
      }))
      return
    }
    freeCoursData.cour_groupes.push({
      groupeName: groupe,
      groupeLink: '',
    })

    setGroupe('')
    setReRender(true)
  }

  const handleAddOption = () => {
    if (!certificateType) {
      setErrors((prevState) => ({
        ...prevState,
        certificateType: ' le type de certificat est requis',
      }))
      return
    }

    freeCoursData.cour_optionsList.push({
      cour_CertificateType: certificateType,
      aventage: [],
      price: {
        regular: 0,
        sale: 0,
      },
    })

    setCertificateType('')
    setReRender(true)
  }

  const handleChangeFreeCoursData = (e) => {
    const { name, value } = e.target
    setFreeCoursData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChangePrice = (e) => {
    const { name, value } = e.target

    setPrice((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    let tempErrors = { ...errors }

    if (name === 'regular') {
      if (isNaN(value) || value === '') {
        tempErrors.regular = 'Ce devrait être un nombre'
        setPrice((prevState) => ({
          ...prevState,
          regular: '',
        }))
      } else {
        delete tempErrors.regular
      }
    }

    if (name === 'sale') {
      if (isNaN(value) || value === '') {
        tempErrors.sale = 'Ce devrait être un nombre'
        setPrice((prevState) => ({
          ...prevState,
          sale: '',
        }))
      } else {
        delete tempErrors.sale
      }
    }

    setErrors(tempErrors)
  }

  const handleChangeCertificateType = (e) => {
    setCertificateType(e.target.value)
  }

  const handleAddPrice = (index) => {
    if (!price.regular) {
      setErrors((prevState) => ({
        ...prevState,
        regular: 'régulier est requis',
      }))
      return
    }

    if (!price.sale) {
      setErrors((prevState) => ({
        ...prevState,
        sale: 'la vente est obligatoire',
      }))
      return
    }

    freeCoursData.cour_optionsList[index].price = price

    setPrice({
      regular: '',
      sale: '',
    })

    setReRender(true)
  }

  const handleAddGroupeLink = (index) => {
    if (!lienDeGroupe) {
      setErrors((prevState) => ({
        ...prevState,
        lienDeGroupe: 'Goupe link is required',
      }))
      return
    }

    freeCoursData.cour_groupes[index].groupeLink = lienDeGroupe

    setLienDeGroupe('')
    setReRender(true)
  }

  const handleChangeHeaderFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileURL(URL.createObjectURL(file))
      setFreeCoursData((prevState) => ({
        ...prevState,
        cour_image: file,
      }))
    }
  }

  const handleClickHeaderFile = () => {
    headerfileRef.current.click()
  }

  const handleSubmitFreeCoursData = async (e) => {
    e.preventDefault()
    // if (!validate()) return

    try {
      // Upload files to Firebase Storage
      const uploadFile = async (file, filePath) => {
        const storageRef = ref(storage, filePath)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
      }

      const cour_image_url = freeCoursData.cour_image
        ? await uploadFile(freeCoursData.cour_image, `images/${freeCoursData.cour_image.name}`)
        : null

      const dataToSubmit = {
        ...freeCoursData,
        cour_image: cour_image_url,
        // cour_pdf: cour_pdf_url,
      }

      const res = await axios.post(
        // "http://localhost:5000/api/add-cours-Payant",
        'https://ma-training-consulting-company-site-backend.vercel.app/api/add-cours-Payant',
        // "https://ma-training-consulting-company-site.onrender.com/api/add-cours",
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        // dispatch(addCoursPayant(res.data.course))
        setFreeCoursData({
          cour_image: null,
          cour_title: '',
          cour_description: '',
          cour_teacher: '',
          cour_video: '',
          cour_Categories: '',
          cour_groupes: [],
          cour_optionsList: [],
        })

        setFileURL('')

        handleClose()

        location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Header">
      <div className="container">
        <div className="row tm-content-row tm-mt-big">
          <div className="col-12 tm-col-big">
            <div className="bg-white tm-block h-100">
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-xl-7 col-lg-7 col-md-12">
                    <form onSubmit={handleSubmitFreeCoursData} className="tm-edit-product-form">
                      <div>
                        <p className="text-center">interface 1</p>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour title"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            cour title
                          </label>
                          <input
                            name="cour_title"
                            onChange={handleChangeFreeCoursData}
                            value={freeCoursData.cour_title}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                          {errors.cour_title && (
                            <div className="error ml-3 text-danger">{errors.cour_title}</div>
                          )}
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_teacher"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            niveau
                          </label>
                          <input
                            name="cour_teacher"
                            onChange={handleChangeFreeCoursData}
                            type="text"
                            value={freeCoursData.cour_teacher}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                          {errors.cour_teacher && (
                            <div className="error ml-3 text-danger">{errors.cour_teacher}</div>
                          )}
                        </div>

                        <hr />
                      </div>

                      <div>
                        <p className="text-center">interface 2</p>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_description"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            description du cours
                          </label>
                          <input
                            name="cour_description"
                            onChange={handleChangeFreeCoursData}
                            type="text"
                            value={freeCoursData.cour_description}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                          {errors.cour_description && (
                            <div className="error ml-3 text-danger">{errors.cour_description}</div>
                          )}
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_video"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            lien de vidéo
                          </label>
                          <input
                            name="cour_video"
                            onChange={handleChangeFreeCoursData}
                            type="text"
                            value={freeCoursData.cour_video}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                          {errors.cour_video && (
                            <div className="error ml-3 text-danger">{errors.cour_video}</div>
                          )}
                        </div>

                        <hr />
                      </div>

                      <div>
                        <p className="text-center">interface 3</p>

                        <div className="input-group mb-3">
                          <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                            type de certificat d'options
                          </label>
                          <input
                            onChange={handleChangeCertificateType}
                            type="text"
                            value={certificateType}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />

                          {errors.cour_optionsList && (
                            <div className="error ml-3 text-danger">{errors.cour_optionsList}</div>
                          )}
                        </div>

                        <input
                          type="button"
                          className="btn btn-primary d-block my-4 mx-auto"
                          value="  Ajouter des type de certificat "
                          onClick={handleAddOption}
                        />

                        {freeCoursData.cour_optionsList &&
                          freeCoursData.cour_optionsList.map((option, optionIndex) => (
                            <div key={optionIndex} className="input-group mb-3">
                              <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                Option {optionIndex + 1}
                              </label>
                              <div className="col-8">
                                <p className="d-block">{option.cour_CertificateType}</p>
                                <div className=" my-3 ">
                                  <input
                                    onChange={handleChangePrice}
                                    name="regular"
                                    type="text"
                                    placeholder="Entrez des chiffres"
                                    value={price.regular}
                                    className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7 m-0"
                                  />
                                  {errors.regular && (
                                    <div className="error ml-3 my-0 text-danger">
                                      {errors.regular}
                                    </div>
                                  )}
                                </div>

                                <div className=" my-3 ">
                                  <input
                                    onChange={handleChangePrice}
                                    type="text"
                                    name="sale"
                                    placeholder="Entrez des chiffres"
                                    value={price.sale}
                                    className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7 m-0"
                                  />
                                  {errors.sale && (
                                    <div className="error ml-3 my-0 text-danger">{errors.sale}</div>
                                  )}
                                </div>

                                <input
                                  type="button"
                                  className="btn btn-primary d-block my-4 mx-auto"
                                  value="Ajouter de prix"
                                  onClick={() => handleAddPrice(optionIndex)}
                                />
                                {option.price.regular ? <s> {option.price.regular} </s> : null}
                                {option.price.sale ? <p> {option.price.sale} </p> : null}

                                <div className=" my-3 ">
                                  <input
                                    onChange={handleChangeAventageName}
                                    type="text"
                                    name="sale"
                                    placeholder="Entrez des aventage "
                                    value={name}
                                    className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7 m-0"
                                  />
                                  {errors.name && (
                                    <div className="error ml-3 my-0 text-danger">{errors.name}</div>
                                  )}
                                </div>

                                <input
                                  type="button"
                                  className="btn btn-primary d-block my-4 mx-auto"
                                  value="Ajouter une Aventage"
                                  onClick={() => handleAddAventage(optionIndex)}
                                />
                                {option.aventage &&
                                  option.aventage.map((aventage, aventageIndex) =>
                                    aventage.state ? (
                                      <p
                                        key={aventageIndex}
                                        onClick={() =>
                                          handleToggleAventageState(optionIndex, aventageIndex)
                                        }
                                        style={{
                                          cursor: 'pointer',
                                        }}
                                        className=" m-0 "
                                      >
                                        {' '}
                                        {aventage.name}{' '}
                                      </p>
                                    ) : (
                                      <s
                                        key={aventageIndex}
                                        onClick={() =>
                                          handleToggleAventageState(optionIndex, aventageIndex)
                                        }
                                        style={{
                                          cursor: 'pointer',
                                        }}
                                        className="d-block"
                                      >
                                        {' '}
                                        {aventage.name}{' '}
                                      </s>
                                    ),
                                  )}
                              </div>
                            </div>
                          ))}

                        <hr />
                      </div>

                      <div>
                        <p className="text-center">interface 4</p>

                        <div className="input-group mb-3">
                          <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                            groupe
                          </label>
                          <input
                            onChange={handleChangeGroupe}
                            type="text"
                            value={groupe}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />

                          {errors.cour_groupes && (
                            <div className="error ml-3 text-danger">{errors.cour_groupes}</div>
                          )}
                        </div>

                        <input
                          type="button"
                          className="btn btn-primary d-block my-4 mx-auto"
                          value="Ajouter Une groupe"
                          onClick={handleAddGroupe}
                        />

                        {freeCoursData.cour_groupes &&
                          freeCoursData.cour_groupes.map((item, index) => (
                            <div key={index} className="input-group mb-3">
                              <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                Groupe {index + 1}
                              </label>
                              <div className="col-8">
                                <p className="d-block">{item.groupeName}</p>
                                <input
                                  onChange={handleChangeGroupeLink}
                                  type="text"
                                  placeholder="Lien de groupe"
                                  value={lienDeGroupe}
                                  className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                                />
                                {errors.lienDeGroupe && (
                                  <div className="error ml-3 text-danger">
                                    {errors.lienDeGroupe}
                                  </div>
                                )}
                                <input
                                  type="button"
                                  className="btn btn-primary d-block my-4 mx-auto"
                                  value="Ajouter Une Lien"
                                  onClick={() => handleAddGroupeLink(index)}
                                />
                                <p> {item.groupeLink} </p>
                              </div>
                            </div>
                          ))}

                        <hr />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="cour_Categories"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          catégorie de cours
                        </label>
                        <select
                          className="custom-select col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          name="cour_Categories"
                          onChange={handleChangeFreeCoursData}
                          value={freeCoursData.cour_Categories}
                        >
                          <option value="">Select one</option>
                          {categories?.length > 0 &&
                            categories?.map((item, index) => (
                              <option key={index} value={item.categorie}>
                                {item.categorie}
                              </option>
                            ))}
                        </select>
                        {errors.cour_Categories && (
                          <div className="error ml-3 text-danger">{errors.cour_Categories}</div>
                        )}
                      </div>

                      <div className="input-group my-3">
                        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0">
                          <button type="submit" className="btn btn-primary">
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-12 mx-auto mb-4 text-center">
                    <div>
                      <div className="tm-product-img-dummy mx-auto">
                        {fileURL ? (
                          <img
                            style={{
                              width: '100%',
                              maxHeight: '100%',
                            }}
                            id="bg-video"
                            src={fileURL}
                            alt="image"
                          />
                        ) : (
                          <i
                            style={{
                              border: '.5px solid',
                              padding: '45px',
                            }}
                            className="fas fa-5x fa-cloud-upload-alt"
                          ></i>
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
                    <div className="mt-4">
                      <div className="tm-product-img-dummy mx-auto">
                        {freeCoursData.cour_video ? (
                          <iframe
                            width="100%"
                            src={`https://www.youtube.com/embed/${
                              freeCoursData.cour_video.split('watch?v=')[1]
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
                              padding: '45px',
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
    </div>
  )
}

export default AddCoursPayant
