using System.ComponentModel.DataAnnotations;
using PopStarManagerApi.Interfaces;

namespace PopStarManagerApi.Models
{
    public class PopStar : IPopStar
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Category { get; set; }
        public int PricePerHour { get; set; } 
        public required string Image { get; set; }
    }
}