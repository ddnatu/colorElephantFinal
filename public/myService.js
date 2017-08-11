app.service('MyService', function ($http) {

    var req1 = {
        method: 'POST',
        url: 'http://uitask.azurewebsites.net/fetchRecords',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "RequestObject":"Telemetry",
            "UserID": "Admin",
            "containerName":"garwareanaloginputtelemetry",
            "fromDate":"2017-07-22 00:00:00",
            "toDate":"2017-07-22 23:00:00"
        }
    }

    var reqUploadFile = {
        method: 'POST',
        url: 'http://localhost:3000/upload'
        // transformRequest: function(data, headersGetterFunction) {
        //     return data; // do nothing! FormData is very good!
        // }
    }
    var reqadminRegisters = {
        method: 'POST',
        url: 'http://localhost:3000/registerAdmin',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    var reqadminLogsIn = {
        method: 'POST',
        url: 'http://localhost:3000/loginAdmin',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    var reqsaveUserForm = {
        method: 'POST',
        url: 'http://localhost:3000/saveUserForm',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    var reqCheckIfDuplicate = {
        method: 'POST',
        url: 'http://localhost:3000/checkIfDuplicate',
        headers: {
            'Content-type': 'application/json'
        }
    }
    var reqadminVerifyRegister = {
        method: 'POST',
        url: 'http://localhost:3000/verifyRegistration',
        headers: {
            'Content-type': 'application/json'
        }
    }

    this.getData = function(Tags){
        req.data.Tags = Tags;
        // console.log('reqData', req);
        return $http(req);
    }

    this.uploadAttachment = function(attachment){
        reqUploadFile.data = attachment;
        // console.log('attachment', attachment);
        console.log('reqUploadFile', reqUploadFile);
        return $http(reqUploadFile);
    }

    this.adminRegisters = function(adminCredentialsObject){
        reqadminRegisters.data = adminCredentialsObject;
        // console.log('reqadminRegisters', adminCredentialsObject);
        return $http(reqadminRegisters);
    }

    this.verifyRegistration = function(timestamp){
        reqadminVerifyRegister.data = {
            "timestamp": timestamp
        }
        return $http(reqadminVerifyRegister);
    }

    this.adminLogsIn = function(adminCredentialsObject){
        reqadminLogsIn.data = adminCredentialsObject;
        console.log('reqadminLogsin', reqadminLogsIn);
        return $http(reqadminLogsIn);
    }


    this.userSubmitsForm = function(userFormData){
        reqsaveUserForm.data = userFormData;
        console.log('userFormData', userFormData);
        return $http(reqsaveUserForm);
    }

    this.checkIfDuplicate = function(emailId){
        reqCheckIfDuplicate.data = {
            "emailId": emailId
        };
        console.log('reqCheckIfDuplicate', reqCheckIfDuplicate);
        return $http(reqCheckIfDuplicate);
    }
});
