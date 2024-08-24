import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import Addstudent from '../../../components/E-Trainings/student validation/Addstudent'
import Students from '../../../components/E-Trainings/student validation/Students'

const ValidationComponent = () => {
  const [visible, setVisible] = useState(false)
  const [studentData, setStudentData] = useState([])
  const handleShow = () => setVisible(true)
  const handleClose = () => setVisible(false)

  const getStudentData = async () => {
    console.log('getStudentData is work ')
    try {
      const res = await axios.get(
        'http://localhost:5000/api/get-student',
        // 'https://ma-training-consulting-company-site-backend.vercel.app/api/get-student',
      )

      if (res.data) {
        setStudentData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStudentData()
  }, [])

  return (
    <div className="validation">
      <Students handleShow={handleShow} handleClose={handleClose} studentData={studentData} />

      <CModal visible={visible} onClose={handleClose} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Ajouter Un étudiant</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Addstudent getStudentData={getStudentData} handleClose={handleClose} />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ValidationComponent
