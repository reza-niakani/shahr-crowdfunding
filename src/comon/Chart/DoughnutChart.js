import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    if (chart.config.type !== 'doughnut') return; // Only apply to Doughnut charts

    const { width, height, ctx } = chart;
    // const cutoutPercentage = chart.options.cutoutPercentage || 89.5;
    // const cutoutRadius = (width / 2) * (cutoutPercentage / 100);
    const fontSize = (height / 130).toFixed(2);
    const lineHeight = fontSize * 20;
    const { text, textColor } = chart.options.plugins.centerTextPlugin || {};

    // Set text styles
    ctx.restore();
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor || '#FFB700';
    ctx.font = `bold ${fontSize}em sans-serif`;

    // Draw circle inside the donut hole
    // ctx.strokeStyle = '#9599A7';
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.arc(width / 2, height / 2, cutoutRadius - fontSize * 7, 0, 2 * Math.PI);
    // ctx.stroke();

    // Draw the text
    const textX = width / 2;
    text.forEach((line, index) => {
      const textY = height / 2 - lineHeight / 2 + lineHeight * index;
      ctx.textAlign = 'center';
      ctx.fillText(line, textX, textY);
    });

    ctx.save();
  }
};

const DoughnutChart = ({
  data,
  percent = false,
  textLines = ['Multi-line', 'Text'],
  textColor = '#FFB700',
  width = '190px',
  height = '190px'
}) => {
  useEffect(() => {
    Chart.register(centerTextPlugin);
    return () => {
      Chart.unregister(centerTextPlugin);
    };
  }, []);

  const chartData = {
    labels: data?.labels,
    datasets: [
      {
        data: data?.data,
        backgroundColor: data?.backgroundColor || ['#FFB700', '#85E0A3', '#FA8C82', '#043BC6'],
        hoverBackgroundColor: data?.backgroundColor || ['#FFB700', '#85E0A3', '#FA8C82', '#043BC6'],
        borderWidth: 0,
        borderRadius: 16,
        spacing: 3
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        position: 'nearest',
        backgroundColor: '#fff',
        titleColor: '#000', // ✅ Correct way to set title text color
        bodyColor: '#000', // ✅ Correct way to set body text color
        titleFont: {
          family: 'IRANSansX',
          size: 13,
          weight: 'bold'
        },
        bodyFont: {
          family: 'IRANSansX',
          size: 14
        },
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => ` ${tooltipItem.raw} ${percent ? '%' : ''}`
        }
      },
      centerTextPlugin: {
        text: textLines,
        textColor: textColor
      }
    },
    cutout: '89.5%',
    responsive: true,
    maintainAspectRatio: false
  };
  console.log(data);

  return (
    <div style={{ width, height }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
