using System;
using RestaurantAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.Configuration;

namespace RestaurantAPI.Data;

public class AppDbContext :DbContext
{
    private readonly IConfiguration _configuration;
    public AppDbContext(DbContextOptions<AppDbContext> options,IConfiguration configuration) :base(options)
    {
        _configuration = configuration;
    }

    public DbSet<User> User{get; set;}
    public DbSet<Item> Item{get; set;}
    public DbSet<Order> Order{get; set;}
    public DbSet<Restaurant> Restaurant{get;set;}

    public DbSet<MasterOrder> masterOrders{get;set;}

    public DbSet<Cart> cart{get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
                .HasIndex(mo => mo.Id)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
    }

}


       





