using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kingston_Umbraco_v8.Models
{
    public class MtxImageCropperVM
    {
        int _imageId = 0;
        public int imageId { get { return _imageId; } set { _imageId = value; } }

        string _title = "";
        public string title { get { return _title; } set { _title = value; } }
    }

    public class GetCropedImageVM
    {
        string _image = "";
        public string ImageUrl { get { return _image; } set { _image = value; } }
        string _imageAlt = "";
        public string ImageAlt { get { return _imageAlt; } set { _imageAlt = value; } }
    }
}