// import axios from 'axios'
// import React, { useEffect, useRef, useState } from 'react'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { storage } from '../../config/firebaseConfig'
// import SliceComponent from './SliceComponent'

// const AddCoursParticipants = ({
//   categories,
//   getAllCoursesParticipants,
//   handleAddCoursParticipantsClose,
// }) => {
//   const [reRender, setReRender] = useState(false)
//   const [question, setQuestion] = useState('')
//   const [correction, setCorrection] = useState('')
//   const [suggestions, setSuggestions] = useState('')
//   const [groupe, setGroupe] = useState('')
//   const [lienDeGroupe, setLienDeGroupe] = useState('')
//   const [errors, setErrors] = useState({})
//   const [slide, setSlide] = useState({
//     presentation_title: '',
//     presentation_description: '',
//     presentation_image: '',
//   })
//   const [freeCoursData, setFreeCoursData] = useState({
//     cour_title: '',
//     cour_description: '',
//     cour_video: '',
//     cour_pdf: '',
//     cour_Categories: '',
//     cour_test_de_Google: '',
//     download_video_link: '',
//     cour_groupes: [],
//     cour_questions: [],
//     cour_presentation: [],
//   })

//   const headerfileRef = useRef(null)
//   const [fileURL, setFileURL] = useState(null)

//   const handleChangeHeaderFile = (e) => {
//     if (fileURL) {
//       URL.revokeObjectURL(fileURL)
//     }
//     const file = e.target.files[0]
//     if (file) {
//       const newFileURL = URL.createObjectURL(file)
//       setSlide((prevState) => ({
//         ...prevState,
//         presentation_image: file,
//       }))
//       setFileURL(newFileURL)
//     }
//   }

//   const handleClickHeaderFile = () => {
//     headerfileRef.current.click()
//   }

//   const handleAddSlide = async (e) => {
//     e.preventDefault()

//     // Upload files to Firebase Storage
//     const uploadFile = async (file, filePath) => {
//       const storageRef = ref(storage, filePath)
//       await uploadBytes(storageRef, file)
//       return getDownloadURL(storageRef)
//     }

//     const randomNumber = Math.floor(Math.random() * 1000)

//     const presentation_image_url = slide.presentation_image
//       ? await uploadFile(
//           slide.presentation_image,
//           `FormationParticipants/images/${slide.presentation_image.name}${randomNumber}`,
//         )
//       : null

//     const updatedSlide = {
//       ...slide,
//       presentation_image: presentation_image_url,
//     }

//     setSlide(updatedSlide)

//     setFreeCoursData((prevState) => ({
//       ...prevState,
//       cour_presentation: [...prevState.cour_presentation, updatedSlide],
//     }))

//     setSlide({
//       presentation_title: '',
//       presentation_description: '',
//       presentation_image: '',
//     })
//     setFileURL('')
//   }

//   useEffect(() => {
//     reRender && setReRender(false)
//   }, [reRender])

//   const validate = () => {
//     let tempErrors = {}
//     if (!freeCoursData.cour_title) tempErrors.cour_title = 'Title is required'
//     if (!freeCoursData.cour_description) tempErrors.cour_description = 'Description is required'
//     if (!freeCoursData.cour_video) tempErrors.cour_video = 'Video URL is required'
//     if (!freeCoursData.cour_Categories) tempErrors.cour_Categories = 'Category is required'
//     if (!freeCoursData.cour_test_de_Google)
//       tempErrors.cour_test_de_Google = 'Google Test is required'
//     if (!freeCoursData.cour_pdf) tempErrors.cour_pdf = 'PDF is required'
//     if (freeCoursData.cour_questions.length < 1) tempErrors.question = 'Question is required'
//     if (freeCoursData.cour_groupes.length < 1) tempErrors.cour_groupes = 'Groupes is required'
//     setErrors(tempErrors)
//     return Object.keys(tempErrors).length === 0
//   }

//   const handleChangeFreeCoursData = (e) => {
//     const { name, value } = e.target
//     setFreeCoursData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }))
//   }

//   const handleChangeslide = (e) => {
//     const { name, value } = e.target
//     setSlide((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }))
//   }

//   const handleChangequestion = (e) => {
//     setQuestion(e.target.value)
//   }

//   const handleChangeGroupe = (e) => {
//     setGroupe(e.target.value)
//   }

//   const handleAddQuestion = () => {
//     if (!question) {
//       setErrors((prevState) => ({
//         ...prevState,
//         question: 'Question is required',
//       }))
//       return
//     }
//     freeCoursData.cour_questions.push({
//       cour_question: question,
//       cour_Suggestions: [],
//       cour_correction: '',
//     })

//     setQuestion('')
//     setReRender(true)
//   }

//   const handleAddGroupe = () => {
//     if (!groupe) {
//       setErrors((prevState) => ({
//         ...prevState,
//         groupe: 'Groupe is required',
//       }))
//       return
//     }
//     freeCoursData.cour_groupes.push({
//       groupeName: groupe,
//       groupeLink: '',
//     })

//     setGroupe('')
//     setReRender(true)
//   }

