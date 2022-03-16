import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
    dsn: "https://3e4c24f451e240c59dae23992a67e5d6@o1117361.ingest.sentry.io/6261910",
    integrations: [new BrowserTracing()],
    environment: process.env.NODE_ENV,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  
ReactDOM.render(<App />, document.getElementById('root'));

