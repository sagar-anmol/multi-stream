export async function POST(req) {
    try {
      const body = await req.json();
      const { movieUrl } = body;
  
      if (!movieUrl || typeof movieUrl !== 'string') {
        return new Response(JSON.stringify({ message: 'Invalid movie URL' }), { status: 400 });
      }
  
      // Example URLs for the 6 GET requests and 1 POST request
      const getApiUrls = [
        `https://api.turboviplay.com/uploadUrl?keyApi=mutlM3c4ck&url=${movieUrl}`,
        `https://api.streamtape.com/remotedl/add?login=16e1f59d6da8f1f76d35&key=gl4433r1B2TqlkB&url=${movieUrl}`,
        `https://earnvidsapi.com/api/upload/url?key=364645jhk5mm67o7jlzt&url=${movieUrl}`,
        `https://streamhgapi.com/api/upload/url?key=22993xiumj8q0e2joyp3&url=${movieUrl}`,
        `https://filemoonapi.com/api/remote/add?key=73471o6e8ym1e2ijbygpy&url${movieUrl}`,
        
      ];
  
      const postApiUrl = `https://upnshare.com//api/v1/video/advance-upload`;
  
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
    'api-token': '02c4502bae681729ae65ae53',
  },
  body: JSON.stringify({
    "url": movieUrl,
    "name": "this is not title"
  }),
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
  