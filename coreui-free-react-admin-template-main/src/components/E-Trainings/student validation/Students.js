import React from 'react'
import axios from 'axios'

const Students = ({ handleShow, setStudentData, studentData, getStudentData }) => {
  const delete_Student = async (id) => {
    console.log('id', id)
    const res = await axios.delete(
      // ` http://localhost:5000/api/delete-student/${id}`,
      `https://ma-training-consulting-company-site-backend.vercel.app/api/delete-student/${id}`,
    )

    if (res.data) {
      setStudentData([])
      getStudentData()
    }

    try {
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col ">
      <div className="tm-block h-100">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <h2 className="tm-block-title d-inline-block"> étudiants </h2>
          </div>
          <div className="col-md-4 col-sm-12 text-right">
            <button onClick={handleShow} className="btn btn-small btn-primary">
              Ajouter Un étudiant
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped tm-table-striped-even mt-3">
            <thead>
              <tr className="tm-bg-gray">
                <th
                  style={{
                    minWidth: '180px',
                  }}
                  scope="col"
                >
                  non de formation
                </th>
                <th scope="col" className="text-center">
                  Spécialisation
                </th>
                <th scope="col"> Id</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {studentData?.length > 0 &&
                studentData?.map((item, index) => (
                  <tr key={index}>
                    <td className="tm-product-name">{item.student_name}</td>
                    <td className="text-center">{item.student_job_title}</td>
                    <td> {item.student_id} </td>
                    <td>
                      <i
                        style={{
                          cursor: 'pointer',
                        }}
                        //   onClick={() => handleUpdateCoursShow(item._id)}
                        className="mx-3 fas fa-pen-alt tm-pen-icon"
                      ></i>
                      <i
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => delete_Student(item._id)}
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
  )
}

export default Students
