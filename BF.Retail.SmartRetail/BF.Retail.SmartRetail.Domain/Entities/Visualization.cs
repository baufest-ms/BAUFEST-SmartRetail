using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BF.Retail.SmartRetail.Domain.Entities
{
    public class Visualization
    {
        [Key]
        [Column(Order = 0)]
        [ForeignKey("Person")]
        public int PersonId { get; set; }

        [Key]
        [Column(Order = 1)]
        [ForeignKey("Product")]
        public int ProductId { get; set; }

        public Person Person { get; set; }

        public Product Product { get; set; }

    }
}
