using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Takmicenje")]
    public class Takmicenje
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(25)]
        [RegularExpression("[a-zA-Z]+")]
        public string Naziv { get; set; }
        [JsonIgnore]
        public virtual List<Spoj> TakmicarSport { get; set; }
    }
}