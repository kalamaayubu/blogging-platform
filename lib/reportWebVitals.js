import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const metrics = {}; // Object to store metrics

export function reportWebVitals(metric) {
  metrics[metric.name] = metric.value;
  console.log(`${metric.name}: ${metric.value}`);
}

export function getMetrics() {
  return metrics; // Provide access to collected metrics
}

// Start collecting metrics
getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals);
getFCP(reportWebVitals);
getTTFB(reportWebVitals);
