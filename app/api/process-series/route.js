export async function POST(req) {
    try {
      const body = await req.json();
      const { episodes } = body; // episodes should be an array of URLs
  
      if (!episodes || !Array.isArray(episodes)) {
        return new Response(JSON.stringify({ message: 'Invalid episode URLs' }), { status: 400 });
      }
  
      const results = [];
  
      for (const episodeUrl of episodes) {
        // Example URLs for the 6 GET requests and 1 POST request
        const getApiUrls = [
          `https://api.example.com/get1?url=${episodeUrl}`,
          `https://api.example.com/get2?url=${episodeUrl}`,
          `https://api.example.com/get3?url=${episodeUrl}`,
          `https://api.example.com/get4?url=${episodeUrl}`,
          `https://api.example.com/get5?url=${episodeUrl}`,
          `https://api.example.com/get6?url=${episodeUrl}`,
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: episodeUrl }),
        }).then((res) => res.json());
  
        // Combine results for the episode
        results.push({
          episodeUrl,
          getResponses,
          postResponse,
        });
      }
  
      return new Response(JSON.stringify({ message: 'Series processed successfully!', data: results }), {
        status: 200,
      });
    } catch (error) {
      console.error('Error processing series:', error);
      return new Response(JSON.stringify({ message: 'Something went wrong', error: error.message }), { status: 500 });
    }
  }
  