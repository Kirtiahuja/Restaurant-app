using System;
using System.Collections.Generic;

namespace RestaurantAPI.Models;

public partial class Cart
{
    public int CartId { get; set; }

    public string UserId { get; set; } = null!;

    public int ItemId { get; set; }

    public string ItemName { get; set; } = null!;

    public int Quantity { get; set; }

    public decimal ItemPrice { get; set; }
}
