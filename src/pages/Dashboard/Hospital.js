import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layouts/Layout'
import API from '../../services/API';
import moment from 'moment';

const Hospital = () => {
    const [data, setData] = useState([])
    //find donar accounts
    const getDonars = async () =>{
      try {
        const {data} = await API.get('/inventory/get-hospitals');
        // console.log(data);
        if(data?.success){
          setData(data?.hospitals)
        }
      } catch (error) {
        console.log(error)
      }
    };
  
    useEffect(() =>{
      getDonars();
    },[])
    
    return (
      <Layout>
        <table className="table table-responsive border-dark table-bordered text-center">
          <thead>
            <tr className='table-dark table-active text-uppercase text-white'>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    )
}

export default Hospital
