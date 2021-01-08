import React, { useState } from "react";

export function Home() {
	const [currentTodo, setCurrentTodo] = useState("");
	const [list, setList] = useState([
		{ label: "Shave", done: true },
		{ label: "Watch Cobra Kai", done: false },
		{ label: "Watch Karate Kid", done: false },
		{ label: "Lift weights", done: false }
	]);

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			setList(list.concat({ label: currentTodo, done: false }));
			setCurrentTodo("");
		}
	};

	const deleteTodo = index => setList(list.filter((item, i) => i !== index));

	const handleCompleteTodo = index => {
		let newList = [].concat(list);
		newList[index].done = !newList[index].done;

		setList(newList);
	};

	return (
		<div className="d-flex flex-column align-items-center justify-content-center wrap">
			<h1 className="mb-4">todos</h1>
			<div className="todo-container">
				<ul className="list-group">
					<li className="list-group-item">
						{}
						<input
							className="form-control border-0"
							type="text"
							placeholder="What needs to be done"
							aria-label="add todo"
							value={currentTodo}
							onChange={e => setCurrentTodo(e.target.value)}
							onKeyPress={e => handleKeyPress(e)}
						/>
					</li>
					{//  mapping here
					list.map((item, index) => (
						<li className="list-group-item" key={index}>
							<div
								className={
									item.done
										? "status border rounded-circle d-inline-block done mr-3"
										: "status border rounded-circle d-inline-block mr-3"
								}
								onClick={() => handleCompleteTodo(index)}>
								{" "}
							</div>
							{item.label}
							<span
								className="delete ml-auto"
								onClick={() => deleteTodo(index)}>
								{" "}
								&#120;
							</span>
						</li>
					))}
				</ul>
				<div className="list-group-item footer">
					{list.length > 0
						? `${list.length} task${
								list.length > 1 ? "s" : ""
						  } left`
						: "No tasks, add a task"}
				</div>
			</div>
		</div>
	);
}
