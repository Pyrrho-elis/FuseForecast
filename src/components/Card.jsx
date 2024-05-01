import React from 'react'

export default function Card(props) {
	return (
		<div className="card">
			<div className="card-body">
				<h2 className="card-header">
					{props.head}
				</h2>
				<p className="text-content">
					{props.text}
				</p>
				<div className="card-footer">
					{props.foot}
				</div>
			</div>
		</div>
	);
}
