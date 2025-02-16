using Microsoft.EntityFrameworkCore;
using PopStarManagerApi.Models; // Change the 'FolderName' to the name of the API folder

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<PopStarContext>(
    options => options.UseSqlite("Data Source=PopStarDB.db") //Customize the name of æDatabaseName'.db
);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*
    Setter opp CORS slik at Web Apiet er mulig å anvende utenfor sitt eget domene.
*/
builder.Services.AddCors(
    options => {
        options.AddPolicy("AllowAll",
            builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
        );
    }
);

var app = builder.Build();
// Setter applikasjonen til å benytte CORS-konfirasjonen over
app.UseCors("AllowAll");
// Åpner opp wwwroot for bruk
DefaultFilesOptions options = new DefaultFilesOptions();
options.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(options);
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();