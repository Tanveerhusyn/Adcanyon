import React from "react";

 
 
 
import "./datepicker.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";

import { Button} from 'react-bootstrap';
function DatePickerModel() {
  
  const [value, setValue] = React.useState([
    new DateObject(),
    new DateObject()
  ]);
 

 

// React.useEffect(()=>{
 
//   if(value.length==2)
//   {const newDate = `${value[0].format()},${value[1].format()}`
 
//   if(newDate!=null){
//   dateFilter?.setFilter("startdate",newDate)

//   }}
//   else{
   
//     dateFilter.setFilter("startdate",undefined)
//   }

// },[value])

  return (
    <>
      
      <DatePicker
      style={{
        border:'none',
        background:"red",
        background:"red",
        background:"#5e72e4",
        height:'42px',
        boxShadow: '0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)',
        color:'white'
         
      }}
        value={value}
        onChange={setValue}
        on
        range
        calendarPosition="top-end"
        numberOfMonths={2}
        plugins={[<Footer position="bottom" />]}
      />
    </>
  );
}

export default DatePickerModel;
