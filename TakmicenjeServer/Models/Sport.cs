using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Sport")]
    public class Sport
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(25)]
        public string Naziv { get; set; }
        
        [JsonIgnore]
        public virtual List<Spoj> SportTakmicar { get; set; }
    }
}