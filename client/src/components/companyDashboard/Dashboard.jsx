import React, { useState } from 'react'
import './dashboard.scss'
import DashboardSidebar from './sidebar/DashboardSidebar.jsx'
import {subDays,parseISO, format} from 'date-fns'
import {ResponsiveContainer,Area,YAxis,AreaChart,Bar,CartesianGrid,Tooltip,XAxis,BarChart} from 'recharts'
import Calendar from 'react-calendar';

const data = []
for(let num=30;num>=0;num--){
    data.push({
        date:subDays(new Date(),num).toString().substring(0,10),
        value: Math.random() + 1
    })
}
console.log(data)

const Dashboard = () => {
    const [value, onChange] = useState(new Date())
   

  return (
    <div className='dashboard'>
        
        <div className="sidebar"><DashboardSidebar /></div>
        <div className="container">
            <div className="upper">
                
                <div className="upperLeft">
                    <ResponsiveContainer width='100%' height={300}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id='color' x1="0" y="0" x2="0" y2="1" >
                                <stop offset="0%" stopColor='#2451B7' stopOpacity={0.4} />
                                <stop offset="75%" stopColor='#2451B7' stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <Area dataKey="value" stroke='#2451B7' fill='url(#color)'/>
                        <XAxis dataKey="date" axisLine={false} tickLine={false}
                        tickFormatter={(str)=> 
                            str.substring(0,3) + ',' + str.substr(-2)
                           
                           
                        }
                        />
                        <YAxis dataKey="value" axisLine={false} tickLine={false}
                        tickCount={8}
                        tickFormatter={(number)=> `$${number.toFixed(2)}`}
                        />
                        <Tooltip/>
                        <CartesianGrid opacity={0.1} vertical={false}/>
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
               
                <div className="upperRight">
                <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={data}>
                        <defs>
                            <linearGradient id='color' x1="0" y="0" x2="0" y2="1" >
                                <stop offset="0%" stopColor='#2451B7' stopOpacity={0.4} />
                                <stop offset="75%" stopColor='#2451B7' stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <Bar dataKey="value" stroke='#2451B7' fill='url(#color)'/>
                        <XAxis dataKey="date" axisLine={false} tickLine={false}
                        tickFormatter={(str)=> 
                            str.substring(0,3) + ',' + str.substr(-2)
                           
                           
                        }
                        />
                        <YAxis dataKey="value" axisLine={false} tickLine={false}
                        tickCount={8}
                        tickFormatter={(number)=> `$${number.toFixed(2)}`}
                        />
                        <Tooltip/>
                        <CartesianGrid opacity={0.1} vertical={false}/>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <br></br>
            <div className="down">
                
                <div className="downLeft">
                <h4>Gains Annuel</h4>
                   <h5>$160354.02</h5>
                </div>
                
                <div className="downRight">
                   <h4>Gains mensuel</h4>
                   <h5>$16354.02</h5>
                       
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard