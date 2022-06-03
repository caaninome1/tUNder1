using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;
using tunder_interface.Models;

namespace tunder_interface.Interfaces
{
    [ServiceContract]
    public interface IProfilesService
    {
        [OperationContract]
        Profile GetProfile(int id);
    }
}