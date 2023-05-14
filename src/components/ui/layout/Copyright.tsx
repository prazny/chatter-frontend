import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from "react";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 10}}>
            {'Copyright '}
            <Link color="inherit" href={window.location.origin}>
                Chatter
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright;