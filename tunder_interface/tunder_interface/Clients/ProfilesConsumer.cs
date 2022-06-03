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
                        query GetProfile($getProfileId: Int!) {
                            getProfile(id: $getProfileId) {
                                name
                                age
                                occupation
                                gender
                                city
                            }
                        }",
                Variables = new { getProfileId = id }
            };

            var response = await _client.SendQueryAsync<ResponseProfileType>(query);

            return response.Data.GetProfile;
        }
    }
}
