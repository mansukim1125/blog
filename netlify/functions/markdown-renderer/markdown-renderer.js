const fetch = require('node-fetch');

const handler = async (event) => {
	try {
		const request_body = JSON.parse(event['body'])

		const response = await fetch("https://api.github.com/markdown", {
			method: "POST",
			body: JSON.stringify({
				"text": request_body['text']
			}),
			headers: {
				"Accept": "application/vnd.github.v3+json",
				"Authorization": "Basic " + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
			}
		});

		const rendered_markdown = await response.text();
		return {
			statusCode: 200,
			body: rendered_markdown
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}

module.exports = { handler }
