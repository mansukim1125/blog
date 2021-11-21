const fetch = require('node-fetch');

const handler = async (event) => {
	try {
        const post_title = event.queryStringParameters.title;

		const response = await fetch(`https://api.github.com/repos/mansukim1125/test-blog/contents/posts/${post_title}.md`, {
			method: "GET",
			headers: {
				"Authorization": "Basic " + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
			}
		});

		const response_text = await response.text();
        const post = JSON.parse(response_text);

		return {
			statusCode: 200,
			body: JSON.stringify(post)
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}

module.exports = { handler }
