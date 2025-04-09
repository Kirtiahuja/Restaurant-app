using System;
using System.Collections.Generic;

namespace RestaurantAPI.Models;

public partial class Item
{
    public int ItemId { get; set; }

    public string ItemName { get; set; } = null!;

    public string ItemDescription { get; set; } = null!;

    public decimal ItemPrice { get; set; }

    public int RestaurantId { get; set; }

    public string ImageUrl { get; set; } = null!;
}
