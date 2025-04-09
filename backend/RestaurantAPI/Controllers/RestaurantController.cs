using System.Linq.Expressions;
using RestaurantAPI.Data;
using RestaurantAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace RestaurantAPI.Controllers
{
    [Route("api/Restaurant")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        public readonly ILogger<RestaurantController> _logger;
        public readonly AppDbContext _context;
        public readonly string baseurl="https://fakerestaurantapi.runasp.net/images/";

       public RestaurantController(ILogger<RestaurantController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> getrestaurants()
    {
        Random random = new Random();
        var menu = new List<Restaurant>();
        var restaurants= await _context.Restaurant.OrderBy(r=>r.RestaurantId).ToListAsync();
        foreach(var rest in restaurants)
        {
                
                menu.Add(new Restaurant()
                {
                    RestaurantId = rest.RestaurantId,
                    RestaurantName = rest.RestaurantName,
                    Address = rest.Address,
                    Type = rest.Type,
                    Rating = (int)random.Next(1,5),
                    ImageUrl = rest.ImageUrl
                });
        }

        return Ok(menu);
    }

    [HttpPost]
    public async Task<ActionResult> addrestaurant( List<RestaurantDTO> restaurantDTOs)
    {

            List<Restaurant> restaurants = new List<Restaurant>();
            try
            {
                foreach (RestaurantDTO restaurantDTO in restaurantDTOs)
                {
                    var restaurant_exists = await _context.Restaurant.AnyAsync(r => r.RestaurantName == restaurantDTO.RestaurantName);
                    if (!restaurant_exists)
                    {
                        Restaurant new_restaurant = new Restaurant()
                        {
                            RestaurantId = restaurantDTO.RestaurantID,
                            RestaurantName = restaurantDTO.RestaurantName,
                            Address = restaurantDTO.Address,
                            Type = restaurantDTO.Type,
                            Rating = restaurantDTO.Rating,
                            ParkingLot = restaurantDTO.ParkingLot,
                            ImageUrl = restaurantDTO.ImageUrl
                        };
                        restaurants.Add(new_restaurant);
                    }
                }

                    await _context.Restaurant.AddRangeAsync(restaurants);
                    var a = await _context.SaveChangesAsync();
                    return StatusCode(201, restaurantDTOs);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Conflict(new{message="Restaurant Already Exists"});
    }

     [HttpGet("{Restaurant_id}")]
     public async Task<ActionResult> getrestaurantbyid([FromRoute] int Restaurant_id)
     {
        var restaurant = await  _context.Restaurant.FirstOrDefaultAsync(r => r.RestaurantId == Restaurant_id);
        if(restaurant != null)
        {
            return Ok(restaurant);
        }
        return StatusCode(404, $"No Restaurant Exists with {Restaurant_id}");
     }



        [HttpGet("{Restaurant_id}/menu")]
        public async Task<ActionResult> getmenu(int Restaurant_id)
        {
            var restaurant_exists= await _context.Restaurant.FirstOrDefaultAsync(r=>r.RestaurantId == Restaurant_id);
            if(restaurant_exists!= null)
            {
                //retrieve items from restaurant menu
                var items= await _context.Item.Where(i => i.RestaurantId == Restaurant_id).ToListAsync();

                var menu = items.Where(i=>i.RestaurantId== Restaurant_id).Select(i=>new GetItems{
                    ItemID= i.ItemId,
                     ItemName= i.ItemName,
                    ItemDescription=i.ItemDescription,
                    ItemPrice=i.ItemPrice,
                    RestaurantID= Restaurant_id,
                    ImageUrl=i.ImageUrl
                   // restaurant= restaurant_exists
                   
                   
                }).ToList();

                return Ok(menu);
                

            }
            return StatusCode(404, $"No Restaurant Exists with id:{Restaurant_id}");
        }

        [HttpPost("{Restaurant_id}/additem")]
        public async Task<ActionResult> setmenu([FromBody] List<ItemDTO> itemDTOs, int Restaurant_id = 0)
        {
            List<Item> items = new List<Item>();
             var restaurant_exists= await _context.Restaurant.FirstOrDefaultAsync(r=>r.RestaurantId == (Restaurant_id+1));
            try
            {
                //if (restaurant_exists != null)
                //{
                    foreach (var itemDTO in itemDTOs)
                    {

                        Item newitem = new Item
                        {

                            ItemName = itemDTO.ItemName,
                            ItemDescription = itemDTO.ItemDescription,
                            ItemPrice = itemDTO.ItemPrice,
                            RestaurantId = itemDTO.RestaurantID,
                            ImageUrl = itemDTO.imageUrl

                        };
                        items.Add(newitem);
                    }
                    ;
                    await _context.Item.AddRangeAsync(items);
                    var a = await _context.SaveChangesAsync();
                    return StatusCode(201, items);
                //}
            }
            catch(Exception ex)
            {
                throw ex;
            }
          
            return StatusCode(404, $"No Restaurant Exists with id:{Restaurant_id}");
        }

        [NonAction]
        [HttpPut]
        public async Task<ActionResult> updateimageurl(int id,string url1,string url2, string url3)
        {
           
            
                var menu = await _context.Item.Where(i=>i.RestaurantId == id).Select(i=>new Item{
                    ItemId = i.ItemId,
                    ItemName= i.ItemName,
                    ItemDescription=i.ItemDescription,
                    ItemPrice=i.ItemPrice,
                    RestaurantId = id,
                    ImageUrl=i.ImageUrl
                }).ToListAsync();
                int i=0;
                  var urls = new string[] { url1, url2, url3 };
            foreach(var item in menu)
            {
                var item12 = _context.Item
                    .FirstOrDefault(i => i.ItemName == item.ItemName && i.RestaurantId == id);
                if (item12 != null)
                {
                    item12.ImageUrl = urls[i];
                }
                i++;
            }
              await _context.SaveChangesAsync();
            return Ok();
            
        }

          [HttpGet("items")]
    public async Task<ActionResult> getitems([FromQuery]  string ItemName="",string sortbyprice="")
    {
        //ascending
        var items= await _context.Item.OrderBy(r=>r.ItemName).ToListAsync();
        if(items.Any())
        {
             if (!string.IsNullOrEmpty(ItemName))
                {
                    items = items.Where(r => r.ItemName.Contains(ItemName, StringComparison.OrdinalIgnoreCase)).ToList();
                }
            if(!string.IsNullOrEmpty(sortbyprice))
                {
                    if(string.Equals(sortbyprice,"asc",StringComparison.OrdinalIgnoreCase))
                    {
                        items= items.OrderBy(i=>i.ItemPrice).ToList();
                    }
                    if(string.Equals(sortbyprice,"desc",StringComparison.OrdinalIgnoreCase))
                    {
                        items= items.OrderByDescending(i=>i.ItemPrice).ToList();
                    }
                   
                    items= items.ToList();
                }


            
            var all_items =  items.Select(i=>new GetItems{

                ItemID = i.ItemId,
                 ItemName= i.ItemName,
                 ItemDescription=i.ItemDescription,
                 ItemPrice=i.ItemPrice,
                 RestaurantID= i.RestaurantId,
                 ImageUrl=i.ImageUrl,
            }).ToList();

            return Ok(all_items);
        }
        else{
            return StatusCode(404,"No items Found");
        }
    }
        
        

    }
}


/* const cloudinaryUrl = ' https://api.cloudinary.com/v1_1/dxgirg1se/image/upload';
        const uploadPreset = 'blog-image';
         async function selectAndUploadImage(quill) {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
                const file = input.files[0];
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', uploadPreset);

                    try {
                        const response = await fetch(cloudinaryUrl, {
                            method: 'POST',
                            body: formData
                        });

                        if (response.ok) {
                            const data = await response.json();
                            const imageUrl = data.secure_url;

                            // Insert the uploaded image into Quill
                            const range = quill.getSelection();
                            quill.insertEmbed(range.index, 'image', imageUrl);
                        } else {
                            alert('Image upload failed.');
                        }
                    } catch (error) {
                        console.error('Error uploading image:', error);
                        alert('An error occurred while uploading the image.');
                    }
                }
            };
        }
          
*/
