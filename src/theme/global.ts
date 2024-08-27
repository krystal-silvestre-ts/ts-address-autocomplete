import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean; }>`
  /* AutocompleteStyles.css */
  .pac-container {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    font-family: Arial, sans-serif;
    z-index: 1000; /* Ensure it appears above other elements */
  }

  .pac-item {
    padding: 10px;
    cursor: pointer;
  }

  .pac-item:hover {
    background-color: #f0f0f0;
  }

  .pac-item-selected {
    background-color: #e0e0e0;
  }

  .pac-matched {
    font-weight: bold;
    color: #3f51b5;
  }
`;