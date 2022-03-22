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
    public class TakmicarController : ControllerBase
    {
        public TakmicenjeContext Context { get; set; }
        public TakmicarController( TakmicenjeContext context)
        {
            Context = context;
        }

        [Route("VratiTakmicare")]
        [HttpGet]
        public async Task<ActionResult> VratiTakmicare()
        {
            try
            {
                var takmicari = await Context.Takmicari.Select(p => new
                {
                    p.ID,
                    p.Ime,
                    p.Prezime,
                    p.Drzava
                }).ToListAsync();

                if (takmicari.Count == 0)
                {
                    return BadRequest("Nema takmicara.");
                }

                return Ok(takmicari);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("DodajTakmicara")]
        [HttpPost]
        public async Task<ActionResult> DodajTakmicara([FromBody] Takmicar takmicar)
        {
            if(string.IsNullOrWhiteSpace(takmicar.Ime) || takmicar.Ime.Length > 25)
            {
                return BadRequest("Nepravilan unos imena!");
            }
            if (string.IsNullOrWhiteSpace(takmicar.Prezime) || takmicar.Prezime.Length > 25)
            {
                return BadRequest("Nepravilan unos prezimena!");
            }
            if (string.IsNullOrWhiteSpace(takmicar.Drzava) || takmicar.Drzava.Length > 50)
            {
                return BadRequest("Nepravilan unos drzave!");
            }
            try
            {
                Context.Takmicari.Add(takmicar);
                await Context.SaveChangesAsync();
                return Ok(new {message = $"Takmicar je uspesno dodat! ID je: {takmicar.ID}" , noviTakmicar = takmicar });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("IzmeniTakmicara")]
        [HttpPut]
        public async Task<ActionResult> IzmeniTakmicara([FromBody] Takmicar takmicar)
        {
            if(string.IsNullOrWhiteSpace(takmicar.Ime) || takmicar.Ime.Length > 25)
            {
                return BadRequest("Nepravilan unos imena!");
            }
            if (string.IsNullOrWhiteSpace(takmicar.Prezime) || takmicar.Prezime.Length > 25)
            {
                return BadRequest("Nepravilan unos prezimena!");
            }
            if (string.IsNullOrWhiteSpace(takmicar.Drzava) || takmicar.Drzava.Length > 50)
            {
                return BadRequest("Nepravilan unos drzave!");
            }
            try
            {
                var postojeciTakmicar = await Context.Takmicari.FirstOrDefaultAsync(x => x.ID == takmicar.ID);
                if (postojeciTakmicar != null)
                {
                    postojeciTakmicar.Ime = takmicar.Ime;
                    postojeciTakmicar.Prezime = takmicar.Prezime;
                    postojeciTakmicar.Drzava = takmicar.Drzava;
                    await Context.SaveChangesAsync();
                    return Ok(new { message = $"Uspesno promenjen takmicar {postojeciTakmicar.Ime} {postojeciTakmicar.Prezime} {postojeciTakmicar.Drzava}!", takmicar = postojeciTakmicar });
                }
                else
                {
                    return BadRequest("Takmicar nije pronadjen!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }  
        }
        [Route("IzbrisiTakmicara/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiTakmicara(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                var takmicar = await Context.Takmicari.FindAsync(id);
                string ime = takmicar.Ime;
                string prezime = takmicar.Prezime;
                string drzava = takmicar.Drzava;
                Context.Takmicari.Remove(takmicar);
                await Context.SaveChangesAsync();
                return Ok(new {message = $"Uspešno izbrisan takmicar: {ime} {prezime} {drzava}"});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
