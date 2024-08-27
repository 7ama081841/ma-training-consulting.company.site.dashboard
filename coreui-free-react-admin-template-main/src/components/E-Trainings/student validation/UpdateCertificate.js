import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'

const UpdateCertificate = ({ item, index, setDefinitionData }) => {
  const [reRender, setReRender] = useState(false)
  const [certificate, setCertificate] = useState({
    certificate_name: '',
    certificate_date_start: '',
    certificate_date_end: '',
    certificate_Teacher: '',
    certificate_description: '',
  })

  useEffect(() => {
    setCertificate(item)
  }, [item])

  useEffect(() => {
    if (reRender) {
      setReRender(false)
    }
  }, [reRender])

  const handleChangecertificateData = (e) => {
    const { name, value } = e.target
    setCertificate((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updateCertificateAtIndex = (e, index) => {
    e.preventDefault()

    setDefinitionData((prevState) => ({
      ...prevState,
      certificates: prevState.certificates.map((cert, i) => (i === index ? certificate : cert)),
    }))
  }

  const deleteCertificate = (indexDelete) => {
    setDefinitionData((prevState) => ({
      ...prevState,
      certificates: prevState.certificates.filter((_, index) => index !== indexDelete),
    }))
    setReRender(true)
  }

  return (
    <div key={index} className="mt-3">
      <p className="text-center"> certificate {index + 1} </p>

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
        <CButton
          className="mx-2"
          onClick={() => deleteCertificate(index)}
          color="danger"
          variant="outline"
        >
          supprimer
        </CButton>

        <button onClick={(e) => updateCertificateAtIndex(e, index)} className="btn btn-primary">
          modifier un certificat
        </button>
      </div>
    </div>
  )
}

export default UpdateCertificate
