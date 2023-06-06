import React from 'react';
import { WebView } from 'react-native-webview';

export default function Chart(){
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <canvas id="chart"></canvas>
        <script>
          const ctx = document.getElementById('chart').getContext('2d');
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Sales',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: ['rgba(75, 19, 198, 0.6)','red', 'blue','orange', ' beige', 'black'],
                },
              ],
            },
            options: {
              responsive: true,
            },
          });
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
    />
  );
};
