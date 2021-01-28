import React, { useState, useEffect } from "react";

export function Home() {
	const [currentTodo, setCurrentTodo] = useState("");
	const [list, setList] = useState([]);
	// Creation of list PUT
	//----------------------------------------------------------------------
	useEffect(
		() => {
			syncData();
		},

		[]
	);
	//----------------------------------------------------------------------
	const syncData = () => {
		return fetch("https://assets.breatheco.de/apis/fake/todos/user/rlacs4g")
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				setList(data);
			})
			.catch(error => {
				console.log(error);
			});
	};
	//----------------------------------------------------------------------
	const handleKeyPress = e => {
		if (e.key === "Enter") {
			let newList = list.concat({ label: currentTodo, done: false });
			updateTodo(newList);
			setCurrentTodo("");
		}
	};
	//----------------------------------------------------------------------
	const deleteTodo = index => setList(list.filter((item, i) => i !== index));
	//----------------------------------------------------------------------
	const handleCompleteTodo = index => {
		let newList = [].concat(list);
		newList[index].done = !newList[index].done;

		setList(newList);
	};
	//----------------------------------------------------------------------
	const updateTodo = list => {
		console.log("list", list);
		return fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/rlacs4g",
			{
				method: "PUT",
				body: JSON.stringify(list),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				if (!resp.ok) throw new Error(resp.statusText);
				return resp.json();
			})
			.then(data => {
				syncData();
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	//----------------------------------------------------------------------
	const deleteTodoList = todolist => {
		return fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/rlacs4g",
			{
				method: "delete",
				body: JSON.stringify(todolist),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
				createTodoList();
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};
	//----------------------------------------------------------------------
	const createTodoList = todolist => {
		return fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/rlacs4g",
			{
				method: "post",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
				syncData();
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	//----------------------------------------------------------------------
	return (
		<div className="d-flex flex-column align-items-center justify-content-center">
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
					<p
						className="clear mr-4 d-inline"
						onClick={() => deleteTodoList()}>
						Clear All
					</p>
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