//   const handleChangeCorrection = (e) => {
//     setCorrection(e.target.value)
//   }

//   const handleAddCorrection = (index) => {
//     if (!correction) {
//       setErrors((prevState) => ({
//         ...prevState,
//         correction: 'Correction is required',
//       }))
//       return
//     }
//     freeCoursData.cour_questions[index].cour_correction = correction
//     setCorrection('')
//     setReRender(true)
//   }

//   const handleChangeSuggestions = (e) => {
//     setSuggestions(e.target.value)
//   }

//   const handleChangeGroupeLink = (e) => {
//     setLienDeGroupe(e.target.value)
//   }

//   // function to set in nestend array
//   const handleAddSuggestions = (index) => {
//     if (!suggestions) {
//       setErrors((prevState) => ({
//         ...prevState,
//         suggestions: 'Suggestion is required',
//       }))
//       return
//     }
//     setFreeCoursData((prevState) => {
//       const newFreeCoursData = { ...prevState }
//       const newCourQuestions = [...newFreeCoursData.cour_questions]
//       const newCourQuestion = { ...newCourQuestions[index] }

//       if (!newCourQuestion.cour_Suggestions.includes(suggestions)) {
//         newCourQuestion.cour_Suggestions = [...newCourQuestion.cour_Suggestions, suggestions]

//         newCourQuestions[index] = newCourQuestion
//         newFreeCoursData.cour_questions = newCourQuestions
//       }

//       return newFreeCoursData
//     })
//     setSuggestions('')
//     setReRender(true)
//   }

//   const handleAddGroupeLink = (index) => {
//     if (!lienDeGroupe) {
//       setErrors((prevState) => ({
//         ...prevState,
//         lienDeGroupe: 'Goupe link is required',
//       }))
//       return
//     }
//     freeCoursData.cour_groupes[index].groupeLink = lienDeGroupe

//     setLienDeGroupe('')
//     setReRender(true)
//   }

//   const handleSubmitFreeCoursData = async (e) => {
//     e.preventDefault()
//     // if (!validate()) return

//     try {
//       const res = await axios.post(
//         // 'http://localhost:5000/api/add-cours-participants',
//         'https://ma-training-consulting-company-site-backend.vercel.app/api/add-cours-participants',
//         freeCoursData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       )

//       if (res.data) {
//         console.log('res.data', res.data)
//         // dispatch(addCoursParticipants(res.data.course))
//         setFreeCoursData({
//           cour_title: '',
//           cour_description: '',
//           cour_video: '',
//           cour_pdf: '',
//           cour_Categories: '',
//           cour_test_de_Google: '',
//           cour_groupes: [],
//           cour_questions: [],
//         })
//         handleAddCoursParticipantsClose()
//         getAllCoursesParticipants()
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className="Header">
//       <div className="container">
//         <div className="row tm-content-row tm-mt-big">
//           <div className="col-12 tm-col-big">
//             <div className="bg-white tm-block h-100">
//               <div className="header">
//                 <div className="row mt-4 tm-edit-product-row w-100">
//                   <div className="col-xl-7 col-lg-7 col-md-12">
//                     <form onSubmit={handleSubmitFreeCoursData} className="tm-edit-product-form">
//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="cour_title"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           cour title
//                         </label>
//                         <input
//                           name="cour_title"
//                           onChange={handleChangeFreeCoursData}
//                           value={freeCoursData.cour_title}
//                           type="text"
//                           className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
//                         />
//                         {errors.cour_title && (
//                           <div className="error ml-3 text-danger">{errors.cour_title}</div>
//                         )}
//                       </div>

//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="cour_description"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           description du cours
//                         </label>

//                         <textarea
//                           className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
//                           name="cour_description"
//                           onChange={handleChangeFreeCoursData}
//                           value={freeCoursData.cour_description}
//                         ></textarea>

//                         {errors.cour_description && (
//                           <div className="error ml-3 text-danger">{errors.cour_description}</div>
//                         )}
//                       </div>

//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="cour_video"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           lien de vidéo
//                         </label>
//                         <input
//                           name="cour_video"
//                           onChange={handleChangeFreeCoursData}
//                           type="text"
//                           value={freeCoursData.cour_video}
//                           className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                         />
//                         {errors.cour_video && (
//                           <div className="error ml-3 text-danger">{errors.cour_video}</div>
//                         )}
//                       </div>

//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="download_video_link"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           Lien pour télécharger la vidéo
//                         </label>
//                         <input
//                           name="download_video_link"
//                           onChange={handleChangeFreeCoursData}
//                           type="text"
//                           value={freeCoursData.download_video_link}
//                           className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                         />
//                         {errors.cour_video && (
//                           <div className="error ml-3 text-danger">{errors.cour_video}</div>
//                         )}
//                       </div>

