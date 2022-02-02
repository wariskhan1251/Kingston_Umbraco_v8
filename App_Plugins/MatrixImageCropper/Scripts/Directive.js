angular.module('umbraco').controller('Ctrl', function ($scope, $rootScope, $timeout, editorService, mediaHelper) {
    $scope.alias = $scope.model.alias;
    // $scope.postingid = $routeParams.id;
    $scope.description = $scope.model.description;

    ////if ($scope.archetypeConfig != null && typeof ($scope.archetypeConfig) != 'undefined'
    ////    && $scope.archetypeConfig.fieldsets != null && typeof ($scope.archetypeConfig.fieldsets) != 'undefined'
    ////    && $scope.fieldset != null && typeof ($scope.fieldset) != 'undefined'
    ////    && $scope.fieldset.alias != null && typeof ($scope.fieldset.alias) != 'undefined') {
    ////    $scope.configFieldsetModel12 = archetypeService.getFieldsetByAlias($scope.archetypeConfig.fieldsets, $scope.fieldset.alias);
    ////    $scope.archtypemultivalue = $scope.configFieldsetModel12.properties[$scope.propertyConfigIndex].helpText;

    ////}
    ////if ($scope.model.label != null && typeof ($scope.model.label) != 'undefined'
    ////    && $scope.model.alias != null && typeof ($scope.model.alias) != 'undefined'
    ////    && $scope.property != null && typeof ($scope.property) != 'undefined'
    ////    && $scope.property.$editor != null && typeof ($scope.property.$editor) != 'undefined'
    ////    && $scope.property.$editor.description != null && typeof ($scope.property.$editor.description) != 'undefined'
    ////    && $scope.property.$editor.propretyType.config != null && typeof ($scope.property.$editor.propretyType.config) != 'undefined') {

    ////    $scope.leblenddescription = $scope.property.$editor.description;
    ////}

});

