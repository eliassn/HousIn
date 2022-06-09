import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import myAppDataSource from './db-config/db'
import { router } from './routes/Auth'
import { getters } from './routes/Getters'
import { filters } from './routes/Filters'
import pubRouter from './routes/pubs'


function main(){
    dotenv.config()
    myAppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
    const app = express()
    const port = process.env.PORT || 9000
    app.listen(port)
app.use(cors())
app.use(express.json({
    limit:'50mb'
}))
app.use(express.urlencoded(
    {
        limit: '50mb',
  parameterLimit: 100000,
  extended: true 
    }
))

app.use(router)
app.use(getters)

app.use(pubRouter)



}





main()