export default function Card(props) {
	return (
		<div className="card">
			<div className="card-body">
				<span className="flex gap-4 items-center">
					<span className="dot"></span>

					<h2 className="card-header">{props.head}</h2>
				</span>
				<div class="divider"></div>
				<p className="text-content text-lg font-semibold">{props.text}</p>
				<div className="text-content text-lg font-semibold">{props.foot}</div>
			</div>
		</div>
	);
}
