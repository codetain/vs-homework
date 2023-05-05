# VS Home Assignement
Small web application with companies selector and simple line graph with entire historical prices.

## Development
To run web application in development environment, use `yarn install` and `yarn start`.

## Deployment
Web application is deployed to Netlify with following address:

[https://vs-homework.netlify.app](https://vs-homework.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/4ae34c6b-11ad-4584-8db1-a47dba9a5aa1/deploy-status)](https://app.netlify.com/sites/vs-homework/deploys)

## Technical limitations
There are some limitations in regards to [Nasdaq Data Link (former Quandl's API)](https://docs.data.nasdaq.com/docs/in-depth-usage#get-time-series-data) Rest API. I had to workaround them with following solutions:

1. It is confirmed with the support team, that it is not possible to make cross-domain requests to the API. Therefore I've created two [Netlify Functions](netlify/functions) (technically - Netlify implementation of lambda functions) to create proxy endpoints to workaround this problem. The functions are deployed together with web application under the same domain.
2. The result from [Datasets metadata API](https://data.nasdaq.com/api/v3/datasets/?database_code=WIKI) is paginated, therefore it's not possible to obtain all companies at once. Additionally, some random errors occur when trying to get data from some pages, and there is always error for pages greater than 20. Therefore [Netlify Function for companies](netlify/functions/companies.ts) is trying to get companies from first 20 pages, aggreggate them and return to the web application. Data from origin API is not sorted alphabetically, therefore some companies might be missing.

Given that, web application is not calling the API directly, but getting data from implemented endpoints.

## Tech-stack
- typescript
- vite
- eslint, prettier, husky, commitlint, lint-staged
- react-query
- antd charts
- netlify functions
