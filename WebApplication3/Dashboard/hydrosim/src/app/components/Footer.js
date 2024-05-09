"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Link from '@mui/material/Link';
function Footer() {
return (
    <Paper square={true} elevation={2} sx={{ color: 'secondary.main', alignItems: 'center', height: '8rem', backgroundColor: 'primary.veryDark', justifyContent:'space-around', display:'flex', } }>
        <p>&copy; 2024 SWMShare.</p>
        <Link color='secondary' href="About">About</Link>
    </Paper>
)}

export { Footer as default };
