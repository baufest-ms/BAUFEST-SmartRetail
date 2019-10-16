using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Exceptions;
using System.Web.Http;

namespace BF.Retail.SmartRetail.Web.Controllers
{
    public class ProductsController : BaseAPIController
    {
        private readonly IProductManager productManager;

        public ProductsController(IProductManager productManager)
        {
            this.productManager = productManager;
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(productManager.GetAll());
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            try
            {
                var product = productManager.GetById(id);

                if (product != null)
                {
                    return Ok(product);
                }

                return NotFound();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IHttpActionResult GetByCode(string code)
        {
            try
            {
                var product = productManager.GetByCode(code);

                if (product != null)
                {
                    return Ok(product);
                }

                return NotFound();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