//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="cour_video"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           test De Google
//                         </label>
//                         <input
//                           name="cour_test_de_Google"
//                           onChange={handleChangeFreeCoursData}
//                           type="text"
//                           value={freeCoursData.cour_test_de_Google}
//                           className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                         />
//                         {errors.cour_test_de_Google && (
//                           <div className="error ml-3 text-danger">{errors.cour_test_de_Google}</div>
//                         )}
//                       </div>
//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="cour_pdf"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           lien de pdf
//                         </label>
//                         <input
//                           name="cour_pdf"
//                           onChange={handleChangeFreeCoursData}
//                           type="text"
//                           value={freeCoursData.cour_pdf}
//                           className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                         />
//                         {errors.cour_pdf && (
//                           <div className="error ml-3 text-danger">{errors.cour_pdf}</div>
//                         )}
//                       </div>

//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="cour_Categories"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           catégorie de cours
//                         </label>
//                         <select
//                           className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                           name="cour_Categories"
//                           onChange={handleChangeFreeCoursData}
//                           value={freeCoursData.cour_Categories}
//                         >
//                           <option value="">Select one</option>
//                           {categories?.map((item, index) => (
//                             <option key={index} value={item.categorie}>
//                               {item.categorie}
//                             </option>
//                           ))}
//                         </select>
//                         {errors.cour_Categories && (
//                           <div className="error ml-3 text-danger">{errors.cour_Categories}</div>
//                         )}
//                       </div>

//                       <div className="input-group mb-3">
//                         <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
//                           groupe
//                         </label>
//                         <input
//                           onChange={handleChangeGroupe}
//                           type="text"
//                           value={groupe}
//                           className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                         />

//                         {errors.cour_groupes && (
//                           <div className="error ml-3 text-danger">{errors.cour_groupes}</div>
//                         )}
//                       </div>

//                       <input
//                         type="button"
//                         className="btn btn-primary d-block my-4 mx-auto"
//                         value="Ajouter Une groupe"
//                         onClick={handleAddGroupe}
//                       />

//                       {freeCoursData.cour_groupes &&
//                         freeCoursData.cour_groupes.map((item, index) => (
//                           <div key={index} className="input-group mb-3">
//                             <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
//                               Groupe {index + 1}
//                             </label>
//                             <div className="col-8">
//                               <p className="d-block">{item.groupeName}</p>
//                               <input
//                                 onChange={handleChangeGroupeLink}
//                                 type="text"
//                                 placeholder="Lien de groupe"
//                                 value={lienDeGroupe}
//                                 className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                               />
//                               {errors.lienDeGroupe && (
//                                 <div className="error ml-3 text-danger">{errors.lienDeGroupe}</div>
//                               )}
//                               <input
//                                 type="button"
//                                 className="btn btn-primary d-block my-4 mx-auto"
//                                 value="Ajouter Une Lien"
//                                 onClick={() => handleAddGroupeLink(index)}
//                               />
//                               <p> {item.groupeLink} </p>
//                             </div>
//                           </div>
//                         ))}

//                       <div className="input-group mb-3">
//                         <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
//                           question
//                         </label>
//                         <input
//                           onChange={handleChangequestion}
//                           type="text"
//                           value={question}
//                           className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                         />
//                         {errors.question && (
//                           <div className="error ml-3 text-danger">{errors.question}</div>
//                         )}
//                       </div>

//                       <input
//                         type="button"
//                         className="btn btn-primary d-block my-4 mx-auto"
//                         value="Ajouter Une Question"
//                         onClick={handleAddQuestion}
//                       />

//                       {freeCoursData.cour_questions &&
//                         freeCoursData.cour_questions.map((item, index) => (
//                           <div key={index} className="input-group mb-3">
//                             <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
//                               question {index + 1}
//                             </label>
//                             <div className="col-8">
//                               <p className="d-block">{item.cour_question}</p>
//                               <input
//                                 onChange={handleChangeSuggestions}
//                                 type="text"
//                                 placeholder="écris Une Suggestion"
//                                 value={suggestions}
//                                 className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                               />
//                               {errors.suggestions && (
//                                 <div className="error ml-3 text-danger">{errors.suggestions}</div>
//                               )}
//                               <input
//                                 type="button"
//                                 className="btn btn-primary d-block my-4 mx-auto"
//                                 value="Ajouter Une Suggestion"
//                                 onClick={() => handleAddSuggestions(index)}
//                               />
//                               {item.cour_Suggestions.map((item, index) => (
//                                 <p key={index}>{item}</p>
//                               ))}
//                               <input
//                                 onChange={handleChangeCorrection}
//                                 type="text"
//                                 placeholder="écris Une Correction"
//                                 value={correction}
//                                 className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
//                               />
//                               {errors.correction && (
//                                 <div className="error ml-3 text-danger">{errors.correction}</div>
//                               )}
//                               <input
//                                 type="button"
//                                 className="btn btn-primary d-block my-4 mx-auto"
//                                 value="Ajouter Une Correction"
//                                 onClick={() => handleAddCorrection(index)}
//                               />
//                               <p>{item.cour_correction}</p>
//                             </div>
//                           </div>
//                         ))}

//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="presentation_title"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           présentation title
//                         </label>
//                         <input
//                           name="presentation_title"
//                           onChange={handleChangeslide}
//                           value={slide.presentation_title}
//                           type="text"
//                           className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
//                         />
//                         {errors.cour_title && (
//                           <div className="error ml-3 text-danger">{errors.cour_title}</div>
//                         )}
//                       </div>

