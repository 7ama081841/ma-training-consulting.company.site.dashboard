import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateHeader from '../../../components/E-Trainings/UpdateHeader'
import Header from '../../../components/E-Trainings/Header'

const Etrainings = () => {
  const [reRender, setReRender] = useState(false)
  const [check, setcheck] = useState({
    header: [],
  })

  const chackHeaderData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/get-Header')

      if (res.data) {
        setcheck({
          ...check,
          header: res.data,
        })
        setReRender(true)
      }
    } catch (error) {
      console.log('check.header', error)
    }
  }

  useEffect(() => {
    chackHeaderData()
  }, [])

  // useEffect(() => {
  //   if (reRender) {
  //     setReRender(false)
  //   }
  //   chackHeaderData()
  // }, [reRender])

  return (
    <div className="Etrainings">
      {check.header.length > 0 ? (
        <UpdateHeader
          checkHeader={check.header[0]}
          setReRender={setReRender}
          chackHeaderData={chackHeaderData}
        />
      ) : (
        <Header setReRender={setReRender} />
      )}
    </div>
  )
}

export default Etrainings

// <Definition setReRender={setReRender} />
