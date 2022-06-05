using GraphQL;
using GraphQL.Client.Abstractions;
using tunder_interface.Models;

namespace tunder_interface.Clients
{
    public class ProfilesConsumer
    {
        private readonly IGraphQLClient _client;
        public ProfilesConsumer(IGraphQLClient client)
        {
            _client = client;
        }
        public async Task<Profile> GetProfile(int id)
        {
            var query = new GraphQLRequest
            {
                Query = @"
                        query GetProfileSoap($getProfileSoapId: Int!) {
                            getProfileSoap(id: $getProfileSoapId) {
                                identification
                                name
                                age
                                occupation
                                gender
                            }
                        }",
                Variables = new { getProfileSoapId = id }
            };

            var response = await _client.SendQueryAsync<ResponseProfileType>(query);

            return response.Data.GetProfileSoap;
        }
    }
}
