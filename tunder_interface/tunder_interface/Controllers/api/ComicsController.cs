using ComicsWS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using ComicsWS;

namespace tunder_interface.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComicsController : ControllerBase
    {
        public ComicsController()
        {

        }

        [HttpGet("GetComic")]
        public async Task<getComicResponse> GetComic(int id)
        {
            ComicsPortClient ws = new ComicsPortClient();

            // id is wrapped in a request object
            getComicRequest request = new getComicRequest();
            request.id = id;

            getComicResponse1 response = await ws.getComicAsync(request);

            return response.getComicResponse;
        }
    }
}
