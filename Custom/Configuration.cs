using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Web;
using System.Data;
using System.IO;
using System.Collections;
using System.Net.Mail;


namespace Solution.Common
{
    public class Configuration
    {

        #region User Defined Properties


        #region ERP PROPERTIES
        public static bool IsSQLLog
        {
            get
            {

                return Convert.ToBoolean(ConfigurationManager.AppSettings["SQLLog"].ToString());

            }
        }
        public static bool IsDataActivityLog
        {
            get
            {

                return Convert.ToBoolean(ConfigurationManager.AppSettings["DataActivityLog"].ToString());

            }
        }
        public static bool IsExcptionLog
        {
            get
            {

                return Convert.ToBoolean(ConfigurationManager.AppSettings["ExcptionLog"].ToString());

            }
        }

        #endregion

        public static string BaseUrl
        {
            get
            {
                string BaseUrlFinal = "";

                if (DomainUrl.ToLower().Contains(".co"))
                    BaseUrlFinal = DomainUrl;
                else
                {
                    string[] splitResult = DomainUrl.Split('/');
                    BaseUrlFinal = "/" + splitResult[splitResult.Length - 2] + "/";
                }

                return BaseUrlFinal;
            }

            //get
            //{
            //    string BaseUrlFinal = "";

            //    Uri urlComplete = System.Web.HttpContext.Current.Request.Url;

            //    if (urlComplete != null)
            //    {
            //        string path = urlComplete.PathAndQuery;
            //        string[] splitResult = path.Split('/');

            //        if (path.ToLower().Contains(".co"))
            //        {
            //            splitResult = urlComplete.ToString().Split('/');
            //            BaseUrlFinal = splitResult[2] + "/";
            //        }
            //        else
            //        {
            //            BaseUrlFinal = "/" + splitResult[1] + "/";
            //        }

            //    }

            //    string domainURlf = DomainUrl;

            //    return BaseUrlFinal;

            //}
        }



        public static string FEAuthUserName
        {
            get
            {
                try
                {
                    if (ConfigurationManager.AppSettings["FEAuthUserName"] != null && ConfigurationManager.AppSettings["FEAuthUserName"].ToString().Trim() != "")
                        return ConfigurationManager.AppSettings["FEAuthUserName"].ToString();
                }
                catch { }

                return "admin";

            }
        }

        public static string FEAuthUserPwd
        {
            get
            {
                try
                {
                    if (ConfigurationManager.AppSettings["FEAuthUserPwd"] != null && ConfigurationManager.AppSettings["FEAuthUserPwd"].ToString().Trim() != "")
                        return ConfigurationManager.AppSettings["FEAuthUserPwd"].ToString();
                }
                catch { }

                return "sbr@asp.net";

            }
        }
        public static bool LoggingEnabled
        {
            get
            {

                return Convert.ToBoolean(ConfigurationManager.AppSettings["LoggingEnabled"].ToString());

            }
        }

        //public static bool SendEmail(string recipient, string cc, string bcc, string subject, string body, string sender)
        //{
        //    try
        //    {
        //        MailMessage Msg = new MailMessage();

        //        SmtpClient ObjSmtp = new SmtpClient("localhost");

        //        if (SMTP != null
        //            && SMTP != ""
        //            && SMTPUser != null
        //                && SMTPUser != ""
        //                && SMTPPassword != null
        //                && SMTPPassword != "")
        //        {
        //            ObjSmtp = new SmtpClient(SMTP);

        //            if (SMTP.ToLower().Contains("gmail.com"))
        //                ObjSmtp = new SmtpClient(SMTP, Convert.ToInt32(587));
        //            System.Net.NetworkCredential smtp_credentials = new System.Net.NetworkCredential(SMTPUser, SMTPPassword);
        //            ObjSmtp.Credentials = smtp_credentials;
        //            ObjSmtp.EnableSsl = true;
        //        }

        //        if (!String.IsNullOrEmpty(recipient))
        //        {
        //            foreach (var itm in recipient.Trim().Split(','))
        //            {
        //                Msg.To.Add(new MailAddress(itm.Trim()));
        //            }
        //        }
        //        else { return false; }

        //        if (!String.IsNullOrEmpty(cc))
        //        {
        //            foreach (var itm in cc.Trim().Split(','))
        //            {
        //                Msg.CC.Add(new MailAddress(itm.Trim()));
        //            }
        //        }

