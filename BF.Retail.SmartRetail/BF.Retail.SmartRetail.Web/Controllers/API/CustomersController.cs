using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Exceptions;
using BF.Retail.SmartRetail.Web.Models.API;
using System.Threading.Tasks;
using System.Web.Http;

namespace BF.Retail.SmartRetail.Web.Controllers
{
    public class CustomersController : BaseAPIController
    {
        private readonly ICustomerManager customerManager;

        public CustomersController(ICustomerManager customerManager)
        {
            this.customerManager = customerManager;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Register(CustomerApiModel customerApiModel)
        {
            try
            {
                var customerId = await customerManager.Register(customerApiModel.ToDTO());

                return Ok(new { CustomerId = customerId });
            }
            catch (DuplicateEntryException)
            {
                return Conflict();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
