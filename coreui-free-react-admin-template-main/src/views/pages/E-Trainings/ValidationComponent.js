import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import Addstudent from '../../../components/E-Trainings/student validation/Addstudent'
import Students from '../../../components/E-Trainings/student validation/Students'
import UpdateStudent from '../../../components/E-Trainings/student validation/UpdateStudent'

const ValidationComponent = () => {
  const [visible, setVisible] = useState(false)
  const [updateStudentVisible, setUpdateStudentVisible] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [studentData, setStudentData] = useState([])

  const handleShow = () => setVisible(true)
  const handleClose = () => setVisible(false)

  const handleUpdateStudentShow = (id) => {
    setUpdateStudentVisible(true)

    setStudentId(id)
  }
  const handleUpdateStudentClose = () => setUpdateStudentVisible(false)

  const getStudentData = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-student',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-student',
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
      <Students
        handleShow={handleShow}
        handleUpdateStudentShow={handleUpdateStudentShow}
        setStudentData={setStudentData}
        studentData={studentData}
        getStudentData={getStudentData}
      />

      <CModal visible={visible} onClose={handleClose} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Validation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Addstudent getStudentData={getStudentData} handleClose={handleClose} />
        </CModalBody>
      </CModal>

      <CModal visible={updateStudentVisible} onClose={handleUpdateStudentClose} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Validation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <UpdateStudent
            studentId={studentId}
            handleUpdateStudentClose={handleUpdateStudentClose}
            getStudentData={getStudentData}
          />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ValidationComponent
