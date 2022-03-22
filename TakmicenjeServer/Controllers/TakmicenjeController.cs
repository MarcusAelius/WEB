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
    public class TakmicenjeController : ControllerBase
    {
        public TakmicenjeContext Context { get; set; }
        public TakmicenjeController( TakmicenjeContext context)
        {
            Context = context;
        }

        [Route("Takmicenja")]
        [HttpGet]
        public async Task<ActionResult> Takmicenja()
        {
            try
            {
                var spojevi = await Context.Spojevi
                .Include(x => x.Takmicar)
                .Include(x => x.Sport)
                .Include(x => x.Takmicenje)
                .OrderBy(x => x.Takmicenje)
                .ToListAsync();
                return Ok(spojevi);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("Ucestvuje/{idTakmicar}/{idSporta}/{idTakmicenja}/{ocena}")]
        [HttpPost]
        public async Task<ActionResult> DodajTakmicenje(int idTakmicar, int idSporta, int idTakmicenja, int ocena)
        {
            if (idTakmicar < 0 || idSporta < 0 || idTakmicenja < 0)
            {
                return BadRequest("Pogrešan ID");
            }
            if (ocena < 0 || ocena > 10)
            {
                return BadRequest("Pogrešna ocena");
            }
            try
            {
                var takmicar = await Context.Takmicari.Where(p => p.ID == idTakmicar).FirstOrDefaultAsync();
                var sport = await Context.Sportovi.Where(p => p.ID == idSporta).FirstOrDefaultAsync();
                var takmicenje = await Context.Takmicenja.FindAsync(idTakmicenja);

                Spoj s = new Spoj
                {
                    Takmicar = takmicar,
                    Sport = sport,
                    Takmicenje = takmicenje,
                    Ocena = ocena
                };

                Context.Spojevi.Add(s);
                await Context.SaveChangesAsync();

                return Ok(new {message = "Uspesno!", spoj = s});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("IzmeniOcenu")]
        [HttpPut]
        public async Task<ActionResult> IzmeniOcenu(IzmeniOcenuDto model)
        {
            try
            {
                var postojeceTakmicenje = await Context.Spojevi.FirstOrDefaultAsync(x => x.ID == model.TakmicenjeId);
                if (postojeceTakmicenje != null)
                {
                    var staraOcena = postojeceTakmicenje.Ocena;
                    postojeceTakmicenje.Ocena = model.Ocena;
                    await Context.SaveChangesAsync();
                    return Ok(new { message = $"Uspesno promenjena ocena sa {staraOcena} na {postojeceTakmicenje.Ocena}!" });
                }
                else
                {
                    return BadRequest("Takmicenje nije pronadjen!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }  
        }
        [Route("IzbrisiTakmicenje/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiTakmicenje(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            try
            {
                var spoj = await Context.Spojevi.FindAsync(id);
                Context.Spojevi.Remove(spoj);
                await Context.SaveChangesAsync();
                return Ok(new {message = $"Uspesno uklonjen takmicar sa takmicenja!"});
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
