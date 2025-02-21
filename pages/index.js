"use client"

import { useState } from "react"
import Dashboard from "../components/Dashboard"

export default function Home() {
  const [country, setCountry] = useState("USA")

  return (
    <div className="container">
      <h1>Country Dashboard v1</h1>
      <select value={country} onChange={(e) => setCountry(e.target.value)} className="country-select">
        <option value="USA">United States</option>
        <option value="GBR">United Kingdom</option>
        <option value="DEU">Germany</option>
        <option value="JPN">Japan</option>
      </select>
      <Dashboard country={country} />
    </div>
  )
}

