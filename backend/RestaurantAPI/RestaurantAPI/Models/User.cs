using System;
using System.Collections.Generic;

namespace RestaurantAPI.Models;

public partial class User
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Address { get; set; }

    public string UserName { get; set; } = null!;

    public string UserEmail { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string MobNumber { get; set; } = null!;
}
