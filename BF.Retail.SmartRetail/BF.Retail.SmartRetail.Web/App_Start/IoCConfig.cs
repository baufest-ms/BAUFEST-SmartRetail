using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;

namespace BF.Retail.SmartRetail.Web.App_Start
{
    public class IoCConfig
    {
        public static void RegisterDependencies()
        {
            #region - Create the builder -

            var builder = new ContainerBuilder();

            #endregion - Create the builder -

            #region - Setup a common pattern -

            builder.RegisterAssemblyTypes(Assembly.Load("BF.Retail.SmartRetail.Persistence"))
                   .Where(t => t.Name.EndsWith("Repository"))
                   .AsImplementedInterfaces()
                   .InstancePerRequest();

            builder.RegisterAssemblyTypes(Assembly.Load("BF.Retail.SmartRetail.Business"))
                   .Where(t => t.Name.EndsWith("Client"))
                   .AsImplementedInterfaces()
                   .InstancePerRequest();

            builder.RegisterAssemblyTypes(Assembly.Load("BF.Retail.SmartRetail.Business"))
                   .Where(t => t.Name.EndsWith("Manager"))
                   .AsImplementedInterfaces()
                   .InstancePerRequest();

            #endregion - Setup a common pattern -

            #region - Register all controllers for the assembly -

            builder.RegisterControllers(typeof(MvcApplication).Assembly)
                   .InstancePerRequest();

            builder.RegisterApiControllers(typeof(MvcApplication).Assembly)
                   .InstancePerRequest();

            #endregion - Register all controllers for the assembly -

            #region - Register modules -

            builder.RegisterAssemblyModules(typeof(MvcApplication).Assembly);

            #endregion - Register modules -

            #region - Model binder providers -

            //builder.RegisterModelBinders(Assembly.GetExecutingAssembly());
            //builder.RegisterModelBinderProvider();

            #endregion - Model binder providers -

            #region - Inject HTTP Abstractions -

            builder.RegisterModule<AutofacWebTypesModule>();

            #endregion  - Inject HTTP Abstractions -

            #region - Set the MVC dependency resolver to use Autofac -

            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container); ;

            #endregion - Set the MVC dependency resolver to use Autofac -
        }
    }
}