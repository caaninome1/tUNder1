using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Profile_MS.Models
{
    [BsonIgnoreExtraElements]
    public class Profile
    {

        [BsonElement("id")]
        public int Identification { get; set; }
        [BsonElement("name")]
        public string Name { get; set; } = null!;
        [BsonElement("age")]
        public int Age { get; set; }
        [BsonElement("occupation")]
        public string Occupation { get; set; } = null!;
        [BsonElement("gender")]
        public string Gender { get; set; } = null!;
        [BsonElement("city")]
        public string City { get; set; } = null!;
        [BsonElement("address")]
        public string Address { get; set; } = null!;
        [BsonElement("phone")]
        public string Phone { get; set; } = null!;

        [BsonElement("characteristic")]
        public List<Characteristic> Characteristics { get; set; } = null!;


    }
}

