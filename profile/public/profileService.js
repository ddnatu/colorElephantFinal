app.service('ProfileService', function ($http) {

    var reqProfiles = {
        method: 'GET',
        url: 'http://localhost:9000/getProfiles',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    var reqgetDetails = {
        method: 'GET',
        url: 'http://localhost:9000/getProfiles',
        headers: {
            'Content-Type': 'application/json'
        }
    }
	
	this.getProfiles = function(){        
		// console.log('reqData', req);
		reqgetDetails.url = reqgetDetails.url ;
        return $http(req);
	}
    this.getProfileDetails = function(emailId){
        // console.log('reqData', req);
		reqgetDetails.url = reqgetDetails.url + '/' + emailId;
        return $http(req);
    }

});