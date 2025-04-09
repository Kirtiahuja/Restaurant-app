using System;
using System.Collections.Generic;

namespace RestaurantAPI.Models;

public partial class Country
{
    public int Id { get; set; }

    public string Iso { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Iso3 { get; set; }

    public int? Numcode { get; set; }

    public int Phonecode { get; set; }
}
