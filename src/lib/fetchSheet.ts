import Papa from "papaparse";
import { SHEET_CSV_URL } from "../config/constants";

const CACHE_KEY = "masters-dash-csv-cache";

export async function fetchSheetCSV(): Promise<string[][]> {
  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const text = await response.text();

    // Cache successful response
    try {
      localStorage.setItem(CACHE_KEY, text);
    } catch {
      // localStorage might be full or unavailable
    }

    const result = Papa.parse<string[]>(text, {
      header: false,
      skipEmptyLines: false,
    });
    return result.data;
  } catch (error) {
    // Try to use cached data as fallback
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const result = Papa.parse<string[]>(cached, {
        header: false,
        skipEmptyLines: false,
      });
      return result.data;
    }
    throw error;
  }
}
