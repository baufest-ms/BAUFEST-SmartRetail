using BF.Retail.SmartRetail.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace BF.Retail.SmartRetail.Web.Areas.Admin.Models
{
    public class ProductViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The field '{0}' is mandatory")]
        [StringLength(20, ErrorMessage = "The field '{0}' must have a maximum of {1} characters")]
        public string Code { get; set; }

        [Required(ErrorMessage = "The field '{0}' is mandatory")]
        [StringLength(50, ErrorMessage = "The field '{0}' must have a maximum of {1} characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The field '{0}' is mandatory")]
        [StringLength(50, ErrorMessage = "The field '{0}' must have a maximum of {1} characters")]
        public string Description { get; set; }

        [Required(ErrorMessage = "The field '{0}' is mandatory")]
        [RegularExpression(@"[0-9]*\.?[0-9]+", ErrorMessage = "{0} must be a Number.")]
        [Range(0.01, 999999999, ErrorMessage = "Price must be greater than 0.00")]
        public decimal Price { get; set; }

        public ProductViewModel()
        {
        }

        public ProductViewModel(Product productEntity)
        {
            Id = productEntity?.Id ?? 0;
            Code = productEntity?.Code ?? "-";
            Name = productEntity?.Name ?? "-";
            Description = productEntity?.Description ?? "-";
            Price = productEntity?.Price ?? 0;
        }

        public Product ToEntity()
        {
            return new Product
            {
                Id = Id,
                Code = Code,
                Name = Name,
                Description = Description,
                Price= Price
            };
        }

    }
}