// Base path evaluation to work on local hosting and live GitHub domains seamlessly
const baseUrl = window.location.origin + window.location.pathname.replace('main.html', '');

document.getElementById('btn-fetch-panchang').addEventListener('click', async () => {
    const targetDate = document.getElementById('panchang-date').value;
    const outputElement = document.getElementById('api-output');
    const resultCard = document.getElementById('panchang-card');

    if (!targetDate) {
        alert("Please pick a valid date first!");
        return;
    }

    outputElement.textContent = `Connecting to API endpoint and downloading database records...`;
    
    try {
        // Step 1: Connect to your GitHub deployed JSON data endpoint
        const response = await fetch(`${baseUrl}api/v1/panchang.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load data. Server status code: ${response.status}`);
        }
        
        const masterPanchangList = await response.json();
        
        // Step 2: Query and filter the dataset for the selected calendar row
        const dayRecord = masterPanchangList.find(item => item.date === targetDate);
        
        if (dayRecord) {
            // Print exact matching JSON string to the debug panel
            outputElement.textContent = JSON.stringify(dayRecord, null, 2);
            
            // Step 3: Populate each targeted interface parameter accurately
            document.getElementById('display-date').textContent = dayRecord.date;
            document.getElementById('val-maas').textContent = dayRecord.maas || 'N/A';
            document.getElementById('val-tithi').textContent = dayRecord.tithi || 'N/A';
            document.getElementById('val-vaar').textContent = dayRecord.vaar || 'N/A';
            document.getElementById('val-sunrise').textContent = dayRecord.sunrise || 'N/A';
            document.getElementById('val-sunset').textContent = dayRecord.sunset || 'N/A';
            document.getElementById('val-nakshatra').textContent = dayRecord.nakshatra || 'N/A';
            document.getElementById('val-yog').textContent = dayRecord.yog || 'N/A';
            document.getElementById('val-karan').textContent = dayRecord.karan || 'N/A';
            document.getElementById('val-chandra').textContent = dayRecord.chandra_rashi || 'N/A';
            document.getElementById('val-surya').textContent = dayRecord.surya_rashi || 'N/A';
            document.getElementById('val-guru').textContent = dayRecord.guru_rashi || 'N/A';
            
            // Reveal the formatted table container visual panel
            resultCard.style.display = 'block';
        } else {
            resultCard.style.display = 'none';
            outputElement.textContent = `No Panchang data calculations found matching the date: ${targetDate}.\nEnsure your json file contains records for this day.`;
        }
        
    } catch (error) {
        resultCard.style.display = 'none';
        outputElement.textContent = `API Error Occurred:\n${error.message}`;
    }
});