import Select, { SingleValue } from 'react-select';
import { useMemo, useState } from 'react';
import { Line, LineConfig } from '@ant-design/plots';
import { Empty } from 'components';
import { useCompanies, useStockData } from './Stock.hooks';
import { Container, Header, Main } from './Stock.styled';

type Option = {
  label: string;
  value: string;
};

export const Stock = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>();

  const { data: companiesData, isLoading } = useCompanies();
  const { data: stockData, isFetching: isLoadingStockData } =
    useStockData(selectedCompany);

  const isNoData = selectedCompany && !isLoadingStockData && !stockData?.length;

  const selectOptions: Option[] = useMemo(
    () =>
      companiesData?.map(({ code, name }) => ({ value: code, label: name })) ||
      [],
    [companiesData]
  );

  const config: LineConfig = useMemo(
    () => ({
      data: stockData || [],
      padding: 'auto',
      xField: 'date',
      yField: 'close',
      slider: {
        start: 0,
        end: 0.2
      },
      tooltip: {
        formatter: ({ close }) => ({
          name: 'Close value',
          value: `${close}$`
        })
      },
      yAxis: {
        label: {
          formatter: (text) => `${text}$`
        }
      }
    }),

    [stockData]
  );

  const handleOnChange = (selectedValue: SingleValue<Option>) => {
    setSelectedCompany(selectedValue?.value);
  };

  return (
    <Container>
      <Header>
        <Select
          isDisabled={isLoading || isLoadingStockData}
          isLoading={isLoading}
          isClearable={true}
          isSearchable={true}
          name='company'
          options={selectOptions}
          onChange={handleOnChange}
          placeholder='Select company to see entire historical trend'
        />
      </Header>
      <Main>
        {selectedCompany && !isNoData && (
          <Line {...config} loading={isLoadingStockData} />
        )}
        {isNoData && <Empty />}
      </Main>
    </Container>
  );
};
