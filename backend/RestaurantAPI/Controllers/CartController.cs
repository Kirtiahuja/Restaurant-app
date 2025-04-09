using RestaurantAPI.Data;
using RestaurantAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RestaurantAPI.Properties
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

         public readonly ILogger<CartController> _logger;
        public readonly AppDbContext _context;

       public CartController(ILogger<CartController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    }
}
