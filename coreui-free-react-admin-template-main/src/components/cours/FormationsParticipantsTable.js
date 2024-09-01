import React from 'react'
import axios from 'axios'
import { ref, deleteObject } from 'firebase/storage'
import { storage } from '../../config/firebaseConfig'

const FormationsParticipantsTable = ({
  handleAddCoursParticipantsOpen,
  handleUpdateCoursParticipantsOpen,
  getAllCoursesParticipants,
  courses,
  setCourses,
}) => {
  const handledeleteCoursParticipants = async (item) => {
    const deleteCertificatesImage = (url) => {
      if (!url) {
        console.error('URL is empty or invalid, skipping this deletion.')

        return
      }

      const rerFile = ref(storage, url)

      deleteObject(rerFile)
        .then(() => {
          console.log(`Deleted file at ${url}`)
        })
        .catch((error) => {
          console.error('Error deleting file:', error)
        })
    }

    item.cour_presentation?.forEach((presentationItem) => {
      if (presentationItem?.presentation_image) {
        deleteCertificatesImage(presentationItem.presentation_image)
      } else {
        console.log('No presentation image to delete for this item.')
      }
    })

    try {
      const res = await axios.delete(
        // `http://localhost:5000/api/delete-cours-participants/${item._id}`
        `https://ma-training-consulting-company-site-backend.vercel.app/api/delete-cours-participants/${item._id}`,
      )

      if (res.data) {
        setCourses([])
        getAllCoursesParticipants()
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
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => handleUpdateCoursParticipantsOpen(item._id)}
                        className="mx-3 fas fa-pen-alt tm-pen-icon"
                      ></i>
                      <i
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => handledeleteCoursParticipants(item)}
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
