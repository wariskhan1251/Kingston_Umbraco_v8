using Kingston_Umbraco_v8.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Umbraco.Core.Models;
using Umbraco.Web;
using Umbraco.Web.Mvc;

namespace Solution.Common
{
    public class GetCropedImage
    {
        public static GetCropedImageVM GetImage(int PageId, string ImageAlias)
        {
            GetCropedImageVM objGetCropedImage = new GetCropedImageVM();
            string strImageUrl = "";
            string strImageAlt = "";
            var umbracoHelper = new UmbracoHelper(UmbracoContext.Current);
            IPublishedContent currentPage = umbracoHelper.TypedContent(PageId);
            if (currentPage != null && !string.IsNullOrEmpty(ImageAlias))
            {
                if (currentPage.HasProperty(ImageAlias) && currentPage.HasValue(ImageAlias))
                {
                    var ImageStringVal = currentPage.GetPropertyValue<string>(ImageAlias);
                    var objImageContext = new JavaScriptSerializer().Deserialize<MtxImageCropperVM>(ImageStringVal);
                    if (objImageContext != null && objImageContext.imageId != 0)
                    {
                        if (objImageContext != null && objImageContext.imageId != 0)
                        {
                            var umbracoHelperCurrentContext = new UmbracoHelper(UmbracoContext.Current);
                            var mediaItem = umbracoHelperCurrentContext.TypedMedia(objImageContext.imageId);
                            strImageUrl = mediaItem.Url;
                        }
                    }
                    if (objImageContext != null && objImageContext.title != "")
                    { strImageAlt = objImageContext.title; }
                }
            }
            objGetCropedImage.ImageUrl = strImageUrl;
            objGetCropedImage.ImageAlt = strImageAlt;
            return objGetCropedImage;
        }

        public static GetCropedImageVM GetImage(IPublishedContent currentPage, string ImageAlias)
        {
            GetCropedImageVM objGetCropedImage = new GetCropedImageVM();
            string strImageUrl = "";
            string strImageAlt = "";
            if (currentPage != null && !string.IsNullOrEmpty(ImageAlias))
            {
                if (currentPage.HasProperty(ImageAlias) && currentPage.HasValue(ImageAlias))
                {
                    var ImageStringVal = currentPage.GetPropertyValue<string>(ImageAlias);
                    var objImageContext = new JavaScriptSerializer().Deserialize<MtxImageCropperVM>(ImageStringVal);
                    if (objImageContext != null && objImageContext.imageId != 0)
                    {
                        if (objImageContext != null && objImageContext.imageId != 0)
                        {
                            var umbracoHelperCurrentContext = new UmbracoHelper(UmbracoContext.Current);
                            var mediaItem = umbracoHelperCurrentContext.TypedMedia(objImageContext.imageId);
                            strImageUrl = mediaItem.Url;
                        }
                    }
                    if (objImageContext != null && objImageContext.title != "")
                    { strImageAlt = objImageContext.title; }
                }
            }
            objGetCropedImage.ImageUrl = strImageUrl;
            objGetCropedImage.ImageAlt = strImageAlt;
            return objGetCropedImage;
        }

        public static GetCropedImageVM GetImage(ArchetypeFieldsetModel currentPage, string ImageAlias)
        {
            GetCropedImageVM objGetCropedImage = new GetCropedImageVM();
            string strImageUrl = "";
            string strImageAlt = "";
            if (currentPage != null && !string.IsNullOrEmpty(ImageAlias) && currentPage.HasProperty(ImageAlias))
            {
                if (currentPage.HasProperty(ImageAlias) && currentPage.HasValue(ImageAlias))
                {
                    var ImageStringVal = currentPage.GetValue<string>(ImageAlias);
                    var objImageContext = new JavaScriptSerializer().Deserialize<MtxImageCropperVM>(ImageStringVal);
                    if (objImageContext != null && objImageContext.imageId != 0)
                    {
                        if (objImageContext != null && objImageContext.imageId != 0)
                        {
                            var umbracoHelperCurrentContext = new UmbracoHelper(UmbracoContext.Current);
                            var mediaItem = umbracoHelperCurrentContext.TypedMedia(objImageContext.imageId);
                            strImageUrl = mediaItem.Url;
                        }
                    }
                    if (objImageContext != null && objImageContext.title != "")
                    { strImageAlt = objImageContext.title; }
                }
            }
            objGetCropedImage.ImageUrl = strImageUrl;
            objGetCropedImage.ImageAlt = strImageAlt;
            return objGetCropedImage;
        }

        public static GetCropedImageVM GetImage(LeBlenderValue LeBlenderValueContext, string ImageAlias)
        {
            GetCropedImageVM objGetCropedImage = new GetCropedImageVM();
            string strImageUrl = "";
            string strImageAlt = "";

            if (LeBlenderValueContext != null && LeBlenderValueContext.HasProperty(ImageAlias) && LeBlenderValueContext.GetValue(ImageAlias) != null && LeBlenderValueContext.GetValue<string>(ImageAlias) != "")
            {
                var ImageStringVal = LeBlenderValueContext.GetValue<string>(ImageAlias);
                var objImageContext = new JavaScriptSerializer().Deserialize<MtxImageCropperVM>(ImageStringVal);
                if (objImageContext != null && objImageContext.imageId != 0)
                {
                    if (objImageContext != null && objImageContext.imageId != 0)
                    {
                        var umbracoHelperCurrentContext = new UmbracoHelper(UmbracoContext.Current);
                        var mediaItem = umbracoHelperCurrentContext.TypedMedia(objImageContext.imageId);
                        strImageUrl = mediaItem.Url;
                    }
                }
                if (objImageContext != null && objImageContext.title != "")
                { strImageAlt = objImageContext.title; }
            }
            objGetCropedImage.ImageUrl = strImageUrl;
            objGetCropedImage.ImageAlt = strImageAlt;
            return objGetCropedImage;
        }
    }
}