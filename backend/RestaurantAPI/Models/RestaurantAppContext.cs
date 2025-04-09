using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RestaurantAPI.Models;

public partial class RestaurantAppContext : DbContext
{
    public RestaurantAppContext()
    {
    }

    public RestaurantAppContext(DbContextOptions<RestaurantAppContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<MasterOrder> MasterOrders { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Restaurant> Restaurants { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=RestaurantApp;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.ToTable("cart");

            entity.Property(e => e.CartId).HasColumnName("cartID");
            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.ItemPrice).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UserId)
                .HasMaxLength(450)
                .HasColumnName("UserID");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Country__3214EC07A6280062");

            entity.ToTable("Country");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Iso)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Iso3)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasDefaultValueSql("(NULL)");
            entity.Property(e => e.Name)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.Numcode).HasDefaultValueSql("(NULL)");
        });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.ToTable("Item");

            entity.HasIndex(e => e.RestaurantId, "IX_Item_RestaurantID");

            entity.Property(e => e.ItemId).HasColumnName("ItemID");
            entity.Property(e => e.ImageUrl).HasColumnName("imageUrl");
            entity.Property(e => e.ItemPrice).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.RestaurantId).HasColumnName("RestaurantID");
        });

        modelBuilder.Entity<MasterOrder>(entity =>
        {
            entity.HasKey(e => e.MasterId);

            entity.ToTable("masterOrders");

            entity.Property(e => e.MasterId).HasColumnName("MasterID");
            entity.Property(e => e.GrandTotal).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.RestaurantId).HasColumnName("RestaurantID");
            entity.Property(e => e.UserId)
                .HasMaxLength(450)
                .HasColumnName("UserID");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Order");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ItemPrice).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.MasterId).HasColumnName("MasterID");
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.UserId)
                .HasMaxLength(450)
                .HasColumnName("UserID");
        });

        modelBuilder.Entity<Restaurant>(entity =>
        {
            entity.ToTable("Restaurant");

            entity.Property(e => e.RestaurantId).HasColumnName("RestaurantID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
