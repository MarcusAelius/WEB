using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Takmicar")]
    public class Takmicar
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(25)]
        [RegularExpression("[a-zA-Z]+")]
        public string Ime { get; set; }

        [Required]
        [MaxLength(25)]
        [RegularExpression("[a-zA-Z]+")]
        public string Prezime { get; set; }

        [Required]
        [MaxLength(50)]
        //[RegularExpression("[a-zA-Z]")]
        public string Drzava { get; set; }

        [JsonIgnore]
        public virtual List<Spoj> TakmicarSport { get; set; }
    }
}