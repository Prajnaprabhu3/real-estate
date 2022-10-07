import { useState, useEffect } from "react";
import axios from 'axios';
import { MdOutlineSingleBed, MdFavoriteBorder } from 'react-icons/md'
import { BiBath , BiArea, BiSearch } from 'react-icons/bi'

import Button from "./Button";


import "../styles/MainComponent.css";

import { Dropdown } from 'primereact/dropdown'
import {Calendar} from 'primereact/calendar'
import Label from "./Label";
import NoDataFound from "./NoDataFound";


const MainComponent = () => {
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(false);
  

  const [search, setSearch] = useState(null)


  const [location, setLocation] = useState(null)
  const [price, setPrice] = useState(null)
  const [property, setProperty] = useState(null)
  const [availableDate, setAvailableDate] = useState(null)



  
const locationTypes = [
  {label: 'Delhi', value: 'Delhi'},
  {label: 'Mumbai', value: 'Mumbai'},
  {label: 'Goa', value: 'Goa'},
  {label: 'Bangalore', value: 'Bangalore'},
  {label: 'Calcutta', value: 'Calcutta'}
];

const priceOptions= [
  { label: '$1000 - $2,000', value: '$1000 - $2000' },
  { label: '$2,000 - $4,000', value: '$2000 - $4000' },
  { label: '$4,000 - $9,000', value: '$4000 - $7000' },
];

const propertyTypes = [
  { label: 'House', value:'House' },
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Resort', value: 'Resort'}
];
  
  const onLocationChange = (e) => {
    setLocation(e.value);
  }
  const onPriceChange = (e) => {
    setPrice(e.value)
  }
  const onPropertyChange = (e) => {
    setProperty(e.value)
  }



    // data fetch 
    useEffect(() => {
    setIsLoading(true);
    axios
        .get("./data.json")
        .then(response => {
            setResults(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });

        console.log(results)

}, []);



const fetchSearch = () => {
  setIsLoading(true)
  fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    let result = data
    if (location) {
      result = result.filter(data => data.location === location)
    }
    if (price) {
      result = result.filter(data => ((price.split(' - ')[1] ? data.price < price.split(' - ')[1].slice(1) : true) && data.price >= price.split(' - ')[0].slice(1)))
    }
    if (property) {
      result = result.filter(data => data.propertyType === property)
    }
    if (search) {
      result = result.filter(data => (data.name.toLowerCase().includes(search.toLowerCase())))
    }
    setResults(result)
  })
  .catch(e => console.log(e))
}









  return (
    <div className="flex flex-col items-center justify-center mx-auto my-10 py-6 mainComponent-wrapper">
      {/* Header  */}
      <div className="flex flex-wrap justify-between  mainComponent-header">
        <p className="text-3xl font-bold">Search properties to rent</p>
        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-md border-gray-300 border">
          <BiSearch/>
         <input onKeyUp={fetchSearch} className="outline-none ml-4" type="text"  value={search} onChange={(e) => setSearch(e.target.value)}  placeholder="Enter here" /> 
        </div>
      </div>
      {/* Header-ends  */}

      {/* filter  */}
      <div className="flex my-10 py-6 px-8 justify-between items-center space-x-6 filter-wrapper bg-white shadow-sm rounded-md">
        <Dropdown className="border-emerald-400" filter showClear  value={location} options={locationTypes} onChange={onLocationChange} placeholder='Location'/>
        <Calendar dateFormat="dd/mm/yy" showButtonBar id="icon" value={availableDate} onChange={(e) => setAvailableDate(new Date(e.value).getTime()/1000)} showIcon placeholder='Date of visit' />
        {
          console.log(availableDate)
        }
        <Dropdown showClear  value={price} options={priceOptions} onChange={onPriceChange} placeholder="Price"/>
        <Dropdown showClear value={property} options={propertyTypes} onChange={onPropertyChange} placeholder="Property Type"/>
        <Button buttonText="Search" customClass="searchButton"  onClick={fetchSearch} />
      </div>
      {/* filter-ends  */}


      {/* card-with-details  */}
  <div className="grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1">

  
   {
   results && results.length>0  ? results.map((data, index)=>

    <div  key={index} className="flex flex-col p-6  cardClass ">

    <div className="bg-white shadow-md rounded-md p">
      <img src={data.img} alt="" className=" images h-60 w-80 rounded-t-md" />


    {/* popular-label  */}
   <div className="mb-0 pb-0"> {data.label ? <Label/> : ''}</div>

    

      <div className="flex flex-col justify-between px-4 py-6">
        <div className="flex items-center justify-between ">
          <p className="text-2xl font-bold price">
            ${data.price}
            <span className="month text-xs font-normal ">
              /month
            </span>
           </p>

     <div className="bg-white drop-shadow-md rounded-full p-2">
     <MdFavoriteBorder className="price text-2xl hover:text-violet-300" />   
     </div>
        </div>

        <p className="text-2xl mt-1.5 font-bold">{data.name}</p>

        <p className="text-sm mt-1.5 text-gray-400">{data.address}</p>

        <div className="flex my-3 items-center justify-center">
          <p className="horizontal-line"></p>
        </div>


       
        <div className="flex justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xl icons mr-1"> <MdOutlineSingleBed/> </p>
            <p className="text-xs">{data.bedsNo} beds</p>
          </div>

          <div className="flex items-center">
            <p className="text-xl icons mr-1"> <BiBath/> </p>
            <p className="text-xs">{data.bathroomNo} beds</p>
          </div>

          <div className="flex items-center">
            <p className="text-xl icons mr-1"> <BiArea/> </p>
            <p className="text-xs">{data.area} m<sup>2</sup> </p>
          </div>
        </div>
     


      </div>
    </div>
  </div>
 
     )

     : <NoDataFound/>

   }




   </div>
            
    </div>
  );
};

export default MainComponent;





















