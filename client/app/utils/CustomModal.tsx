import React, { FC } from 'react'
import {Modal, Box} from "@mui/material"

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    component: any;
  setRoute?: (route: string) => void;
}

const CustomModal: FC<Props> = ({open,setOpen,setRoute,component:Component}) => {
  return (
    <Modal
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box className="-translate-x-1/2 w-[45px]  bg-white dark:bg-slate-900 rounded-[8px] absolute top-[50%] left-[50%] translate-y-1/2 shadow outline-none p-4">
        <Component setOpen={setOpen} setRoute={setRoute}/>
    </Box>  

    </Modal>
  )
}

export default CustomModal
