import React, { PureComponent } from 'react';
import { BarChart, Bar,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {ColumnData } from '../../utils/ColumnData.js'



export default function RechartGraph({data}){

let Result = [];
 

function groupByKey(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
 }

 const result2 = groupByKey(data,'report_date')


function totalByDate(arrayObj,key){
let totalAdSales=0;
let totalAdSpend=0;
let totalAdImpression=0;
const res = arrayObj.map(data=>{
    totalAdSales+=data.ad_sales;
    totalAdSpend+=data.ad_spend;
    totalAdImpression+=data.ad_impressions;

})

Result.push({
    report_date:key,
    ad_sales:totalAdSales,
    ad_spend:totalAdSpend,
    ad_impressions:totalAdImpression
})

}

Object.keys(result2).map((key,index)=>{
    
    totalByDate(result2[key],key)
})   

console.log(Result)

    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          width={500}
          height={300}
          data={Result}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="report_date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar barSize={40} dataKey="ad_sales" fill="#8884d8"  />
          <Bar barSize={40} dataKey="ad_spend" fill="#82ca9d" />
          <Line type="monotone" dataKey="ad_units" stroke="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    )
  
}
