import React from 'react';
import './laberinto.css';

class Laberinto extends React.Component {
	constructor(props) {
		super(props);
		fetch('http://34.210.35.174:3001/?type=json&h=5&w=5')
			.then(response => response.json())
			.then(myJson => this.parser(myJson));

		this.state = {
			maze: undefined,
			playerXpos: 1,
			playerYpos: 1,
		};
	}

	componentDidMount() {
		document.addEventListener('keydown', this.movePlayer, false);
	}

	movePlayer = (event) => {
		const { maze } = this.state;
		const { playerXpos } = this.state;
		const { playerYpos } = this.state;


		switch (event.key) {
		case 'ArrowUp':
			if (maze[playerXpos - 1][playerYpos] === 0) {
				maze[playerXpos][playerYpos] = 0;

				maze[playerXpos - 1][playerYpos] = 'p';
				this.setState({ playerXpos: playerXpos - 1 });
			} else if (maze[playerXpos - 1][playerYpos] === 'g') {
				window.alert('Hey Listen!');
			}
			break;
		case 'ArrowDown':
			if (maze[playerXpos + 1][playerYpos] === 0) {
				maze[playerXpos][playerYpos] = 0;
				maze[playerXpos + 1][playerYpos] = 'p';
				this.setState({ playerXpos: playerXpos + 1 });
			} else if (maze[playerXpos + 1][playerYpos] === 'g') {
				window.alert('Hey Listen!');
			}
			break;
		case 'ArrowRight':
			if (maze[playerXpos][playerYpos + 1] === 0) {
				maze[playerXpos][playerYpos] = 0;
				maze[playerXpos][playerYpos + 1] = 'p';
				this.setState({ playerYpos: playerYpos + 1 });
			} else if (maze[playerXpos][playerYpos + 1] === 'g') {
				window.alert('Hey Listen!');
			}
			break;
		case 'ArrowLeft':
			if (maze[playerXpos][playerYpos - 1] === 0) {
				maze[playerXpos][playerYpos] = 0;
				maze[playerXpos][playerYpos - 1] = 'p';
				this.setState({ playerYpos: playerYpos - 1 });
			} else if (maze[playerXpos][playerYpos - 1] === 'g') {
				window.alert('Hey Listen!');
			}
			break;
		default:
		}
		this.setState({ maze });
	}

	parser = (myJson) => {
		let space = '';
		const allArrays = [];
		let array = [];
		let r = 0;
		let c = 0;
		while (r < myJson.length) {
			array = [];
			c = 0;
			while (c < myJson[0].length) {
				space = myJson[r][c];
				switch (space) {
				case '+':
					array.push(1);
					c += 1;
					break;
				case '-':
					array.push(1);
					array.push(1);
					c += 2;
					break;
				case '|':
					array.push(1);
					c += 1;
					break;
				case ' ':
					array.push(0);
					c += 1;
					break;
				case 'p':
					array.push('p');
					c += 1;
					break;
				case 'g':
					array.push('g');
					c += 1;
					break;
				default:
					c += 1;
				}
			}
			allArrays.push(array);
			r += 1;
		}
		this.setState({ maze: allArrays });
		console.log(allArrays);
	};

	paint = () => {
		let value = '';
		const paintedMaze = [];
		const { maze } = this.state;

		if (maze) {
			for (let i = 0; i < maze.length; i += 1) {
				for (let j = 0; j < (maze)[0].length; j += 1) {
					value = maze[i][j];
					switch (value) {
					case 1:
						paintedMaze.push(<button type="button" className="wall" />);
						break;
					case 0:
						paintedMaze.push(<div className="path" />);
						break;
					case 'p':
						paintedMaze.push(<div className="player" />);
						break;
					case 'g':
						paintedMaze.push(<div className="end" />);
						break;
					default:
					}
				}
			}
		}
		return paintedMaze;
	};

	render() {
		const maze = this.paint();
		return (
			<div>
				<h1> Laberinto </h1>
				<div className="container">
					{maze}
				</div>
			</div>
		);
	}
}


export default Laberinto;
