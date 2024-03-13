'use client'

import Chart from "chart.js/auto";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar.js";
import SchematicView from "./components/SchematicView.js"
import { useState } from "react";
import Register from "./components/Register"


export default function Home() {
    const [loggedIn, setLogggedIn] = useState(false);
  const schematicView = true;

  const schematicViewMarkup = (<SchematicView></SchematicView>)

  const regularMarkup = (<>
      <div className="display">
          <Register>
          </Register>
    </div>
    </>
    )

  
  
  return (
    <main className={styles.main}>
        {loggedIn ? schematicViewMarkup : regularMarkup}
    </main>

    
  );
}