//                       <div className="input-group mb-3">
//                         <label
//                           htmlFor="presentation_description"
//                           className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
//                         >
//                           description du présentation
//                         </label>

//                         <textarea
//                           className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
//                           name="presentation_description"
//                           onChange={handleChangeslide}
//                           value={slide.presentation_description}
//                         ></textarea>

//                         {errors.cour_description && (
//                           <div className="error ml-3 text-danger">{errors.cour_description}</div>
//                         )}
//                       </div>

//                       <div
//                         style={{
//                           display: 'contents',
//                         }}
//                         className="input-group mb-3 text-center "
//                       >
//                         <div>
//                           <div className="tm-product-img-dummy mx-auto">
//                             {fileURL ? (
//                               <img
//                                 style={{
//                                   width: '130px',
//                                   maxHeight: '130px',
//                                 }}
//                                 id="bg-video"
//                                 src={fileURL}
//                                 alt="image"
//                               />
//                             ) : (
//                               <i
//                                 style={{
//                                   border: 'solid .5px',
//                                   padding: '31px',
//                                 }}
//                                 className="fas fa-5x fa-cloud-upload-alt"
//                               ></i>
//                             )}
//                           </div>
//                           <div className="custom-file mt-3 mb-3">
//                             <input
//                               ref={headerfileRef}
//                               type="file"
//                               accept="image/*"
//                               onChange={handleChangeHeaderFile}
//                               style={{ display: 'none' }}
//                             />
//                             <input
//                               type="button"
//                               className="btn btn-primary d-block mx-auto"
//                               value="Upload ..."
//                               onClick={handleClickHeaderFile}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <input
//                         type="button"
//                         className="btn btn-primary d-block my-4 mx-auto"
//                         value="Ajouter Une tranche"
//                         onClick={handleAddSlide}
//                       />
//                       <div
//                         style={{
//                           overflow: 'auto',
//                           maxHeight: '400px',
//                           scrollbarWidth: 'thin',
//                           scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
//                         }}
//                       >
//                         {freeCoursData?.cour_presentation?.length > 0 &&
//                           freeCoursData.cour_presentation.map((item, index) => (
//                             <div key={index}>
//                               <SliceComponent
//                                 item={item}
//                                 index={index}
//                                 setFreeCoursData={setFreeCoursData}
//                               />
//                             </div>
//                           ))}
//                       </div>
//                       <hr />

//                       <div className="input-group my-3">
//                         <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 w-100 text-center ">
//                           <button type="submit" className="btn btn-primary">
//                             Ajouter
//                           </button>
//                         </div>
//                       </div>
//                     </form>
//                   </div>

//                   <div className="col-xl-4 col-lg-4 col-md-12 mx-auto mb-4">
//                     <div className="mt-4 text-center ">
//                       <div className="tm-product-img-dummy mx-auto">
//                         {freeCoursData.cour_video ? (
//                           <iframe
//                             width="100%"
//                             src={`https://www.youtube.com/embed/${
//                               freeCoursData.cour_video.split('watch?v=')[1]
//                             }?si=3_Ef_Lfdsvf7MpH_`}
//                             title="YouTube video player"
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                             referrerPolicy="strict-origin-when-cross-origin"
//                             allowFullScreen
//                           ></iframe>
//                         ) : (
//                           <i
//                             style={{
//                               border: 'solid .5px',
//                               padding: '30px',
//                             }}
//                             className="fas fa-5x fa-cloud-upload-alt"
//                           ></i>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddCoursParticipants
// ---------------------------------------------------------------------------------------------------------
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../config/firebaseConfig'
import SliceComponent from './SliceComponent'
import GroupeComponent from './GroupeComponent'
import { CButton } from '@coreui/react'

