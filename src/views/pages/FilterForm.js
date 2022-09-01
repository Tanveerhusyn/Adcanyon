
import React from 'react'
import { Paper,Grid,Typography,Divider,InputLabel,Select,MenuItem, TextField, IconButton } from "@mui/material";
import {Clear, Delete, DeleteOutline, FilterAlt, HighlightOff} from '@mui/icons-material';
import {InputGroup,Form,DropdownButton,Dropdown,Button} from 'react-bootstrap';
 
import { SidebarContext } from 'components/context/SidebarContext';
import DatePickerModel from '../datepicker/DatePickerModel'
function FilterForm() {
    const [value, setValue] = React.useState(100);
	const [adSalesMin,setAdSalesMin] = React.useState(0)
	const [adSalesMax,setAdSalesMax] = React.useState(0)
	const [adImpressionsMin,setAdImpressionsMin] = React.useState(0)
	const [adImpressionsMax,setAdImpressionsMax] = React.useState(0)
	const [adOrderMin,setAdOrdersMin] = React.useState(0)
	const [adOrderMax,setAdOrdersMax] = React.useState(0)
	const [adSpendMin,setAdSpendMin] = React.useState(0)
	const [adSpendMax,setAdSpendMax] = React.useState(0)
	const [adUnitsMin,setAdUnitsMin] = React.useState(0)
	const [adUnitsMax,setAdUnitsMax] = React.useState(0)
	const [adClicksMin,setAdClicksMin] = React.useState(0)
	const [adClicksMax,setAdClicksMax] = React.useState(0)
	const [title,setTitle] = React.useState(0)
	const [asin,setAsin] = React.useState(0)

	const [filterDrop,setFilterDrop] = React.useState([]);
	const [selectFilter, setSelectFilter] = React.useState([{title:"Ad Impressions",name:"ad_impressions"},{title:"Ad Sales",name:"ad_sales"},{title:"Ad Units",name:"ad_units"},{title:"Ad Spend",name:"ad_spend"},{title:"Ad Clicks",name:"ad_clicks"}])
  
	const {setApiData,apiData,setTrigger,trigger} = React.useContext(SidebarContext)
	const [formData, setFormData] = React.useState({
	  });
	
	   
	  const handleChange = async (event) => {
		event.preventDefault();
		// setTitle(event.target.value);
		console.log(event.target.name,event.target.value)

		await setFormData({...formData,[event.target.name]:event.target.value})
	  };
	
	  const handleFilterSubmit = (event) =>{
		setApiData({...formData})
		console.log(apiData)
		 setTrigger(trigger==true?false:true)
	  }
	 
  return (
	<Paper elevation={2}  >
	<Grid style={{width:"90vw"}} container spacing={1}>
	{
		filterDrop.map((data)=>(
			<Grid style={{marginLeft:'30px'}} item xs={12} md={3}>
			<Typography variant="subtitle1" style={{fontSize:"0.8rem"}} gutterBottom={true}>{data?.title}</Typography>
		<div style={{display:'flex'}}>
		<InputGroup className="mb-3 mr-2">
		   <Form.Control name={`${data.name}_min`} onChange={handleChange} placeholder='Min $' style={{width:'20px',height:'40px'}}  aria-label="Amount (to the nearest dollar)" />
		
		 </InputGroup>
		 <InputGroup className="mb-3">
		   <Form.Control name={`${data.name}_max`} onChange={handleChange} placeholder='Max $' style={{width:'20px',height:'40px'}}  aria-label="Amount (to the nearest dollar)" />
		
		 </InputGroup>
	<IconButton onClick={()=>{
		setSelectFilter([...selectFilter,{title:data.title,name:data.name}])
		const dropRefersh = filterDrop.filter((dat)=>dat.title!=data.title)
	    delete formData[`${data.name}_min`]
	    delete formData[`${data.name}_max`]
		

		setFilterDrop([...dropRefersh])
		console.log(formData)
		setTrigger(trigger==true?false:true)
	}} style={{marginBottom:"18px"}}>
		<Clear style={{color:"red"}}/>
	</IconButton>
   
	  </div>
		</Grid>
		))
	  }
 </Grid>
 <Grid style={{display:'flex',alignItems:'center',paddingTop:'20px'}}>
 <Grid item xs={12} md={6}>
	 <div style={{display:'flex',width:"670px",marginLeft:"20px",alignItems:'center'}}>
	 <DropdownButton disabled={selectFilter.length==0}  style={{height:'60px',marginLeft:'20px',color:'red',marginRight:'30px'}} id="dropdown-basic-button" title="Select Filter">
      {
		selectFilter.map((filter)=>(
			<Dropdown.Item name={filter.name} onClick={(e)=>{setFilterDrop([...filterDrop,{title:filter.title,name:filter.name}])
			const selectRefresh =  selectFilter.filter((data)=>data.title!=filter.title)
			setSelectFilter([...selectRefresh])
		}}>{filter.title}</Dropdown.Item>
			
		))
	  }
    </DropdownButton>

	 <InputGroup   className="mb-3 mr-2">
        <Form.Control name="title" onChange={handleChange} placeholder='Search Title' style={{width:'10px',height:'40px'}}  aria-label="Amount (to the nearest dollar)" />
     
      </InputGroup>
	  <InputGroup className="mb-3">
        <Form.Control name="asin" onChange={handleChange} placeholder='Search ASIN' style={{width:'20px',height:'40px'}}  aria-label="Amount (to the nearest dollar)" />
     
      </InputGroup>


   </div>
	 </Grid>
	 <Grid style={{display:'flex'}} >

	<Button onClick={handleFilterSubmit} style={{marginLeft:"20px",marginBottom:'20px',}}>Apply Filter</Button>
	<DatePickerModel style={{marginBottom:'26px'}}/>
	</Grid>
 </Grid>
	</Paper>
  )
}

export default FilterForm