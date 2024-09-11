import React from 'react'
import axios from 'axios'
import { ref, deleteObject } from 'firebase/storage'
import { storage } from '../../config/firebaseConfig'

const EventsTable = ({
  events,
  handleAddEventOpen,
  getAllEvents,
  setEvents,
  handleUpdateEventOpen,
}) => {
  const handledelete = async (item) => {
    const rerFile = ref(storage, item.event_image)

    try {
      await deleteObject(rerFile)
      console.log('Old file deleted successfully.')
    } catch (error) {
      console.error('Failed to delete old file:', error)
    }

    try {
      const res = await axios.delete(
        // `http://localhost:5000/api/delete-Event/${item._id}`,
        `https://ma-training-consulting-company-site-backend.vercel.app/api/delete-Event/${item._id}`,
      )

      if (res.data) {
        setEvents([])
        getAllEvents()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="row tm-content-row tm-mt-big mt-4">
      <div className="col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col">
        <div className=" tm-block h-100">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <h2 className="tm-block-title d-inline-block">événements</h2>
            </div>
            <div className="col-md-4 col-sm-12 text-right">
              <button onClick={handleAddEventOpen} className="btn btn-small btn-primary">
                Ajouter Un événement
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
                    non de événement
                  </th>

                  <th scope="col"> Date</th>
                  <th scope="col">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {events?.length > 0 &&
                  events.map((item, index) => (
                    <tr key={index}>
                      <td className="tm-product-name">{item.event_title}</td>

                      <td>{item.event_date} </td>
                      <td>
                        <i
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateEventOpen(item._id)}
                          className="mx-3 fas fa-pen-alt tm-pen-icon"
                        ></i>
                        <i
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => handledelete(item)}
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

export default EventsTable