const AddCoursParticipants = ({
  categories,
  getAllCoursesParticipants,
  handleAddCoursParticipantsClose,
}) => {
  const [slide, setSlide] = useState({
    presentation_title: '',
    presentation_description: '',
    presentation_image: '',
  })

  const [suggestion, setSuggestion] = useState('')

  const [question, setQuestion] = useState({
    cour_question: '',
    cour_correction: '',
    cour_suggestions: [],
  })

  const [groupe, setGroupe] = useState({
    groupeName: '',
    groupeLink: '',
  })

  const [session, setSession] = useState({
    cour_video: '',
    cour_pdf: '',
    cour_test_de_Google: '',
    download_video_link: '',
    cour_groupes: [],
    cour_questions: [],
    cour_presentation: [],
  })

  const [freeCoursData, setFreeCoursData] = useState({
    cour_image: '',
    cour_title: '',
    cour_description: '',
    cour_Categories: '',
    cour_sessions: [],
  })

  const deleteSession = (indexDelete) => {
    setFreeCoursData((prevState) => ({
      ...prevState,
      cour_sessions: prevState.cour_sessions.filter((_, index) => index !== indexDelete),
    }))
  }

  const headerfileRef = useRef(null)
  const file2Ref = useRef(null)

  const [fileURL, setFileURL] = useState(null)
  const [file2URL, setFile2URL] = useState(null)

  const handleChangeHeaderFile = (e) => {
    if (fileURL) {
      URL.revokeObjectURL(fileURL)
    }
    const file = e.target.files[0]
    if (file) {
      const newFileURL = URL.createObjectURL(file)
      setSlide((prevState) => ({
        ...prevState,
        presentation_image: file,
      }))
      setFileURL(newFileURL)
    }
  }

  const handleClickHeaderFile = () => {
    headerfileRef.current.click()
  }

  const handleChangeFile2 = (e) => {
    if (file2URL) {
      URL.revokeObjectURL(file2URL)
    }
    const file = e.target.files[0]
    if (file) {
      const newFileURL = URL.createObjectURL(file)
      setFreeCoursData((prevState) => ({
        ...prevState,
        cour_image: file,
      }))
      setFile2URL(newFileURL)
    }
  }

  const handleClickFile2 = () => {
    file2Ref.current.click()
  }

  const handleAddSlide = async (e) => {
    e.preventDefault()

    // Upload files to Firebase Storage
    const uploadFile = async (file, filePath) => {
      const storageRef = ref(storage, filePath)
      await uploadBytes(storageRef, file)
      return getDownloadURL(storageRef)
    }

    const randomNumber = Math.floor(Math.random() * 1000)

    const presentation_image_url = slide.presentation_image
      ? await uploadFile(
          slide.presentation_image,
          `FormationParticipants/images/${slide.presentation_image.name}${randomNumber}`,
        )
      : null

    const updatedSlide = {
      ...slide,
      presentation_image: presentation_image_url,
    }

    setSlide(updatedSlide)

    setSession((prevState) => ({
      ...prevState,
      cour_presentation: [...prevState.cour_presentation, updatedSlide],
    }))

    setSlide({
      presentation_title: '',
      presentation_description: '',
      presentation_image: '',
    })
    setFileURL('')
  }

  const handleAddSuggestion = () => {
    setQuestion((prevState) => ({
      ...prevState,
      cour_suggestions: [...prevState.cour_suggestions, suggestion],
    }))
    setSuggestion('')
  }

  const handleAddSession = () => {
    setFreeCoursData((prevState) => ({
      ...prevState,
      cour_sessions: [...prevState.cour_sessions, session],
    }))

    setSession({
      cour_video: '',
      cour_pdf: '',
      cour_test_de_Google: '',
      download_video_link: '',
      cour_groupes: [],
      cour_questions: [],
      cour_presentation: [],
    })
  }

  const handleChangeFreeCoursData = (e) => {
    const { name, value } = e.target
    setFreeCoursData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChangeSession = (e) => {
    const { name, value } = e.target
    setSession((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChangeslide = (e) => {
    const { name, value } = e.target
    setSlide((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChangequestion = (e) => {
    const { name, value } = e.target
    setQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChangeGroupe = (e) => {
    const { name, value } = e.target
    setGroupe((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddQuestion = () => {
    setSession((prevstate) => ({
      ...prevstate,
      cour_questions: [...prevstate.cour_questions, question],
    }))

    setQuestion({
      cour_question: '',
      cour_correction: '',
      cour_suggestions: [],
    })
  }

  const handleAddGroupe = () => {
    setSession((prevstate) => ({
      ...prevstate,
      cour_groupes: [...prevstate.cour_groupes, groupe],
    }))

    setGroupe({
      groupeName: '',
      groupeLink: '',
    })
  }

  const handleChangeSuggestions = (e) => {
    setSuggestion(e.target.value)
  }

  const deleteSuggestion = (indexDelete) => {
    setQuestion((prevState) => ({
      ...prevState,
      cour_suggestions: prevState.cour_suggestions.filter((_, index) => index !== indexDelete),
    }))
  }

  const deleteQuestion = (indexDelete) => {
    setSession((prevState) => ({
      ...prevState,
      cour_questions: prevState.cour_questions.filter((_, index) => index !== indexDelete),
    }))
  }

  const handleSubmitFreeCoursData = async (e) => {
    e.preventDefault()

    try {
      // Upload files to Firebase Storage
      const uploadFile = async (file, filePath) => {
        const storageRef = ref(storage, filePath)
        await uploadBytes(storageRef, file)
        return getDownloadURL(storageRef)
      }

      const randomNumber = Math.floor(Math.random() * 1000)

      const cour_image_url = freeCoursData.cour_image
        ? await uploadFile(
            freeCoursData.cour_image,
            `FormationParticipants/images/${freeCoursData.cour_image.name}${randomNumber}`,
          )
        : null

      const dataToSubmit = {
        ...freeCoursData,
        cour_image: cour_image_url,
      }

      const res = await axios.post(
        // 'http://localhost:5000/api/add-cours-participants',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/add-cours-participants',
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.data) {
        handleAddCoursParticipantsClose()
        getAllCoursesParticipants()
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
                        <p className="text-center"> interface 1 </p>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_title"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre de formation
                          </label>
                          <input
                            name="cour_title"
                            onChange={handleChangeFreeCoursData}
                            value={freeCoursData.cour_title}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_description"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            description du formation
                          </label>

                          <textarea
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                            name="cour_description"
                            onChange={handleChangeFreeCoursData}
                            value={freeCoursData.cour_description}
                          ></textarea>
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_Categories"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            catégorie de cours
                          </label>
                          <select
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                            name="cour_Categories"
                            onChange={handleChangeFreeCoursData}
                            value={freeCoursData.cour_Categories}
                          >
                            <option value="">Select one</option>
                            {categories?.map((item, index) => (
                              <option key={index} value={item.categorie}>
                                {item.categorie}
                              </option>
                            ))}
                          </select>
                        </div>

                        <hr />
                      </div>

                      <div>
                        <p className="text-center"> interface 2 </p>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_video"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            lien de vidéo
                          </label>
                          <input
                            name="cour_video"
                            onChange={handleChangeSession}
                            type="text"
                            value={session.cour_video}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="download_video_link"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            Lien pour télécharger la vidéo
                          </label>
                          <input
                            name="download_video_link"
                            onChange={handleChangeSession}
                            type="text"
                            value={session.download_video_link}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_video"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            test De Google
                          </label>
                          <input
                            name="cour_test_de_Google"
                            onChange={handleChangeSession}
                            type="text"
                            value={session.cour_test_de_Google}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label
                            htmlFor="cour_pdf"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            lien de pdf
                          </label>
                          <input
                            name="cour_pdf"
                            onChange={handleChangeSession}
                            type="text"
                            value={session.cour_pdf}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <hr />
                        <p className="text-center">groupes </p>
                        <div className="input-group mb-3">
                          <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                            nom du groupe
                          </label>
                          <input
                            onChange={handleChangeGroupe}
                            type="text"
                            value={groupe.groupeName}
                            name="groupeName"
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                            lien du groupe
                          </label>
                          <input
                            onChange={handleChangeGroupe}
                            type="text"
                            value={groupe.groupeLink}
                            name="groupeLink"
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <input
                          type="button"
                          className="btn btn-primary d-block my-4 mx-auto"
                          value="Ajouter Une groupe"
                          onClick={handleAddGroupe}
                        />
                        <div
                          style={{
                            overflow: 'auto',
                            maxHeight: '400px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                          }}
                        >
                          {session.cour_groupes?.length > 0 &&
                            session.cour_groupes?.map((item, index) => (
                              <GroupeComponent
                                key={index}
                                item={item}
                                index={index}
                                setSession={setSession}
                                session={session}
                              />
                            ))}
                          <hr />
                        </div>

                        <p className="text-center">questions </p>
                        <div className="input-group mb-3">
                          <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                            question
                          </label>
                          <input
                            onChange={handleChangequestion}
                            type="text"
                            name="cour_question"
                            value={question.cour_question}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                            suggestion
                          </label>
                          <input
                            onChange={handleChangeSuggestions}
                            type="text"
                            name="cour_correction"
                            value={suggestion}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>
                        <input
                          type="button"
                          className="btn btn-primary d-block my-4 mx-auto"
                          value="Ajouter Une Suggestion"
                          onClick={handleAddSuggestion}
                        />

                        <div
                          style={{
                            overflow: 'auto',
                            maxHeight: '250px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                          }}
                        >
                          {question?.cour_suggestions?.length > 0 &&
                            question?.cour_suggestions?.map((item, index) => (
                              <div className="input-group mb-3">
                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                  suggestion {index + 1}
                                </label>
                                <span
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}
                                  className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                                >
                                  {' '}
                                  {item}{' '}
                                  <i
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => deleteSuggestion(index)}
                                    className="fas fa-trash-alt tm-trash-icon"
                                  ></i>
                                </span>
                              </div>
                            ))}
                        </div>

                        <div className="input-group mb-3">
                          <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                            correction
                          </label>
                          <input
                            onChange={handleChangequestion}
                            type="text"
                            name="cour_correction"
                            value={question.cour_correction}
                            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                          />
                        </div>

                        <input
                          type="button"
                          className="btn btn-primary d-block my-4 mx-auto"
                          value="Ajouter Une Question"
                          onClick={handleAddQuestion}
                        />
                        <div
                          style={{
                            overflow: 'auto',
                            maxHeight: '400px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                          }}
                        >
                          {session.cour_questions?.length > 0 &&
                            session.cour_questions?.map((item, index) => (
                              <div key={index} className="input-group mb-3">
                                <p className="text-center w-100">question {index + 1} </p>
                                <div className="input-group mb-3">
                                  <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                    question
                                  </label>
                                  <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                    {' '}
                                    {item.cour_question}{' '}
                                  </span>
                                </div>

                                <div
                                  style={{
                                    overflow: 'auto',
                                    maxHeight: '250px',
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                                  }}
                                  className="w-100"
                                >
                                  {item?.cour_suggestions?.length > 0 &&
                                    item?.cour_suggestions?.map((item, index) => (
                                      <div className="input-group mb-3">
                                        <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                          suggestion {index + 1}
                                        </label>
                                        <span
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                          }}
                                          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                                        >
                                          {' '}
                                          {item}{' '}
                                        </span>
                                      </div>
                                    ))}
                                </div>

                                <div className="input-group mb-3">
                                  <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                    correction
                                  </label>
                                  <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                    {' '}
                                    {item.cour_correction}{' '}
                                  </span>
                                </div>
                                <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 d-flex justify-content-around ">
                                  <CButton
                                    onClick={() => deleteQuestion(index)}
                                    color="danger"
                                    variant="outline"
                                  >
                                    supprimer
                                  </CButton>
                                </div>
                              </div>
                            ))}
                        </div>
                        <hr />

                        <div className="input-group mb-3">
                          <label
                            htmlFor="presentation_title"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            titre de la présentation
                          </label>
                          <input
                            name="presentation_title"
                            onChange={handleChangeslide}
                            value={slide.presentation_title}
                            type="text"
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <label
                            htmlFor="presentation_description"
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                          >
                            description du présentation
                          </label>

                          <textarea
                            className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7"
                            name="presentation_description"
                            onChange={handleChangeslide}
                            value={slide.presentation_description}
                          ></textarea>
                        </div>
                        <div
                          style={{
                            display: 'contents',
                          }}
                          className="input-group mb-3 text-center "
                        >
                          <div>
                            <div className="tm-product-img-dummy mx-auto">
                              {fileURL ? (
                                <img
                                  style={{
                                    width: '130px',
                                    maxHeight: '130px',
                                  }}
                                  id="bg-video"
                                  src={fileURL}
                                  alt="image"
                                />
                              ) : (
                                <i
                                  style={{
                                    border: 'solid .5px',
                                    padding: '31px',
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
                        </div>
                        <input
                          type="button"
                          className="btn btn-primary d-block my-4 mx-auto"
                          value="Ajouter Une tranche"
                          onClick={handleAddSlide}
                        />
                        <div
                          style={{
                            overflow: 'auto',
                            maxHeight: '400px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                          }}
                        >
                          {session?.cour_presentation?.length > 0 &&
                            session.cour_presentation.map((item, index) => (
                              <div key={index}>
                                <SliceComponent item={item} index={index} setSession={setSession} />
                              </div>
                            ))}
                        </div>

                        <hr />
                        <input
                          type="button"
                          className="btn btn-primary d-block my-4 mx-auto"
                          value="Ajouter Une session"
                          onClick={handleAddSession}
                        />

                        <hr />
                      </div>
                      <div
                        style={{
                          overflow: 'auto',
                          maxHeight: '600px',
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                        }}
                      >
                        {/* ----------------- sessions map -------------------------- */}
                        {freeCoursData?.cour_sessions?.length > 0 &&
                          freeCoursData?.cour_sessions?.map((item, index) => (
                            <div key={index}>
                              <p className="text-center"> session {index + 1} </p>

                              <div className="input-group mb-3">
                                <label
                                  htmlFor="cour_video"
                                  className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                                >
                                  lien de vidéo
                                </label>
                                <div className="tm-product-img-dummy mx-auto">
                                  {item.cour_video ? (
                                    <iframe
                                      width="100%"
                                      src={`https://www.youtube.com/embed/${
                                        item.cour_video.split('watch?v=')[1]
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
                                        border: 'solid .5px',
                                        padding: '30px',
                                      }}
                                      className="fas fa-5x fa-cloud-upload-alt"
                                    ></i>
                                  )}
                                </div>
                              </div>

                              <div className="input-group mb-3">
                                <label
                                  htmlFor="download_video_link"
                                  className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                                >
                                  Lien pour télécharger la vidéo
                                </label>
                                <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                  {' '}
                                  {item.download_video_link}{' '}
                                </span>
                              </div>

                              <div className="input-group mb-3">
                                <label
                                  htmlFor="cour_video"
                                  className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                                >
                                  test De Google
                                </label>
                                <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                  {' '}
                                  {item.cour_test_de_Google}{' '}
                                </span>
                              </div>

                              <div className="input-group mb-3">
                                <label
                                  htmlFor="cour_pdf"
                                  className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                                >
                                  lien de pdf
                                </label>
                                <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                  {' '}
                                  {item.cour_pdf}{' '}
                                </span>
                              </div>

                              <hr />

                              <p className="text-center">groupes </p>
                              <div
                                style={{
                                  overflow: 'auto',
                                  maxHeight: '400px',
                                  scrollbarWidth: 'thin',
                                  scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                                }}
                              >
                                {/* ----------------- groupe map -------------------------- */}

                                {item.cour_groupes?.length > 0 &&
                                  item.cour_groupes?.map((groupe, index) => (
                                    <div key={index}>
                                      <p className="text-center">groupe {index + 1} </p>
                                      <div className="input-group mb-3">
                                        <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                          nom du groupe
                                        </label>
                                        <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                          {' '}
                                          {groupe.groupeName}{' '}
                                        </span>
                                      </div>

                                      <div className="input-group mb-3">
                                        <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                          lien du groupe
                                        </label>
                                        <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                          {' '}
                                          {groupe.groupeLink}{' '}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                <hr />
                              </div>

                              <p className="text-center">questions </p>
                              <div
                                style={{
                                  overflow: 'auto',
                                  maxHeight: '250px',
                                  scrollbarWidth: 'thin',
                                  scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                                }}
                              >
                                {item?.cour_questions?.length > 0 &&
                                  item?.cour_questions?.map((question, index) => (
                                    <div key={index} className="input-group mb-3">
                                      <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                        question
                                      </label>
                                      <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                        {' '}
                                        {question.cour_question}{' '}
                                      </span>
                                      {/* ------------------ suggestion map --------------------- */}
                                      {question.cour_suggestions?.length > 0 &&
                                        question.cour_suggestions.map((suggestion, index) => (
                                          <div key={index} className="input-group mb-3">
                                            <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                              suggestion {index + 1}
                                            </label>
                                            <span
                                              style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                              }}
                                              className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
                                            >
                                              {' '}
                                              {suggestion}{' '}
                                            </span>
                                          </div>
                                        ))}
                                      <div className="input-group mb-3">
                                        <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
                                          correction
                                        </label>
                                        <span className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7">
                                          {' '}
                                          {question.cour_correction}{' '}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                              </div>

                              <hr />

                              <p className="text-center">presentations </p>
                              <div
                                style={{
                                  overflow: 'auto',
                                  maxHeight: '400px',
                                  scrollbarWidth: 'thin',
                                  scrollbarColor: 'rgb(0 0 0 / 22%) rgb(251 245 245 / 0%)',
                                }}
                              >
                                {item?.cour_presentation?.length > 0 &&
                                  item?.cour_presentation.map((presentation, index) => (
                                    <div className="mt-4" key={index}>
                                      <p className="text-center">presentation {index + 1} </p>
                                      <div className="input-group mb-3">
                                        <label
                                          htmlFor="presentation_title"
                                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                                        >
                                          titre de la présentation
                                        </label>
                                        <span className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
                                          {' '}
                                          {presentation.presentation_title}{' '}
                                        </span>
                                      </div>
                                      <div className="input-group mb-3">
                                        <label
                                          htmlFor="presentation_description"
                                          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
                                        >
                                          description du présentation
                                        </label>

                                        <span className="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
                                          {' '}
                                          {presentation.presentation_description}{' '}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          display: 'contents',
                                        }}
                                        className="input-group mb-3 text-center "
                                      >
                                        <div>
                                          <div className="tm-product-img-dummy mx-auto">
                                            {presentation.presentation_image ? (
                                              <img
                                                style={{
                                                  width: '130px',
                                                  maxHeight: '130px',
                                                }}
                                                id="bg-video"
                                                src={presentation.presentation_image}
                                                alt="image"
                                              />
                                            ) : (
                                              <i
                                                style={{
                                                  border: 'solid .5px',
                                                  padding: '31px',
                                                }}
                                                className="fas fa-5x fa-cloud-upload-alt"
                                              ></i>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>

                              {/*  delete Session */}
                              <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 d-flex justify-content-around mt-4 w-100 ">
                                <CButton
                                  onClick={() => deleteSession(index)}
                                  color="danger"
                                  variant="outline"
                                >
                                  supprimer
                                </CButton>
                              </div>

                              <hr />
                            </div>
                          ))}
                      </div>
                      <hr />

                      {/* button to submit form */}
                      <div className="input-group my-3">
                        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 w-100 text-center ">
                          <button type="submit" className="btn btn-primary">
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* image uploader */}
                  <div className="col-xl-4 col-lg-4 col-md-12 mx-auto mb-4">
                    <div className="text-center">
                      <div className="tm-product-img-dummy mx-auto">
                        {file2URL ? (
                          <img
                            style={{
                              width: '130px',
                              maxHeight: '130px',
                            }}
                            id="bg-video"
                            src={file2URL}
                            alt="image"
                          />
                        ) : (
                          <i
                            style={{
                              border: 'solid .5px',
                              padding: '31px',
                            }}
                            className="fas fa-5x fa-cloud-upload-alt"
                          ></i>
                        )}
                      </div>
                      <div className="custom-file mt-3 mb-3">
                        <input
                          ref={file2Ref}
                          type="file"
                          accept="image/*"
                          onChange={handleChangeFile2}
                          style={{ display: 'none' }}
                        />
                        <input
                          type="button"
                          className="btn btn-primary d-block mx-auto"
                          value="Upload ..."
                          onClick={handleClickFile2}
                        />
                      </div>
                    </div>

                    {/* video link */}
                    <div className="mt-4 text-center ">
                      <div className="tm-product-img-dummy mx-auto">
                        {session.cour_video ? (
                          <iframe
                            width="100%"
                            src={`https://www.youtube.com/embed/${
                              session.cour_video.split('watch?v=')[1]
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
                              border: 'solid .5px',
                              padding: '30px',
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

export default AddCoursParticipants
