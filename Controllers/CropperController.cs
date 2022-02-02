using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Web.Mvc;
using System.Web.Mvc;
using Umbraco.Web;
using Umbraco.Core.Models;
using Umbraco.Core.Services;
using System.Collections;
using System.IO;
using System.IO.MemoryMappedFiles;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Umbraco.Web.Models;

namespace Kingston_Umbraco_v8.Controllers
{
    public class CropperController : SurfaceController
    {

        [System.Web.Http.HttpPost]
        public ActionResult SaveFiles(string FileNameValue, string FolderID, string ImageID, string ImageBytesValue, string Alias)
        {
            int[] Ids = new int[10];
            if (ImageBytesValue == null || ImageBytesValue == "")
                return Json("The file is corrupted!");

            string[] strfilenameval = null;
            string filenamepreval = "", filenamepostval = "";
            int Maxids = 0;
            int MaxNextId = 0;

            IMediaService mediaService = Services.MediaService;
            var AllMediaItems = mediaService.GetRootMedia();

            if (AllMediaItems != null)
                Maxids = AllMediaItems.Max(x => x.Id);

            if (Maxids > 0)
                MaxNextId = (Maxids + 1);

            if (!string.IsNullOrEmpty(FileNameValue) && FileNameValue.Trim() != "")
            {
                strfilenameval = FileNameValue.Split('.');
                filenamepreval = strfilenameval[0];
                filenamepostval = strfilenameval[1];

                filenamepreval += "-" + MaxNextId;

                FileNameValue = filenamepreval + "." + filenamepostval;
                ////Bitmap sourceImage = new Bitmap(Images);
                byte[] bytes = Convert.FromBase64String(ImageBytesValue.Split(',')[1]);
                using (System.IO.FileStream stream = new System.IO.FileStream(HttpContext.Server.MapPath("~/Crops/" + FileNameValue), System.IO.FileMode.Create))
                {
                    stream.Write(bytes, 0, bytes.Length);
                    stream.Flush();
                    stream.Close();
                }
            }

            //// string FullTempPath = "";
            if (FileNameValue != null && System.IO.File.Exists(Server.MapPath("~/Crops/" + FileNameValue)))
            {

                try
                {
                    IMediaService ms = Services.MediaService;

                    IMedia media = Services.MediaService.CreateMedia(FileNameValue, Constants.System.Root, Constants.Conventions.MediaTypes.Image);
                    byte[] buffer = System.IO.File.ReadAllBytes(System.IO.Path.GetFullPath(Server.MapPath("~/Crops/" + FileNameValue)));
                    System.IO.MemoryStream strm = new MemoryStream(buffer);
                    // Set the property value (Umbraco will handle the underlying magic)
                    media.SetValue(Services.ContentTypeBaseServices, Constants.Conventions.Media.File, FileNameValue, strm);
                    // Save the media
                    Services.MediaService.Save(media);

                    ////var newimage = ms.CreateMedia(FileNameValue, -1, "Image");
                    ////byte[] buffer = System.IO.File.ReadAllBytes(System.IO.Path.GetFullPath(Server.MapPath("~/Crops/" + FileNameValue)));
                    ////System.IO.MemoryStream strm = new MemoryStream(buffer);
                    ////newimage.SetValue(Services.ContentTypeBaseServices, "umbracoFile", FileNameValue, strm);
                    ////ms.Save(newimage);

                    Ids[0] = media.Id;
                    ////if (Maxids > 0)
                    ////{
                    ////    Ids[0] = MaxNextId;
                    ////}
                    ////else
                    ////{

                    ////}
                }
                catch (Exception ex)
                { }

                if (System.IO.File.Exists(Server.MapPath("~/Crops/" + FileNameValue)))
                {
                    System.IO.File.Delete(Server.MapPath("~/Crops/" + FileNameValue));
                }
            }

            return Json(Ids);
        }
    }
}