angular.module('umbraco').directive('skriftImagepicker', function (editorService,entityResource, mediaHelper, $http, $filter, $timeout) {

    return {
        scope: {
            value: '=',
            config: '=',
            alias: '=',
            description: '='
            //archtypemultivalue: '=',
            //leblenddescription: '='

        },
        restrict: 'E',
        replace: true,
        templateUrl: '/App_Plugins/MatrixImageCropper/Views/Directive.html',
        link: function (scope) {

            function initConfig() {

                console.log(scope.config);
                var cfg = scope.config;

                if (!cfg) cfg = {};

                if (!cfg.title) cfg.title = {};
                if (!cfg.title.mode) cfg.title.mode = 'optional';
                if (!cfg.title.placeholder) cfg.title.placeholder = '';

                if (!cfg.description) cfg.description = {};
                if (!cfg.description.mode) cfg.description.mode = 'optional';
                if (!cfg.description.placeholder) cfg.description.placeholder = '';
                if (!cfg.description.rows) cfg.description.rows = 3;

                cfg.title.required = cfg.title.mode == 'required';
                cfg.description.required = cfg.description.mode == 'required';

                scope.cfg = cfg;

                $("#divpreview-" + scope.alias).css('background-image', '');
                $("modelImagepreview-" + scope.alias).css('ng-src', '');
                $("modelImagepreview-" + scope.alias).css('ng-value', '');
            }

            function initValue() {

                if (!scope.value) scope.value = {};

                if (!scope.value.imageId) return;

                $("#imageEditor-" + scope.alias).cropit({
                    initialZoom: 'min'
                });

                $("#divpreview-" + scope.alias).css('background-image', '');
                $("modelImagepreview-" + scope.alias).css('ng-src', '');
                $("modelImagepreview-" + scope.alias).css('ng-value', '');


                ////// Get Single Entity Object
                ////entityResource.getById(1079, 'Document').then(function (content) {
                ////    alert("parentId : " + content.parentId + " CurrentNodeID : " + content.id + " CurrentNodeName :" + content.name + " HasChildren :" + content.metaData.Children);
                ////}, function (error) {
                ////    alert("error : "+error);
                ////});

                ////// Get Childrens Object
                ////entityResource.getChildren(1053, "Document")
                ////   .then(function (contentArray) {
                ////       debugger;
                ////       var children = contentArray;
                ////       alert('children : ' + children.totalItems);
                ////       alert('children ID : ' + children.totalItems.name);
                ////   }, function (error) {
                ////       alert("error : " + error);
                ////   });

                // Use the entityResource to look up data about the media (as we only store the ID in our value)
                entityResource.getById(scope.value.imageId, 'media').then(function (data) {
                    setImage(data, false);
                });

            }

            function setImage(image, boolvalue) {

                // Make sure we have an object as value
                if (!scope.value) scope.value = {};
                // Reset the image properties if no image id specified
                if (!image) {
                    scope.value.imageId = 0;
                    scope.image = null;
                    scope.imageUrl = null;
                    scope.dirtyimage = null;
                    return;
                }
                // Set the image ID in the value
                scope.value.imageId = image.id;

                // Update the UI
                scope.image = image;

                scope.booldirtyimage = boolvalue;

                if (scope.booldirtyimage) {
                    scope.dirtyimage = (image.image ? image.image : mediaHelper.resolveFileFromEntity(image));
                }
                else {
                    //scope.imageUrl = (image.image ? image.image : mediaHelper.resolveFileFromEntity(image)) + '?width=' + 500 + '&mode=crop';
                    scope.imageUrl = (image.image ? image.image : mediaHelper.resolveFileFromEntity(image));
                }

                     if (scope.description != null && scope.description != "" && typeof (scope.description) != 'undefined') {

                    var descriptionTrimandLowercase = scope.description.trim().toLowerCase();
                    var MainPreImagehelptex = "";
                    var MainPostImagehelptex = "";
                    if (descriptionTrimandLowercase != null && descriptionTrimandLowercase.indexOf("x") >= 0 && descriptionTrimandLowercase.indexOf(")") >= 0 && descriptionTrimandLowercase.indexOf("(") >= 0) {
                        var descriptionPreSplit = descriptionTrimandLowercase.split(')')[0];
                        var descriptionPostSplit = descriptionPreSplit.split('(')[1];
                        var MainImagehelptext = descriptionPostSplit.split('x');
                        MainPreImagehelptex = MainImagehelptext[MainImagehelptext.length - 2];
                        MainPostImagehelptex = MainImagehelptext[MainImagehelptext.length - 1];
                    }

                    scope.ImgDefaultValue_Width = Number(MainPreImagehelptex);
                    scope.ImgDefaultValue_Height = Number(MainPostImagehelptex);
                }
               
                else {
                    scope.ImgDefaultValue_Height = 200;
                    scope.ImgDefaultValue_Width = 200;
                }

                if ($('#txtHeight-' + scope.alias).val() != "") {
                    scope.ImgDefaultValue_Height = Number($('#txtHeight-' + scope.alias).val());
                }

                if ($('#txtWidth-' + scope.alias).val() != "") {
                    scope.ImgDefaultValue_Width = Number($('#txtWidth-' + scope.alias).val());
                }
           
                $("#modelImagepreview-" + scope.alias).css('ng-src', '');
                $("#modelImagepreview-" + scope.alias).css('ng-value', '');

                $("#divpreview-" + scope.alias).css('background-image', '');

                $('#imageEditor-' + scope.alias).cropit({

                    'initialZoom':'min',
                    //'minZoom': 'fit',
                    'allowDragNDrop': false,
                    'smallImage': 'allow',
                    'maxZoom': 5
                });

             //// $('#imageEditor-' + scope.alias).cropit({ initialZoom: 'min' });

                $('#imageEditor-' + scope.alias).cropit('previewSize', { width: scope.ImgDefaultValue_Width, height: scope.ImgDefaultValue_Height });

                if (boolvalue) {

                    $('#imageEditor-' + scope.alias).cropit('imageSrc', scope.dirtyimage);
                }
                else { $('#imageEditor-' + scope.alias).cropit('imageSrc', scope.imageUrl); }
          
            }

            scope.selectImage = function () {

                editorService.mediaPicker({
                    multiPicker: false,
                    submit: function (model) {
                     
                        // Get the first image (there really only should be one)
                        ////var data = model.selectedImages[0];
                        var data = model.selection[0];
                        //Block Popup window
                        setImage(data, true);

                        $("#myModal-" + scope.alias).css("display", "block");

                        scope.syncWidthHeightOfDialogue();

                        scope.MyQualitydropdown = "High";
                        scope.chkcropimage = false;

                        $("#Qualitydropdown-" + scope.alias).prop("disabled", false);
                        $("#txtWidth-" + scope.alias).prop("readonly", false);
                        $("#txtHeight-" + scope.alias).prop("readonly", false);
                        
                        $("#modal-body-" + scope.alias).css("overflow", "auto");
                       
                        $("#hover").css("display", "block");

                        editorService.close();
                    },
                    close: function () {
                        editorService.close();
                     
                    }
                });
               
            };

            scope.syncWidthHeightOfDialogue = function () {

                var cssText_WidthHeight_Value = "";

                if (scope.ImgDefaultValue_Width > 400 && scope.ImgDefaultValue_Width < 800) {
                    ////alert(scope.ImgDefaultValue_Width + " - " + Math.floor(parseFloat(scope.ImgDefaultValue_Width) + parseFloat((scope.ImgDefaultValue_Width / 100) * 10)));
                    cssText_WidthHeight_Value += (" width: " + Math.floor(parseFloat(scope.ImgDefaultValue_Width) + parseFloat((scope.ImgDefaultValue_Width / 100) * 10)) + "px !important;");
                }
                else if (scope.ImgDefaultValue_Width >= 800) {
                    cssText_WidthHeight_Value += (" width: 1000px !important;");
                }
                else {
                    cssText_WidthHeight_Value += (" width: 600px !important;");
                }

                if (scope.ImgDefaultValue_Height >= 800) {
                    cssText_WidthHeight_Value += (" height: auto !important;");
                }
                else {
                    cssText_WidthHeight_Value += (" height: auto !important;");
                }

                ////if (scope.ImgDefaultValue_Height > 400 && scope.ImgDefaultValue_Height < 800) {
                ////    cssText_WidthHeight_Value += (" height: 500px !important;");
                ////}
                ////else if (scope.ImgDefaultValue_Height >= 800) {
                ////    cssText_WidthHeight_Value += (" height: 700px !important;");
                ////}
                ////else {
                ////    cssText_WidthHeight_Value += (" height: 400px !important;");
                ////}

                $("#myModal-" + scope.alias).css("cssText", cssText_WidthHeight_Value);
            }

            scope.removeImage = function () {
                setImage(null, false);
            };


            scope.CropImage = function () {

                if (scope.MyQualitydropdown != null && typeof (scope.MyQualitydropdown) != 'undefined') {

                    if (scope.MyQualitydropdown.trim().toLowerCase() == "high") {
                        scope.qualityimage = parseFloat(.9);
                    }
                    else if (scope.MyQualitydropdown.trim().toLowerCase() == "medium") {
                        scope.qualityimage = parseFloat(.5);
                    }
                    else if (scope.MyQualitydropdown.trim().toLowerCase() == "low") {
                        scope.qualityimage = parseFloat(.2);
                    }
                }
                else {
                    scope.qualityimage = parseFloat(.9);
                }

                var imageurl = "";
                if (scope.booldirtyimage) { imageurl = scope.dirtyimage; }
                else { imageurl = scope.imageUrl; }

                var FullFileNamewithExtention = "";
                if (imageurl != null && typeof (imageurl) != 'undefined') {
                    var filenamepath = imageurl.split('/');
                    var filename = filenamepath[filenamepath.length - 1];

                    var FileNamePreSplit = filename.split('.')[0];
                    var FileNameExtention = filename.split('.')[1];

                    if (FileNameExtention == "jpeg")
                    { scope.imagetype = "jpeg"; }
                    else if (FileNameExtention == "png") { scope.imagetype = "png"; }
                    else if (FileNameExtention == "webp") { scope.imagetype = "webp"; }
                    else { scope.imagetype = "jpg"; }


                    FullFileNamewithExtention = FileNamePreSplit + '.' + scope.imagetype;
                }

                if (scope.chkcropimage) {

                    entityResource.getById(scope.value.imageId, 'media').then(function (data) {
                        setImage(data, false);
                    });

                    $('#displayfirst-' + scope.alias).css("display", "none")
                    $("#myModal-" + scope.alias).css("display", "none");
                    $("#hover").css("display", "none");

                    return;
                }
                else {

                    if (scope.imagetype == "jpg")
                    { scope.imagetype = "jpeg"; }

                    var imageDataBytes = $('#imageEditor-' + scope.alias).cropit('export', {

                        type: 'image/' + scope.imagetype + '',
                        quality: scope.qualityimage,
                        originalSize: true
                    });

                    //Update & Crop the Image
                    updateModel(scope.value.imageId, imageDataBytes, imageurl, FullFileNamewithExtention);
                }
            }

            scope.btnclosepopup = function (paramval) {
                $("#myModal-" + scope.alias).css("display", "none");
                $("#hover").css("display", "none");

                if (paramval) {
                    if (scope.imageUrl != null && typeof (scope.imageUrl) != 'undefined')
                    { } else { setImage(null, false); }
                }
            }

            scope.donotCropImagechange = function () {
                if (scope.chkcropimage) {
                    $("#Qualitydropdown-" + scope.alias).prop("disabled", true);
                    $("#txtWidth-" + scope.alias).prop("readonly", true);
                    $("#txtHeight-" + scope.alias).prop("readonly", true);
                }
                else {
                    $("#Qualitydropdown-" + scope.alias).prop("disabled", false);
                    $("#txtWidth-" + scope.alias).prop("readonly", false);
                    $("#txtHeight-" + scope.alias).prop("readonly", false);
                }
            }

            scope.Onchangetrigger = function () {
                $('#imageEditor-' + scope.alias).cropit('previewSize', { width: scope.ImgDefaultValue_Width, height: scope.ImgDefaultValue_Height });
                scope.syncWidthHeightOfDialogue();
            }

            function updateModel(id, ImageValuewithBytes, ImageUrl, FullFileNamewithExtention) {

                var filenamepath = ImageUrl.split('/');
                var filenameCode = filenamepath[filenamepath.length - 2];

                $('#displayfirst-' + scope.alias).css("display", "block")
                
                $.ajax({
                    url: '/umbraco/Surface/Cropper/SaveFiles',
                    type: "POST",
                    data: { FileNameValue: FullFileNamewithExtention, FolderID: filenameCode, ImageID: id, ImageBytesValue: ImageValuewithBytes, Alias: scope.alias },
                }).done(function (data) {
                    ////debugger;
                   ////alert(data[0]);

                    scope.value.imageId = data[0];
                    ////alert(entityResource.getById(data[0], 'media'));
                    entityResource.getById(data[0], 'media').then(function (data) {
                   // entityResource.getAll('Media').where(x => x.id == data[0]).then(function (data) {
                    
                        setImage(data, false);

                        $('#displayfirst-' + scope.alias).css("display", "none")
                        $("#myModal-" + scope.alias).css("display", "none");
                        $("#hover").css("display", "none");
                    });

                    $("#btncancel-" + scope.alias).trigger("click");
                    setTimeout(scope.btnclosepopup, 2000)

                }).error(function () { alert("Failure"); $('#displayfirst-' + scope.alias).css("display", "block") });
            }

            initConfig();
            initValue();

        }
    };
});
