﻿var DWObject = null;

export function CreateDWT() {
    var height = 580;
    var width = 500;

    if (Dynamsoft.Lib.env.bMobile) {
        height = 350;
        width = 270;
    }

    Dynamsoft.DWT.CreateDWTObjectEx({
        WebTwainId: 'dwtcontrol'
    },
        function (obj) {
            DWObject = obj;
            DWObject.Viewer.bind(document.getElementById('dwtcontrolContainer'));
            DWObject.Viewer.height = height;
            DWObject.Viewer.width = width;
            DWObject.Viewer.show();
        },
        function (err) {
            console.log(err);
        }
    );
}

export function Scan() {
    if (DWObject) {
        DWObject.SelectSource(function () {
            DWObject.OpenSource();
            DWObject.AcquireImage();
        },
            function () {
                console.log("SelectSource failed!");
            }
        );
    }
}

export function LoadImage() {
    if (DWObject) {
        DWObject.LoadImageEx('', 5,
            function () {
                console.log('success');
            },
            function (errCode, error) {
                alert(error);
            }
        );
    }
}

export function Save() {
    DWObject.IfShowFileDialog = true;
    // The path is selected in the dialog, therefore we only need the file name
    DWObject.SaveAllAsPDF("Sample.pdf",
        function () {
            console.log('Successful!');
        },
        function (errCode, errString) {
            console.log(errString);
        }
    );
}

export function isDesktop() {
    if (Dynamsoft.Lib.env.bMobile) {
        return false;
    } else {
        return true;
    }
}