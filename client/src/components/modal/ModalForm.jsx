import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Modal } from '@mui/material'
import './modalForm.scss'
import { Close } from '@mui/icons-material'

const ModalForm = (props)=>{
const {title,children,openPopup,setOpenPopup} = props

    return(
  <Dialog open={openPopup}>
      <DialogTitle>
          Publier
      </DialogTitle>
      <DialogContent>
          {children}
      </DialogContent>
  </Dialog>
    )

} 
export default ModalForm