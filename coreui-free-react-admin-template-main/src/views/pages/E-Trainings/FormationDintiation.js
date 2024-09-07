import React, { useEffect, useState } from 'react'
import FormationDintiationTable from '../../../components/cours/FormationDintiationTable'
import axios from 'axios'
import AddFormationDintiation from '../../../components/cours/AddFormationDintiation'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import UpdateFormationDintiation from '../../../components/cours/UpdateFormationDintiation'
import FormationDintiationInderface from '../../../components/E-Trainings/FormationDintiationInderface'
import UpdeteFormationDintiationInderface from '../../../components/E-Trainings/UpdeteFormationDintiationInderface'

const FormationDintiation = () => {
  const [courses, setCourses] = useState([])
  const [categorys, setCategorys] = useState([])
  const [addFormationDintiationOpen, setAddFormationDintiationOpen] = useState(false)
  const [updateFormationDintiationOpen, setUpdateFormationDintiationOpen] = useState(false)
  const [formationDintiationInderface, setFormationDintiationInderface] = useState({})
  const [coursesId, setCoursesId] = useState()

  const handleAddFormationDintiationClose = () => {
    setAddFormationDintiationOpen(false)
  }

  const handleAddFormationDintiationOpen = () => {
    setAddFormationDintiationOpen(true)
  }

  const handleUpdateFormationDintiationClose = () => {
    setUpdateFormationDintiationOpen(false)
  }

  const handleUpdateFormationDintiationOpen = (id) => {
    setCoursesId(id)
    setUpdateFormationDintiationOpen(true)
  }

  const getAllCourses = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-all-courses',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-all-courses',
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
        // " http://localhost:5000/api/get-categories"
        ' https://ma-training-consulting-company-site-backend.vercel.app/api/get-categories',
      )

      if (res.data) {
        setCategorys(res.data.categories)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const get_Formation_Dintiation_Inderface = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-Formation-Dintiation-Inderface',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-Formation-Dintiation-Inderface',
      )

      if (res.data) {
        setFormationDintiationInderface(res.data.coursDintiationInderface)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCategoriesData()
    getAllCourses()
    get_Formation_Dintiation_Inderface()
  }, [])

  return (
    <div>
      {formationDintiationInderface.length > 0 ? (
        <UpdeteFormationDintiationInderface
          formationDintiationInderface={formationDintiationInderface[0]}
          get_Formation_Dintiation_Inderface={get_Formation_Dintiation_Inderface}
          setFormationDintiationInderface={setFormationDintiationInderface}
        />
      ) : (
        <FormationDintiationInderface
          get_Formation_Dintiation_Inderface={get_Formation_Dintiation_Inderface}
        />
      )}

      <FormationDintiationTable
        courses={courses}
        handleAddFormationDintiationOpen={handleAddFormationDintiationOpen}
        handleUpdateFormationDintiationOpen={handleUpdateFormationDintiationOpen}
        getAllCourses={getAllCourses}
        setCourses={setCourses}
      />

      <CModal
        visible={addFormationDintiationOpen}
        onClose={handleAddFormationDintiationClose}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>ajouter une formation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddFormationDintiation
            categorys={categorys}
            handleAddFormationDintiationClose={handleAddFormationDintiationClose}
            getAllCourses={getAllCourses}
          />
        </CModalBody>
      </CModal>

      <CModal
        visible={updateFormationDintiationOpen}
        onClose={handleUpdateFormationDintiationClose}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>modifier une formation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <UpdateFormationDintiation
            coursesId={coursesId}
            categorys={categorys}
            handleUpdateFormationDintiationClose={handleUpdateFormationDintiationClose}
            getAllCourses={getAllCourses}
          />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default FormationDintiation
