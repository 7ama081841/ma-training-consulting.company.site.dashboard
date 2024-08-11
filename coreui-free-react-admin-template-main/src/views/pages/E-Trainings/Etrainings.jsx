import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateHeader from '../../../components/E-Trainings/UpdateHeader.js'
import Header from '../../../components/E-Trainings/Header.js'
import Definition from '../../../components/E-Trainings/Definition.js'
import UpdateDefinition from '../../../components/E-Trainings/UpdateDefinition.js'
import Avantage from '../../../components/E-Trainings/Avantage.js'
import UpdateAvantage from '../../../components/E-Trainings/UpdateAvantage.js'

const Etrainings = () => {
  const [reRender, setReRender] = useState(false)
  const [check, setcheck] = useState({
    header: [],
    class_2: [],
    class_3: [],
  })

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
        'http://localhost:5000/api/get-class-3',
        // 'https://ma-training-consulting-company-site-backend.vercel.app/api/get-class-2',
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

  useEffect(() => {
    chackHeaderData()
    chackClass2Data()
    chackClass3Data()
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
    </div>
  )
}

export default Etrainings
