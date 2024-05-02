import React from "react";

export default function Nav() {
	return (
		<div className="navbar navbar-glass">
			<div className="navbar-start">
				<a className="navbar-item font-bold text-xl font-911">
				FuseForecast
				</a>
			</div>
			<div className="navbar-end">
				<div className="avatar avatar">
					<a href="https://t.me/pyrrhoOfElis">
						<span
							className="tooltip tooltip-left"
							data-tooltip="Created By Pyrrho"
						>
							<img
								src="https://i.ibb.co/FYkvc9K/pyr.jpg"
								alt="avatar"
							/>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
}
