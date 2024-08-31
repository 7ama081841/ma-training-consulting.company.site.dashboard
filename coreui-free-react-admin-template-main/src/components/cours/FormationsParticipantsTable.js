import React from 'react'
import axios from 'axios'

const FormationsParticipantsTable = ({ handleAddCoursParticipantsOpen, courses }) => {
  const handledeleteCoursParticipants = async (id) => {
    try {
      const res = await axios.delete(
        // `http://localhost:5000/api/delete-cours-participants/${id}`
        `https://ma-training-consulting-company-site-backend.vercel.app/api/delete-cours-participants/${id}`,
      )

      if (res.data) {
        dispatch(deleteCoursParticipants(res.data.course._id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="row tm-content-row tm-mt-big">
      <div className="col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col">
        <div className=" tm-block h-100">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <h2 className="tm-block-title d-inline-block">formations Participants</h2>
            </div>
            <div className="col-md-4 col-sm-12 text-right">
              <button
                onClick={handleAddCoursParticipantsOpen}
                className="btn btn-small btn-primary"
              >
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
                {courses?.map((item, index) => (
                  <tr key={index}>
                    <td className="tm-product-name">{item.cour_title}</td>
                    <td className="text-center">145</td>
                    <td className="text-center">255</td>
                    <td>2018-10-28</td>
                    <td>
                      <i
                        onClick={() => handledeleteCoursParticipants(item._id)}
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
    </div>
  )
}

export default FormationsParticipantsTable
