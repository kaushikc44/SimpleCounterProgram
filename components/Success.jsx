import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';


export default function Success(){
    const [open,setOpen] = useState(true)
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                        Transactions is Successful
                    </Alert>
                </Collapse>
            </Box>
        </>
    )
}