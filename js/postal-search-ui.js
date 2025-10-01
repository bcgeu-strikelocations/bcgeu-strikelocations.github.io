import { searchPostalCode, clearPostalCodeMarkers } from './postal-search.js';

/**
 * Sets up the postal code search UI functionality
 */
export function setupPostalCodeSearch() {
    const postalCodeInput = document.getElementById('postal-code-input');
    const searchBtn = document.getElementById('search-postal-btn');
    const clearInputBtn = document.getElementById('clear-input-btn');
    const errorDiv = document.getElementById('postal-error');
    
    // Handle Enter key in input field
    postalCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handlePostalCodeSearch();
        }
    });
    
    // Handle search button click
    searchBtn.addEventListener('click', handlePostalCodeSearch);
    
    // Handle clear input button click
    clearInputBtn.addEventListener('click', () => {
        postalCodeInput.value = '';
        clearInputBtn.style.display = 'none';
        errorDiv.style.display = 'none';
        postalCodeInput.focus();
    });
    
    // Auto-format postal code input and show/hide clear button
    postalCodeInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').toUpperCase();
        if (value.length > 3) {
            value = value.substring(0, 3) + ' ' + value.substring(3, 6);
        }
        e.target.value = value;
        
        // Show/hide clear button based on input content
        if (value.trim()) {
            clearInputBtn.style.display = 'block';
        } else {
            clearInputBtn.style.display = 'none';
        }
    });
}

/**
 * Handles postal code search functionality
 */
async function handlePostalCodeSearch() {
    const postalCodeInput = document.getElementById('postal-code-input');
    const searchBtn = document.getElementById('search-postal-btn');
    const errorDiv = document.getElementById('postal-error');
    const postalCode = postalCodeInput.value.trim();
    
    // Clear any previous error
    errorDiv.style.display = 'none';
    
    if (!postalCode) {
        showError('Please enter a postal code');
        return;
    }
    
    // Clear previous postal code markers
    clearPostalCodeMarkers();
    
    // Disable search button and show loading state
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';
    
    try {
        const result = await searchPostalCode(postalCode);
        
        if (result.success) {
            // Search successful - marker already added by searchPostalCode function
        } else {
            showError(result.error);
        }
    } catch (error) {
        showError(`Error searching postal code: ${error.message}`);
    } finally {
        // Re-enable search button
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
    }
}

/**
 * Shows error message under the input field
 */
function showError(message) {
    const errorDiv = document.getElementById('postal-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}
