// pages/api/trigger.js

export default async function handler(req, res) {
	console.log('API Request Received:', req.body);
  
	if (req.method === 'POST') {
	  const { input } = req.body.params;
  
	  console.log('Message:', input);
  
	  const requestBody = {
		params: {
		  input: input,
		 
		},
	  };
  
	  try {
		const workflowResponse = await fetch('https://universe.lemme.cloud/api/cosmoGPT', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(requestBody),
		});
  
		console.log('Workflow Response Status:', workflowResponse.status);
  
		if (!workflowResponse.ok) {
		  console.error('Error:', workflowResponse.statusText);
		  res.status(500).json({ error: 'Workflow endpoint error' });
		  return;
		}
  
		const data = await workflowResponse.json();
		console.log('Workflow Response Data:', data);
		res.status(200).json(data);
	  } catch (error) {
		console.error('Fetch error:', error);
		res.status(500).json({ error: 'Internal server error' });
	  }
	} else {
	  res.status(405).json({ message: 'Method Not Allowed' });
	}
  }
  