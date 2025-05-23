
// Configure your API base URL - update this with your actual backend URL
const API_BASE_URL = "https://c1b5-103-170-228-58.ngrok-free.app";

// Function to fetch active cashback settings
export async function fetchCashbackOffer() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cashback/settings/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', 
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response body:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API response data:', data);
    

    if (Array.isArray(data)) {
      return data.find(offer => offer.is_active) || null;
    }

    if (data.results && Array.isArray(data.results)) {
      return data.results.find(offer => offer.is_active) || null;
    }

    return data.is_active ? data : null;
  } catch (error) {
    console.error('Error fetching cashback offer:', error);
    throw error;
  }
}

export async function createCashbackTransaction(transactionData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cashback/transactions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', 
      },
      body: JSON.stringify(transactionData)
    });
    
    console.log('Transaction response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Transaction error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating cashback transaction:', error);
    throw error;
  }
}