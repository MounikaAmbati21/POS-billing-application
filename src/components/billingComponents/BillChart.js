import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetAllBills } from '../../actions/billingActions'
import _ from 'lodash'
import moment from 'moment'
import {
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts'

const BillChart = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(startGetAllBills())
	}, [])

	const bills = useSelector((state) => state.details.bills)

	const sortedActivities = bills.sort((a, b) => b.date - a.date).slice(-5)

	sortedActivities.map((ele) => {
		return moment(ele.date).format('l')
	})

	const data = [...sortedActivities]
    // console.log(sortedActivities)

	return (
		<div>
			{bills.length > 0 ? (
				<div>
                    <h2>Last Five Order Stats</h2>
					<ComposedChart
						width={500}
						height={400}
						data={data}
						margin={{
							top: 20,
							right: 20,
							bottom: 20,
							left: 20,
						}}>
						<CartesianGrid stroke='#f5f5f5' />
						<XAxis
							dataKey='date'
							type='category'
							domain={['dataMin', 'dataMax']}
							tickFormatter={(tick) => moment(tick).format('ll').slice(0, 6)}
							scale='band'
						/>
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey='total' barSize={10} fill='#413ea0' />
						<Line type='monotone' dataKey='total' stroke='#ff7300' />
					</ComposedChart>
				</div>
			) : (
				<div
					margin={{
						top: 20,
						right: 20,
						bottom: 20,
						left: 20,
					}}>
					No Orders Made
				</div>
			)}
		</div>
	)
}

export default BillChart
