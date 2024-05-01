import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layouts/Layout'
import API from '../../services/API';
import {useSelector} from "react-redux"
import moment from 'moment';
import "../../styles/Layout.css";

const Organisation = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //find org records
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-organisation");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organisation-for-hospital"
        );
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.error("Error fetching organisation data:", error);
    }
  };
  

  useEffect(() => {
    getOrg();
  }, [user]);

    
    return (
        <Layout>
          <table className="table table-responsive table-bordered border-dark text-center">
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
                <td>{record.organisationName}</td>
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

export default Organisation
