import React, { useEffect } from "react";
import { useState } from "react";

//create your first component
const Home = () => {
	const [entrada, setEntrada] = useState([]);
	const [datos, setDatos] = useState(" ");

	function putApi() {
		setEntrada([...entrada, { label: datos, done: false }]);
		console.log(datos);
		console.log(entrada);
		let infoNecesaria = {
			method: "PUT",
			body: JSON.stringify(entrada),
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/daniel",
			infoNecesaria
		)
			.then(res => res.json())
			.then(respuesta => {
				console.log(respuesta);
				// console.log("entrada: ", entrada);
				// console.log("Datos: ", datos);
			})
			.catch(error => console.log("algo paso", error));
	}

	function updateApi(index) {
		entrada.splice(index, 1);
		setEntrada([...entrada]);
		let infoNecesaria = {
			method: "PUT",
			body: JSON.stringify(entrada),
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/daniel",
			infoNecesaria
		)
			.then(res => res.json())
			.then(respuesta => {
				//console.log(respuesta);
			})
			.catch(error => console.log("algo paso", error));
	}

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/daniel")
			.then(res => res.json())
			.then(respuesta => {
				setEntrada(respuesta);
				console.log(respuesta);
			})
			.catch(error => console.log("algo paso", error));
	}, []);

	return (
		<div className="text-center bg-white container my-3 mt-5">
			<h1>toDo List</h1>

			<div>
				<input
					type="text"
					placeholder="Add toDo list"
					onChange={e => {
						setDatos(e.target.value);
					}}
					onKeyDown={e => {
						if (e.key === "Enter" && datos !== " ") {
							putApi();
						}
					}}
					value={datos}
				/>

				<div>
					<>
						<ul className="list-group">
							{entrada.map((item, index) => {
								return (
									<li className="list-group-item" key={index}>
										{item.label}
										<a
											onClick={() => {
												console.log(index);
												updateApi(index);
											}}>
											<i className=" far fa-times-circle mb-3"></i>
										</a>
									</li>
								);
							})}
						</ul>
					</>
				</div>
			</div>
		</div>
	);
};

export default Home;
