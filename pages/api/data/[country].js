export default async function handler(req, res) {
  const { country } = req.query

  try {
    const populationData = await fetch(
      `https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json&per_page=20`,
    ).then((res) => res.json())
    const gdpData = await fetch(
      `https://api.worldbank.org/v2/country/${country}/indicator/NY.GDP.MKTP.CD?format=json&per_page=20`,
    ).then((res) => res.json())

    const years = populationData[1].map((item) => item.date).reverse()
    const population = populationData[1].map((item) => item.value).reverse()
    const gdp = gdpData[1].map((item) => item.value / 1e9).reverse() // Convert to billions

    res.status(200).json({ years, population, gdp })
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({ error: "Error fetching data" })
  }
}

