using System.ComponentModel.DataAnnotations;

namespace BF.Retail.SmartRetail.Domain
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }

    }
}
