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
import UpdateCoursPayant from '../../../components/cours/UpdateCoursPayant.js'
import AddTestimony from '../../../components/E-Trainings/AddTestimony.js'
import AddPackDeFormation from '../../../components/E-Trainings/AddPackDeFormation.js'
import UpdatePackDeFormation from '../../../components/E-Trainings/UpdatePackDeFormation.js'
import AddPartenaire from '../../../components/E-Trainings/AddPartenaire.js'
import AddCoursCategory from '../../../components/cours/AddCoursCategory.js'

const Etrainings = () => {
  const [reRender, setReRender] = useState(false)
  const [visible, setVisible] = useState(false)
  const [updateCoursVisible, setUpdateCoursVisible] = useState(false)
  const [coursId, setCoursId] = useState(null)
  const [categories, setCategories] = useState([])
  const [coursPayant, setCoursPayant] = useState([])
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const [check, setcheck] = useState({
    header: [],
    class_2: [],
    class_3: [],
    packDeFormation: [],
  })

  useEffect(() => {
    console.log('categories', categories)
  }, [categories])

  const handleShow = () => setVisible(true)
  const handleClose = () => setVisible(false)

  const handleUpdateCoursShow = (id) => {
    setCoursId(id)
    setUpdateCoursVisible(true)
  }

  const handleCategoriesOpen = () => {
    setCategoriesOpen(true)
  }

  const handleCategoriesClose = () => {
    setCategoriesOpen(false)
    //  setCategories('')
  }

  const handleDeleteCategories = async (id) => {
    try {
      const res = await axios.delete(
        // `http://localhost:5000/api/selet-categories/${id}`
        // `https://ma-training-consulting-company-site.onrender.com/api/selet-categories/${id}`
        `https://ma-training-consulting-company-site-backend.vercel.app/api/selet-categories/${id}`,
      )

      if (res.data) {
        // dispatch(deleteCategories(res.data.categories._id))
        setCategories([])
        getCategoriesData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateCoursClose = () => setUpdateCoursVisible(false)

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

  const getPackDeFormation = async () => {
    try {
      const res = await axios.get(
        // 'http://localhost:5000/api/get-PackDeFormation',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/get-PackDeFormation',
      )

      if (res.data) {
        setcheck((prevCheck) => ({
          ...prevCheck,
          packDeFormation: res.data,
        }))
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
    getPackDeFormation()
  }, [])

  useEffect(() => {
    if (reRender) {
      setReRender(false)
    }
  }, [reRender])

  return (
    <div className="Etrainings">
      {/* class 1 */}
      {check.header.length > 0 ? (
        <UpdateHeader checkHeader={check.header[0]} chackHeaderData={chackHeaderData} />
      ) : (
        <Header setReRender={setReRender} />
      )}

      {/* class 2 */}
      {check.class_2.length > 0 ? (
        <UpdateDefinition checkClass_2={check.class_2[0]} />
      ) : (
        <Definition chackClass2Data={chackClass2Data} setReRender={setReRender} />
      )}

      {/* class 3 */}
      {check.class_3.length > 0 ? (
        <UpdateAvantage checkClass_3={check.class_3[0]} />
      ) : (
        <Avantage setReRender={setReRender} />
      )}

      {/* class 4 */}
      <div className="row mt-5 ">
        <div className="col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col ">
          <div className="tm-block h-100">
            <div className="row">
              <div className="col-md-8 col-sm-12">
                <h2 className="tm-block-title d-inline-block"> Class 4 ( formations Payant )</h2>
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
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateCoursShow(item._id)}
                          className="mx-3 fas fa-pen-alt tm-pen-icon"
                        ></i>
                        <i
                          style={{
                            cursor: 'pointer',
                          }}
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

        <div className="col-xl-4 col-lg-12 tm-md-12 tm-sm-12 tm-col">
          <div className=" tm-block h-100">
            <h2 className="tm-block-title d-inline-block">Catégories de formation</h2>
            <table className="table table-hover table-striped mt-3">
              <tbody>
                {categories.map((item, index) => (
                  <tr key={index}>
                    <td> {item.categorie} </td>
                    <td className="tm-trash-icon-cell">
                      <i
                        onClick={() => handleDeleteCategories(item._id)}
                        className="fas fa-trash-alt tm-trash-icon"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={handleCategoriesOpen} className="btn btn-primary tm-table-mt">
              ajouter une catégorie
            </button>
          </div>
        </div>
      </div>

      {/* class 5 */}
      <AddTestimony />

      {/* class 6 */}
      {check.packDeFormation.length > 0 ? (
        <UpdatePackDeFormation packDeFormation={check.packDeFormation[0]} setcheck={setcheck} />
      ) : (
        <AddPackDeFormation getPackDeFormation={getPackDeFormation} />
      )}

      {/* class 7 */}
      <AddPartenaire />

      {/* dialog add  ( formations Payant ) class 4 */}
      <CModal visible={visible} onClose={handleClose} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>formation payant</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddCoursPayant handleClose={handleClose} getCategoriesData={categories} />
        </CModalBody>
      </CModal>

      {/* dialog update ( formations Payant ) class 4 */}
      <CModal visible={updateCoursVisible} onClose={handleUpdateCoursClose} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>modifier formation payant</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <UpdateCoursPayant
            handleUpdateCoursClose={handleUpdateCoursClose}
            getCategoriesData={categories}
            coursId={coursId}
          />
        </CModalBody>
      </CModal>

      {/* dialog add  ( Catégories de formation) class 4 */}
      <CModal
        visible={categoriesOpen}
        onClose={handleCategoriesClose}
        // size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>ajouter une catégorie</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddCoursCategory
            handleCategoriesClose={handleCategoriesClose}
            getCategoriesData={getCategoriesData}
          />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Etrainings
