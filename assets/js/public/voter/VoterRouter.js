	
	/********************************************************************************************************************
	 * Route controller/provider                                                                                        *
	 * We use angular route provider for UI and sails for services                                                      *
	 ********************************************************************************************************************/

	angular.module('VoterModule').config(
	  
	  function($routeProvider, $locationProvider) {
	  	//$locationProvider.html5Mode(false);
		$routeProvider
		.when('/', //after login this is my landing page
					{
						templateUrl: 'vote.html',
						controller: 'VoterController'
					}
			)	
  		.otherwise(
  					{
  						templateUrl: '404.html'
  					}
  		)	  
	});
