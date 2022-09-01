import React, { useContext } from "react";
import styled from "styled-components";
import "./reacttable.css";
import {
  useTable,
  useFilters,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
  useSortBy
} from "react-table";
import { useSticky } from "react-table-sticky";
import axios from 'axios';
import { ArrowDropDown, ArrowDropUp, ChevronLeft, ChevronRight, FilterAlt, FirstPage, LastPage } from "@mui/icons-material";
import { Card, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import {
  Paper,
  Grid,
  Typography,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  TableFooter,
} from "@mui/material";
// import Chip from '@mui/material/Chip';

import { ColumnData } from "../../utils/ColumnData.js";
import RechartGraph from "./Rechart";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import FilterForm from "./FilterForm";
import { SidebarContext } from "components/context/SidebarContext";

// A great library for fuzzy filtering/sorting items

// import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #e1e1e1;
      border-right: 1px solid #e1e1e1;

      :last-child {
        border-right: 0;
      }
    }
    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;

function Table({ columns, data }) {
  // const {arrayData, setArrayData} = React.useContext(FilterContext)

  const instance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,



    // useFilters!
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    rows,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { pageIndex, pageSize },

    
  } = instance;
  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  
  return (
    <div style={{ marginLeft: "250px", marginTop: "100px" }}>
        <Paper
        elevation={2}
        style={{
          padding: "20px 10px",
          marginBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <Row>
          <RechartGraph data ={data}/>
        </Row>
      </Paper>
      <FilterForm />
    
      <Paper className="main-table-container">
        <div style={{ height: "fit-content", width: "78vw",border:'none'  }} className="table-parent">
          <table
            style={{
              border: "none",
              width: "98vw",

              overflow: "auto",
            }}
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr    style={{
                  border: "0.3px solid #cbb7b7s",
                  borderWidth: "0.01em",
                  background: "#66ccff",
                  color: "white",
                  position: " sticky",
                  zIndex: 1,
                  width: "fit-content",
                  top: 0,
                  height: "60px",
                  borderWidth: "thin",
                  textAlign: "center",
                  outline: "none",
                  width: "100%",
                  fontWeight: "400",
                  fontSize: "14px",
                }} className="tr-table" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                  
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                     {column.render("Header")} 
                     
                      
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <ArrowDropDown/>
                        : <ArrowDropUp/>
                      : ''}
                  
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              style={{
                background: "white",
               
                overflow: "scroll",
              }}
              {...getTableBodyProps()}
            >
              {page.map((row, i) => {
                // if(cell.column.id=="year")console.log(cell.value)

                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          style={{
                            border: "0.2px solid #e8e8e8",
                            padding: "10px 0px",
                            margin: 0,
                            maxWidth: "min-content",
                            textAlign: "center",
                            borderWidth: "0.01em",
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            
          </table>
        </div>
        <div className="pagination-main">
       
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
       
        
        <span style={{display:'flex'}}>
        <button className="pagination-btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <FirstPage style={{color:`${!canPreviousPage?"#9d9d95":"black"}`}}/>
        </button>{' '}
        <button  className="pagination-btn"  onClick={() => previousPage()} disabled={!canPreviousPage}>
         <ChevronLeft style={{color:`${!canPreviousPage?"#9d9d95":"black"}`}}/>
        </button>{' '}
        <select
          value={pageSize}
          style={{
            border:"none"
          }}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button  className="pagination-btn"  onClick={() => nextPage()} disabled={!canNextPage}>
          <ChevronRight style={{color:`${!canNextPage?"#9d9d95":"black"}`}}/>
        </button>{' '}
        <button  className="pagination-btn"  onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <LastPage style={{color:`${!canNextPage?"#9d9d95":"black"}`}}/>
        </button>{' '}
        </span>
      </div>
      </Paper>
    </div>
  );
}

function ReactTable() {


  const { apiData, trigger } = React.useContext(SidebarContext);
const [colData, setColData] = React.useState([])
  React.useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      
    
    let reqData = {
      ...apiData,
      account_id:user.accountID
    }

    console.table(reqData);

    axios
    .post(
      "https://adcanyonapinodejs.herokuapp.com/dashboard/getData",
      reqData
    )
    .then((res) => {
      setColData(res.data)
     
    })
    .catch((err) => console.error(err));
  }

  }, [trigger]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Report date",
        accessor: "report_date",
        Cell: ({row})=>{
           const newDate = `${new Date(row.values.report_date).getFullYear()}/${new Date(row.values.report_date).getMonth()}/${new Date(row.values.report_date).getDay()}`
          return(
            <span >{newDate}</span>
          )
        
      },
      },
     
     
      {
        Header: "ASIN",
        accessor: "asin",
      },
      {
        Header: "Ad Impressions",
        accessor: "ad_impressions",
      },
      {
        Header: "Ad Clicks",
        accessor: "ad_clicks",
      },
      {
        Header: "Ad Spend",
        accessor: "ad_spend",
      },
      {
        Header: "Ad Orders",
        accessor: "ad_orders",
      },
      {
        Header: "Ad Units",
        accessor: "ad_units",
      },
      {
        Header: "Ad Sales",
        accessor: "ad_sales",
      },
    ],
    []
  );

 

  return (
    <Styles>
      <Table columns={columns} data={colData} />
    </Styles>
  );
}

export default ReactTable;
