import Box from "@mui/material/Box";

function RoundedBox(props) {
    return (
        <Box sx={{
            backgroundColor: (t) => t.palette.grey[100],
            borderRadius: 2,
            m: 2,
            p: 2,
        }}>
            {props.children}
        </Box>
    )
}

export default RoundedBox;