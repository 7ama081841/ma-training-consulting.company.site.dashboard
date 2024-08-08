import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateHeader from '../../../components/E-Trainings/UpdateHeader.js'
import Header from '../../../components/E-Trainings/Header.js'
import Definition from '../../../components/E-Trainings/Definition.js'
import UpdateDefinition from '../../../components/E-Trainings/UpdateDefinition.js'

const Etrainings = () => {
  const [reRender, setReRender] = useState(false)
  const [check, setcheck] = useState({
    header: [],
    class_2: [],
  })

  const chackHeaderData = async () => {
    console.log('chackHeaderData te5dem')
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
    console.log('chackClass2Data te5dem')
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

  useEffect(() => {
    chackHeaderData()
    chackClass2Data()
  }, [])

  useEffect(() => {
    console.log('class 1', check.header)
    console.log('class 2', check.class_2)
  }, [check])

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
        <UpdateDefinition checkClass_2={check.class_2[0]} chackClass2Data={chackClass2Data} />
      ) : (
        <Definition chackClass2Data={chackClass2Data} />
      )}
    </div>
  )
}

export default Etrainings
