import React, { useEffect, useRef, useState } from 'react'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../../config/firebaseConfig'
import { CButton } from '@coreui/react'

const SliceComponent = ({ item, index, setFreeCoursData }) => {
  const [slide, setSlide] = useState({})

  useEffect(() => {
    setSlide(item)
  }, [])

  const handleChangeslide = (e) => {
    const { name, value } = e.target
    setSlide((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const headerfileRef = useRef(null)
  const [fileURL, setFileURL] = useState(null)

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

  const deletePresentationImage = (url, indexDelete) => {
    // function delete file from filrebase
    const rerFile = ref(storage, url)

    deleteObject(rerFile)
      .then(() => {})
      .catch((error) => {
        console.error(error)
      })

    setFreeCoursData((prevState) => ({
      ...prevState,
      cour_presentation: prevState.cour_presentation.filter((_, index) => index !== indexDelete),
    }))
  }

  const updatePresentation = async (e, url, index) => {
    e.preventDefault()

    const rerFile = ref(storage, url)

    deleteObject(rerFile)
      .then(() => {})
      .catch((error) => {
        console.error(error)
      })

    const uploadFile = async (file, filePath) => {
      const storageRef = ref(storage, filePath)
      await uploadBytes(storageRef, file)
      return getDownloadURL(storageRef)
    }

    const randomNumber = Math.floor(Math.random() * 1000)

    let presentation_image_url = null

    if (fileURL) {
      presentation_image_url = slide.presentation_image
        ? await uploadFile(
            slide.presentation_image,
            `FormationParticipants/images/${slide.presentation_image.name}${randomNumber}`,
          )
        : null
    }

    const updatedSlide = {
      ...slide,
      presentation_image: presentation_image_url,
    }

    setFreeCoursData((prevState) => ({
      ...prevState,
      cour_presentation: prevState.cour_presentation?.map((item, i) =>
        i === index ? updatedSlide : item,
      ),
    }))
  }

  return (
    <div>
      <div className="input-group mb-3">
        <label
          htmlFor="presentation_title"
          className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
        >
          présentation title
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
            {fileURL || item?.presentation_image ? (
              <img
                style={{
                  width: '130px',
                  maxHeight: '130px',
                }}
                id="bg-video"
                src={fileURL ? fileURL : item?.presentation_image}
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
          <div className="input-group mb-3 d-flex justify-content-center">
            <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 d-flex justify-content-around ">
              <CButton
                onClick={() => deletePresentationImage(item?.presentation_image, index)}
                color="danger"
                variant="outline"
              >
                supprimer
              </CButton>
              <button
                onClick={(e) => updatePresentation(e, item?.presentation_image, index)}
                className="btn btn-primary"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SliceComponent
