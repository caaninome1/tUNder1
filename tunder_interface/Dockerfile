#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["tunder_interface/tunder_interface.csproj", "tunder_interface/"]
RUN dotnet restore "tunder_interface/tunder_interface.csproj"
COPY . .
WORKDIR "/src/tunder_interface"
RUN dotnet build "tunder_interface.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "tunder_interface.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "tunder_interface.dll"]
