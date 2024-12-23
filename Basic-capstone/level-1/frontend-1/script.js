let records = [];
let filteredRecords = [];

// Fetch and parse the CSV file
fetch("record.csv")
  .then((response) => response.text())
  .then((data) => {
    records = parseCSV(data);
    filteredRecords = records;
    populateFilters();
    renderCards();
  });

// Parse CSV to JSON-like structure
function parseCSV(data) {
  const rows = data.split("\n").map((row) => row.split(","));
  const headers = rows.shift();
  return rows.map((row) => {
    const record = {};
    row.forEach((value, index) => {
      record[headers[index].trim()] = value.trim();
    });
    return record;
  });
}

// Populate filter options dynamically
function populateFilters() {
  const regionFilter = document.getElementById("filter-region");
  const yearFilter = document.getElementById("filter-year");
  const countryFilter = document.getElementById("filter-country");
  const priorityFilter = document.getElementById("filter-priority");
  const channelFilter = document.getElementById("filter-channel");

  const regions = [...new Set(records.map((r) => r.Region))];
  const years = [...new Set(records.map((r) => r["Order year"]))];
  const countries = [...new Set(records.map((r) => r.Country))];
  const priorities = [...new Set(records.map((r) => r["Order Priority"]))];
  const channels = [...new Set(records.map((r) => r["Sales Channel"]))];

  regions.forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
  });

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countryFilter.appendChild(option);
  });

  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority;
    priorityFilter.appendChild(option);
  });

  channels.forEach((channel) => {
    const option = document.createElement("option");
    option.value = channel;
    option.textContent = channel;
    channelFilter.appendChild(option);
  });
}

// Render cards for filtered records
function renderCards() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  filteredRecords.forEach((record) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${record["Item Type"]}</h3>
      <p>Region: ${record.Region}</p>
      <p>Country: ${record.Country}</p>
      <p>Order Priority: ${record["Order Priority"]}</p>
      <p>Sales Channel: ${record["Sales Channel"]}</p>
      <p>Total Profit: ${record["Total Profit"]}</p>
    `;
    container.appendChild(card);
  });
}

// Apply filters to records
function applyFilters() {
  const searchQuery = document.getElementById("search-box").value.toLowerCase();
  const regionFilter = document.getElementById("filter-region").value;
  const yearFilter = document.getElementById("filter-year").value;
  const countryFilter = document.getElementById("filter-country").value;
  const priorityFilter = document.getElementById("filter-priority").value;
  const channelFilter = document.getElementById("filter-channel").value;

  filteredRecords = records.filter((record) => {
    return (
      (regionFilter === "" || record.Region === regionFilter) &&
      (yearFilter === "" || record["Order year"] === yearFilter) &&
      (countryFilter === "" || record.Country === countryFilter) &&
      (priorityFilter === "" || record["Order Priority"] === priorityFilter) &&
      (channelFilter === "" || record["Sales Channel"] === channelFilter) &&
      Object.values(record).some((value) =>
        value.toLowerCase().includes(searchQuery)
      )
    );
  });
  renderCards();
}

// Export filtered records as a CSV file
document.getElementById("export-btn").addEventListener("click", () => {
  const csvContent = [
    Object.keys(records[0]).join(","),
    ...filteredRecords.map((r) => Object.values(r).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "filtered_records.csv";
  link.click();
});

// Add event listeners for filters
document.getElementById("search-box").addEventListener("input", applyFilters);
document.getElementById("filter-region").addEventListener("change", applyFilters);
document.getElementById("filter-year").addEventListener("change", applyFilters);
document.getElementById("filter-country").addEventListener("change", applyFilters);
document.getElementById("filter-priority").addEventListener("change", applyFilters);
document.getElementById("filter-channel").addEventListener("change", applyFilters);
