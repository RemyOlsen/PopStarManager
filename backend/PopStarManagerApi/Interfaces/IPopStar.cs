namespace PopStarManagerApi.Interfaces;

public interface IPopStar
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public int PricePerHour { get; set; }
    public string Image { get; set; }
}