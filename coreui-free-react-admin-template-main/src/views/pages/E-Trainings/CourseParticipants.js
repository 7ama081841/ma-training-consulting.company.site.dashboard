import React, { useEffect, useState } from 'react'
import FormationsParticipantsTable from '../../../components/cours/FormationsParticipantsTable'
import axios from 'axios'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import AddCoursParticipants from '../../../components/cours/AddCoursParticipants'
import UpdateCoursParticipants from '../../../components/cours/UpdateCoursParticipants'
import CoursParticipantsInderface from '../../../components/E-Trainings/CoursParticipantsInderface'
import UpdateCoursParticipantsInderface from '../../../components/E-Trainings/UpdateCoursParticipantsInderface'

const CourseParticipants = () => {
  const [courses, setCourses] = useState([])
  const [coursesId, setCoursesId] = useState()
  const [categories, setCategories] = useState([])
  const [coursParticipantsInderface, setCoursParticipantsInderface] = useState([])
  const [addCoursParticipantsOpen, setAddCoursParticipantsOpen] = useState(false)
  const [updateCoursParticipantsOpen, setUpdateCoursParticipantsOpen] = useState(false)

  const handleAddCoursParticipantsOpen = () => {
    setAddCoursParticipantsOpen(true)
  }
  const handleAddCoursParticipantsClose = () => {
    setAddCoursParticipantsOpen(false)
  }

  const handleUpdateCoursParticipantsOpen = (id) => {
    setCoursesId(id)
    setUpdateCoursParticipantsOpen(true)
  }
  const handleUpdateCoursParticipantsClose = () => {
    setUpdateCoursParticipantsOpen(false)
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

  const getAllCoursParticipantsInderface = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-all-cours-participants-inderface',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-all-cours-participants-inderface',
      )

      if (res.data) {
        setCoursParticipantsInderface(res.data.allCoursParticipantsInderface1)
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
    getAllCoursParticipantsInderface()
  }, [])

  return (
    <div className="CourseParticipants">
      {coursParticipantsInderface.length > 0 ? (
        <UpdateCoursParticipantsInderface
          coursParticipantsInderface={coursParticipantsInderface[0]}
          getAllCoursParticipantsInderface={getAllCoursParticipantsInderface}
          setCoursParticipantsInderface={setCoursParticipantsInderface}
        />
      ) : (
        <CoursParticipantsInderface
          getAllCoursParticipantsInderface={getAllCoursParticipantsInderface}
        />
      )}

      <FormationsParticipantsTable
        handleAddCoursParticipantsOpen={handleAddCoursParticipantsOpen}
        handleUpdateCoursParticipantsOpen={handleUpdateCoursParticipantsOpen}
        getAllCoursesParticipants={getAllCoursesParticipants}
        courses={courses}
        setCourses={setCourses}
      />

      {/* dialog add une formation */}
      <CModal
        visible={addCoursParticipantsOpen}
        onClose={handleAddCoursParticipantsClose}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>ajouter une formation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddCoursParticipants
            categories={categories}
            getAllCoursesParticipants={getAllCoursesParticipants}
            handleAddCoursParticipantsClose={handleAddCoursParticipantsClose}
          />
        </CModalBody>
      </CModal>

      {/* dialog update une formation */}
      <CModal
        visible={updateCoursParticipantsOpen}
        onClose={handleUpdateCoursParticipantsClose}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>modifier le formation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <UpdateCoursParticipants
            coursesId={coursesId}
            categories={categories}
            getAllCoursesParticipants={getAllCoursesParticipants}
            handleUpdateCoursParticipantsClose={handleUpdateCoursParticipantsClose}
          />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default CourseParticipants
