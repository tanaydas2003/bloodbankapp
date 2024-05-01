import React, {useEffect, useState} from 'react'
import Layout from '../components/shared/Layouts/Layout'
import Modal from '../components/shared/modal/Modal'
import API from '../services/API'
import moment from 'moment'

const HomePage = () => {
  const [data,setData] = useState([])

  const getBloodRecords = async () =>{
    try {
      const {data} = await API.get('/inventory/get-inventory')
      if(data?.success){
        setData(data?.inventory)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getBloodRecords();
  }, []);
  return (
    <Layout>
      <>
      <div className="container contentr">
        <h4 data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor: "pointer"}}>
          <i className="fa-solid fa-plus text-success py-4"></i>
          Add Inventory
        </h4>
        <Modal />
        <table className="table table-responsive table-bordered border-dark text-center">
        <thead>
          <tr className='table-dark table-active text-uppercase text-white'>
            <th scope="col">Blood Group</th>
            <th scope="col">Inventory Type</th>
            <th scope="col">Quantity</th>
            <th scope="col">Donar Email</th>
            <th scope="col">Time & Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(record => (
            <tr key={record._id}>
            <td>{record.bloodGroup}</td>
            <td>{record.inventoryType}</td>
            <td>{record.quantity} (ML)</td>
            <td>{record.email}</td>
            <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      </>
    </Layout>
  )
}

export default HomePage
