using System.ComponentModel.DataAnnotations;

namespace BF.Retail.SmartRetail.Domain.Entities
{
    public class Group : BaseEntity
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

    }
}