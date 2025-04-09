using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Models;

public partial class MasterOrder
{
    [Key]
    public int MasterId { get; set; }

    public string UserId { get; set; } = null!;

    public int RestaurantId { get; set; }

    public decimal GrandTotal { get; set; }
}
