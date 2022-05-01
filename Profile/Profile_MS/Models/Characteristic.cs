using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Profile_MS.Models
{
    public class Characteristic
    {

        [BsonElement("type")]
        public string Type { get; set; } = null!;
        [BsonElement("content")]
        public int Content { get; set; }

    }
}
