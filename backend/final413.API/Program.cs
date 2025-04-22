using final413.API.Data;
using Microsoft.EntityFrameworkCore;
// using 413final.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EntDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("EntConnection")));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactAppBlah",
        policy => {
            policy.WithOrigins("http://localhost:3000", "https://black-rock-02665271e.6.azurestaticapps.net")
                .AllowAnyMethod()
                .AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactAppBlah");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
