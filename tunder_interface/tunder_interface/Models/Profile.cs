using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace tunder_interface.Models
{
    [DataContract]  
    public class Profile
    {
        [DataMember]
        public string name { get; set; } = null!;
        [DataMember]
        public int age { get; set; }
        [DataMember]
        public string occupation { get; set; } = null!;
        [DataMember]
        public string gender { get; set; } = null!;
        [DataMember]
        public string city { get; set; } = null!;
    }

    public class ResponseProfileType
    {
        public Profile GetProfile { get; set; } = new Profile();
    }
}
