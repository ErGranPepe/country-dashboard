"use client"

import { useState, useEffect } from "react"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function Dashboard({ country }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`/api/data/${country}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [country])

  if (!data) return <div>Loading...</div>

  const populationData = {
    labels: data.years,
    datasets: [
      {
        label: "Population",
        data: data.population,
        borderColor: "#00ff00",
        tension: 0.1,
      },
    ],
  }

  const gdpData = {
    labels: data.years,
    datasets: [
      {
        label: "GDP (Billion USD)",
        data: data.gdp,
        backgroundColor: "#00ff00",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Country Data",
      },
    },
  }

  return (
    <div className="dashboard">
      <div className="chart-container">
        <Line data={populationData} options={options} />
      </div>
      <div className="chart-container">
        <Bar data={gdpData} options={options} />
      </div>
    </div>
  )
}

