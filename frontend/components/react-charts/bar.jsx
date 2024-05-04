import React from "react";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBar = ({ options = {}, data = {} }) => {

	// options.animation = {
	// 	"duration": 1,
	// 	onComplete: (x) => {
	// 		const chart = x.chart;
	// 		var { ctx } = chart;
	// 		ctx.textAlign = 'center';
	// 		ctx.fillStyle = "rgba(0, 0, 0, 1)";
	// 		ctx.textBaseline = 'bottom';
	// 		// Loop through each data in the datasets
	// 		// const metaFunc = this.getDatasetMeta;
	// 		chart.data.datasets.forEach((dataset, i) => {
	// 			var meta = chart.getDatasetMeta(i);
	// 			meta.data.forEach((bar, index) => {
	// 				var data = dataset.data[index];
	// 				ctx.fillText(`${data}`, bar.x, bar.y - 5);
	// 			});
	// 		});
	// 	}
	// }

	return <Bar options={options} data={data} />;
}

export default ChartBar;
