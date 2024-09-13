import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'

const GroupeComponent = ({ item, index, setSession, session }) => {
  const [groupe, setGroupe] = useState({})

  const handleChangeGroupe = (e) => {
    const { name, value } = e.target
    setGroupe((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    setGroupe(item)
  }, [session])

  const deleteGroupe = (indexDelete) => {
    setSession((prevState) => ({
      ...prevState,
      cour_groupes: prevState.cour_groupes.filter((_, index) => index !== indexDelete),
    }))
  }

  const updateGroupe = (index) => {
    setSession((prevState) => {
      const newCourGroupes = [...prevState.cour_groupes]

      const updatedGroupe = { ...groupe }

      if (JSON.stringify(newCourGroupes[index]) === JSON.stringify(updatedGroupe)) {
        return prevState
      }

      newCourGroupes[index] = updatedGroupe
      return {
        ...prevState,
        cour_groupes: newCourGroupes,
      }
    })
  }

  return (
    <div key={index}>
      <p className="text-center"> Goupe {index + 1} </p>
      <div className="input-group mb-3">
        <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">nom du groupe</label>
        <input
          onChange={handleChangeGroupe}
          type="text"
          value={groupe.groupeName}
          name="groupeName"
          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
        />
      </div>

      <div className="input-group mb-3">
        <label className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">lien du groupe</label>
        <input
          onChange={handleChangeGroupe}
          type="text"
          value={groupe.groupeLink}
          name="groupeLink"
          className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
        />
      </div>
      <div className="input-group mb-3 d-flex justify-content-center">
        <div className="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0 d-flex justify-content-around ">
          <CButton onClick={() => deleteGroupe(index)} color="danger" variant="outline">
            supprimer
          </CButton>
          <button onClick={() => updateGroupe(index)} className="btn btn-primary">
            Modifier
          </button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default GroupeComponent
