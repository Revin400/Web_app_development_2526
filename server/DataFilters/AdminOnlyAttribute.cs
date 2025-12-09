using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Server.Filters
{
    public class AdminOnlyAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var role = context.HttpContext.Session.GetString("Role");

            if (role == null || !role.Equals("Admin", StringComparison.OrdinalIgnoreCase))
            {
                context.Result = new UnauthorizedObjectResult("Admin only");
            }
        }
    }
}
