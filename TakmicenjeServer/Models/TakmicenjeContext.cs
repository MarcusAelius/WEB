using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class TakmicenjeContext : DbContext
    {
        public DbSet<Takmicar> Takmicari { get; set; }
        public DbSet<Sport> Sportovi { get; set; }
        public DbSet<Takmicenje> Takmicenja { get; set; }
        public DbSet<Spoj> Spojevi { get; set; }
        public TakmicenjeContext(DbContextOptions options) : base(options)
        {

        }
    }
}
    