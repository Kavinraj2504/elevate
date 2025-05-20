
    // Global chart variables
    let leadChart, scoreChart, campaignChart, averageScoreChart;
    let allData = []; // Store all data from API

    // Fetch data from API
    async function fetchData() {
    try {
    const response = await fetch('https://elevate-1-ieue.onrender.com/api/leads');
    if (!response.ok) {
    throw new Error('Network response was not ok');
}
    allData = await response.json();

    // Populate campaign dropdown
    populateCampaigns();

    // Set default date range to cover all data
    setDefaultDateRange();

    // Initial chart rendering
    applyFilters();
} catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to load data. Please try again later.');
}
}

    // Populate campaign dropdown
    function populateCampaigns() {
    const campaignSelect = document.getElementById('campaignSelect');
    const campaigns = [...new Set(allData.map(item => item.campaign))];

    // Clear existing options except the first one
    while (campaignSelect.options.length > 1) {
    campaignSelect.remove(1);
}

    // Add campaigns to dropdown
    campaigns.forEach(campaign => {
    const option = document.createElement('option');
    option.value = campaign;
    option.textContent = campaign;
    campaignSelect.appendChild(option);
});
}

    // Set default date range to cover all data
    function setDefaultDateRange() {
    if (allData.length === 0) return;

    const dates = allData.map(item => new Date(item.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    document.getElementById('startDate').valueAsDate = minDate;
    document.getElementById('endDate').valueAsDate = maxDate;
}

    // Apply filters and update charts
    function applyFilters() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const campaign = document.getElementById('campaignSelect').value;
    const minScore = document.getElementById('minScore').value;

    // Filter data based on selected filters
    let filteredData = allData.filter(item => {
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : new Date(-8640000000000000);
    const end = endDate ? new Date(endDate) : new Date(8640000000000000);

    return (
    itemDate >= start &&
    itemDate <= end &&
    (campaign === '' || item.campaign === campaign) &&
    (!minScore || item.score >= parseInt(minScore))
    );
});

    // Update charts with filtered data
    updateCharts(filteredData);
}

    // Update all charts with data
    function updateCharts(data) {
    if (data.length === 0) {
    alert('No data matches your filters. Please adjust your criteria.');
    return;
}

    // Sort data by date
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels = data.map(d => new Date(d.date).toLocaleDateString());
    const scores = data.map(d => d.score);
    const conversions = data.filter(d => d.conversion).length;

    // Calculate stats for display
    const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    const maxScore = Math.max(...scores);
    const conversionRate = ((conversions / data.length) * 100).toFixed(1);

    document.getElementById('avgScore').textContent = avgScore;
    document.getElementById('maxScore').textContent = maxScore;
    document.getElementById('conversionRate').textContent = `${conversionRate}%`;

    // Destroy existing charts if they exist
    if (leadChart) leadChart.destroy();
    if (scoreChart) scoreChart.destroy();
    if (campaignChart) campaignChart.destroy();
    if (averageScoreChart) averageScoreChart.destroy();

    // Lead Scores Over Time chart
    leadChart = new Chart(document.getElementById('leadChart'), {
    type: 'line',
    data: {
    labels,
    datasets: [{
    label: 'Lead Score',
    data: scores,
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
    tension: 0.1,
    pointRadius: 4,
    pointBackgroundColor: 'rgba(75, 192, 192, 1)'
}]
},
    options: {
    responsive: true,
    plugins: {
    legend: {
    position: 'top',
},
    tooltip: {
    mode: 'index',
    intersect: false,
}
},
    scales: {
    y: {
    beginAtZero: false,
    min: Math.max(0, Math.min(...scores) - 10),
    max: Math.min(100, Math.max(...scores) + 10)
}
}
}
});

    // Conversion Ratio chart
    scoreChart = new Chart(document.getElementById('scoreChart'), {
    type: 'doughnut',
    data: {
    labels: ['Converted', 'Not Converted'],
    datasets: [{
    data: [conversions, data.length - conversions],
    backgroundColor: ['#4CAF50', '#F44336'],
    borderWidth: 1
}]
},
    options: {
    responsive: true,
    plugins: {
    legend: {
    position: 'bottom',
},
    tooltip: {
    callbacks: {
    label: function(context) {
    const label = context.label || '';
    const value = context.raw || 0;
    const percentage = Math.round((value / data.length) * 100);
    return `${label}: ${value} (${percentage}%)`;
}
}
}
}
}
});

    // Group data by campaign
    const campaignData = {};
    data.forEach(entry => {
    if (!campaignData[entry.campaign]) {
    campaignData[entry.campaign] = {
    count: 0,
    totalScore: 0,
    conversions: 0
};
}
    campaignData[entry.campaign].count++;
    campaignData[entry.campaign].totalScore += entry.score;
    campaignData[entry.campaign].conversions += entry.conversion ? 1 : 0;
});

    const campaignLabels = Object.keys(campaignData);
    const campaignCounts = campaignLabels.map(c => campaignData[c].count);
    const campaignAverages = campaignLabels.map(c =>
    (campaignData[c].totalScore / campaignData[c].count).toFixed(1)
    );

    // Find top campaign
    let topCampaign = '-';
    if (campaignLabels.length > 0) {
    const top = campaignLabels.reduce((a, b) =>
    campaignData[a].count > campaignData[b].count ? a : b
    );
    topCampaign = `${top} (${campaignData[top].count})`;
}
    document.getElementById('topCampaign').textContent = topCampaign;

    // Leads by Campaign chart
    campaignChart = new Chart(document.getElementById('campaignChart'), {
    type: 'bar',
    data: {
    labels: campaignLabels,
    datasets: [{
    label: 'Number of Leads',
    data: campaignCounts,
    backgroundColor: 'rgba(54, 162, 235, 0.7)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
}, {
    label: 'Average Score',
    data: campaignAverages,
    backgroundColor: 'rgba(255, 159, 64, 0.7)',
    borderColor: 'rgba(255, 159, 64, 1)',
    borderWidth: 1,
    type: 'line',
    yAxisID: 'y1'
}]
},
    options: {
    responsive: true,
    plugins: {
    legend: {
    position: 'top',
}
},
    scales: {
    y: {
    beginAtZero: true,
    title: {
    display: true,
    text: 'Number of Leads'
}
},
    y1: {
    position: 'right',
    beginAtZero: true,
    max: 100,
    title: {
    display: true,
    text: 'Average Score'
},
    grid: {
    drawOnChartArea: false
}
}
}
}
});


    const dailyData = {};
    data.forEach(entry => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!dailyData[date]) {
    dailyData[date] = {
    total: 0,
    count: 0
};
}
    dailyData[date].total += entry.score;
    dailyData[date].count++;
});

    const dateLabels = Object.keys(dailyData);
    const dateAverages = dateLabels.map(d =>
    (dailyData[d].total / dailyData[d].count).toFixed(1)
    );


    let trend = '-';
    if (dateAverages.length >= 2) {
    const first = parseFloat(dateAverages[0]);
    const last = parseFloat(dateAverages[dateAverages.length - 1]);
    const diff = ((last - first) / first * 100).toFixed(1);
    trend = `${diff}% ${diff >= 0 ? '↑' : '↓'}`;
}
    document.getElementById('scoreTrend').textContent = trend;

    // Average Score by Day chart
    averageScoreChart = new Chart(document.getElementById('averageScoreChart'), {
    type: 'line',
    data: {
    labels: dateLabels,
    datasets: [{
    label: 'Average Daily Score',
    data: dateAverages,
    backgroundColor: 'rgba(153, 102, 255, 0.2)',
    borderColor: 'rgba(153, 102, 255, 1)',
    borderWidth: 2,
    tension: 0.1,
    fill: true
}]
},
    options: {
    responsive: true,
    plugins: {
    legend: {
    position: 'top',
}
},
    scales: {
    y: {
    beginAtZero: false,
    min: Math.max(0, Math.min(...dateAverages) - 10),
    max: Math.min(100, Math.max(...dateAverages) + 10)
}
}
}
});
}


    document.addEventListener('DOMContentLoaded', fetchData);
