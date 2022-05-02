using Profile_MS.Models;
using Microsoft.Extensions.Options;
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
        public MongoDBService()
        {
            MongoClient client = new MongoClient("mongodb://localhost:27017");
            IMongoDatabase database = client.GetDatabase("profile");
            _profileCollection = database.GetCollection<Profile>("profile");
        }

        public async Task CreateAsync(Profile profile)
        {
            await _profileCollection.InsertOneAsync(profile);
            return ;
        }

        public async Task<Profile> GetAsync(int id)
        {
            return await _profileCollection.Find(x => x.Identification == id).FirstOrDefaultAsync();
        }
        public async Task< List<Profile> > GetAllAsync()
        {
            return await _profileCollection.Find( x => true ).ToListAsync();
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
