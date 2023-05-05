import { Handler } from '@netlify/functions';
import axios from 'axios';

type CompaniesResponse = {
  datasets: {
    dataset_code: string;
    name: string;
    id: number;
    database_code: string;
    description: string;
    refreshed_at: string;
    newest_available_date: string;
    oldest_available_date: string;
    column_names: string[];
    frequency: string;
    type: string;
    premium: boolean;
    database_id: number;
  }[];
};

const url = 'https://data.nasdaq.com/api/v3/datasets.json';
const maxAvailablePages = 20;
const pages = Array.from({ length: maxAvailablePages }, (_, i) => i + 1);

const getPaginatedCompanies = async (page: number) => {
  const response = await axios<never, { data: CompaniesResponse }>({
    url,
    params: {
      page,
      api_key: process.env.API_KEY,
      database_code: 'WIKI'
    }
  });

  return response.data.datasets;
};

const handler: Handler = async () => {
  const responses = await Promise.allSettled(
    pages.map((page) => getPaginatedCompanies(page))
  );

  const companies = responses
    .flatMap((response) => {
      if (response.status === 'fulfilled') {
        return response.value;
      }
      return [];
    })
    .map(({ dataset_code, name }) => ({ code: dataset_code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    statusCode: 200,
    body: JSON.stringify(companies),
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3005' // Allow from anywhere
    }
  };
};

export { handler };
