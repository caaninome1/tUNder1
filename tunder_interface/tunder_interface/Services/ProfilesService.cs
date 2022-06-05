using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using tunder_interface.Models;
using tunder_interface.Interfaces;
using tunder_interface.Clients;

namespace tunder_interface.Services
{
    public class ProfilesService : IProfilesService
    {
        private readonly ProfilesConsumer _profilesConsumer;

        public ProfilesService(ProfilesConsumer profilesConsumer)
        {
            _profilesConsumer = profilesConsumer;
        }

        public Profile GetProfile(int id)
        {
            Console.WriteLine(id);
            Profile profile = _profilesConsumer.GetProfile(id).Result;
            
            return profile;
        }
    }
}