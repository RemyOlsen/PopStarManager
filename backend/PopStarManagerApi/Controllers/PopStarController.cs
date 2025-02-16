using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PopStarManagerApi.Models;

namespace PopStarManagerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PopStarController : ControllerBase
{
    private readonly PopStarContext context;
    public PopStarController(PopStarContext _context)
    {
        context = _context;
    }

    // Get all popstars
    [HttpGet]
    public async Task<List<PopStar>> Get()
    {
        List<PopStar> popStars = await context.PopStar.ToListAsync();
        return popStars;
    }

    // Get popstar by id
    [HttpGet("{id}")]
    public async Task<ActionResult<PopStar>> GetById(int id)
    {
        PopStar? item = await context.PopStar.FindAsync(id);
        if (item != null)
        {
            return Ok(item);
        }
        else
        {
            return NotFound();
        }
    }

    // Get popstar by category
    [HttpGet("category/{category}")]
    public async Task<ActionResult<List<PopStar>>> GetByCategory(string category)
    {
        List<PopStar> popStars = await context.PopStar
            .Where(p => p.Category == category)
            .ToListAsync();

        if (popStars.Any())
        {
            return Ok(popStars);
        }
        else
        {
            return NotFound();
        }
    }

    // Get popstar by name
    [HttpGet("name/{name}")]
    public async Task<ActionResult<List<PopStar>>> GetByName(string name)
    {
        List<PopStar> popStars = await context.PopStar
            .Where(p => p.Name == name)
            .ToListAsync();

        if (popStars.Any())
        {
            return Ok(popStars);
        }
        else
        {
            return NotFound();
        }
    }

    // Get popstar by price
    [HttpGet("price/{price}")]
    public async Task<ActionResult<List<PopStar>>> GetByPrice(int price)
    {
        List<PopStar> popStars = await context.PopStar
            .Where(p => p.PricePerHour == price)
            .ToListAsync();

        if (popStars.Any())
        {
            return Ok(popStars);
        }
        else
        {
            return NotFound();
        }
    }

    // Add a popstar
    [HttpPost]
    public async Task<ActionResult<PopStar>> Post([FromBody] PopStar newPopStar)
    {
        if (newPopStar == null
            || string.IsNullOrEmpty(newPopStar.Name)
            || string.IsNullOrEmpty(newPopStar.Category)
            || string.IsNullOrEmpty(newPopStar.Image))
        {
            return BadRequest();
        }

        context.PopStar.Add(newPopStar);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = newPopStar.Id }, newPopStar);
    }

    // Update a popstar
    [HttpPut("{id}")]
    public async Task<ActionResult<ItemsFeature>> Put(int id, PopStar editedPopStar)
    {
        PopStar? popStarToUpdate = await context.PopStar.FindAsync(id);
        if (popStarToUpdate == null)
        {
            return NotFound();
        }

        context.Entry(popStarToUpdate).CurrentValues.SetValues(editedPopStar);
        context.Entry(popStarToUpdate).State = EntityState.Modified;
        await context.SaveChangesAsync();

        return NoContent();
    }

    // Delete a popstar
    [HttpDelete("{id}")]
    public async Task<ActionResult<PopStar>> Delete(int id)
    {
        PopStar? popStarToDelete = await context.PopStar.FindAsync(id);
        if (popStarToDelete != null)
        {
            context.PopStar.Remove(popStarToDelete);
            await context.SaveChangesAsync();
        }

        return NoContent();
    }
}