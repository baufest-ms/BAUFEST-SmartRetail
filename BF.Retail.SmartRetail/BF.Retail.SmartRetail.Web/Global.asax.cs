using BF.Retail.SmartRetail.Web.App_Start;
using NLog;
using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace BF.Retail.SmartRetail.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        // Common properties
        private readonly ILogger logger = LogManager.GetCurrentClassLogger();

        protected void Application_Start()
        {
            logger.Info("Starting BF.Retail.SmartRetail...");

            IoCConfig.RegisterDependencies();

            GlobalConfiguration.Configure(WebApiConfig.Register);

            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //AppDomain.CurrentDomain.FirstChanceException += (sender, eventArgs) =>
            //{
            //    logger.Error(eventArgs.Exception);
            //};

            logger.Info("BF.Retail.SmartRetail has been started successfully");
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            var exception = Server.GetLastError();
            if (exception != null)
            {
                logger.Error(exception);
            }
        }
    }
}
