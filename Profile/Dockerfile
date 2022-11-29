#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Profile_MS/Profile_MS.csproj", "Profile_MS/"]
RUN dotnet restore "Profile_MS/Profile_MS.csproj"
COPY . .
WORKDIR "/src/Profile_MS"
RUN dotnet build "Profile_MS.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Profile_MS.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Profile_MS.dll","--urls","http://0.0.0.0:${PORT}"]
