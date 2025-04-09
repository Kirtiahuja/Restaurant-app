using System;
using System.Collections.Generic;

namespace RestaurantAPI.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public string UserId { get; set; } = null!;

    public string ItemName { get; set; } = null!;

    public int Quantity { get; set; }

    public decimal ItemPrice { get; set; }

    public decimal TotalPrice { get; set; }

    public int MasterId { get; set; }
}
