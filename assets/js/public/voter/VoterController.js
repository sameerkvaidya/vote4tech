angular.module('VoterModule')
.controller('VoterController', ['$scope', '$http', 
	
	function($scope, $http){

		$scope.votes = [];


		$scope.voter = {email:'svaidya@usac.org', vote:''};


		$scope.options = [{name:'JavaEE', description:'Matured and Strongly typed.', class:'fa fa-coffee'},
						{name: 'Node', description:'Young and Dynamic.', class:'fa fa-beer'}];

		$scope.voted = false;				

		$scope.message = {class: 'alert alert-danger', };
		
		$scope.JavaEE = 'JavaEE';
		$scope.Node = 'Node';


		$scope.callVote = function(){

			if(!$scope.voter.vote || $scope.voter.vote === ''){
				$scope.message.text = "which one";
				return;
			}

			if(!$scope.voter.email || $scope.voter.email === ''){
				$scope.message.text = "whats your email";
				return;
			}


			if($scope.voter.email.indexOf("@usac.org") === -1){
				$scope.message.text = "you need to usac email.";
				return;
			}



			$scope.voted = true;

			$http.post('/vote',$scope.voter).
					then(function onSuccess(res){
						console.log('done'+res.data);
							$scope.getVotes();
							$scope.message.class = 'alert alert-info';
							$scope.message.text = res.data;
						});
		}


		$scope.getVotes = function(){
			$http.get('/voter')
			.then(function(data){
				$scope.votes = data.data;
			})
			
		}


		$scope.getVotes();


	}
]);