import { useQuery } from '@tanstack/react-query';
import toast from 'react-simple-toasts';
import { CompaniesResponse, StockDataResponse } from 'contracts';
import { apiUrls, request } from 'utils';

const { companies, stockData } = apiUrls;

export const useCompanies = () =>
  useQuery(['companies'], () => request<never, CompaniesResponse>(companies), {
    onError: () => {
      toast("Can't download list of companies", { position: 'top-center' });
    }
  });

export const useStockData = (company?: string) =>
  useQuery(
    ['stockData', company],
    () =>
      request<{ company?: string }, StockDataResponse>(stockData, { company }),
    {
      enabled: !!company,
      onError: () => {
        toast("Can't download stock data for given company.", {
          position: 'top-center'
        });
      }
    }
  );