        //        if (!String.IsNullOrEmpty(bcc))
        //        {
        //            foreach (var itm in bcc.Trim().Split(','))
        //            {
        //                Msg.Bcc.Add(new MailAddress(itm.Trim()));
        //            }
        //        }

        //        if (!String.IsNullOrEmpty(sender))
        //        {
        //            Msg.From = new MailAddress(sender.Trim());
        //        }
        //        else { return false; }
        //        Msg.Subject = subject;

        //        body += "<br/><br/>";
        //        ////body += "Regards,";
        //        ////body += "<br/>";
        //        ////body += Solution.Common.Configuration.ProjectName + " Team";
        //        ////body += "<br/>";

        //        Msg.Body = body;
        //        Msg.IsBodyHtml = true;
        //        Msg.BodyEncoding = System.Text.Encoding.UTF8;

        //        ObjSmtp.Send(Msg);

        //        return true;
        //    }
        //    catch { return false; }
        //}

        public static bool SendEmail(string recipient, string cc, string bcc, string subject, string body, string sender,string attachment)
        {
            try
            {
                MailMessage Msg = new MailMessage();
                SmtpClient ObjSmtp = new SmtpClient("localhost");

                if (Solution.Common.Configuration.SMTP != null
                    && Solution.Common.Configuration.SMTP != ""
                    && Solution.Common.Configuration.SMTPUser != null
                        && Solution.Common.Configuration.SMTPUser != ""
                        && Solution.Common.Configuration.SMTPPassword != null
                        && Solution.Common.Configuration.SMTPPassword != "")
                {
                    ObjSmtp = new SmtpClient(Solution.Common.Configuration.SMTP);

                    if (Solution.Common.Configuration.SMTP.ToLower().Contains("gmail.com"))
                        ObjSmtp = new SmtpClient(Solution.Common.Configuration.SMTP, Convert.ToInt32(587));
                    System.Net.NetworkCredential smtp_credentials = new System.Net.NetworkCredential(Solution.Common.Configuration.SMTPUser, Solution.Common.Configuration.SMTPPassword);
                    ObjSmtp.Credentials = smtp_credentials;
                    ObjSmtp.EnableSsl = true;
                }


                if(System.IO.File.Exists(HttpContext.Current.Request.MapPath("~/Crops/"+ attachment + "")))
                Msg.Attachments.Add(new Attachment(HttpContext.Current.Request.MapPath("~/Crops/" + attachment + "")));


                if (!String.IsNullOrEmpty(recipient))
                {
                    foreach (var itm in recipient.Trim().Split(','))
                    {
                        Msg.To.Add(new MailAddress(itm.Trim()));
                    }
                }
                else { return false; }

                if (!String.IsNullOrEmpty(cc))
                {
                    foreach (var itm in cc.Trim().Split(','))
                    {
                        Msg.CC.Add(new MailAddress(itm.Trim()));
                    }
                }

                if (!String.IsNullOrEmpty(bcc))
                {
                    foreach (var itm in bcc.Trim().Split(','))
                    {
                        Msg.Bcc.Add(new MailAddress(itm.Trim()));
                    }
                }

                if (!String.IsNullOrEmpty(sender))
                {
                    Msg.From = new MailAddress(sender.Trim());
                }
                else { return false; }
                Msg.Subject = subject;
                
                body += "<br/><br/>";
                ////body += "Regards,";
                ////body += "<br/>";
                ////body += Solution.Common.Configuration.ProjectName + " Team";
                ////body += "<br/>";

                Msg.Body = body;
                Msg.IsBodyHtml = true;
                Msg.BodyEncoding = System.Text.Encoding.UTF8;

                ObjSmtp.Send(Msg);

                return true;
            }
            catch { return false; }
        }

        public static string DALConnectionString
        {
            get
            {


                return ConfigurationManager.ConnectionStrings["SolutionConnectionString"].ConnectionString;
            }
        }

        

        public static string DALNewsURL
        {
            get
            {


                return ConfigurationManager.AppSettings["NewsURL"].ToString();
            }
        }

        public static string CampaignUpdateMessage
        {
            get
            {


                return ConfigurationManager.AppSettings["UpdateMessage"].ToString();
            }
        }
        public static string CampaignUnsubscribeMessage
        {
            get
            {
                return ConfigurationManager.AppSettings["UnsubscribeMessage"].ToString();
            }
        }
        public static string SMTPUser
        {
            get
            {
                return ConfigurationManager.AppSettings["smtpUser"].ToString();

            }
        }
        public static string SMTP
        {
            get
            {
                return ConfigurationManager.AppSettings["smtp"].ToString();

            }
        }


