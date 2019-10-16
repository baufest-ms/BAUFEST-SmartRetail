using System.Web.Optimization;

namespace BF.Retail.SmartRetail.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Styles Bundling
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Site.css"
            ));

            bundles.Add(new StyleBundle("~/Content/css-admin").Include(
                "~/Content/bootstrap.css",
                "~/Areas/Admin/Content/Site.css"
            ));

            // Scripts Bundling
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/jquery.validate*"
            ));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"
            ));

            bundles.Add(new ScriptBundle("~/bundles/popper").Include(
                "~/Scripts/umd/popper.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/bfsmartretail").Include(
                "~/Scripts/bf.smartretail.core.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/bfsmartretail-panel").Include(
                "~/Scripts/bf.smartretail.panel.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/bfsmartretail-admin").Include(
                "~/Areas/Admin/Scripts/bf.smartretail.admin.core.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/bfsmartretail-admin-groups").Include(
                "~/Areas/Admin/Scripts/bf.smartretail.admin.groups.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/bfsmartretail-admin-people").Include(
                "~/Areas/Admin/Scripts/bf.smartretail.admin.people.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/bfsmartretail-admin-faces").Include(
                "~/Areas/Admin/Scripts/bf.smartretail.admin.faces.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/bfsmartretail-admin-products").Include(
                "~/Areas/Admin/Scripts/bf.smartretail.admin.products.js"
            ));

        }
    }
}
