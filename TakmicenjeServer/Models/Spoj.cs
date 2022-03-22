using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{ 
    public class Spoj 
    {
        [Key]
        public int ID { get; set; }

        [Range(1,10)]
        public int Ocena { get; set; }

        public virtual Takmicenje Takmicenje { get; set; }
        public virtual Takmicar Takmicar { get; set; }
        public virtual Sport Sport { get; set; }

    }
}