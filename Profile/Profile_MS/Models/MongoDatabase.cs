using Profile_MS.Controllers;

namespace Profile_MS.Models
{
    public class MongoDatabase
    {

        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string CollectionName { get; set; } = null!;
    }

}
