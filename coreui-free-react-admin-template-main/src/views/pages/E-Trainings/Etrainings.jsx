import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateHeader from '../../../components/E-Trainings/UpdateHeader.js'
import Header from '../../../components/E-Trainings/Header.js'
import Definition from '../../../components/E-Trainings/Definition.js'
import UpdateDefinition from '../../../components/E-Trainings/UpdateDefinition.js'
import Avantage from '../../../components/E-Trainings/Avantage.js'
import UpdateAvantage from '../../../components/E-Trainings/UpdateAvantage.js'

import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import AddCoursPayant from '../../../components/cours/AddCoursPayant.js'

const Etrainings = () => {
  const [reRender, setReRender] = useState(false)
  const [visible, setVisible] = useState(false)
  const [categories, setCategories] = useState([])
  const [coursPayant, setCoursPayant] = useState([])

  const [check, setcheck] = useState({
    header: [],
    class_2: [],
    class_3: [],
  })

  const handleShow = () => setVisible(true)
  const handleClose = () => setVisible(false)

  const chackHeaderData = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-Header'
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-Header',
      )

      if (res.data) {
        setcheck((prevCheck) => ({
          ...prevCheck,
          header: res.data,
        }))
        // setReRender(true)
      }
    } catch (error) {
      console.log('check.header', error)
    }
  }

  const chackClass2Data = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-class-2'
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-class-2',
      )

      if (res.data) {
        setcheck((prevCheck) => ({
          ...prevCheck,
          class_2: res.data,
        }))
        // setReRender(true)
      }
    } catch (error) {
      console.log('check.header', error)
    }
  }

  const chackClass3Data = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-class-3',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-class-3',
      )

      if (res.data) {
        setcheck((prevCheck) => ({
          ...prevCheck,
          class_3: res.data,
        }))
        // setReRender(true)
      }
    } catch (error) {
      console.log('check.header', error)
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
        // dispatch(getCategories(res.data.categories))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getAllCoursPayant = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-all-cours-Payant',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-all-cours-Payant',
      )

      if (res.data) {
        setCoursPayant(res.data.course)
        //  dispatch(getcoursPayant(res.data.course))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handledeleteCoursPayant = async (id) => {
    try {
      const res = await axios.delete(
        // `http://localhost:5000/api/delete-cours-Payant/${id}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/delete-cours-Payant/${id}`,
      )

      if (res.data) {
        // dispatch(deleteCoursPayant(res.data.course._id))
        location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    chackHeaderData()
    chackClass2Data()
    chackClass3Data()
    getCategoriesData()
    getAllCoursPayant()
  }, [])

  useEffect(() => {
    if (reRender) {
      setReRender(false)
    }
  }, [reRender])

  return (
    <div className="Etrainings">
      {check.header.length > 0 ? (
        <UpdateHeader checkHeader={check.header[0]} chackHeaderData={chackHeaderData} />
      ) : (
        <Header setReRender={setReRender} />
      )}
      {check.class_2.length > 0 ? (
        <UpdateDefinition checkClass_2={check.class_2[0]} />
      ) : (
        <Definition chackClass2Data={chackClass2Data} setReRender={setReRender} />
      )}
      {check.class_3.length > 0 ? (
        <UpdateAvantage checkClass_3={check.class_3[0]} />
      ) : (
        <Avantage setReRender={setReRender} />
      )}

      <div className="col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col my-5">
        <div className="tm-block h-100">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <h2 className="tm-block-title d-inline-block">formations Payant</h2>
            </div>
            <div className="col-md-4 col-sm-12 text-right">
              <button onClick={handleShow} className="btn btn-small btn-primary">
                Ajouter Un formation
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped tm-table-striped-even mt-3">
              <thead>
                <tr className="tm-bg-gray">
                  {/*<th scope="col">&nbsp;</th>*/}
                  <th
                    style={{
                      minWidth: '180px',
                    }}
                    scope="col"
                  >
                    non de formation
                  </th>
                  <th scope="col" className="text-center">
                    Units Sold
                  </th>
                  <th scope="col" className="text-center">
                    In Stock
                  </th>
                  <th scope="col"> Date</th>
                  <th scope="col">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {coursPayant.map((item, index) => (
                  <tr key={index}>
                    <td className="tm-product-name">{item.cour_title}</td>
                    <td className="text-center">145</td>
                    <td className="text-center">255</td>
                    <td>2018-10-28</td>
                    <td>
                      <i
                        onClick={() => handledeleteCoursPayant(item._id)}
                        className="fas fa-trash-alt tm-trash-icon"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/*<CoursPayant />*/}
      <CModal visible={visible} onClose={handleClose} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>formation payant</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddCoursPayant handleClose={handleClose} categorys={categories} />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Etrainings
