'use client'

import Chart from "chart.js/auto";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar.js";
import SchematicView from "./components/SchematicView.js"
import { useState, useEffect } from "react";
import Register from "./components/Register"
import Login from "./components/Login";
import { LineWave } from "react-loader-spinner";

export default function Home() {
    const [hasToken, setHasToken] = useState(false);
    const [userObject, setUserObject] = useState(null);
    const [authResponse, setAuthResponse] = useState(null);
    const [hydrographs, setHydrographs] = useState(null);

    const handleHasToken = async () => {
        let token = localStorage.getItem('access_token');

        if (token) {
            setHasToken(true)
        }
        

        if (token !== null) {
            let identity = await fetch('/api/Account/UserInfo', { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
            let Authresponse = await identity.json();
            setAuthResponse(Authresponse);
            let userHydrographs = await fetch(`/api/hydrographs?userId=${encodeURIComponent(Authresponse.Id)}`, { method: 'GET' });
            let userHydrographsObj = await userHydrographs.json();
            setHydrographs(userHydrographsObj);
        }

    }

    // The empty array argument makes it only check on mount, not rerender
    useEffect(() => {
        handleHasToken();
    }, [])

  return (
      <main className={styles.main}>
          {hasToken ?
              authResponse ?
                  hydrographs ?
                      <SchematicView Id={authResponse.Id} Hydrographs={hydrographs}></SchematicView> : <LineWave wrapperStyle={{ margin: 'auto', left: '35%', top: '35%'}} height='400' width='400'></LineWave> : <SchematicView></SchematicView>
              : <Login></Login>}
    </main>

    
  );
}