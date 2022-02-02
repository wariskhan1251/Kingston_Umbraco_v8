using System.Web;
using System.Web.Mvc;

namespace Kingston_Umbraco_v8
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
