using Coders_Gowth.Dominio;
using Coders_Growth.Infra;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IRepositorio, Linq2DB>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var AllowSpecificOrigins = "_allowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
                      policy =>
                      {

                          policy.WithOrigins("https://localhost:59606",
                                              "http://localhost:59607");
                      });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")
                ),
    ContentTypeProvider = new FileExtensionContentTypeProvider
    {
        Mappings = { [".properties"] = "application/x-msdownload" }
    }
});

app.UseDefaultFiles();
app.UseFileServer();
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

//app.UseCors(options => {
//    options.AllowAnyOrigin();
//    options.AllowAnyMethod();
//    options.AllowAnyHeader();
//});

app.MapControllers();

app.Run();