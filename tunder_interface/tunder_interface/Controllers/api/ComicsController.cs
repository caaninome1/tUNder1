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

        [HttpGet("GetComics")]
        public async Task<IActionResult> GetComics()
        {
            Console.WriteLine("Calling Comics WS");
            //ComicsServiceClient ws = new ComicsServiceClient();
            //GetComicsResponse response = await ws.GetComicsAsync(id);
            return StatusCode(200);
        }
    }
}