        public static bool EnableBCCAndCCForEmailOnSupplyChainForm
        {
            get
            {
                if (ConfigurationManager.AppSettings["EnableBCCAndCCForEmailOnSupplyChainForm"] != null && ConfigurationManager.AppSettings["EnableBCCAndCCForEmailOnSupplyChainForm"].ToString() != "")
                    return Convert.ToBoolean(ConfigurationManager.AppSettings["EnableBCCAndCCForEmailOnSupplyChainForm"]);
                else
                    return false;
            }
        }

        ////public static bool ApplyErrorApifailure
        ////{
        ////    get
        ////    {
        ////        if (ConfigurationManager.AppSettings["ApplyErrorApifailure"] != null && ConfigurationManager.AppSettings["ApplyErrorApifailure"].ToString() != "")
        ////            return Convert.ToBoolean(ConfigurationManager.AppSettings["ApplyErrorApifailure"]);
                
        ////            return false;
        ////    }
        ////}

        public static string AdminEmail
        {
            get
            {
                return ConfigurationManager.AppSettings["AdminEmail"].ToString();

            }
        }

        public static string AdminEmail_For_Verdo
        {
            get
            {
                return ConfigurationManager.AppSettings["AdminEmail_For_Verdo"].ToString();

            }
        }
        public static string AdminEmail_For_Aberfeldy
        {
            get
            {
                return ConfigurationManager.AppSettings["AdminEmail_For_Aberfeldy"].ToString();

            }
        }
        public static string AdminEmail_For_Kensal
        {
            get
            {
                return ConfigurationManager.AppSettings["AdminEmail_For_Kensal"].ToString();

            }
        }
        public static string AdminEmail_For_Millbrook
        {
            get
            {
                return ConfigurationManager.AppSettings["AdminEmail_For_Millbrook"].ToString();

            }
        }

        public static string AdminEmailCC
        {
            get
            {
                return ConfigurationManager.AppSettings["AdminEmailCC"].ToString();

            }
        }
        public static string AdminEmailBCC
        {
            get
            {
                return ConfigurationManager.AppSettings["AdminEmailBCC"].ToString();

            }
        }
        public static string AdminEmailRegisterInterest
        {
            get
            {
                return ConfigurationManager.AppSettings["AdminEmailRegisterInterest"].ToString();

            }
        }

        public static string HeadingLimit
        {
            get
            {
                return ConfigurationManager.AppSettings["HeadingLimit"].ToString();

            }
        }

        public static string ShortIntroLimit
        {
            get
            {
                return ConfigurationManager.AppSettings["ShortIntroLimit"].ToString();

            }
        }

        public static string CCEmail
        {
            get
            {
                return ConfigurationManager.AppSettings["CCEmail"].ToString();

            }
        }
        public static string EnquiriesEmail
        {
            get
            {
                return ConfigurationManager.AppSettings["EnquiriesEmail"].ToString();

            }
        }
        public static string googleAPIKey
        {
            get
            {
                return ConfigurationManager.AppSettings["googleAPIKey"].ToString();

            }
        }
        public static string EnquiriesBccEmail
        {
            get
            {
                return ConfigurationManager.AppSettings["EnquiriesBccEmail"].ToString();

            }
        }
        public static bool AnonymousAuthentication
        {
            get
            {
                return Convert.ToBoolean(ConfigurationManager.AppSettings["AnonymousAuthentication"]);

            }
        }
        public static string SMTPPassword
        {
            get
            {
                return ConfigurationManager.AppSettings["smtpPassword"].ToString();


            }
        }
        public static string BaseDirectoryPath
        {
            get
            {

                return System.AppDomain.CurrentDomain.BaseDirectory;

            }
        }
        public static string RelitiveFilesPathForDevelopmentsDocuments
        {
            get
            {
                return ConfigurationManager.AppSettings["PathForDevelopmentsDocuments"].ToString().ToLower();

            }
        }

