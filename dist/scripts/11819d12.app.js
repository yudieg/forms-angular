/*! forms-angular 2014-03-27 */
"use strict";angular.module("HashBangURLs",[]).config(["$locationProvider",function(a){a.hashPrefix("!")}]);var myDemoApp=angular.module("myDemoApp",["formsAngular","HashBangURLs"]);myDemoApp.config(["$routeProvider",function(a){a.when("/index",{templateUrl:"partials/landing-page.html"}).when("/get-started",{templateUrl:"partials/get-started.html"}).when("/forms",{templateUrl:"partials/forms.html"}).when("/schemas",{templateUrl:"partials/schemas.html"}).when("/reporting",{templateUrl:"partials/reporting.html"}).when("/more",{templateUrl:"partials/more.html"}).when("/in-the-wild",{templateUrl:"partials/in-the-wild.html"}).when("/examples",{templateUrl:"partials/examples.html"}).when("/api-docs",{templateUrl:"partials/api-docs.html"}).when("/404",{templateUrl:"partials/404.html"}).when("/z_custom_form/new",{templateUrl:"partials/custom-new.html"}).when("/z_custom_form/:id/edit",{templateUrl:"partials/custom-edit.html"}).when("/z_custom_form/:form/new",{templateUrl:"partials/custom-new.html"}).when("/z_custom_form/:form/:id/edit",{templateUrl:"partials/custom-edit.html"}).when("/analyse/:model/:reportSchemaName",{templateUrl:"partials/base-analysis.html"}).when("/analyse/:model",{templateUrl:"partials/base-analysis.html"}).when("/:model/:id/edit",{templateUrl:"partials/base-edit.html"}).when("/:model/new",{templateUrl:"partials/base-edit.html"}).when("/:model",{templateUrl:"partials/base-list.html"}).when("/:model/:form/:id/edit",{templateUrl:"partials/base-edit.html"}).when("/:model/:form/new",{templateUrl:"partials/base-edit.html"}).when("/:model/:form",{templateUrl:"partials/base-list.html"}).otherwise({redirectTo:"/index"})}]),myDemoApp.directive("emailField",["$compile","$filter",function(a,b){return{restrict:"E",replace:!0,priority:1,compile:function(){return function(c,d,e){c.$watch(e.formInput,function(){var f=c[e.schema],g='<div class="control-group" id="cg_'+f.id+'">';f.label||(f.label=b("titleCase")(f.name)),""!==f.label&&(g+='<label class="control-label" for="'+f.id+'">'+f.label+"</label>"),g+='<div class="controls"><div class="input-prepend"><span class="add-on">@</span><input type="email" ng-model="record.'+f.name+'" id="'+f.id+'" name="'+f.id+'" /></div></div>',g+="</div>",d.replaceWith(a(g)(c))})}}}}]),myDemoApp.directive("affix",["$compile","$location",function(a){return{restrict:"E",replace:!0,template:'<ul class="hidden-phone nav nav-tabs nav-stacked docs-sidenav" ui-scrollfix="-80"><li id="{{affix.id}}Opt" ng-repeat="affix in affixes" ng-click="scrollToSection(affix.id)"><a href=""><i class="icon-chevron-right pull-right"></i>{{affix.name}}</a></li></ul>',compile:function(){var b=$("body"),c=[];return{post:function(d,e){d.affixes=c,$(".affix-section",b).find("section").each(function(){var b=$(this);c.push({id:b.attr("id"),name:b.attr("name")}),a(e)(d)})}}}}}]).directive("affixScroll",["$window",function(a){return{link:function(b,c){var d,e=80,f=c.offset().top-e,g=f+c.height()-e;angular.element(a).on("scroll.affix-scroll",function(){var b=c.attr("id");if(angular.isDefined(a.pageYOffset))d=a.pageYOffset;else{var e=document.compatMode&&"BackCompat"!==document.compatMode?document.documentElement:document.body;d=e.scrollTop}var h=$("li#"+b+"Opt");d>f&&g>d?h.hasClass("active")||h.addClass("active"):h.hasClass("active")&&h.removeClass("active")})}}}]).directive("uiScrollfix",["$window",function(a){return{require:"^?uiScrollfixTarget",link:function(b,c,d,e){function f(){var b;if(angular.isDefined(a.pageYOffset))b=a.pageYOffset;else{var e=document.compatMode&&"BackCompat"!==document.compatMode?document.documentElement:document.body;b=e.scrollTop}!c.hasClass("ui-scrollfix")&&b>d.uiScrollfix?c.addClass("ui-scrollfix"):c.hasClass("ui-scrollfix")&&b<d.uiScrollfix&&c.removeClass("ui-scrollfix")}var g=c[0].offsetTop,h=e&&e.$element||angular.element(a);d.uiScrollfix?"string"==typeof d.uiScrollfix&&("-"===d.uiScrollfix.charAt(0)?d.uiScrollfix=g-parseFloat(d.uiScrollfix.substr(1)):"+"===d.uiScrollfix.charAt(0)&&(d.uiScrollfix=g+parseFloat(d.uiScrollfix.substr(1)))):d.uiScrollfix=g,h.on("scroll",f),b.$on("$destroy",function(){h.off("scroll",f)})}}}]).directive("uiScrollfixTarget",[function(){return{controller:function(a){this.$element=a}}}]),myDemoApp.controller("FriendCtrl",["$scope","$routeParams","$location","$http",function(a,b,c,d){a.frdShowAdd=!1,a.frdNewFriend={},a.frdHideDetails=function(){a.frdPopupName="Move mouse over a friend",a.frdPopupPhone="to see their details"},a.frdShowDetails=function(b){d.get("api/a_unadorned_mongoose/"+b.friend).success(function(b){b&&0!=b.success?(a.frdPopupName=b.forename+" "+b.surname,a.frdPopupPhone=b.phone):a.frdPopupName="This friend does not exist - someone may have deleted the record"}).error(function(){a.frdPopupName="Error reading friend details",a.frdPopupPhone="Please try again"})},a.frdRemoveFriend=function(b){for(var c=0;c<a.record.friendList.length;c++)if(a.record.friendList[c].friend==b.friend){a.record.friendList.splice(c,1);break}},a.frdShowAddForm=function(){a.frdShowAdd=!0,a.frdNewFriend={}},a.frdSaveFriend=function(){var b=angular.copy(a.frdNewFriend.friendList);delete b.friend,b.friend=a.frdNewFriend.friendList.friend.id,a.record.friendList.push(b),a.frdShowAdd=!1},a.frdIsFriendSaveDisabled=function(){return a.newFriendForm.$invalid||a.newFriendForm.$pristine},a.frdHideDetails()}]).directive("friends",function(){return{restrict:"E",replace:!0,priority:1,controller:"FriendCtrl",templateUrl:"demo/template/friends.html"}}),myDemoApp.controller("DemoCtrl",function(a,b,c){a.scrollToSection=function(a){b.hash(a),c()}}),myDemoApp.controller("BUsingOptionsCtrl",["$scope","$data","$timeout",function(a,b,c){function d(a){var b=["#81B7DB","#C2A369","#6DDB4F","#47820C"];""!=a?$("#cg_f_eyeColour").css("background-color",b[parseInt(a)]):$("#cg_f_eyeColour").css("background-color","white")}a.record=b.record,b.dropDownDisplay="Custom Dropdown",a.doAlert=function(b,c){alertMessage=b,c&&(alertMessage+="\nThe id is "+a.record._id),alert(alertMessage)},a.changeCase=function(){function b(b){for(var c in a.record)"_id"!==c&&"string"==typeof a.record[c]&&(a.record[c]="lower"===b?a.record[c].toLowerCase():a.record[c].toUpperCase())}b(a.record.surname==a.record.surname.toLowerCase()?"upper":"lower")},a.contextMenu=[{fn:a.doAlert,args:["Reading the data",!0],listing:!1,creating:!1,editing:!0,text:"Demonstrate reading the data"},{fn:a.changeCase,listing:!1,creating:!1,editing:!0,text:"Demonstrate modifying the data"},{fn:a.doAlert,args:["Big process",!1],listing:!0,creating:!1,editing:!1,text:"Run some file wide process"}],a.$on("formInputDone",function(){var a=$("#f_eyeColour");a.on("change",function(a){console.log("change "+JSON.stringify({val:a.val,added:a.added,removed:a.removed})),d(a.val)}),c(function(){d(a.select2("val"))},100)})}]),myDemoApp.controller("InTheWildCtrl",["$scope",function(a){a.sites=[{url:"http://www.caremarkjobs.co.uk",img:"caremarkjobs.png",text:"Recruitment site for a small business"},{url:"https://connectedcommunitycare.org",img:"ccc.png",text:"Statutory reports for social care in Australia",tags:["Login Required"]},{img:"plait.png",text:"Mobile care planning",tags:["In development"]}]}]),myDemoApp.controller("BUsingOptionsJustnameandpostcodeCtrl",["$scope","$data","$timeout",function(a,b){a.record=b.record,b.modelNameDisplay="Another override",b.dropDownDisplay="Custom 2nd Level",a.contextMenu=[{fn:a.doAlert,args:["Reading the data 2",!0],listing:!1,creating:!1,editing:!0,text:"Demonstrate reading the data 2"}]}]),myDemoApp.controller("DArrayExampleCtrl",["$scope","$data",function(a,b){a.disableFunctions=b.disableFunctions,a.dataEventFunctions=b.dataEventFunctions,a.record=b.record,a.disableFunctions.isDeleteDisabled=function(a,b){return b.accepted},a.dataEventFunctions.onAfterCreate=function(a){alert("Here is an example onAfterCreate event. "+JSON.stringify(a))}}]),myDemoApp.controller("HDeepNestingCtrl",["$data",function(a){a.modelNameDisplay="Nesting (work in early progress - buggy)"}]);