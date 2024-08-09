import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaDollarSign } from 'react-icons/fa';
import StockChart from './StockChart';

const Home = () => {
  const [stockTotal, setStockTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [stock, setStock] = useState([]);

  
  useEffect(() => {
    stockCount();
    salaryCount();
    AdminRecords();
    fetchStock(); 
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const stockCount = () => {
    axios.get('http://localhost:3000/auth/stock_count')
      .then(result => {
        if (result.data.Status) {
          setStockTotal(result.data.Result[0].stock);
        }
      });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFSTK);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const fetchStock = () => {
    axios.get('http://localhost:3000/auth/stock')
      .then(result => {
        if (result.data.Status) {
          setStock(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-success text-white'>
          <div className='text-center pb-1'>
            <h4><FaBoxOpen /> Total Articles en Stock</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>{stockTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-success text-white'>
          <div className='text-center pb-1'>
            <h4><FaDollarSign /> Montant Total</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <StockChart stock={stock} />
      </div>
    </div>
  );
};

export default Home;
