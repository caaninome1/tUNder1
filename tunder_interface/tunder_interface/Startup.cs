using GraphQL.Client.Abstractions;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using Microsoft.Extensions.DependencyInjection.Extensions;
using SoapCore;
using tunder_interface.Models;
using tunder_interface.Services;
using tunder_interface.Interfaces;
using tunder_interface.Clients;

namespace tunder_interface
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IProfilesService, ProfilesService>();
            services.AddMvc();
            services.AddScoped<IGraphQLClient>(s => new GraphQLHttpClient(Configuration["GraphQLURI"], new NewtonsoftJsonSerializer()));
            services.AddScoped<ProfilesConsumer>();
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSoapEndpoint<IProfilesService>("/tUNderProfilesWS.asmx", new SoapEncoderOptions(), SoapSerializer.XmlSerializer);

            // comics endpoint needs below lines of code
            app.UseRouting();
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}