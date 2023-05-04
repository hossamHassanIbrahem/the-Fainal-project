import React from 'react'
import MainSideBar from './../../Components/MainSideBar/MainSideBar';

import { useEffect, useState } from "react";
import mobilesCat from "./../../axiosConfig/axiosInstance";
import Cards from './../../Components/Card/Cards';

export default function Mobiles(handleClick) {
 
  const [Products, setProducts] = useState([]);
 
  useEffect(() => {
    mobilesCat
      .get("/products/Categories/6450df16cac8d03f6ebcc484")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setProducts]);
  return (
    <div>   <div className="mx-5 my-5">
    <div className="row ">
      <div className="col-3 ">
       
        <MainSideBar />
      </div>
      <div className="col-9">
      {Products.map((item) => (
              <Cards item={item} key={item.id} handleClick={handleClick} />
            ))}
mobiles

      </div>
    </div>
  </div></div>
  );
};
