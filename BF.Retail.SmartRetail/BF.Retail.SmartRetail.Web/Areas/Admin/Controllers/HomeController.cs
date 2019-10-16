using BF.Retail.SmartRetail.Web.Controllers;
using System.Web.Mvc;

namespace BF.Retail.SmartRetail.Web.Areas.Admin.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

    }
}