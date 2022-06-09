import React from 'react'
import { Grid } from '@mui/material'

 
const ImageCarrousel = (sources) => {
 
  
   
  
  return (
    <div className='ImgDiv'>
        <Grid justifyContent='space-between' alignItems='stretch' direction="row" boxSizing={100} className='FbGridImg' container spacing={0.5}>
           <Grid item  md={8} xs={12} sm={6} lg={12}>
            <img src="https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
           </Grid>
           <Grid item   xs={12} sm={6} lg={12}>
            <img src="https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
           </Grid>
           <Grid item   xs={12} sm={6} lg={12}>
            <img src="https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
           </Grid>
        </Grid>
    </div>
  )
}

export default ImageCarrousel