#nullable disable
using Microsoft.EntityFrameworkCore;
using PopStarManagerApi.Models;

public class PopStarContext : DbContext
{
    public PopStarContext(DbContextOptions<PopStarContext> options) : base(options){}

    public DbSet<PopStarManagerApi.Models.PopStar> PopStar { get; set; }
}