export async function POST(req) {
    try {
      const body = await req.json();
      const { movieUrl } = body;
  
      if (!movieUrl || typeof movieUrl !== 'string') {
        return new Response(JSON.stringify({ message: 'Invalid movie URL' }), { status: 400 });
      }
  
      // Example URLs for the 6 GET requests and 1 POST request
      const getApiUrls = [
        `https://api.example.com/get1?url=${movieUrl}`,
        `https://api.example.com/get2?url=${movieUrl}`,
        `https://api.example.com/get3?url=${movieUrl}`,
        `https://api.example.com/get4?url=${movieUrl}`,
        `https://api.example.com/get5?url=${movieUrl}`,
        `https://api.example.com/get6?url=${movieUrl}`,
      ];
  
      const postApiUrl = `https://api.example.com/post`;
  
      // Call the 6 GET APIs
      const getResponses = await Promise.all(
        getApiUrls.map((url) =>
          fetch(url, {
            method: 'GET',
          }).then((res) => res.json())
        )
      );
  
// Call the POST API
const postResponse = await fetch(postApiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': 'your-api-key-value',
  },
  body: JSON.stringify({ url: movieUrl }),
}).then((res) => res.json());

  
      // Combine results
      const allResponses = {
        getResponses,
        postResponse,
      };
  
      return new Response(JSON.stringify({ message: 'Movie processed successfully!', data: allResponses }), {
        status: 200,
      });
    } catch (error) {
      console.error('Error processing movie:', error);
      return new Response(JSON.stringify({ message: 'Something went wrong', error: error.message }), { status: 500 });
    }
  }
  