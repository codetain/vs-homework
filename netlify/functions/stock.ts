import { Handler, HandlerEvent } from '@netlify/functions';
import axios from 'axios';

type CompaniesResponse = {
  dataset_data: {
    column_names: ('Date' | 'Close')[];
    data: [string, number][];
  };
};

const url = (company: string) =>
  `https://data.nasdaq.com/api/v3/datasets/WIKI/${company}/data.json`;

const handler: Handler = async (event: HandlerEvent) => {
  const company = event.queryStringParameters?.company;

  if (!company) {
    return {
      statusCode: 400,
      body: 'Missing company code.'
    };
  }

  const response = await axios<never, { data: CompaniesResponse }>({
    url: url(company),
    params: {
      column_index: 4, // it's always Close column
      order: 'asc', // ascending order by date
      api_key: process.env.API_KEY
    }
  });

  const { data } = response.data.dataset_data;

  return {
    statusCode: 200,
    body: JSON.stringify(
      data.map((item) => {
        const [date, close] = item;
        return {
          date,
          close
        };
      })
    ),
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3005'
    }
  };
};

export { handler };
