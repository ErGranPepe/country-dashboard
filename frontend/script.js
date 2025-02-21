import { Chart } from "@/components/ui/chart"
let populationChart, gdpChart

function initCharts() {
  const ctx1 = document.getElementById("populationChart").getContext("2d")
  populationChart = new Chart(ctx1, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Population",
          data: [],
          borderColor: "#00ff00",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  })

  const ctx2 = document.getElementById("gdpChart").getContext("2d")
  gdpChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "GDP (Billion USD)",
          data: [],
          backgroundColor: "#00ff00",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

function updateCharts(data) {
  populationChart.data.labels = data.years
  populationChart.data.datasets[0].data = data.population
  populationChart.update()

  gdpChart.data.labels = data.years
  gdpChart.data.datasets[0].data = data.gdp
  gdpChart.update()
}

async function fetchData(country) {
  try {
    const response = await fetch(`/api/data/${country}`)
    const data = await response.json()
    updateCharts(data)
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCharts()
  const countrySelect = document.getElementById("countrySelect")
  countrySelect.addEventListener("change", (e) => {
    fetchData(e.target.value)
  })
  fetchData(countrySelect.value)
})

