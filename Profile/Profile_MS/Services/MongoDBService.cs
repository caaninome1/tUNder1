using Profile_MS.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace Profile_MS.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Profile> _profileCollection;

        private IConfiguration configuration;
        public MongoDBService(IConfiguration configuration)
        {
            this.configuration = configuration;
            MongoClient client = new MongoClient(configuration.GetValue<string>("MongoDB:ConnectionURI"));
            IMongoDatabase database = client.GetDatabase(configuration.GetValue<string>("MongoDB:DatabaseName"));
            _profileCollection = database.GetCollection<Profile>("profile");
        }

        public async Task CreateAsync(Profile profile)
        {
            await _profileCollection.InsertOneAsync(profile);
            return;
        }

        public async Task<Profile> GetAsync(int id)
        {
            return await _profileCollection.Find(x => x.Identification == id).FirstOrDefaultAsync();
        }
        public async Task<List<Profile>> GetAllAsync()
        {
            return await _profileCollection.Find(x => true).ToListAsync();
        }

        public async Task<List<Profile>> GetGenderAsync(string gender)
        {
            return await _profileCollection.Find(x => x.Gender == gender).ToListAsync();
        }

        public async Task<List<Profile>> GetGenderCityAsync(Dictionary<string, string> filter)
        {
            return await _profileCollection.Find(x => (x.Gender == filter["gender"] && x.City == filter["city"])).ToListAsync();
        }

        public async Task<ReplaceOneResult> AddToProfileAsync(int id, Profile profile)
        {
            return await _profileCollection.ReplaceOneAsync(x => x.Identification == id, profile);
        }

        public async Task<DeleteResult> DeleteAsync(int id)
        {
            return await _profileCollection.DeleteOneAsync(x => x.Identification == id);
        }
    }
}
