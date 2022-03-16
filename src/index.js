import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
    dsn: "https://d9d7d0558be6438fa6492ea966f2cfa5@o1117361.ingest.sentry.io/6261831",
    integrations: [new BrowserTracing()],
    environment: process.env.NODE_ENV,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  
ReactDOM.render(<App />, document.getElementById('root'));

