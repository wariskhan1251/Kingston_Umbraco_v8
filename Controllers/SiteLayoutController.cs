using System;
using System.Collections.Generic;
using Umbraco.Web.Mvc;
using System.Web.Mvc;
using Kingston_Umbraco_v8.Models;
using Umbraco.Core.Models;
using System.Runtime.Caching;
using Umbraco.Web;
using System.Linq;
using Umbraco.Core.Models.PublishedContent;

namespace Kingston_Umbraco_v8.Controllers
{
    public class SiteLayoutController : SurfaceController
    {
        private const string PARTIAL_VIEW_FOLDER = "~/Views/Partials/SiteLayout/";

        public ActionResult RenderFooter()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_Footer.cshtml");
        }

        //Render the top navigation in headerpartial
        public ActionResult RenderHeader()
        {
            // List<NavigationListItem> nav = GetNavigationModelFromDatabase();
            // return PartialView(PARTIAL_VIEW_FOLDER + "_Header.cshtml");
            List<NavigationListItem> nav = GetNavigationModelFromDatabase();//GetObjectFromCache<List<NavigationListItem>>("mainNav", 5, GetNavigationModelFromDatabase);
            return PartialView(PARTIAL_VIEW_FOLDER + "_Header.cshtml", nav);
        }


        ////public ActionResult RenderHeaderSlider()
        ////{
        ////    List<HomeSlider> HomeSliderlist = new List<HomeSlider>();
        ////    HomeSlider homesliderobj = new HomeSlider();
        ////    IPublishedContent Homepageposting = CurrentPage.AncestorOrSelf(1).DescendantsOrSelf().Where(x => x.DocumentTypeAlias == "home").FirstOrDefault();
        ////    int MianImageid = Homepageposting.GetPropertyValue<int>("mainImage");
        ////    var MainImageval = Umbraco.Media(MianImageid);
        ////    string MainImageURL = MainImageval.Url;

        ////    string ImageAlt = Homepageposting.GetPropertyValue<string>("imageAlt");
        ////    string MianImageCaption = Homepageposting.GetPropertyValue<string>("imageCaption");
        ////    string VideoLink = Homepageposting.GetPropertyValue<string>("videoLink");

        ////    int SelectionId = Homepageposting.GetPropertyValue<Int32>("videoType");
        ////    var RadioTextValue = umbraco.library.GetPreValueAsString(SelectionId);

        ////    homesliderobj.MainImage = MainImageURL;
        ////    homesliderobj.ImageCaption = MianImageCaption;
        ////    homesliderobj.VideoLink = VideoLink;
        ////    homesliderobj.VideoType = RadioTextValue;
        ////    homesliderobj.ImageAlt = ImageAlt;

        ////    HomeSliderlist.Add(homesliderobj);

        ////    return PartialView(PARTIAL_VIEW_FOLDER + "_HeaderSlider.cshtml", HomeSliderlist);
        ////}

        /// <summary>
        /// Finds the home page and gets the navigation structure based on it and it's children
        /// </summary>
        /// <returns>A List of NavigationListItems, representing the structure of the site.</returns>
        private List<NavigationListItem> GetNavigationModelFromDatabase()
        {
            //const int HOME_PAGE_POSITION_IN_PATH = 1;
            //int homePageId = int.Parse(CurrentPage.Path.Split(',')[HOME_PAGE_POSITION_IN_PATH]);
            //IPublishedContent homePage = Umbraco.Content(homePageId);

            IPublishedContent homePage = CurrentPage.AncestorOrSelf(1).DescendantsOrSelf().Where(x => x.ContentType.Alias == "home").FirstOrDefault();
            List<NavigationListItem> nav = new List<NavigationListItem>();

            //// nav.Add(new NavigationListItem(new NavigationLink(homePage.Url, homePage.Name)));   // it is used for parent page show on main navigation
            nav.AddRange(GetChildNavigationList(homePage));
            return nav;
        }

        /// <summary>
        /// Loops through the child pages of a given page and their children to get the structure of the site.
        /// </summary>
        /// <param name="page">The parent page which you want the child structure for</param>
        /// <returns>A List of NavigationListItems, representing the structure of the pages below a page.</returns>
        private List<NavigationListItem> GetChildNavigationList(IPublishedContent page)
        {
            List<NavigationListItem> listItems = null;
            var childPages = page.Children.Where(x => x.IsVisible());
            if (childPages != null && childPages.Any() && childPages.Count() > 0)
            {
                //Give that menu aliases which pages required in main navigation
                //////childPages = childPages.Where(x => x.Name != null && (
                //////x.Name.ToLower().StartsWith("places to live")
                //////|| x.Name.ToLower().StartsWith("lifestyle")
                //////|| x.Name.ToLower().StartsWith("about us")
                //////|| x.Name.ToLower().Equals("get in touch")
                //////));

                listItems = new List<NavigationListItem>();
                foreach (var childPage in childPages)
                {
                    NavigationListItem listItem = new NavigationListItem(new NavigationLink(childPage.Url, childPage.Name));

                    listItem.Items = GetChildNavigationList(childPage);
                    listItems.Add(listItem);
                }
            }
            return listItems;
        }

        /// <summary>
        /// A generic function for getting and setting objects to the memory cache.
        /// </summary>
        /// <typeparam name="T">The type of the object to be returned.</typeparam>
        /// <param name="cacheItemName">The name to be used when storing this object in the cache.</param>
        /// <param name="cacheTimeInMinutes">How long to cache this object for.</param>
        /// <param name="objectSettingFunction">A parameterless function to call if the object isn't in the cache and you need to set it.</param>
        /// <returns>An object of the type you asked for</returns>
        private static T GetObjectFromCache<T>(string cacheItemName, int cacheTimeInMinutes, Func<T> objectSettingFunction)
        {
            ObjectCache cache = MemoryCache.Default;
            var cachedObject = (T)cache[cacheItemName];
            if (cachedObject == null)
            {
                CacheItemPolicy policy = new CacheItemPolicy();
                policy.AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(cacheTimeInMinutes);
                cachedObject = objectSettingFunction();
                cache.Set(cacheItemName, cachedObject, policy);
            }
            return cachedObject;
        }
    }
}