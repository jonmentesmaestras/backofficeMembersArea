const http = require('http');
const fs = require('fs');
const axios = require('axios');

const server = http.createServer(async (req, res) => {
  try {
    // Replace 'RESOURCE_URL' with the actual URL of the resource you want to download
    const resourceUrl = 'https://scontent-bog1-1.xx.fbcdn.net/v/t42.1790-2/415734632_378589331381079_2570600030341894433_n.?_nc_cat=107&ccb=1-7&_nc_sid=c53f8f&_nc_eui2=AeHnHmPpWJ4EbuOkQNlZBrDaRxHkAlfwOflHEeQCV_A5-R2alaf0vs1dtEiQIyXaECemA74wzsTR-m8B63aDERWk&_nc_ohc=c0qw4sKPW9cAX_ruRrz&_nc_ht=scontent-bog1-1.xx&oh=00_AfBTfzF5g7UT8cfqc8pGHNkvjF6xfGW2ubZtP6Ecld3aEw&oe=659D6E86';

    // Fetch the resource
    const response = await axios.get(resourceUrl, { responseType: 'arraybuffer' });
    
    // Set the appropriate content type based on the resource extension or MIME type
    const contentType = 'video/mp4'; // Change this based on your resource type

    // Set response headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', response.data.length);
    res.setHeader('Content-Disposition', 'attachment; filename=downloaded_resource.mp4');

    // Send the resource data
    res.end(response.data);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
