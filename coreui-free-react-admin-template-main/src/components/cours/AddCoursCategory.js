import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AddCoursCategory = ({ handleCategoriesClose, getCategoriesData }) => {
  const [categories, setCategories] = useState({
    categorie: '',
    categories_id: '',
  })

  const handleChangeCategories = (e) => {
    const { name, value } = e.target

    setCategories((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmitCategories = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        // ' http://localhost:5000/api/add-categories',
        'https://ma-training-consulting-company-site-backend.vercel.app/api/add-categories',
        categories,
      )

      if (res.data) {
        handleCategoriesClose()
        getCategoriesData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="input-group mb-3">
      <form onSubmit={handleSubmitCategories}>
        <div className="my-3">
          <label htmlFor="categorie" className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">
            Catégories
          </label>
          <input
            name="categorie"
            onChange={handleChangeCategories}
            type="text"
            value={categories.categorie}
            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
          />
        </div>

        <div className="my-3">
          <label
            htmlFor="categories_id"
            className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label"
          >
            id
          </label>
          <input
            name="categories_id"
            onChange={handleChangeCategories}
            type="text"
            value={categories.categories_id}
            className="form-control validate col-xl-9 col-lg-8 col-md-7 col-sm-7"
          />
        </div>

        <button type="submit" className="btn btn-primary my-3 ">
          ajouter
        </button>
      </form>
    </div>
  )
}

export default AddCoursCategory
