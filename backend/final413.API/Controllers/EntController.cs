using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using final413.API.Data;

namespace final413.API.Controllers;

[ApiController]
[Route("[controller]")]
public class EntController : ControllerBase
{
    private readonly EntDbContext _entContext;

    public EntController(EntDbContext context)
    {
        _entContext = context;
    }

    // GET: /Ent/AllEnts
    [HttpGet("AllEnts")]
    public async Task<IActionResult> GetAllEntertainers()
    {
        var ents = await _entContext.Entertainers
            .Select(e => new
            {
                entertainerId = e.EntertainerId,
                entStageName = e.EntStageName,
                entSsn = e.EntSsn,
                entStreetAddress = e.EntStreetAddress,
                entCity = e.EntCity,
                entState = e.EntState,
                entZipCode = e.EntZipCode,
                entPhoneNumber = e.EntPhoneNumber,
                entWebPage = e.EntWebPage,
                entEmailAddress = e.EntEmailAddress,
                dateEntered = e.DateEntered,

                bookingsCount = _entContext.Engagements.Count(g => g.EntertainerId == e.EntertainerId),
                lastBookingDate = _entContext.Engagements
                    .Where(g => g.EntertainerId == e.EntertainerId)
                    .OrderByDescending(g => g.StartDate)
                    .Select(g => g.StartDate)
                    .FirstOrDefault()
            })
            .ToListAsync();

        return Ok(new { ents });
    }


    // GET: /Ent/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEntertainer(int id)
    {
        var ent = await _entContext.Entertainers.FindAsync(id);
        if (ent == null) return NotFound();
        return Ok(ent);
    }

    // POST: /Ent/AddEnt
    [HttpPost("AddEnt")]
    public async Task<IActionResult> AddEntertainer([FromBody] Entertainer newEnt)
    {
        _entContext.Entertainers.Add(newEnt);
        await _entContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEntertainer), new { id = newEnt.EntertainerId }, newEnt);
    }

    // PUT: /Ent/UpdateEntt/{id}
    [HttpPut("UpdateEnt/{id}")]
    public async Task<IActionResult> UpdateEntertainer(int id, [FromBody] Entertainer updatedEnt)
    {
        if (id != updatedEnt.EntertainerId)
            return BadRequest("ID mismatch");

        var existing = await _entContext.Entertainers.FindAsync(id);
        if (existing == null)
            return NotFound();

        // Update fields manually to avoid tracking conflict
        existing.EntStageName = updatedEnt.EntStageName;
        existing.EntSsn = updatedEnt.EntSsn;
        existing.EntStreetAddress = updatedEnt.EntStreetAddress;
        existing.EntCity = updatedEnt.EntCity;
        existing.EntState = updatedEnt.EntState;
        existing.EntZipCode = updatedEnt.EntZipCode;
        existing.EntPhoneNumber = updatedEnt.EntPhoneNumber;
        existing.EntWebPage = updatedEnt.EntWebPage;
        existing.EntEmailAddress = updatedEnt.EntEmailAddress;
        existing.DateEntered = updatedEnt.DateEntered;

        await _entContext.SaveChangesAsync();
        return NoContent();
    }


    // DELETE: /Ent/DeleteEnt/{id}
    [HttpDelete("DeleteEnt/{id}")]
    public async Task<IActionResult> DeleteEntertainer(int id)
    {
        var ent = await _entContext.Entertainers.FindAsync(id);
        if (ent == null) return NotFound();

        _entContext.Entertainers.Remove(ent);
        await _entContext.SaveChangesAsync();
        return NoContent();
    }
}
