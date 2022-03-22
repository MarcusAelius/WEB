using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SportController : ControllerBase
    {
        public TakmicenjeContext Context { get; set; }
        public SportController( TakmicenjeContext context)
        {
            Context = context;
        }

        [Route("VratiSportove")]
        [HttpGet]
        public async Task<ActionResult> VratiSportove()
        {
            try
            {
                var sportovi = await Context.Sportovi
                    .Select(g => new
                    {
                        g.ID,
                        g.Naziv
                    })
                    .ToListAsync();

                if (sportovi.Count == 0)
                {
                    return BadRequest("Nema pronadjenih sportova.");
                }
                
                return Ok(sportovi);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("DodajSport")]
        [HttpPost]
        public async Task<ActionResult> DodajSport([FromBody] Sport sport)
        {
            if(string.IsNullOrWhiteSpace(sport.Naziv))
            {
                return BadRequest("Nepravilan unos naziva!");
            }
            try
            {
                Context.Sportovi.Add(sport);
                await Context.SaveChangesAsync();
                return Ok(new {message = $"Sport je uspesno dodat! ID je: {sport.ID}" , noviSport = sport });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("IzmeniSport")]
        [HttpPut]
        public async Task<ActionResult> IzmeniSport([FromBody] Sport sport)
        {
            if(string.IsNullOrWhiteSpace(sport.Naziv))
            {
                return BadRequest("Nepravilan unos naziva!");
            }
            try
            {
                var postojeciSport = await Context.Sportovi.FirstOrDefaultAsync(x => x.ID == sport.ID);
                if (postojeciSport != null)
                {
                    postojeciSport.Naziv = sport.Naziv;
                    await Context.SaveChangesAsync();
                    return Ok(new { message = $"Uspesno promenjen sport {postojeciSport.Naziv}!", sport = postojeciSport });
                }
                else
                {
                    return BadRequest("Sport nije pronadjen!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiSport/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiSport(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                var sport = await Context.Sportovi.FindAsync(id);
                Context.Sportovi.Remove(sport);
                await Context.SaveChangesAsync();
                return Ok(new {message = $"Uspešno izbrisan sport: {sport.Naziv}"});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