        public static string FCKEditorBasePath
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["FCKEditorBasePath"].ToString()).ToLower();
            }
        }

        public static string DomainUrl
        {
            get
            {

                string DomainUrlFinal = "";

                ////Uri urlComplete = System.Web.HttpContext.Current.Request.Url;

                ////if (urlComplete != null)
                ////{
                ////    //string path = urlComplete.PathAndQuery;
                ////    string[] splitResult = urlComplete.ToString().Split('/');

                ////    for (int i = 0; i < splitResult.Length; i++)
                ////    {
                ////        if (i > 0)
                ////            DomainUrlFinal += "/";

                ////        DomainUrlFinal += splitResult[i];

                ////        if (urlComplete.ToString().ToLower().Contains(".co") && i == 2)
                ////            break;
                ////        else if (i == 3)
                ////            break;

                ////        //http://matrix4/newcms/

                ////    }

                DomainUrlFinal = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);

                ////}

                if (!DomainUrlFinal.EndsWith("/"))
                    DomainUrlFinal += "/";

                ////Console.Write(DomainUrlFinal);
                return DomainUrlFinal;


                //return Convert.ToString(Solution.Common.Configuration.DomainUrl.ToString()).ToLower();

            }
        }
        public static string DomainUrl_CP
        {
            get
            {

                //return DomainUrl + Convert.ToString(ConfigurationManager.AppSettings["AdminFolder"].ToString()).ToLower() + "/";

                return DomainUrl + "admin/";

            }
        }
        //public static string SiteName
        //{
        //    get
        //    {
        //        return Convert.ToString(ConfigurationManager.AppSettings["SiteName"].ToString());
        //    }
        //}
        public static string ProjectName
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["ProjectName"].ToString());
            }
        }
        public static string CommercialImagePath
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["CommercialImagePath"].ToString()).ToLower();
            }
        }
        public static string RetailImagePath
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["RetailImagePath"].ToString()).ToLower();
            }
        }
        public static string ResidentialImagePath
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["ResidentialImagePath"].ToString()).ToLower();
            }
        }



        ////public static string GetWebAppRoot
        ////{
        ////    get
        ////    {
        ////        ////Uri uri = HttpContext.Current.Request.Url;
        ////        ////String hostpath = uri.Scheme + Uri.SchemeDelimiter + uri.Host + ":" + uri.Port + "/";
        ////        ////return hostpath;

        ////        string strBasePath = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + "/";
        ////        return strBasePath;
        ////    }
        ////}

        #endregion User Defined Properties
        public static string Theme()
        {
            return "SkinFile";
        }
        #region User Defined Functions

        /// <summary>
        /// Get configuration setting from custom configuration section
        /// </summary>
        /// <param name="sectionName">Custom configuration section name</param>
        /// <param name="key">Key name</param>
        /// <returns>Key value</returns>
        public static string GetConfig(string sectionName, string key)
        {
            try
            {
                //System.Collections.IDictionary configSection = (System.Collections.IDictionary)ConfigurationManager.GetConfig(sectionName);
                //return (string)configSection[key];
                return string.Empty;
            }
            catch
            {
                return string.Empty;
            }
        }




        #endregion User Defined Functions

        #region  ERP COMMON FUNCTION

        /// <summary>
        ///  On Log
        /// 1-For user data activity log
        /// 2-For Exception log
        /// 3-For SQL log
        /// </summary>
        /// <param name="pLog"></param>
        /// <param name="pFlagForActiveLog">
        /// On Log
        /// 1-For user data activity log
        /// 2-For Exception log
        /// 3-For SQL log
        /// </param>
        public static void WriteLogFile(String[] pLog, int pFlagForActiveLog)
        {
            DateTime _dateTime = System.DateTime.Now;
            string targetPath = "";
            switch (pFlagForActiveLog)
            {
                case 1:
                    targetPath = System.Web.HttpContext.Current.Server.MapPath("~/Log/User_Activity_Log_" + _dateTime.Year + _dateTime.Month + _dateTime.Day + ".txt");
                    break;
                case 2:
                    targetPath = System.Web.HttpContext.Current.Server.MapPath("~/Log/ExceptionLog_" + _dateTime.Year + _dateTime.Month + _dateTime.Day + ".txt");
                    break;
                case 3:
                    targetPath = System.Web.HttpContext.Current.Server.MapPath("~/Log/SQLLog_" + _dateTime.Year + _dateTime.Month + _dateTime.Day + ".txt");
                    break;

            }


            StreamWriter objStreamWriter = null;
            if (!File.Exists(targetPath))
            {

                objStreamWriter = File.CreateText(targetPath);
                if (objStreamWriter != null)
                {
                    foreach (string line in pLog)
                        objStreamWriter.WriteLine(line);

                }

            }
            else
            {
                objStreamWriter = File.AppendText(targetPath);
                if (objStreamWriter != null)
                {
                    foreach (string line in pLog)
                        objStreamWriter.WriteLine(line);

                }

            }
            objStreamWriter.Flush();
            objStreamWriter.Close();


        }

        #endregion
    }
}
