import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { CButton } from '@coreui/react'
import { storage } from '../../../config/firebaseConfig'
import UpdateCertificate from './UpdateCertificate'

const UpdateStudent = ({ studentId, handleUpdateStudentClose, getStudentData }) => {
  const [fileURL, setFileURL] = useState(null)
  const [certificates_image_fileURL, setCertificates_image_fileURL] = useState(null)
  const [certificates_image, setCertificates_image] = useState('')
  const [certificate, setCertificate] = useState({
    certificate_name: '',
    certificate_date_start: '',
    certificate_date_end: '',
    certificate_Teacher: '',
    certificate_description: '',
  })

  const [definitionData, setDefinitionData] = useState({})

  const get_One_Student = async (id) => {
    try {
      const res = await axios.get(
        // `http://localhost:5000/api/get-one-student/${id}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/get-one-student/${id}`,
      )

      if (res.data) {
        setDefinitionData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get_One_Student(studentId)
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

      const randomNumber = Math.floor(Math.random() * 1000)

      const video_cover_url = definitionData.student_image
        ? await uploadFile(
            definitionData.student_image,
            `student/images/${definitionData.student_image.name}${randomNumber}`,
          )
        : null

      const cv_url =
        definitionData.student_cv && typeof definitionData.student_cv !== 'string'
          ? await uploadFile(
              definitionData.student_cv,
              `student/cvs/${definitionData.student_cv.name}${randomNumber}`,
            )
          : definitionData.student_cv

      const dataToSubmit = {
        ...definitionData,
        student_image: fileURL ? video_cover_url : definitionData?.student_image,
        student_cv: cv_url,
      }

      const res = await axios.patch(
        // `http://localhost:5000/api/update-Student/${studentId}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/update-Student/${studentId}`,
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        getStudentData()
        handleUpdateStudentClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeDefinitionData = (e) => {
    const { name, value } = e.target
    setDefinitionData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChangeNumber = (e) => {
    const { name, value } = e.target
    setDefinitionData((prevState) => ({
      ...prevState,
      [name]: isNaN(value) ? value : parseInt(value, 10),
    }))
  }

  const handleChangecertificateData = (e) => {
    const { name, value } = e.target
    setCertificate((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const headerfileRef = useRef(null)
  const certificatesFileRef = useRef(null)

  const handleClickHeaderFile = () => {
    headerfileRef.current.click()
  }
  const handleClickCertificatesFile = () => {
    certificatesFileRef.current.click()
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

  const handleChangeCvFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setDefinitionData((prevState) => ({
        ...prevState,
        student_cv: file,
      }))
    }
  }

  const handleChangeCertificatesFile = (e) => {
    if (certificates_image_fileURL) {
      URL.revokeObjectURL(certificates_image_fileURL)
    }
    const file = e.target.files[0]
    if (file) {
      const newFileURL = URL.createObjectURL(file)
      setCertificates_image(file)
      setCertificates_image_fileURL(newFileURL)
    }
  }

  const addCertificatesImage = async () => {
    // Upload files to Firebase Storage
    const uploadFile = async (file, filePath) => {
      const storageRef = ref(storage, filePath)
      await uploadBytes(storageRef, file)
      return getDownloadURL(storageRef)
    }

    const randomNumber = Math.floor(Math.random() * 1000)

    const video_cover_url = certificates_image
      ? await uploadFile(
          certificates_image,
          `student/certificates/images/${certificates_image.name}${randomNumber}`,
        )
      : null

    setCertificates_image_fileURL(null)

    setDefinitionData((prevState) => ({
      ...prevState,
      certificates_images: [...prevState.certificates_images, video_cover_url],
    }))
  }

  const deleteCertificatesImage = (url, indexDelete) => {
    // function delete file from filrebase
    const rerFile = ref(storage, url)

    deleteObject(rerFile)
      .then(() => {})
      .catch((error) => {
        console.error(error)
      })

    setDefinitionData((prevState) => ({
      ...prevState,
      certificates_images: prevState.certificates_images.filter(
        (_, index) => index !== indexDelete,
      ),
    }))
  }

  const addCertificate = (e) => {
    e.preventDefault()
    setDefinitionData((prevState) => ({
      ...prevState,
      certificates: [...prevState.certificates, certificate],
    }))

    setCertificate({
      certificate_name: '',
      certificate_date_start: '',
      certificate_date_end: '',
      certificate_Teacher: '',
      certificate_description: '',
    })
  }

  return (
    <div className="Definition">
      <div className="container">
        <div className="row tm-content-row tm-mt-big">
          <div className="col-12 tm-col-big">
            <div className="tm-block h-100 my-5 ">
              <h2 className="tm-block-title"> Modifier l'étudiant </h2>
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
                        <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                          ajouter une CV
                        </label>
                        <input
                          onChange={handleChangeCvFile}
                          type="file"
                          accept=".pdf"
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label
                          htmlFor="student_video_link"
                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                        >
                          Lien de videos
                        </label>
                        <input
                          name="student_video_link"
                          onChange={handleChangeDefinitionData}
                          type="text"
                          value={definitionData.student_video_link}
                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                        />
                      </div>

                      <div
                        style={{
                          overflow: 'auto',
                          maxHeight: '400px',
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                        }}
                      >
                        {definitionData.certificates_images?.length > 0 &&
                          definitionData.certificates_images.map((item, index) => (
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
                                  src={item}
                                  type="video/mp4"
                                />
                              </div>
                              <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 d-flex justify-content-around w-100 py-3 ">
                                <CButton
                                  onClick={() => deleteCertificatesImage(item, index)}
                                  color="danger"
                                  variant="outline"
                                >
                                  supprimer
                                </CButton>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div>
                        <p className="text-center"> certificate </p>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="certificate_name"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            nom du certificat
                          </label>
                          <input
                            name="certificate_name"
                            onChange={handleChangecertificateData}
                            type="text"
                            value={certificate.certificate_name}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="certificate_date_start"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            date de début
                          </label>
                          <input
                            name="certificate_date_start"
                            onChange={handleChangecertificateData}
                            value={certificate.certificate_date_start}
                            type="date"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="certificate_date_end"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            date de fin
                          </label>
                          <input
                            name="certificate_date_end"
                            onChange={handleChangecertificateData}
                            value={certificate.certificate_date_end}
                            type="date"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="certificate_Teacher"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            formateur
                          </label>
                          <input
                            name="certificate_Teacher"
                            onChange={handleChangecertificateData}
                            type="text"
                            value={certificate.certificate_Teacher}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="certificate_description"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                          >
                            description
                          </label>
                          <textarea
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                            name="certificate_description"
                            onChange={handleChangecertificateData}
                            value={certificate.certificate_description}
                          ></textarea>
                        </div>

                        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 text-center w-100">
                          <button onClick={addCertificate} className="btn btn-primary">
                            ajouter un certificat
                          </button>
                        </div>

                        <div
                          style={{
                            overflow: 'auto',
                            maxHeight: '400px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                          }}
                        >
                          {definitionData.certificates?.length > 0 &&
                            definitionData.certificates.map((item, index) => (
                              <UpdateCertificate
                                item={item}
                                index={index}
                                setDefinitionData={setDefinitionData}
                              />
                            ))}
                        </div>

                        <hr />
                      </div>

                      <div>
                        <p className="text-center"> Participation et engagement </p>

                        <div className=" mb-3">
                          <label
                            htmlFor="niveau_dinteret_et_de_Participation_aux_sessions"
                            className=" col-form-label"
                          >
                            Niveau d'intéret et de Participation aux sessions
                          </label>
                          <input
                            name="niveau_dinteret_et_de_Participation_aux_sessions"
                            onChange={handleChangeNumber}
                            value={definitionData.niveau_dinteret_et_de_Participation_aux_sessions}
                            type="number"
                            className="form-control validate "
                          />
                        </div>
                        <div className=" mb-3">
                          <label
                            htmlFor="interaction_avec_le_formateur_et_les_autres_Participants"
                            className=" col-form-label"
                          >
                            Interaction avec le formateur et les autres Participants
                          </label>
                          <input
                            name="interaction_avec_le_formateur_et_les_autres_Participants"
                            onChange={handleChangeNumber}
                            value={
                              definitionData.interaction_avec_le_formateur_et_les_autres_Participants
                            }
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>
                        <div className=" mb-3">
                          <label
                            htmlFor="poser_des_questions_et_des_clarificationsy"
                            className="col-form-label"
                          >
                            Poser des questions et des clarificationsy
                          </label>
                          <input
                            name="poser_des_questions_et_des_clarificationsy"
                            onChange={handleChangeNumber}
                            value={definitionData.poser_des_questions_et_des_clarificationsy}
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>
                        <hr />
                      </div>

                      <div>
                        <p className="text-center"> Performance Pratique et Applicative </p>

                        <div className=" mb-3">
                          <label
                            htmlFor="capacite_a_appliquer_les_conceptse_et_theories"
                            className=" col-form-label"
                          >
                            Capacité a appliquer les concepts et théories
                          </label>
                          <input
                            name="capacite_a_appliquer_les_conceptse_et_theories"
                            onChange={handleChangeNumber}
                            value={definitionData.capacite_a_appliquer_les_conceptse_et_theories}
                            type="number"
                            className="form-control validate "
                          />
                        </div>
                        <div className=" mb-3">
                          <label
                            htmlFor="qualite_du_travail_pratique_ou_des_projets_presentes"
                            className=" col-form-label"
                          >
                            Qualité du travail pratique ou des projets présentés
                          </label>
                          <input
                            name="qualite_du_travail_pratique_ou_des_projets_presentes"
                            onChange={handleChangeNumber}
                            value={
                              definitionData.qualite_du_travail_pratique_ou_des_projets_presentes
                            }
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>
                        <div className=" mb-3">
                          <label
                            htmlFor="capacite_a_resoudre_les_problemes_et_a_innover"
                            className="col-form-label"
                          >
                            Capacité a résoudre les problémes et a innover
                          </label>
                          <input
                            name="capacite_a_resoudre_les_problemes_et_a_innover"
                            onChange={handleChangeNumber}
                            value={definitionData.capacite_a_resoudre_les_problemes_et_a_innover}
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>
                        <div className=" mb-3">
                          <label
                            htmlFor="collaboration_et_travail_dequipe"
                            className="col-form-label"
                          >
                            Collaboration et travail d'équipe
                          </label>
                          <input
                            name="collaboration_et_travail_dequipe"
                            onChange={handleChangeNumber}
                            value={definitionData.collaboration_et_travail_dequipe}
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>
                        <hr />
                      </div>

                      <div>
                        <p className="text-center"> Compétences Personnelles </p>

                        <div className=" mb-3">
                          <label
                            htmlFor="competences_en_communication_efficace"
                            className=" col-form-label"
                          >
                            Compétences en communication efficace
                          </label>
                          <input
                            name="competences_en_communication_efficace"
                            onChange={handleChangeNumber}
                            value={definitionData.competences_en_communication_efficace}
                            type="number"
                            className="form-control validate "
                          />
                        </div>
                        <div className=" mb-3">
                          <label
                            htmlFor="capacite_de_reflexion_critique_et_analytique"
                            className=" col-form-label"
                          >
                            Capacité de réflexion critique et analytique
                          </label>
                          <input
                            name="capacite_de_reflexion_critique_et_analytique"
                            onChange={handleChangeNumber}
                            value={definitionData.capacite_de_reflexion_critique_et_analytique}
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>
                        <div className=" mb-3">
                          <label
                            htmlFor="receptivite_aux_retours_dinformation"
                            className="col-form-label"
                          >
                            Réceptivité aux retours d'information
                          </label>
                          <input
                            name="receptivite_aux_retours_dinformation"
                            onChange={handleChangeNumber}
                            value={definitionData.receptivite_aux_retours_dinformation}
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <hr />
                      </div>

                      <div>
                        <p className="text-center"> évaluation Générale </p>

                        <div className=" mb-3">
                          <label
                            htmlFor="evaluation_Generale_des_Performances_du_participant_a_la_formation"
                            className="col-form-label"
                          >
                            évaluation Générale des Performances du participant a la formation
                          </label>
                          <input
                            name="evaluation_Generale_des_Performances_du_participant_a_la_formation"
                            onChange={handleChangeNumber}
                            value={
                              definitionData.evaluation_Generale_des_Performances_du_participant_a_la_formation
                            }
                            type="number"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <hr />
                      </div>

                      <div>
                        <p className="text-center"> témoignage </p>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="temoignage_description"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-2"
                          >
                            description
                          </label>
                          <textarea
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                            name="temoignage_description"
                            onChange={handleChangeDefinitionData}
                            value={definitionData?.temoignage_description}
                          ></textarea>
                        </div>
                      </div>

                      <div className="input-group mb-3 d-flex justify-content-center">
                        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 text-center">
                          <button type="submit" className="btn btn-primary">
                            modifier
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 mx-auto mb-4 text-center ">
                    <div className="tm-product-img-dummy mx-auto">
                      {fileURL || definitionData?.student_image ? (
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          id="bg-video"
                          src={fileURL ? fileURL : definitionData?.student_image}
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
                          <span>image Étudiante</span>
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

                    <div className="tm-product-img-dummy mx-auto">
                      {certificates_image_fileURL ? (
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          id="bg-video"
                          src={certificates_image_fileURL}
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
                          <span>image Certificate</span>
                          <i className="fas fa-5x fa-cloud-upload-alt"></i>
                        </span>
                      )}
                    </div>
                    <div className="custom-file mt-3 mb-3">
                      <input
                        ref={certificatesFileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChangeCertificatesFile}
                        style={{ display: 'none' }}
                      />
                      <input
                        type="button"
                        className="btn btn-primary d-block mx-auto"
                        value="Upload ..."
                        onClick={handleClickCertificatesFile}
                      />
                      <input
                        type="button"
                        className="btn btn-primary d-block mx-auto mt-3"
                        value="ajouter une image"
                        onClick={addCertificatesImage}
                      />
                    </div>

                    <div className="tm-product-img-dummy mx-auto mt-5">
                      {definitionData.student_video_link ? (
                        <iframe
                          width="100%"
                          src={`https://www.youtube.com/embed/${
                            definitionData?.student_video_link.split('watch?v=')[1]
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

export default UpdateStudent
