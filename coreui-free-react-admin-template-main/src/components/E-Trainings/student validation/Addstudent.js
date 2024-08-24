import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
// import { storage } from '../../config/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { CButton } from '@coreui/react'
import { storage } from '../../../config/firebaseConfig'

const Addstudent = ({ getStudentData, handleClose }) => {
  const [fileURL, setFileURL] = useState(null)
  const [categories, setCategories] = useState([])
  const [statistiques, setStatistiques] = useState({
    statisticsNumber: null,
    statisticsName: '',
  })
  const [definitionData, setDefinitionData] = useState({
    student_image: '',
    student_name: '',
    student_category: '',
    student_job_title: '',
    student_cv: '',
    student_id: '',
  })

  const getCategoriesData = async () => {
    try {
      const res = await axios.get(
        // ' http://localhost:5000/api/get-categories',
        ' https://ma-training-consulting-company-site-backend.vercel.app/api/get-categories',
      )

      if (res.data) {
        setCategories(res.data.categories)
        // dispatch(getCategories(res.data.categories))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCategoriesData()
  }, [])

  const handleSubmitDefinitionData = async (e) => {
    e.preventDefault()

    try {
      // Upload files to Firebase Storage
      const uploadFile = async (file, filePath) => {
        const storageRef = ref(storage, filePath)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
      }

      const randomText = Math.random().toString(36).substring(2, 7)
      const randomNumber = Math.floor(Math.random() * 1000)

      const video_cover_url = definitionData.student_image
        ? await uploadFile(
            definitionData.student_image,
            `E-Trainings/student/images/${definitionData.student_image.name}${randomNumber}`,
          )
        : null

      const dataToSubmit = {
        ...definitionData,
        student_image: video_cover_url,
        student_id: `${definitionData.student_id}${randomText}${randomNumber}`,
      }

      const res = await axios.post(
        'http://localhost:5000/api/add-student',
        // 'https://ma-training-consulting-company-site-backend.vercel.app/api/add-student',
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        setDefinitionData({
          student_image: '',
          student_name: '',
          student_category: '',
          student_job_title: '',
          student_cv: '',
          student_id: '',
        })

        setFileURL(null)

        handleClose()
        getStudentData()
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

  const handleChangeStatistiques = (e) => {
    const { name, value } = e.target

    setStatistiques((prevState) => ({
      ...prevState,
      [name]: name === 'statisticsNumber' ? (isNaN(value) ? '' : Number(value)) : value,
    }))
  }

  const handleAddStatistique = (newStatistique) => {
    if (newStatistique.statisticsNumber === '' || newStatistique.statisticsName === '') {
      return
    }

    setDefinitionData((prevState) => ({
      ...prevState,
      statistiques: [...prevState.statistiques, newStatistique],
    }))

    setStatistiques((prevState) => ({
      ...prevState,
      statisticsNumber: '',
      statisticsName: '',
    }))
  }

  const handleDeleteStatistiqueByIndex = (indexToDelete) => {
    setDefinitionData((prevState) => ({
      ...prevState,
      statistiques: prevState.statistiques.filter((_, index) => index !== indexToDelete),
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
        student_image: file,
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
              <h2 className="tm-block-title">Validation</h2>
              <div className="header">
                <div className="row mt-4 tm-edit-product-row w-100">
                  <div className="col-xl-7 col-lg-7 col-md-12">
                    <form onSubmit={handleSubmitDefinitionData} className="tm-edit-product-form">
                      <div className="input-group mb-3">
                        <label
                          htmlFor="student_name"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          non et prénom
                        </label>
                        <input
                          name="student_name"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData.student_name}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="student_job_title"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          Spécialisation
                        </label>
                        <input
                          name="student_job_title"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData.student_job_title}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          htmlFor="student_id"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          catégorie de cours
                        </label>
                        <select
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          name="student_id"
                          onChange={handleChangeDefinitionData}
                          // value={freeCoursData.cour_Categories}
                        >
                          <option value="">Select one</option>
                          {categories?.length > 0 &&
                            categories?.map((item, index) => (
                              <option key={index} value={item.categories_id}>
                                {item.categorie}
                              </option>
                            ))}
                        </select>
                        {/*errors.cour_Categories && (
                          <div className="error ml-3 text-danger">{errors.cour_Categories}</div>
                        )*/}
                      </div>

                      {/*<div className="input-group mb-3">
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
                      </div>*/}

                      {/* <div>
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
                      </div>*/}

                      {/* <div>
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
                      </div>*/}

                      {/* <div>
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
                      </div>*/}

                      {/* <div className="input-group mb-3">
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
                      </div>*/}

                      {/* <div>
                        <p className="text-center">Statistiques</p>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="numéro Statistique"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            numéro Statistique
                          </label>
                          <input
                            name="statisticsNumber"
                            onChange={handleChangeStatistiques}
                            type="text"
                            value={statistiques.statisticsNumber}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="statisticsName"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            nom des Statistiques
                          </label>
                          <input
                            name="statisticsName"
                            onChange={handleChangeStatistiques}
                            type="text"
                            value={statistiques.statisticsName}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <input
                          type="button"
                          className="btn btn-primary d-block my-4 mx-auto"
                          value="Ajouter Une Suggestion"
                          onClick={() => handleAddStatistique(statistiques)}
                        />
                        {/*definitionData.statistiques.length > 0 &&
                          definitionData.statistiques.map((item, index) => (
                            <div key={index}>
                              <p className="text-center"> Statistiques {index + 1} </p>
                              <div className="input-group mb-3">
                                <label
                                  htmlFor="numéro Statistique"
                                  className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                                >
                                  numéro Statistique
                                </label>
                                <span
                                  // className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                                  style={{
                                    lineHeight: '2.5',
                                  }}
                                >
                                  {' '}
                                  {item.statisticsNumber}{' '}
                                </span>
                              </div>
                              <div className="input-group mb-3">
                                <label
                                  htmlFor="statisticsName"
                                  className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                                >
                                  nom des Statistiques
                                </label>
                                <span
                                  // className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                                  style={{
                                    lineHeight: '2.5',
                                  }}
                                >
                                  {' '}
                                  {item.statisticsName}{' '}
                                </span>
                              </div>
                              <CButton
                                onClick={() => handleDeleteStatistiqueByIndex(index)}
                                color="danger"
                                variant="outline"
                              >
                                supprimer
                              </CButton>
                            </div>
                          ))*}
                        <hr />
                      </div>*/}

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

export default Addstudent
