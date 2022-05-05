using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Profile_MS.Services;
using Profile_MS.Models;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Profile_MS.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {
        // GET: ProfileController
        private readonly MongoDBService _mongoDBService;
        public ProfileController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }
        [HttpGet("{id}")]
        public async Task<Profile> Get(int id)
        {
            return await _mongoDBService.GetAsync(id);
        }
        [HttpGet]
        public async Task<List<Profile>> GetAll ()
        {
            return await _mongoDBService.GetAllAsync();
        }
        [HttpGet("byGender/{gender}")]
        public async Task<List<Profile>> GetGender(string gender)
        {
            return await _mongoDBService.GetGenderAsync(gender);
        }

        [HttpPost("byGenderCity")]
        public async Task<List<Profile>> Get([FromBody] Dictionary<string,string> filter )
        {
            return await _mongoDBService.GetGenderCityAsync(filter);
        }
        

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Profile profile)
        {
            await _mongoDBService.CreateAsync(profile);
            return CreatedAtAction(nameof(Get), new { id = profile.Identification }, profile);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AddToProfile(int id, [FromBody] Profile profile)
        {
            
            return (IActionResult)await _mongoDBService.AddToProfileAsync(id, profile);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            
            return (IActionResult)await _mongoDBService.DeleteAsync(id);
        }


    }
}
