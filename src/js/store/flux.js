const getState = ({ getStore, getActions, setStore }) => {
	const BACKEND_ROOT = "https://3000-f4686e89-3f28-4d9f-b041-346f4456ba04.ws-eu01.gitpod.io/";
	const LOGIN_ENDPOINT = "login/";

	return {
		store: {
			questions: [
				{
					id: "1",
					title:
						"Getting a “java.sql.SQLException: You can't operate on a closed Statement”, with an open connection",
					description:
						"I have a program that makes several requests to a database, opening and closing connections to do what it needs to do. For each connection, it does a select that return 50 results and an update; it does this roughly 10 times per connection. After that, the connection is closed, and a new one is taken. But recently we have been having some random issues in which this SQL exception appears:",
					isAnswered: true,
					numberOfAnswers: 2
				},
				{
					id: "2",
					title:
						"Cannot connect to database with ASP.NET. System.InvalidOperationException: No service for type *Context has been registered",
					description:
						"I am new in C# and try to add the database connection to the MVC project with ASP.NET core:",
					isAnswered: true,
					numberOfAnswers: 3
				},
				{
					id: "3",
					title: "Linux Unity Editor Archive",
					description:
						"I want to install unity editor Linux version archive but I cannot find its link can. It is not being downloaded in unity hub due to slow network by I can download the archive in my phone so please send me the link of unity editor. It will help me a lot. I am trying to find link using Wireshark. But I cannot know how to use it.",
					isAnswered: false,
					numberOfAnswers: 0
				}
			],
			answers: [
				{
					id: "1",
					idQuestion: "1",
					title: "Prueba con esto",
					description: "Prueba con esto que seguro que te funciona.",
					isBestAnswer: false
				},
				{
					id: "2",
					idQuestion: "1",
					title: "Necesito mas datos",
					description:
						"You should probably start with a little theory and simple examples such as the midpoint displacement algorithm. You should also learn a little about Perlin Noise if you are interested in generating graphics. I used this to get me started with my final year project on procedural generation. Fractals are closely related to procedural generation. Terragen and SpeedTree will show you some amazing possibilities of procedural generation. Procedural generation is a technique that can be used in any language (it is definitely not restricted to procedural languages such as C, as it can be used in OO languages such as Java, and Logic languages such as Prolog). A good understanding of recursion in any language will strengthen your grasp of Procedural Generation.",
					isBestAnswer: false
				},
				{
					id: "3",
					idQuestion: "2",
					title: "Necesito mas datos",
					description:
						"You should probably start with a little theory and simple examples such as the midpoint displacement algorithm. You should also learn a little about Perlin Noise if you are interested in generating graphics. I used this to get me started with my final year project on procedural generation. Fractals are closely related to procedural generation. Terragen and SpeedTree will show you some amazing possibilities of procedural generation. Procedural generation is a technique that can be used in any language (it is definitely not restricted to procedural languages such as C, as it can be used in OO languages such as Java, and Logic languages such as Prolog). A good understanding of recursion in any language will strengthen your grasp of Procedural Generation.",
					isBestAnswer: false
				}
			],
			users: [
				{
					id: "1",
					name: "Diego Ezquerro Calvo",
					email: "diego.ezquerro@gmail.com",
					isActive: true
				},
				{
					id: "2",
					name: "kristen_khan",
					email: "kristen_khan@hotmail.com",
					isActive: true
				},
				{
					id: "3",
					name: "tuan_mccormick",
					email: "tuan_mccormick@aol.com",
					isActive: true
				},
				{
					id: "4",
					name: "kyung_prentice",
					email: "kyung_prentice@outlook.com",
					isActive: true
				},
				{
					id: "5",
					name: "lesha_iles",
					email: "lesha_iles@hotmail.com",
					isActive: true
				},
				{
					id: "6",
					name: "chris_buxton",
					email: "chris_buxton@gmail.com",
					isActive: true
				},
				{
					id: "7",
					name: "tamra_gould",
					email: "tamra_gould@gmail.com",
					isActive: true
				},
				{
					id: "8",
					name: "lurlene_bourne",
					email: "lurlene_bourne@aol.com",
					isActive: true
				}
			]
		},
		actions: {
			fetchLogin: async data => {
				let json = await getActions().doFetch(BACKEND_ROOT + LOGIN_ENDPOINT, "POST", data);

				if (json) {
					return json;
				}
			},
			doFetch: (endpoint, method, data) => {
				let fetchOptions = {
					method: method,
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data)
				};

				return fetch(endpoint, fetchOptions)
					.then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw Error(response.statusText);
						}
						// TODO: esto hace falta?
						return response.json();
					})
					.catch(error => {
						throw Error(error);
						return null;
					});
			},
			getAllQuestions: () => {
				let store = getStore();
				return store.questions;
			},
			getQuestionById: id => {
				let store = getStore();
				var question = store.questions.find(obj => {
					return obj.id == id;
				});
				return question;
			},
			getAnswerById: id => {
				let store = getStore();
				var answer = store.answers.find(obj => {
					return obj.id == id;
				});
				return answer;
			},
			getAnswersByQuestionId: idQuestion => {
				let store = getStore();
				var answers = store.answers.filter(answer => {
					return answer.idQuestion == idQuestion;
				});
				return answers;
			},
			getAllUsers: () => {
				let store = getStore();
				return store.users;
			}
		}
	};
};

export default getState;
