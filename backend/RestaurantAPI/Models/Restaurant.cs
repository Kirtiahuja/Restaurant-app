using System;
using System.Collections.Generic;

namespace RestaurantAPI.Models;

public partial class Restaurant
{
    public int RestaurantId { get; set; }

    public string? RestaurantName { get; set; }

    public string? Address { get; set; }

    public string? Type { get; set; }

    public int? Rating { get; set; }

    public bool? ParkingLot { get; set; }

    public string? ImageUrl { get; set; }
}
