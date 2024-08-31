import React, { useEffect, useState } from 'react'
import FormationsParticipantsTable from '../../../components/cours/FormationsParticipantsTable'
import axios from 'axios'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import AddCoursParticipants from '../../../components/cours/AddCoursParticipants'

const CourseParticipants = () => {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [addCoursParticipantsOpen, setAddCoursParticipantsOpen] = useState(false)
  const [updateCoursParticipantsOpen, setUpdateCoursParticipantsOpen] = useState(false)

  const handleAddCoursParticipantsOpen = () => {
    setAddCoursParticipantsOpen(true)
  }
  const handleAddCoursParticipantsClose = () => {
    setAddCoursParticipantsOpen(false)
  }

  const getAllCoursesParticipants = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:5000/api/get-all-cours-participants"
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-all-cours-participants',
      )

      if (res.data) {
        setCourses(res.data.course)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getCategoriesData = async () => {
    try {
      const res = await axios.get(
        // ' http://localhost:5000/api/get-categories',
        ' https://ma-training-consulting-company-site-backend.vercel.app/api/get-categories',
      )

      if (res.data) {
        setCategories(res.data.categories)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllCoursesParticipants()
    getCategoriesData()
  }, [])

  return (
    <div className="CourseParticipants">
      <FormationsParticipantsTable
        handleAddCoursParticipantsOpen={handleAddCoursParticipantsOpen}
        courses={courses}
      />

      <CModal
        visible={addCoursParticipantsOpen}
        onClose={handleAddCoursParticipantsClose}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Validation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddCoursParticipants
            categories={categories}
            getAllCoursesParticipants={getAllCoursesParticipants}
            handleAddCoursParticipantsClose={handleAddCoursParticipantsClose}
          />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default CourseParticipants
