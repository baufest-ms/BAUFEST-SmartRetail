using BF.Retail.SmartRetail.Domain.Contracts;
using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace BF.Retail.SmartRetail.Web.Controllers
{
    public class HomeController : BaseController
    {
        private readonly ICustomerManager customerManager;

        public HomeController(ICustomerManager customerManager)
        {
            this.customerManager = customerManager;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Search()
        {
            try
            {
                var groupId = int.Parse(ConfigurationManager.AppSettings["DefaultGroupID"]);
                var image = Convert.FromBase64String(System.Web.HttpContext.Current.Request.Form["IMAGE"]);

                var response = await customerManager.IdentifyCustomerCandidateAsync(groupId, image);

                return Json(response);
            }
            catch (Exception ex)
            {
                logger.Error(ex);
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        public ActionResult GetCustomerPhoto(int id)
        {
            try
            {
                var photo = customerManager.GetCustomerPhoto(id);

                return new FileStreamResult(new MemoryStream(photo), "image/png");
            }
            catch (Exception ex)
            {
                logger.Error(ex);
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
            }
        }

    }
}