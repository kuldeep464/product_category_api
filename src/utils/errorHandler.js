/**
 * Format error messages from API responses
 * @param {Error} error - The error object
 * @returns {string} Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { data, status } = error.response;

    if (data && data.message) {
      return `Error ${status}: ${data.message}`;
    }

    return `Error ${status}: ${data || "Unknown error"}`;
  } else if (error.request) {
    // The request was made but no response was received
    return "No response from server. Please check your internet connection.";
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || "An unknown error occurred";
  }
};

/**
 * Log errors to console in development environment
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 */
export const logError = (error, context = "") => {
  if (import.meta.env.DEV) {
    console.error(`Error in ${context}:`, error);
  }
};
