//从Cookie获取UIN和SKEY
//一些配置常量
	var Uin = chGetUin();
	var UName = "";
	var Skey = chGetCookie('skey');
	//导航iframe用到的URL
	var LocalTime = 0;                 //时间差值，单位秒
	var timekeep = 0;                  //定时刷新页面计时器
	var curGridID =0                   //当前城市的中心格坐标
	var CityID=0                       //当前城市ID
	var curNationID = 0                //当前国籍
	var arrOwnCity = new Array();     //自己的城市ID数组
	var arrUserItem = new Array();    //用户拥有的道具数组
	var arrUserQuan = -1;              //用户拥有的点券
	var arrCurBuild=[];                //正在建设中的建筑、科技
	var arrCurWaterID=[];              //建筑科技对应流水号
	var tempMapstr = "";               //地图显示HTML
	var curFavGrid = 0;                //当前地图格坐标
	var curFavName = "";	           //当前地图格城市名
	var curFavOwnerName = "";          //当前地图格城市用户名
	var curMapGridID =curGridID        //地图显示的当前中心格

	var curFoodExpend=0                //当前城市粮食消耗
	var allCityName=[]                 //当前用户所有城市名
	var arrCityBuildRank = new Array() //建筑等级数组
	var msgboxFunc="";                  //msgboxyesno的执行函数
	var curTaskDetail=[]                //正在进行中的任务详情数组
	var curTaskList=[]                  //所有任务摘要
	var strStartAttact="";              //使用急行军时存储的协议
	var timecountRich=[];
	var ttimeL=[];
	var nnameL=[];
	var curArmyIng="";                  //当前城市军事队列数组
	var Outfit=[]                       //装备数组
	var curLeagueID = 0                 //是否加入家族
	var curLeagueState = 0              //家族权限0普通 1副族长 9族长
	var arrChat=[]                      //存放聊天信息
	var arrChatSysMsg=["每次发言需要消耗一个小喇叭道具"]                //存放系统下发聊天消息
	var intSysNum=0                     //存放系统下发聊天消息 下标
	var unReadMails = []                //存放各种类型的未读邮件数目
	var STime = new Date();             //服务器时间
	var interSTime = 0                   //服务器时间定时器
	
	



function getInfo(id,type){
	moreinfotab(id,type);
	//MM_effectGrowShrink("moreinfo", 400, '0%', '100%', false, false, true);
	$("moreinfo").style.display="block";
	$("maskbg").style.display="block";
}
//对初始化时候iframe的加载进行优化
function iframebanner(id){
	switch (id) 
		 {
	 	 	case 1 :
	 			$("maildiv").src = bannerURL[0];//msg.js常数定义
				break 
	 	 	case 2 :
	 			$("shopdiv").src = bannerURL[1];//msg.js常数定义
				break 
	 	 	case 3 :
	 			$("JZdiv").src = bannerURL[2];//msg.js常数定义
				break 
		}
}
//主TAB切换
initCalled=false;
var zindexStart = 0; 
if (! initCalled) {init()}
function init ()
{
	zindexStart = 1000;  
	initCalled=true;
}
/*function setzindex(element, effect)
 {
	if (effect.direction == Spry.forwards)
	{
	element.style.zIndex=zindexStart;
	element.style.filter='alpha(opacity=0)';
	element.style.opacity='0';
		//seems that IE needs a seperate solution
		if(/MSIE/.test(navigator.userAgent) && /Windows NT/.test(navigator.userAgent))
		{
				Spry.Effect.setStyleProp(element.parentNode, 'zIndex', zindexStart);
				//element.parentNode.style.zIndex = zindexStart;
		}
	}
	zindexStart++;
}
function resetzindex(element, effect)
{
 element.style.display="block";
	if (effect.direction == Spry.backwards)
	{
 		 element.style.zIndex=1;
		
		if(/MSIE/.test(navigator.userAgent) && /Windows NT/.test(navigator.userAgent))
		 {
			Spry.Effect.setStyleProp(element.parentNode, 'zIndex', 1);
		 }
	}
}
*/



/*
**    ==================================================================================================  
**    类名： 
**    功能：显示富面板
**    示例：ShowRichTab(opt1,id)  
**                        opt1:0显示主面板，1显示副面板
**                        id:显示副面板的层ID
**    ==================================================================================================  
*/
	var arrSPDiv,arrBuildingID,intCurSPD
	arrSPDiv = new Array("SDP_mutou","SDP_liangshi","SDP_shitou","SDP_tie","SDP_miku","SDP_cangku","SDP_guanfu","SDP_junying","SDP_guofangbu","SDP_kexueyuan","SDP_yelianfang","SDP_nongkesuo","SDP_dashiguan","SDP_gongchengbu","SDP_minju","SDP_shijianpu","SDP_muliaofang","SDP_xiulichang","SDP_tuohuangying","SDP_citymap")

	
	//用来进入city时显示隐藏建筑物  界面上图片的id
	arrBuildingID = new Array("blank","blank","blank","blank","miku","cangku","guanfu","junying","guofangbu","kexueyuan","yelianfang","nongkesuo","dashiguan","gongchengbu","minju","shijiangpu","muliaofang","xiulichang","tuohuangying")
	

function ShowThisSPD(obj){
	for(var i=0;i<arrSPDiv.length;i++)
	{
	    $(arrSPDiv[i]).style.display = "none";
	}
	$(obj).style.display = "block"
}
function ShowRichTab(swt,id){	
	if(!swt){                                  //主面板+灰色副面板
		for(var i=0;i<arrSPDiv.length;i++)
		{
			$(arrSPDiv[i]).style.display = "none";
		}
		$("mainpanel").style.display="block";
		$("richtab1").style.display="block";
		$("richtab2").style.display="none";
		$("richtab0").style.display="none";		
	}else{                                     //灰色主面板+副面板
		//显示地图副面板
		if(id >=0)intCurSPD = id;
		if(intCurSPD == 1007){
			ShowMapTab(intCurSPD_MapDiv);
		}else{
			//根据tabname显示当前tab
			for(var i=0;i<arrBuildingID.length;i++)
			{
				if($("richtab1name").innerHTML == mb.Buidings[i].BuildingName){
					ShowThisSPD(arrSPDiv[i])
				}
			}		
			$("mainpanel").style.display="none";
			$("richtab0").style.display="none";
			$("richtab1").style.display="none";		
			$("richtab2").style.display="block";	
			//初始化时防止错误
			if(id >= 0){
				//定义全局变量，用于在index按钮上的函数参数
				intCurSPD = id;
				ShowThisSPD(arrSPDiv[id]);
				$("richtab1name").innerHTML = mb.Buidings[id].BuildingName;	
				$("richtab2name").innerHTML = mb.Buidings[id].BuildingName;		
				//显示副面板内容
				if(arrCityBuildRank.length > 0){		//判断是否是还未初始化	
					$(arrSPDiv[id]).innerHTML = WriteDiv(id,arrCityBuildRank[id]-1);
				}
			}
		}
	}
}
var intCurSPD_MapDiv="";
function ShowMapTab(type){
	intCurSPD = 1007;
	$("mainpanel").style.display="none";
	$("richtab0").style.display="none";
	$("richtab1").style.display="none";		
	$("richtab2").style.display="block";	
	$("richtab1name").innerHTML ="地图信息";
	$("richtab2name").innerHTML ="地图信息";
	ShowThisSPD("SDP_citymap");	
	ShowMapTabHide();
	if(type=="other"){
		intCurSPD_MapDiv = "other";
		$("citymaptab_other").style.display="block";
	}else if(type=="self"){
		intCurSPD_MapDiv = "self";
		$("citymaptab_self").style.display="block";
	}else if(type=="nobody"){
		intCurSPD_MapDiv = "nobody";
		$("citymaptab_nobody").style.display="block";
	}else if(type=="random"){
		intCurSPD_MapDiv = "random";
		$("citymaptab_random").style.display="block";
	}
}
function ShowMapTabHide(){
	$("citymaptab_other").style.display="none";
	$("citymaptab_nobody").style.display="none";
	$("citymaptab_random").style.display="none";	
	$("citymaptab_self").style.display="none";		
}
//开始建造建筑科技
function cBuild(id,ty,rank){
	objFlashEng.Send(GetBuild(id,ty,rank,0))
}
//开始建造兵种防御
function cArmy(id,ty,i){
	if(ty ==3){
		eval("var num = document.form_FO.num"+i+".value");
	}else if(ty ==4){
		eval("var num = document.form_AR.num"+i+".value");
	}
	if(isPlusNumber(num)==false){
		msgbox("请输入正整数!")
	}else{
		if(num>999){
			msgbox("一次最多只能输入999个")	
		}else{
			objFlashEng.Send(GetBuild(id,ty,0,num))
		}
	}
}



/*
**    ==================================================================================================  
**    类名： 
**    功能：初始化城市信息
**    示例：
**                        
**    ==================================================================================================  
*/
function initHtml(){		
	//简单登录判断
	if(!chIsLogin())location.href="index.html";
	
	
	
	
	if(typeof(document.frames['proxy_iframe'].webbg)=="object"){
		getID('webbg');
		getCityID('citybg');
		
		//聊天室
		setInterval("ShowChatContent()",1000)	
		setInterval("ShowChatSysMsg()",5000)	
	}else{		
		setTimeout("initHtml();",100);
		return false;
	} 
}


/*
**    ==================================================================================================  
**    类名： 
**    功能：Flash交互引擎
**    示例：
**                        
**    ==================================================================================================  
*/
var objFlashEng;
function getID(swfID) { 
	var proxy = $("proxy_iframe");
	if (navigator.appName.indexOf("Microsoft") > -1) { 
		objFlashEng = proxy.contentWindow.window[swfID]; 
	}else{ 
		objFlashEng = proxy.contentWindow.document.getElementsByName(swfID);
	} 
}
function getCityID(swfID) { 
   if (navigator.appName.indexOf("Microsoft") > -1) { 
      objFlashCity = window[swfID]; 
   } else { 
      objFlashCity = document[swfID]; 
   } 
}

function EnpClose(){ 
	//清除定时器
	timekeep=clearInterval(timekeep)
	objFlashEng.Close(); 
}

//flash调用页面js
function OnConnect(str){ 

	if(str!=0){		
		$("perloading").innerHTML="<br><br><br><br><div style='color:#000;'>连接失败!!<br><br><a style='color:#000;' href='javascript:location.reload()'>>>点击重新链接</a>　　<a style='color:#000;' href='javascript:$(\"maskbg\").style.display=\"none\";$(\"perloading\").style.display=\"none\";'>>>点击取消</a></div>"
	}else{	
		objFlashEng.Send(getTaskList(1001));	
		$("perloading").style.display="none";	
		$("maskbg").style.display="none";			
	} 
}

function onReconnect(){ 
    //editor.innerHTML="服务器断线，正在重新连接！---"
}
//关闭flash新手指引
function GuideClose(){
	$("guideDiv").style.display="none"
}
function onRecv(str){ 	
	//如果已经flash已经连上，但页面没有加载完，加入setTimeout重复onRecv函数
	/*if(document.readyState!="complete"){
		setTimeout("onRecv('"+str+"');",100);
		return false
	}*/
	var myObject = eval('('+str+')') ;
	switch (myObject.CTMsgHead.shMsgID) {
	   case 1001 :
		  ShowLoginInfo(str)
		  break 
	   case 1002 :
		  ShowMineInfo(str)
		  break 
	   case 1022 :
		  ShowMineAllCity(str)
		  break 
	   case 1003 :
          ShowMineCity(str)
		  break 
	   case 1004 :
          ShowCancleTask(str)
		  break 
	   case 1005 :
          ShowBuildingTask(str)
		  break 
	   case 1006 :
          ShowMaps(str)
		  break 
	   case 1007 :
          ShowDoBuild(str)
		  break 
	   case 1008 :
          ShowSearchMapN(str)
		  break 
	   case 1009 :
          ShowFavMap(str)
		  break 
	   case 1010 :
          ShowIsSendOk(str)
		  break 
	   case 1024 :
          ShowRandomIsSendOk(str)
		  break 
	   case 1017 :
          ShowMarchInfo(str)
		  break 
	   case 1018 :
          ShowArmyListInfo(str)
		  break 
	   case 1019 :
          ShowArmyList(str)
		  break
	   case 1020:
          ShowcallbackArmy(str)
		  break 
	   case 1023:
          ShowMoveCheck(str)
		  break 
	   case 1412 :
	   	  ShowBuyResItem(str);
		  break;
	   case 1500 :
	   	  ShowTaskList(str);
		  break;
	   case 1501 :
	   	  ShowUpdateTaskList(str);
		  break;
	   case 1502 :
	   	  ShowTaskGet(str);
		  break;
	   case 1503 :
	   	  ShowTaskFinish(str);
		  break;
	   case 1504 :
	   	  ShowTaskChoose(str);
		  break;
	   case 1601 :
	   	  ShowHeroList(str);
		  break;
	   case 1602 :
	   	  ShowHeroAttack(str);
		  break;
	   case 1605 :
	   	  ShowActHeroTrea(str);
		  break;
	   case 1606 :
	   	  ShowActHeroTrea(str);
		  break;
	   case 1603 :
	   	  ShowHeroListTrea(str);
		  break;
	   case 1609 :
	   	  ShowTakeTrea(str);
		  break;
	   case 1607 :
	   	  ShowTakeTrea(str);
		  break;
	   case 1604 :
	   	  ShowHeroUpGrade(str);
		  break;
	   case 1610 :
	   	  ShowTreaRefine(str);
		  break;
	   case 1611 :
	   	  ShowTreaConpose(str);
		  break;
	   case 1612 :
	   	  ShowMakeOutfit(str);
		  break;
	   case 1613 :
	   	  ShowGetOutfit(str);
		  break;
	   case 1700 ://查询交易所列表
	   	  document.frames["marketdiv"].ShowMarketList(str);
		  break;
	   case 1706 ://查询单条交易
	   	  document.frames["marketdiv"].ShowMarketList(str);
		  break;
	   case 1702 :
	   	  document.frames["marketdiv"].ShowMarketSell(str);
		  break;
	   case 1704 :
	   	  document.frames["marketdiv"].ShowMarketMybill(str);
		  break;
	   case 1703 :
	   	  document.frames["marketdiv"].ShowMarketCancle(str);
		  break;
	   case 1705 :
	   	  document.frames["marketdiv"].ShowBillInfo(str);
		  break;
	   case 1701 :
	   	  document.frames["marketdiv"].ShowMarketBuy(str);
		  break;
	   case 1210 :
	   	  document.frames["JZdiv"].ShowSeptQuit(str);
		  break;
	   case 1204 :
	   	  document.frames["JZdiv"].ShowSeptList(str);
		  break;
	   case 1200 :
	   	  document.frames["JZdiv"].ShowSeptInfo(str);
		  break;
	   case 1206 :
	   	  document.frames["JZdiv"].ShowSeptJoin(str);
		  break;
	   case 1201 :
	   	  document.frames["JZdiv"].ShowSeptCreat(str);
		  break;
	   case 1202 :
	   	  document.frames["JZdiv"].ShowSeptDes(str);
		  break;
	   case 1203 :
	   	  document.frames["JZdiv"].ShowSeptMemberList(str);
		  break;
	   case 1205 :
	   	  document.frames["JZdiv"].ShowSeptApplyList(str);
		  break;
	   case 1207 :
	   	  document.frames["JZdiv"].ShowSeptApplyAgree(str);
		  break;
	   case 1217 :
	   	  document.frames["JZdiv"].ShowSeptModByname(str);
		  break;
	   case 1216 :
	   	  document.frames["JZdiv"].ShowSeptListByname(str);
		  break;
	   case 1208 :
	   	  document.frames["JZdiv"].ShowSeptInviteMember(str);
		  break;
	   case 1212 :
	   	  document.frames["JZdiv"].ShowSeptUnionRequest(str);
		  break;
	   case 1213 :
	   	  document.frames["JZdiv"].ShowSeptApplyUnion(str);
		  break;
	   case 1222 :
	   	  document.frames["JZdiv"].ShowSeptEnemyRequest(str);
		  break;
	   case 1214 :
	   	  document.frames["JZdiv"].ShowSeptDocInfo(str);
		  break;
	   case 1215 :
	   	  document.frames["JZdiv"].ShowSeptUpdateInfo(str);
		  break;
	   case 1211 :
	   	  document.frames["JZdiv"].ShowSeptDelMember(str);
		  break;
	   case 1218 :
	   	  document.frames["JZdiv"].ShowSeptModUserByname(str);
		  break;
	   case 1228 :
	   	  document.frames["JZdiv"].ShowSeptUnionList(str);
		  break;
	   case 1223 :
	   	  document.frames["JZdiv"].ShowSeptUnionDel(str);
		  break;
	   case 1227 :
	   	  document.frames["JZdiv"].ShowSeptManagerList(str);
		  break;
	   case 1219 :
	   	  document.frames["JZdiv"].ShowSeptSetManager(str);
		  break;
	   case 1220 :
	   	  document.frames["JZdiv"].ShowSeptChangeManager(str);
		  break;
	   case 1224 :
	   	  document.frames["JZdiv"].ShowSeptNorLog(str);
		  break;
	   case 1229 :
	   	  document.frames["JZdiv"].ShowSeptNorForce(str);
		  break;
	   case 1225 :
	   	  document.frames["JZdiv"].ShowSeptShowUpgrade(str);
		  break;
	   case 1226 :
	   	  document.frames["JZdiv"].ShowSeptUpgradeChange(str);
		  break;
	   case 1230 :
	   	  document.frames["JZdiv"].ShowSeptSearchOtherSept(str);
		  break;
	   case 1209 :
	   	  ShowSeptJoinAgree(str);
		  break;
	   case 1414 :
	   	  ShowSeptUseOrderOk(str);
		  break;
	   case 1026 :
	   	  ShowSeptClassInfo(str);
		  break;
	   case 1027 :
	   	  ShowChCityName(str);
		  break;
	   case 1029 :
	   	  ShowMyInfomation(str);
		  break;
	   case 1028 :
	   	  ShowOtherPlayerInfo(str);
		  break;
	   //add by welchzhu
	   case 1400 :
		  OnUserItemResMsg(str);
		  break;
	   case 1401 :
		  OnMoveCityResMsg(str);
		  break;
	   case 1402 :
		  OnChangeNationResMsg(str);
		  break;
	   case 1403 :
		  OnSpeedBuildResMsg(str);
		  break;
	   case 1404 :
		  OnSpeedArmyResMsg(str);
		  break;
	   case 1405 :
		  OnBuyResourceResMsg(str);
		  break;
	   case 1406 :
		  OnExChangeResMsg(str);
		  break;
	   case 1407 :
		  OnTributaryResMsg(str);
		  break;
	   case 1408 :
	   	  OnBuyItemRes(str);
		  break;
	   case 1409 :
	   	  OnGetUserItemRes(str);
		  break;
	   case 1410 :
	   	  OnGetCoinResMsg(str);
		  break;
	   case 1413 :
	   	  onFoodItemMsg(str);
		  break;
	   case 1416 :
	   	  OnBuyManyItems(str);
		  break;
	   case 1415:
	   	  OnUseLinPai(str);
		  break;
	   case 1417:
	   	  onBuyGoldMsg(str);
		  break;
	   case 1021:
	   	  OnSendGoldMsg(str);
		  break;
	   //邮件系统
	   case 1750:
	   	  OnSendMailRes(str);
		  break;
	   case 1751:
	   	  OnDelMailRes(str);
		  break;
	   case 1753:
	   	  OnGetMailListRes(str);
		  break;
	   case 1752:
	   	  OnGetMailDetailRes(str);
		  break;
	   case 1754:
	   	  OnGetSetMailReadRes(str);
		  break;
	   case 1755:
	      OnGetMailUnReadNun(str);
	   	  break;
	   case 1780:
	   	  ShowChatGet(str);
		  break;
	   case 1781:
	   	  ShowChatSend(str);
		  break;
		
	}	
}


/*
**    ==================================================================================================  
**    类名： 
**    功能： 登录相关cookie操作
**    示例：
**                        
**    ==================================================================================================  
*/
function chGetCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null)
	{
		return unescape(arr[2]);
	}
	return "";
}
function chSetCookie(name, value)
{
	document.cookie = name + "=" + value + "; path=/; domain=qq.com";
}
function chDeleteCookie(name)
{
	chSetCookie(name, "");
}
// 从cookie获取QQ号
function chGetUin()
{
	var aRet = chGetCookie('uin').match(/\d+/);
	return aRet ? parseInt(aRet[0], 10) : -1;
}
// 根据cookie简单判断是否登录
function chIsLogin()
{
	var uin = chGetUin();
	var skey = chGetCookie('skey');
	if (uin <= 10000 || skey.length != 10)
	{
		return false;
	}
	return true;
}

function isChinese(str){ 
	var badChar ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
	badChar += "abcdefghijklmnopqrstuvwxyz"; 
	badChar += "0123456789"; 
	badChar += " "+"　";//半角与全角空格 
	badChar += "`~!@#$%^&()-_=+]\|:;'<,>?\"/";  //不包含*或.的英文符号 
	var isC = true;
	if(""==str){ 
		isC=false //return false; 
	}else{
		for(var i=0;i<str.length;i++){ 
			var c = str.charAt(i);//字符串str中的字符 
			if(badChar.indexOf(c) > -1)isC=false
		}
	}
	return isC
} 
function isGoodWord(str){ 
	var badChar =""; 
	badChar += "\\|'<>\"/";  //不包含*或.的英文符号 
	var isC = true;
	if(""==str){ 
		isC=false //return false; 
	}else{
		for(var i=0;i<str.length;i++){ 
			var c = str.charAt(i);//字符串str中的字符 
			if(badChar.indexOf(c) > -1)isC=false
		}
	}
	return isC
} 
function isGoodName(str){ 
	var badChar =" "+"　";//半角与全角空格 
	badChar += "`~!@#$%^&()-*.=+]\|:;'<,>?\"/";  //不包含*或.的英文符号 
	var isC = true;
	if(""==str){ 
		isC=false //return false; 
	}else{
		for(var i=0;i<str.length;i++){ 
			var c = str.charAt(i);//字符串str中的字符 
			if(badChar.indexOf(c) > -1)isC=false
		}
	}
	return isC
} 

function isNumber(str){ 
	var b=(parseInt(str)==str&&str>=0)?true:false
	return b
} 

function isPlusNumber(str)
{
	var b=(parseInt(str)==str&&str>0)?true:false
	return b;
}




/*
**    ==================================================================================================  
**    类名： 
**    功能： Tips显示函数
**    示例：
**                        
**    ==================================================================================================  
*/
var curMouseObj
function quickalt() 
{
	var evt=evt?evt:(window.event?window.event:null)
	if(curMouseObj != evt.srcElement){
		curMouseObj = evt.srcElement
		var scrollPos; 
		if (typeof window.pageYOffset != 'undefined') { 
			scrollPos = window.pageYOffset; 
		} 
		else if (typeof document.compatMode != 'undefined' && 
			  document.compatMode != 'BackCompat') { 
			scrollPos = document.documentElement.scrollTop; 
		} 
		else if (typeof document.body != 'undefined') { 
			scrollPos = document.body.scrollTop; 
		} 
		if(evt.srcElement.hint && evt.srcElement.hint!='') 
		{
			altlayer.style.visibility='visible';
			altlayer.style.left=evt.x+10;
			altlayer.style.top=evt.y-scrollPos+10;
			altlayer.innerHTML=evt.srcElement.hint
		}
		else
		{ 
			altlayer.style.visibility='hidden';
		}
	}
}
/*
**    ==================================================================================================  
**    类名： 
**    功能： 弹出详细信息列表
**    示例： moreinfotab(id)
**                       id 1-19 与数组下标不同    
**    ==================================================================================================  
*/
function moreinfotab(id,type){
	if(type==null){
		HI("moreinfo_1")
		HI("moreinfo_2")
		SH("moreinfo_building")
		var TabLength=$("moreinfo_tab").rows.length;	
		for(var i=0;i<TabLength;i++){
			$("moreinfo_tab").deleteRow(-1);
		}
		$("moreinfo_nametxt").innerHTML = mb.Buidings[id].BuildingName;
		$("moreinfo_infotxt").innerHTML = mb.Buidings[id].BuildingDesc ;
		for(m=0;m<mbr.Buidingranks[id].rank.length;m++){
			var otr = $("moreinfo_tab").insertRow(-1);
			for(i=1;i<12;i++){
				eval("var TD"+i+"=document.createElement('td')");
			}
				TD1.innerHTML=mbr.Buidingranks[id].rank[m].Rank;
				TD2.innerHTML=mbr.Buidingranks[id].rank[m].Data;	
				TD3.innerHTML=mbr.Buidingranks[id].rank[m].NeedWood;	
				TD4.innerHTML=mbr.Buidingranks[id].rank[m].NeedIron;	
				TD5.innerHTML=mbr.Buidingranks[id].rank[m].NeedFood;	
				TD6.innerHTML=mbr.Buidingranks[id].rank[m].NeedStone;	
				TD7.innerHTML=mbr.Buidingranks[id].rank[m].NeedPopulation;	
				TD8.innerHTML=formattime(mbr.Buidingranks[id].rank[m].NeedTime);	
				TD9.innerHTML=transPreCondition(mbr.Buidingranks[id].rank[m].Precondition)[0];	
				TD10.innerHTML=noblank(mbr.Buidingranks[id].rank[m].NeedMoney);	
				TD11.innerHTML=noblank(mbr.Buidingranks[id].rank[m].NeedSpecial);	
				TD1.height="20";
				TD1.width ="20";
				TD2.width ="135";
				TD3.width ="68";
				TD4.width ="68";
				TD5.width ="68";
				TD6.width ="68";
				TD7.width ="78";
				TD8.width ="75";
				TD9.width ="95";
				TD10.width ="40";
				TD11.width ="87";
				TD2.title=mbr.Buidingranks[id].rank[m].Data;
			for(i=1;i<12;i++){
				eval("otr.appendChild(TD"+i+")");
			}
		}
	}else{
		HI("moreinfo_building")
		HI("moreinfo_1")
		HI("moreinfo_2")
		if(type==1){
			//显示城防
			var TabLength=$("moreinfo_1_tab").rows.length;	
			for(var i=0;i<TabLength-1;i++){
				$("moreinfo_1_tab").deleteRow(-1);
			}
			for(var m=for_start_arid;m<arm_start_arid;m++){
				var otr = $("moreinfo_1_tab").insertRow(-1);
				for(var i=1;i<10;i++){
					eval("var TD"+i+"=document.createElement('td')");
				}
					TD1.innerHTML=mb.Buidings[m].BuildingName;
					TD2.innerHTML=mbr.Buidingranks[m].rank[0].NeedWood;	
					TD3.innerHTML=mbr.Buidingranks[m].rank[0].NeedIron;	
					TD4.innerHTML=mbr.Buidingranks[m].rank[0].NeedFood;	
					TD5.innerHTML=mbr.Buidingranks[m].rank[0].NeedStone;	
					TD6.innerHTML=formattime(mbr.Buidingranks[m].rank[0].NeedTime);	
					TD7.innerHTML=mbr.Buidingranks[m].rank[0].NeedMoney;	
					TD8.innerHTML=mbr.Buidingranks[m].rank[0].Reserve3;	
					TD9.innerHTML=mbr.Buidingranks[m].rank[0].Reserve4;	
					TD1.height="20";
					TD1.bgcolor="#F7F7F7";
				for(i=1;i<10;i++){
					eval("otr.appendChild(TD"+i+")");
				}
			}
			$("moreinfo_1").style.textAlign="center"
		}else if(type==2){
			//显示兵种
			$("moreinfo_2").style.textAlign="center"
			var TabLength=$("moreinfo_2_tab").rows.length;	
			for(var i=0;i<TabLength-1;i++){
				$("moreinfo_2_tab").deleteRow(-1);
			}
			for(var m=arm_start_arid;m<arm_end_arid;m++){
				var otr = $("moreinfo_2_tab").insertRow(-1);
				for(var i=1;i<11;i++){
					eval("var TD"+i+"=document.createElement('td')");
				}
					TD1.innerHTML="<img src='/images/army/bz"+(m-38)+".png' width='18' height='18'>"
					TD2.innerHTML=mb.Buidings[m].BuildingName;
					TD3.innerHTML=mbr.Buidingranks[m].rank[0].Reserve1;	
					TD4.innerHTML=mbr.Buidingranks[m].rank[0].Reserve2;	
					TD5.innerHTML=mbr.Buidingranks[m].rank[0].Reserve3;	
					TD6.innerHTML=mbr.Buidingranks[m].rank[0].Reserve4;	
					TD7.innerHTML=mbr.Buidingranks[m].rank[0].Reserve5;	
					TD8.innerHTML=mbr.Buidingranks[m].rank[0].Reserve6;	
					TD9.innerHTML=mbr.Buidingranks[m].rank[0].Reserve7;	
					TD10.innerHTML=mbr.Buidingranks[m].rank[0].Reserve8;
					TD1.height="18";	
					//TD1.style.textAlign="left";
				for(i=1;i<11;i++){
					eval("otr.appendChild(TD"+i+")");
				}
			}
		}
		SH("moreinfo_"+type)
	}
}
function noblank(str){
	if(str == ""){
		return "&nbsp;"
	}else{
		return str;
	}
}
/*
**    ==================================================================================================  
**    类名： 
**    功能： 弹出信息提示接口
**    示例： msgbox(str)
**                  str可以是带HTML的字符串
**    ==================================================================================================  
*/
//告知对话框
function msgbox(str){		
	$("msgstr").innerHTML=str;
	SH('msgbox');
	SH('maskbg');	
	SH('DivShim');			
	
	$('msgbox_in1').focus();
}
function checkKey(){
	if(window.event.keyCode == 13 || window.event.keyCode == 32){
		HI('msgbox');
		HI("maskbg");
		HI("DivShim");
		return true;
	}else if(window.event.keyCode == 27){
		HI('msgbox');
		HI("maskbg");
		HI("DivShim");
		return false;	
	}
}
//二次确认选择对话框
function msgboxyesno(str){		
	$("msgstr2").innerHTML=str;
	SH('msgboxyesno');
	SH('maskbg');		
	SH('DivShim');		
	$('msgbox_in2').focus();
}
function checkKeyYesno(){
	if(window.event.keyCode == 13 || window.event.keyCode == 32 ){
		HI('msgboxyesno');
		HI("maskbg");
		HI("DivShim");
		eval(msgboxFunc)
	}else if(window.event.keyCode == 27){
		HI('msgboxyesno');
		HI("maskbg");
		HI("DivShim");
	}
}
/*
**    ==================================================================================================  
**    类名： 
**    功能： 转换数组下标与真实建造项ID
**    示例： 
**    ==================================================================================================  
*/
function transToID(id){
	//0-18为建筑
	if(id<tec_start_arid){
		return id+1;
	}else if(id>=tec_start_arid && id<for_start_arid){
	//19-30为科技	
		return id+14;		
	}else if(id>=for_start_arid && id<arm_start_arid){
	//31-38为防御
		return id+34;	
	}else if(id>=arm_start_arid && id<arm_end_arid){
	//39-49为兵种
		return id+58;
	}
}
function transToArrID(id){
	//0-18为建筑
	if(id<20){
		return id-1;
	}else if(id>=33 && id<46){
	//19-30为科技	
		return id-14;		
	}else if(id>=65 && id<73){
	//31-38为防御
		return id-34;	
	}else if(id>=97 && id<108){
	//39-49为兵种
		return id-58;
	}else if(id>=129){
	//50后随机点
		return id-79;
	}
}

/*
**    ==================================================================================================  
**    类名： 
**    功能： 地图搜索
**    示例： 1008 1009相关
**    ==================================================================================================  
*/
//普通搜索
function SearchN(){
	if(document.form_searchn.searchn[0].checked){
		var x = parseInt(document.form_searchn.xx.value,10)
		var y = parseInt(document.form_searchn.yy.value,10)
		//document.form_searchn.xx.value = x
		//document.form_searchn.yy.value = y
		
		if(x>=0 && x<=999 && y>=0 && y<=999 ){
			var gridid = ToThree(x)+""+ToThree(y)
			objFlashEng.Send(GetWorldMap(gridid,1))
		}else{
			msgbox("坐标输入错误。\n请输入0-999的整数!")
		}
	}else if(document.form_searchn.searchn[1].checked){
		objFlashEng.Send(SearchMapN(1,document.form_searchn.name.value))
	}else if(document.form_searchn.searchn[2].checked){	
		if(isPlusNumber(document.form_searchn.qq.value)==false){
			msgbox("请输入正整数!")
		}else{
			objFlashEng.Send(SearchMapN(0,document.form_searchn.qq.value))
		}
		
	}
}
function ToThree(num){
	if(num <10){
		return "00"+num;
	}else if(num <100){
		return "0"+num;		
	}else{
		return num;	
	}
}
function ToXY(inint,isx){
	var x,y
	if(typeof(isx)=="undefined"){
		if(inint>=0 && inint<1000){
			return inint + ",0";
		}else if(inint>=1000 && inint<1000000){
			y = Math.floor(inint/1000)
			x = inint-y*1000;
			return y +","+ x
		}
	}else if(isx=="x"){
		if(inint>=0 && inint<1000){
			return "0";
		}else if(inint>=1000 && inint<1000000){
			y = Math.floor(inint/1000);
			x = inint-y*1000;
			return y
		}
	}else if(isx=="y"){
		if(inint>=0 && inint<1000){
			return inint;
		}else if(inint>=1000 && inint<1000000){
			y = Math.floor(inint/1000);
			x = inint-y*1000;
			return x
		}		
	}
}
//查询地图收藏
function ShowGetFavMap(){
	objFlashEng.Send(GetFavMap(3,0,0,0))
}
//收藏操作
function DoFavMap(xy,desc){
	objFlashEng.Send(GetFavMap(0,xy,desc,0,1))
}
//修改收藏名称
function ModFavMap(xy,arrID){
	var desc = $("ModFavMap_input_"+ arrID).value;
	//防止为空
	if(desc==""){
		msgbox("请输入正确名称!")	
	}else{
		objFlashEng.Send(GetFavMap(2,xy,desc,arrID))
	}
}
//删除收藏
function DelFavMap(xy,arrID){
	msgboxyesno("您确认要删除该坐标收藏吗？")
	msgboxFunc="objFlashEng.Send(GetFavMap(1,"+xy+",0,"+arrID+"))";
}
//编辑修改收藏
function callModFavMap(xy,desc,arrID){
	//防止其他编辑框未确认
	var iInput=0;
	for(var i=0;i<$("citymap_fav_tab").rows.length;i++){
		var s=$("citymap_fav_tab").rows[i].cells[0].innerHTML
		if(s.indexOf("ModFavMap_input_")!= -1)iInput++
	}
	if(iInput>0){
		msgbox("不能同时编辑多个名称!")	
	}else{
		$("citymap_fav_tab").rows[arrID+1].cells[0].innerHTML="<input onkeydown='javascript:if(window.event.keyCode == 0xD)ModFavMap("+xy+","+arrID+")' onblur='ModFavMap("+xy+","+arrID+")' id='ModFavMap_input_"+ arrID + "' type='text' value='"+ desc + "' style='width:80px; border:1px solid #666666; background-color:#CCCCCC'>"
	}
}
/*
**    ==================================================================================================  
**    类名： 
**    功能： 地图显示
**    示例： 1006相关
**    ==================================================================================================  
*/
//初始化显示
function initMyMap(){
	objFlashEng.Send(GetWorldMap(curGridID));
	curMapGridID = curGridID;
}
//确保y坐标不超出范围
function isGridYSmall(num){
	if(isGridToXY(num)[1]<7){
		return	num+4;
	}else{
		return	num;
	}
}
function isGridYBig(num){
	if(isGridToXY(num)[1]>992){
		return	num-4;
	}else{
		return	num;
	}
}
//确保X坐标不超出范围
function isGridXSmall(num){
	if(isGridToXY(num)[0]<7){
		return	num+4000;
	}else{
		return	num;
	}
}
function isGridXBig(num){
	if(isGridToXY(num)[0]>992){
		return	num-4000;
	}else{
		return	num;
	}
}
function isGridToXY(num){
	inint = num;
	if(inint>=0 && inint<1000){
		xxx=0;
		yyy=inint;
	}else if(inint>=1000 && inint<1000000){
		xxx = Math.floor(inint/1000);
		yyy = inint-xxx*1000;
	}
	return [xxx,yyy]
}



//转换国家ID
function ToNation(id){
	var arrTmpNa=['',"齐",
				  "楚", 
				  "燕", 
				  "韩", 
				  "赵", 
				  "魏",
				  "秦"]
	return arrTmpNa[id]
}

function ToNationKe(id){
	var arrTmpNa=['',"秦→<b>齐</b>→楚",
				  "齐→<b>楚</b>→燕", 
				  "楚→<b>燕</b>→韩", 
				  "燕→<b>韩</b>→赵", 
				  "韩→<b>赵</b>→魏", 
				  "赵→<b>魏</b>→秦",
				  "魏→<b>秦</b>→齐"]
	return arrTmpNa[id]
}
/*
**    ==================================================================================================  
**    类名： 
**    功能： 派兵tab显示
**    示例： 1010派兵 1017测试部队时间相关
**    ==================================================================================================  
*/
//使派出输入框内值最大
function army_max(num){
	try{
		if($("amry_attack_send"+num)!=null)$("amry_attack_send"+num).value = arrCityBuildRank[num]
		if($("amry_send_send"+num)!=null)$("amry_send_send"+num).value = arrCityBuildRank[num]
		if($("amry_sendother_send"+num)!=null)$("amry_sendother_send"+num).value = arrCityBuildRank[num]
		if($("amry_exploit_send"+num)!=null)$("amry_exploit_send"+num).value = arrCityBuildRank[num]
		if($("amry_spy_send"+num)!=null)$("amry_spy_send"+num).value = arrCityBuildRank[num]
		if($("amry_trans_send"+num)!=null)$("amry_trans_send"+num).value = arrCityBuildRank[num]
	}catch(e){           
    }  
}

//组合数组
function mkArmyArr(pos,value){
	var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	arrarmy[pos] = value;
	var str="";
	for(i in arrarmy){
		str = str+ CLength(arrarmy[i]);
	}
	str = CLength(arrarmy.length)+str
	return str;
}
//点将台初始化
function DoDJ(allUnForce){
	//每小时耗粮
	$("dj_army_food").innerHTML=curFoodExpend;
	//装备数量	
	for(var i=0;i<4;i++){
		eval("$('dj_army_armor"+i+"').innerHTML = Outfit["+i+"];")
	}
	
	//生成自己城市的兵种表格
	var D=[]
	for(var i=39;i<50;i++){
		D.push(arrCityBuildRank[i])
	}
	//清空表格
	var TabLength=$("dj_army_info").rows.length;	
	for(var i=0;i<TabLength;i++){
		$("dj_army_info").deleteRow(-1);
	}
	addArmyInfo($("dj_army_info"),D,"数目",11);	
	
	
	//dj_army_fortlist城防列表
	var tmFort=""
	for(var i=for_start_arid;i<arm_start_arid;i++){
		tmFort+=mb.Buidings[i].BuildingName+":"+arrCityBuildRank[i]+"个　"
	}
	$("dj_army_fortlist").innerHTML = tmFort;

	//解析联防部队
		var tempF='';
		//判断是否是自己派驻到外地的部队
		for(i=0;i<allUnForce.length;i++){
			if(allUnForce[i].iUin==Uin){
				tempF+='<div style="margin-top:6px; width:560px; height:24px;"><div class="floatleft" style="line-height:24px;">派驻到 <strong class="t_green imghand" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+allUnForce[i].iTarGrid+'))">'+allUnForce[i].szMarrowCityName+'</strong>('+ToXY(allUnForce[i].iTarGrid)+') 的部队</div><div style="float:right" class="btnWhite"  onclick="objFlashEng.Send(GetArmyListInfo(\''+allUnForce[i].stCarmyWaterID+'\','+CityID+',1000));SHI_DJ(\'dj_info'+allUnForce[i].stCarmyWaterID+'\',this)" id="dj_infodiv'+allUnForce[i].stCarmyWaterID+'">显示详情</div></div><div id="dj_info'+allUnForce[i].stCarmyWaterID+'" style="display:none"></div>'
			}
		}
		tempF=(tempF=="")?"<br>暂无":tempF
		$("dj_army_myotherforce").innerHTML = tempF;	
	
		//判断是否是友军部队
		var tempF='';	
		for(i=0;i<allUnForce.length;i++){
			if(allUnForce[i].iUin!=Uin){
				tempF+='<div style="margin-top:6px; width:560px; height:24px;"><div class="floatleft" style="line-height:24px;">来自 <strong class="t_green">'+allUnForce[i].iUin+'</strong> 辖下的 <strong class="t_green">'+allUnForce[i].szMarrowCityName+'</strong>的部队</div><div style="float:right" class="btnWhite" onclick="objFlashEng.Send(GetArmyListInfo(\''+allUnForce[i].stCarmyWaterID+'\','+CityID+',1000));SHI_DJ(\'dj_info'+allUnForce[i].stCarmyWaterID+'\',this)" id="dj_infodiv'+allUnForce[i].stCarmyWaterID+'">显示详情</div></div><div id="dj_info'+allUnForce[i].stCarmyWaterID+'" style="display:none"></div>'
			}
		}
		tempF=(tempF=="")?"<br>暂无":tempF
		$("dj_army_otherforce").innerHTML = tempF;	
}
function SHI_DJ(ob,ob2){
	if($(ob).style.display!="none"){
		$(ob).style.display="none"
		ob2.innerHTML="显示详情"
	}else{
		$(ob).style.display="block"
		ob2.innerHTML="关闭详情"
	}
}
//接收1018详情数据，显示联防部队详情
function ShowDJ_ArmyInfo(obj){	
	var tempF=""
	tempF+='	<table width="560" height="104"border="1" bordercolor="#dedede" style="border-collapse:collapse;margin:6px 0 0 0" cellpadding="0" cellspacing="0" class="border_hui">'
	tempF+='		<tr>'
	tempF+='			<td height="24" bgcolor="#E3E3DD"><img src="../images/army/hero.png" width="22" height="22"  align="absmiddle" />'
	//解析英雄	
	tempF+= '						英雄：'+formatHero(obj)
	tempF+='		</td></tr>'
	tempF+='		<tr>'
	tempF+='			<td height="39" align="center">'
	tempF+='			<table id="dj_infotab'+obj.stCarmyWaterID+'" width="560" cellpadding="0" cellspacing="1"></table>'
	tempF+='			</td>'
	tempF+='		</tr>'
	tempF+='		<tr>'
	tempF+='			<td height="39" align="center">青铜甲：0 白银甲：0 黄金甲：0 圣甲：0 粮食消耗：'+obj.iFoodExpenHour+'/小时 <span class="a_deepred imghand" onclick="objFlashEng.Send(GetCancleArmy(\''+obj.stCarmyWaterID+'\',0,1000))">>>让该部队返城</span></td>'
	tempF+='		</tr>'
	tempF+='	</table>'
	$("dj_info"+obj.stCarmyWaterID).innerHTML = tempF
	addArmyInfo($("dj_infotab"+obj.stCarmyWaterID),PackArr(obj.CCityArmy.ashArmy,11),"数目",11);	
}

//接收1019队列摘要的数据
function ShowDJ_Army(obj){
	//将istat=3联防的部队信息放入数组
	var allUnForce=[]
	for(i=0;i<obj.length;i++){
		if(obj[i].iStat==3){
			allUnForce.push(obj[i])
		}	
	}	
	DoDJ(allUnForce);
}
//收到1017之后显示页面 测试消耗粮食及时间
function ShowMarchInfo(str){
	var objM=eval('('+str+')');
	if(typeof(objM.CResult) != "undefined")	{
		msgbox("Error:"+objM.CResult.iResultID+"<br><b>测试消耗失败：</b><span class='t_tips_yellow'>"+errMsg(objM.CResult.iResultID)+"!</span>")
		return false;
	}
	var arrTabDiv = ["attack","send","trans","spy","exploit","sendother"]
	for(i=0;i<arrTabDiv.length;i++){
		try {
     		eval("$('army_time_"+arrTabDiv[i]+"').innerHTML = '"+ formattime(objM.CAnsTestArmy.CTestArmy.iMarchTime)+"'");
     		eval("$('army_food_"+arrTabDiv[i]+"').innerHTML = '"+ objM.CAnsTestArmy.CTestArmy.iFoodExpend+"'");
      	}
      	catch(e) {           
      	}  
	}
	//可掠夺的资源量
	$('army_take_attack').innerHTML = objM.CAnsTestArmy.CTestArmy.iArmyLoadMax;
}

//
//-----------------------------------------------------------
//以下是六种军事动作

//
// 侦查相关
//
function DoSpy(grid,name,ownwer){
	//当前拥有的侦察兵数量
	$("amry_spy_sendmax41").innerHTML = arrCityBuildRank[41];
	$("amry_spy_send41").value = 0;
	//目标城市信息
	$("amry_spy_city").innerHTML = name;
	$("amry_spy_x").value = ToXY(grid,"x");
	$("amry_spy_y").value = ToXY(grid,"y");
	$("amry_spy_gridid").innerHTML = grid;
	
	//清空原有测试消耗信息
	$("army_time_spy").innerHTML = "00:00:00";
	$("army_food_spy").innerHTML = "0";
	
}
function StartSpy(){
	var gridid=inputToGird($("amry_spy_x").value,$("amry_spy_y").value)
	if(gridid!=""){
		strStartAttact = "objFlashEng.Send(GetCreatArmy(\""+gridid+"\",3,mkArmyArr(2,$(\"amry_spy_send41\").value),'00010',$(\"army_spy_select\").value,$(\"army_spy_iEmergency\").checked,\"NewCity\"))";
		objFlashEng.Send(GetCreatArmy(gridid,3,mkArmyArr(2,$("amry_spy_send41").value),'00010',$("army_spy_select").value,$("army_spy_iEmergency").checked,"NewCity"));
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}

}
//1017查询派出所需时间
function getSpySendTime(){
	if(inputToGird($("amry_spy_x").value,$("amry_spy_y").value)!=""){
		var itemid=$("army_spy_iEmergency").checked?20:0
		objFlashEng.Send(GetMarchInfo(inputToGird($("amry_spy_x").value,$("amry_spy_y").value),0,$("army_spy_select").value,mkArmyArr(2,$("amry_spy_send41").value),itemid))
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
function checkSpyValue(){
	var a=$("amry_spy_sendmax41").innerHTML
	var b=$("amry_spy_send41").value
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("派出的数量不能超过拥有的数量")
		}else{
			getSpySendTime();	
		}
	}else{
		msgbox("请输入整数！")
	}
}


//
// 拓荒相关
//
function DoExploit(grid){
	//当前拥有的侦察兵数量
	$("amry_exploit_sendmax42").innerHTML = arrCityBuildRank[42];
	$("amry_exploit_send42").value = 1;
	//目标城市信息
	$("amry_exploit_city").innerHTML = "默默无闻的荒地";
	$("amry_exploit_x").value = ToXY(grid,"x");
	$("amry_exploit_y").value = ToXY(grid,"y");
	$("amry_exploit_gridid").innerHTML = grid;
	
	//清空原有测试消耗信息
	$("army_time_exploit").innerHTML = "00:00:00";
	$("army_food_exploit").innerHTML = "0";
	
	$("army_exploit_iCityname").value = ""
}
function StartExploit(){
	//判断坐标输入是否正确	
	if(inputToGird($("amry_exploit_x").value,$("amry_exploit_y").value)!=""){
		$("amry_exploit_gridid").innerHTML=inputToGird($("amry_exploit_x").value,$("amry_exploit_y").value)
		//检查是否有拓荒兵
		if(arrCityBuildRank[42] > 0){
			//检查新城名称是否为空
			if($("army_exploit_iCityname").value!=""){
				if(checkName($("army_exploit_iCityname").value)){
					strStartAttact="objFlashEng.Send(GetCreatArmy($(\"amry_exploit_gridid\").innerHTML,2,mkArmyArr(3,$(\"amry_exploit_send42\").value),'00010',$(\"army_exploit_select\").value,$(\"army_exploit_iEmergency\").checked,$(\"army_exploit_iCityname\").value))";
					objFlashEng.Send(GetCreatArmy($("amry_exploit_gridid").innerHTML,2,mkArmyArr(3,$("amry_exploit_send42").value),'00010',$("army_exploit_select").value,$("army_exploit_iEmergency").checked,$("army_exploit_iCityname").value));
				}
			}else{
				msgbox("您还没有输入拓荒新城名称！")
			}
		}else{
			msgbox("您还没有拓荒兵，请先建造一个。")	
		}
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
//1017查询派出所需时间
function getExploitSendTime(){
	var itemid=$("army_exploit_iEmergency").checked?20:0
	if(inputToGird($("amry_exploit_x").value,$("amry_exploit_y").value)!=""){
		objFlashEng.Send(GetMarchInfo(inputToGird($("amry_exploit_x").value,$("amry_exploit_y").value),0,$("army_exploit_select").value,mkArmyArr(3,$("amry_exploit_send42").value),itemid))
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
function inputToGird(x,y){
	if(parseInt(x,10)==x && parseInt(y,10)==y){
		x = parseInt(x,10)
		y = parseInt(y,10)
		if(x>=0 && x<=999 && y>=0 && y<=999 ){
			var gridid = ToThree(x)+""+ToThree(y)
			return gridid
		}else{
			return ""
		}	
	}else{
		return ""
	}
}
function checkExploitValue(i){
	var a=$("amry_exploit_sendmax42").innerHTML
	var b=$("amry_exploit_send42").value
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("派出的数量不能超过拥有的数量")
		}else{
			getExploitSendTime();	
		}
	}else{
		msgbox("请输入整数！")
	}
}

//
// 进攻相关
//
function DoAttack(grid,name,ownwer){
	//初始化顶部派出英雄
	objFlashEng.Send(getTaskList(1602))
	$("attack_hero_tab").style.visibility="visible"
	$("attack_hero_hidetype").innerHTML = "0";
	
	//装备数量
	for(i=0;i<4;i++){
		eval("$('army_attack_shieldmax"+i+"').innerHTML='"+Outfit[i]+"'");
		eval("$('army_attack_shield"+i+"').value='0'");
	}
	//兵种数量初始化
	for(i=39;i<50;i++){
		if(i!=42 && i!=41)eval("$('amry_attack_sendmax"+i+"').innerHTML='"+arrCityBuildRank[i]+"'");
		if(i!=42 && i!=41)eval("$('amry_attack_send"+i+"').value='0'");
	}
	//目标城市信息
	$("amry_attack_randomOrCity").innerHTML= name=="据点"?"据点":"城市"
	
	$("amry_attack_city").innerHTML = name;
	$("amry_attack_gridid").innerHTML = grid;
	$("amry_attack_x").value = ToXY(grid,"x");
	$("amry_attack_y").value = ToXY(grid,"y");
	
	
	//清空原有测试消耗信息
	$("army_time_attack").innerHTML = "00:00:00";
	$("army_food_attack").innerHTML = "0";
	$("army_take_attack").innerHTML = "0";
	
}
//1017查询派出所需时间
function getAttackSendTime(){
	//判断输入坐标合法性
	if(inputToGird($("amry_attack_x").value,$("amry_attack_y").value)!=""){
		//组合派兵字符串
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			if(i!=2 && i!=3)eval("arrarmy[i] = $('amry_attack_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		
		//英雄数组字符串
		var strhero=""
		var o=$N("attack_hero_ckb")
		var b=0
		for(i=0;i<o.length;i++){
			if(o[i].checked == true){
				strhero += CLength(o[i].value);
				b++
			}
		}
		strhero = CLength(b.toString())+strhero	
		var itemid=$("army_attack_iEmergency").checked?20:0
		objFlashEng.Send(GetMarchInfo(inputToGird($("amry_attack_x").value,$("amry_attack_y").value),1,$("army_attack_select").value,str,itemid,strhero));
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
function StartAttack(){
	//判断输入坐标合法性
	var gridid = inputToGird($("amry_attack_x").value,$("amry_attack_y").value)
	if(gridid!=""){
		//生成兵种数组字符串	
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			if(i!=2 && i!=3)eval("arrarmy[i] = $('amry_attack_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//装备数组字符串
		var strshield="";
		for(i=0;i<4;i++){
			eval("strshield = strshield + CLength($('army_attack_shield"+i+"').value)");
		}
		strshield = CLength(4)+strshield;
		//英雄数组字符串
		var strhero=""
		var o=$N("attack_hero_ckb")
		var b=0
		for(i=0;i<o.length;i++){
			if(o[i].checked == true){
				strhero += CLength(o[i].value);
				b++
			}
		}
		strhero = CLength(b.toString())+strhero
	
		//发送请求
		//判断是掠夺战or随机点战
		if($("amry_attack_randomOrCity").innerHTML =="据点"){
			strStartAttact="objFlashEng.Send(GetCreatArmyRandom("+gridid+",6,'"+str+"','"+strshield+"',$(\"army_attack_select\").value,$(\"army_attack_iEmergency\").checked,'str','"+strhero+"'))";
			objFlashEng.Send(GetCreatArmyRandom(gridid,6,str,strshield,$("army_attack_select").value,$("army_attack_iEmergency").checked,'str',strhero));	
		}else{
			strStartAttact="objFlashEng.Send(GetCreatArmy("+gridid+",1,'"+str+"','"+strshield+"',$(\"army_attack_select\").value,$(\"army_attack_iEmergency\").checked,'str','"+strhero+"'))";
			objFlashEng.Send(GetCreatArmy(gridid,1,str,strshield,$("army_attack_select").value,$("army_attack_iEmergency").checked,'str',strhero));			
		}
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
function checkAttackValue(i){
	var a=arrCityBuildRank[i]
	eval("var b=$('amry_attack_send"+i+"').value")
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("派出的数量不能超过拥有的数量")
		}else{
			getAttackSendTime();	
		}
	}else{
		msgbox("请输入整数！")
	}
}



//
// 驻派相关
//
function DoSend(grid,name,ownwer){
	//初始化顶部派出英雄
	objFlashEng.Send(getTaskList(1602))	
	$("attack_hero_tab").style.visibility="visible"
	$("attack_hero_hidetype").innerHTML = "1";
	
	//当前拥有的兵种
	
	//兵种数量初始化
	for(i=39;i<50;i++){
		eval("$('amry_send_sendmax"+i+"').innerHTML='"+arrCityBuildRank[i]+"'");
		eval("$('amry_send_send"+i+"').value='0'");
	}
	//目标城市信息
	$("amry_send_city").innerHTML = name;
	$("amry_send_x").value = ToXY(grid,"x");
	$("amry_send_y").value = ToXY(grid,"y");
	$("amry_send_gridid").innerHTML = grid;
	
	//清空原有测试消耗信息
	$("army_time_send").innerHTML = "00:00:00";
	$("army_food_send").innerHTML = "0";
}
function StartSend(){
	//判断坐标输入
	var gridid=inputToGird($("amry_send_x").value,$("amry_send_y").value)
	if(gridid!=""){
		//生成兵种数组字符串	
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			eval("arrarmy[i] = $('amry_send_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//装备数组字符串
		//派驻时装备为资源，暂时全设置为0
		strshield = CLength(4)+"00010"+"00010"+"00010"+"00010"
		
		//英雄数组字符串
		var strhero=""
		var o=$N("attack_hero_ckb")
		var b=0
		for(i=0;i<o.length;i++){
			if(o[i].checked == true){
				strhero += CLength(o[i].value);
				b++
			}
		}
		strhero = CLength(b.toString())+strhero
		
		//发送请求
		strStartAttact="objFlashEng.Send(GetCreatArmy(\""+gridid+"\",5,'"+str+"','"+strshield+"',$(\"army_send_select\").value,$(\"army_send_iEmergency\").checked,'str',"+strhero+"))"
		objFlashEng.Send(GetCreatArmy(gridid,5,str,strshield,$("army_send_select").value,$("army_send_iEmergency").checked,'str',strhero));
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
//1017查询派出所需时间
function getSendSendTime(){
	//判断坐标输入
	var gridid=inputToGird($("amry_send_x").value,$("amry_send_y").value)
	if(gridid!=""){
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			eval("arrarmy[i] = $('amry_send_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		var itemid=$("army_send_iEmergency").checked?20:0
		
		
		//英雄数组字符串
		var strhero=""
		var o=$N("attack_hero_ckb")
		var b=0
		for(i=0;i<o.length;i++){
			if(o[i].checked == true){
				strhero += CLength(o[i].value);
				b++
			}
		}
		strhero = CLength(b.toString())+strhero	
		
		objFlashEng.Send(GetMarchInfo(gridid,0,$("army_send_select").value,str,itemid,strhero));
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
function checkSendValue(i){
	var a=arrCityBuildRank[i]
	eval("var b=$('amry_send_send"+i+"').value")
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("派出的数量不能超过拥有的数量")
		}else{
			getSendSendTime();	
		}
	}else{
		msgbox("请输入整数！")
	}
}


//
// 联防相关
//
function DoSendother(grid,name,ownwer){
	//初始化顶部派出英雄
	objFlashEng.Send(getTaskList(1602))	
	$("attack_hero_tab").style.visibility="visible"
	$("attack_hero_hidetype").innerHTML = "2";
	
	//当前拥有的兵种	
	//兵种数量初始化
	for(i=39;i<50;i++){
		eval("$('amry_sendother_sendmax"+i+"').innerHTML='"+arrCityBuildRank[i]+"'");
		eval("$('amry_sendother_send"+i+"').value='0'");
	}
	
	
	//装备数量
	for(i=0;i<4;i++){
		eval("$('army_sendother_shieldmax"+i+"').innerHTML='"+Outfit[i]+"'");
		eval("$('army_sendother_shield"+i+"').value='0'");
	}
	//目标城市信息
	$("amry_sendother_city").innerHTML = name;
	$("amry_sendother_x").value = ToXY(grid,"x");
	$("amry_sendother_y").value = ToXY(grid,"y");
	$("amry_sendother_gridid").innerHTML = grid;
	
	//清空原有测试消耗信息
	$("army_time_sendother").innerHTML = "00:00:00";
	$("army_food_sendother").innerHTML = "0";
	
}
function StartSendother(){
	var gridid=inputToGird($("amry_sendother_x").value,$("amry_sendother_y").value)
	if(gridid!=""){
		//生成兵种数组字符串	
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			eval("arrarmy[i] = $('amry_sendother_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//地图格坐标
		//装备数组字符串
		var strshield="";
		for(i=0;i<4;i++){
			eval("strshield = strshield + CLength($('army_sendother_shield"+i+"').value)");
		}
		strshield = CLength(4)+strshield;
		
		//英雄数组字符串
		var strhero=""
		var o=$N("attack_hero_ckb")
		var b=0
		for(i=0;i<o.length;i++){
			if(o[i].checked == true){
				strhero += CLength(o[i].value);
				b++
			}
		}
		strhero = CLength(b.toString())+strhero
		//发送请求
		strStartAttact="objFlashEng.Send(GetCreatArmy(\""+gridid+"\",4,'"+str+"','"+strshield+"',$(\"army_sendother_select\").value,$(\"army_sendother_iEmergency\").checked,'str',"+strhero+"))"
		objFlashEng.Send(GetCreatArmy(gridid,4,str,strshield,$("army_sendother_select").value,$("army_sendother_iEmergency").checked,'str',strhero));
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}

	
}
//1017查询派出所需时间
function getSendotherSendTime(){
	var gridid=inputToGird($("amry_sendother_x").value,$("amry_sendother_y").value)
	if(gridid!=""){
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			eval("arrarmy[i] = $('amry_sendother_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		var itemid=$("army_sendother_iEmergency").checked?20:0
		
		//英雄数组字符串
		var strhero=""
		var o=$N("attack_hero_ckb")
		var b=0
		for(var i=0;i<o.length;i++){
			if(o[i].checked == true){
				strhero += CLength(o[i].value);
				b++
			}
		}
		strhero = CLength(b.toString())+strhero
		objFlashEng.Send(GetMarchInfo(gridid,1,$("army_sendother_select").value,str,itemid,strhero))
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
function checkSendotherValue(i){
	var a=arrCityBuildRank[i]
	eval("var b=$('amry_sendother_send"+i+"').value")
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("派出的数量不能超过拥有的数量")
		}else{
			getSendotherSendTime();	
		}
	}else{
		msgbox("请输入整数！")
	}
}


//
// 运输相关
//
function DoTrans(grid,name,ownwer){
	//当前拥有的兵种	
	$("amry_trans_show39").innerHTML = arrCityBuildRank[39];
	$("amry_trans_send39").value = 0;
	$("amry_trans_show40").innerHTML = arrCityBuildRank[40];
	$("amry_trans_send40").value = 0;
	
	//目标城市信息		
	$("amry_trans_x").value = ToXY(grid,"x");
	$("amry_trans_y").value = ToXY(grid,"y");
	$("amry_trans_city").innerHTML = name;
	$("amry_trans_gridid").innerHTML = grid;
	$("amry_trans_wood").innerHTML = nWood;
	$("amry_trans_iron").innerHTML = nIron;
	$("amry_trans_food").innerHTML = nFood;
	$("amry_trans_stone").innerHTML = nStone;
	$("amry_trans_s1").value=0
	$("amry_trans_s2").value=0
	$("amry_trans_s3").value=0
	$("amry_trans_s4").value=0
	
	//清空原有测试消耗信息
	$("army_time_trans").innerHTML = "00:00:00";
	$("army_food_trans").innerHTML = "0";
	
}
function StartTrans(){
	var gridid=inputToGird($("amry_trans_x").value,$("amry_trans_y").value)
	if(gridid!=""){
		//生成兵种数组字符串	
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		arrarmy[0] = $('amry_trans_send39').value
		arrarmy[1] = $('amry_trans_send40').value
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//装备数组字符串
		var strshield="";
		for(i=1;i<5;i++){
			eval("strshield = strshield + CLength($('amry_trans_s"+i+"').value)");
		}
		strshield = CLength(4)+strshield;
		//发送请求
		strStartAttact="objFlashEng.Send(GetCreatArmy(\""+gridid+"\",0,'"+str+"','"+strshield+"',$(\"army_trans_select\").value,$(\"army_trans_iEmergency\").checked,'str'))"
		objFlashEng.Send(GetCreatArmy(gridid,0,str,strshield,$("army_trans_select").value,$("army_trans_iEmergency").checked,'str'));
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
//1017查询派出所需时间
function getTransSendTime(){
	var gridid=inputToGird($("amry_trans_x").value,$("amry_trans_y").value)
	if(gridid!=""){
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		arrarmy[0] = $('amry_trans_send39').value
		arrarmy[1] = $('amry_trans_send40').value
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//objFlashEng.Send(GetMarchInfo($("amry_trans_gridid").innerHTML,0,$("army_trans_select").value,str));
		
		var itemid=$("army_trans_iEmergency").checked?20:0
		objFlashEng.Send(GetMarchInfo(gridid,0,$("army_trans_select").value,str,itemid));
	}else{
		msgbox("坐标输入错误。<br>请输入0-999的整数!")
	}
}
function checkTransValue(i){
	var a=arrCityBuildRank[i]
	eval("var b=$('amry_trans_send"+i+"').value");
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("派出的数量不能超过拥有的数量")
		}else{
			getTransSendTime();	
		}
	}else{
		msgbox("请输入整数！")
	}
}
/*
**    ==================================================================================================  
**    类名： 
**    功能： 初始化派兵 英雄显示
**    示例： 1602
**    ==================================================================================================  
*/
function ShowHeroAttack(str){
	var objT=eval('('+str+')');
	if(typeof(objT.CResult) != "undefined")	{
		msgbox("Error:"+objT.CResult.iResultID+"<br><b>英雄显示失败：</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")
		return false;
	}else{
		if(objT.CAnsAllHero.CResult.iResultID == 0){
			var tmpHero=""
			var b=objT.CAnsAllHero.astHeroMsg
			for(i in b){
				if(b[i].m_chStatus==0 && b[i].m_iCurCity == CityID)tmpHero+= '<div style="margin-left:6px;display:inline;" class="floatleft" hint="<img src=\'\/images\/blank.gif\' width=\'90\' height=\'90\' class=\'border_hui\' style=\'background:url(\/images\/hero\/hero_'+b[i].m_iPicID+'.jpg)\' \/><br>'+b[i].m_chRank+'级<br>近攻:'+b[i].m_iNearAttack+'<br>远攻:'+b[i].m_iFarAttack+'<br>近防:'+b[i].m_iNearFort+'<br>远防:'+b[i].m_iFarFort+'<br>速度:'+b[i].m_iMoveSpeed+'<br>负载:'+b[i].m_iAffordCount+'"><input type="checkbox" name="attack_hero_ckb" value="'+b[i].HeroID+'" onclick="testHeroTime()" />'+b[i].m_szName+'</div>'
			}
			if(tmpHero=="")tmpHero="暂无可用英雄"
			$("attack_hero_list").innerHTML=tmpHero
			
		}
	}
	
}
//测试携带英雄所需时间及消耗
function testHeroTime(){
	var type = $("attack_hero_hidetype").innerHTML
	//0 进攻
	//1 派驻
	//2 联防
	switch(type){
		case "0":
			getAttackSendTime();
			break;
		case "1":
			getSendSendTime();
			break;
		case "2":
			getSendotherSendTime();
			break;
	}
}

/*
**    ==================================================================================================  
**    类名： 
**    功能： 取消建造队列
**    示例： 1004相关
**    ==================================================================================================  
*/
function CancleTask(waterid){
	msgboxyesno("您确认要取消队列吗？<br>（只返还<span style='color:red'>80%</span>的建造资源，不返还金币、特殊资源）")
	msgboxFunc="objFlashEng.Send(GetCancleTask('"+waterid+"'))";
	ShowRichTab(0,0);
}

/*
**    ==================================================================================================  
**    类名： 
**    功能： 派出部队后的提示信息
**    示例： 1010普通派兵 1024随机点派兵
**    ==================================================================================================  
*/
function ShowIsSendOk(str){
	var objT=eval('('+str+')');
	if(typeof(objT.CResult) != "undefined")	{
		if(objT.CResult.iResultID == 1400027 || objT.CResult.iResultID == 1400028){
			/*
			msgboxFunc="objFlashEng.Send(GetBuyItem(20,1,20));";
			msgboxyesno("您暂时没有“急行军”道具，是否立即购买并使用？</b>!")	
			*/
			objFlashEng.Send(GetBuyItem(20,1,20));
		}else{
			msgbox("Error:"+objT.CResult.iResultID+"<br><b>派出部队失败：</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")	
		}
		return false;
	}else{
		if(objT.CAnsCreatArmy.CResult.iResultID == 0){
			objFlashEng.Send(GetMineCity(CityID,0));
			msgbox("派出部队 <b>成功</b>!")	
			ShowTab('building',0)
			ShowRichTab(0,0)
			//重新拉取道具
			objFlashEng.Send(GetUserItems());
		}
	}
	
}
function ShowRandomIsSendOk(str){
	var objT=eval('('+str+')');
	if(typeof(objT.CResult) != "undefined")	{
		if(objT.CResult.iResultID == 1400027 || objT.CResult.iResultID == 1400028){
			/*
			msgboxFunc="objFlashEng.Send(GetBuyItem(20,1,20));";
			msgboxyesno("您暂时没有“急行军”道具，是否立即购买并使用？</b>!")
			*/
			objFlashEng.Send(GetBuyItem(20,1,20));
		}else{
			msgbox("Error:"+objT.CResult.iResultID+"<br><b>派出部队失败：</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")	
		}
	}else{
		if(objT.CAnsCreatArmy.CResult.iResultID == 0){
			objFlashEng.Send(GetMineCity(CityID,0));
			msgbox("派出部队 <b>成功</b>!")	
			//!!!!!!!!!!这里需要补齐城市更新后的信息！！！
			ShowTab('building',0)
			ShowRichTab(0,0)
			//重新拉取道具
			objFlashEng.Send(GetUserItems());
		}
	}
	
}

/*隐藏Select*/
function hideSelect(visibility){
	//主页面的select
    for(var i = 0; i < document.getElementsByTagName('select').length; i++) {
		document.getElementsByTagName('select')[i].style.visibility = visibility;
	}
	//iframe里的selcet	
	if(typeof(document.frames['JZdiv'].hideSelect)=="function"){
		 for(var i = 0; i < document.frames['JZdiv'].document.getElementsByTagName('select').length; i++) {
			document.frames['JZdiv'].document.getElementsByTagName('select')[i].style.visibility = visibility;
		}
	}
}




/*
**    ==================================================================================================  
**    类名： 
**    功能： 召回部队后的提示信息
**    示例： 1020相关
**    ==================================================================================================  
*/
function ShowcallbackArmy(str){
	var objT=eval('('+str+')');
	var waterid="";
	if(typeof(objT.CResult) != "undefined")	{
		if(objT.CResult.iResultID == 1020002){
			msgboxFunc="objFlashEng.Send(GetCancleArmy(curArmyIng,32,0));";
			msgboxyesno("召回部队失败，派出时间已经超过3分钟，是否使用“鸣金收兵”道具召回？</b>!")	
			
		}else if(objT.CResult.iResultID == 1400027 || objT.CResult.iResultID == 1400028){
			msgboxFunc="objFlashEng.Send(GetBuyItem(32,1,32));";
			msgboxyesno("您暂时没有“鸣金收兵”道具，是否立即购买并使用？</b>!")				
		}else{
			msgbox("Error:"+objT.CResult.iResultID+"<br><b>召回部队失败：</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")	
		}
	}else{
		if(objT.CAnsReturnArmy.CResult.iResultID == 0){
			//如果是遣返部队
			if(objT.CTMsgHead.llMsgAct==1000){
				msgbox("遣返部队 <b>成功</b>!")
				//重新显示点将台
				Show_army_tab(0)
			}else{
				msgbox("召回部队 <b>成功</b>!")
				//重新显示军事队列
				objFlashEng.Send(GetArmyList(1,CityID,1))
				objFlashEng.Send(GetMineCity(CityID))
			}
		}
	}
}






/*
**    ==================================================================================================  
**     
**    任务系统
**                            
**    ==================================================================================================  
*/
//1500返回所有任务列表
function ShowTaskList(str){
	//协议暂无
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>获取任务列表失败：</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	curTaskList=T.CAnsGetAllTaskList.CUserTasksData.astTaskBriefs
	curTaskDetail = T.CAnsGetAllTaskList.CUserTasksData.astValidTasks
	
	//第一条新手任务没完成时，显示提示
	//CheckIsFirstTask();

	//更新当前列表状态
	var tabid=deTypeAndId(1,T.CTMsgHead.llMsgAct)[0]
	var taskid=deTypeAndId(1,T.CTMsgHead.llMsgAct)[1]
	if(taskid==0){
		eval("TaskListShow"+tabid+"();")
	}else{
		eval("TaskListShow"+tabid+"("+taskid+");")
	}
	
}
//第一条新手任务没完成时，显示提示
function CheckIsFirstTask(){
	var firstTask=false
	for(var i=0;i<curTaskDetail.length;i++){
		if(curTaskDetail[i].iTaskID==1)firstTask=true
	}
	if(firstTask){
		$("task_new_flash").style.display="block"
	}else{
		$("task_new_flash").style.display="none"
	}	
}

/*//1501更新正在进行中任务
function ShowUpdateTaskList(str){
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>获取当前任务失败：</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	curTaskDetail = T.CAnsGetValidTaskList.CUserValidTaskData.astValidTasks	
	//如果没有进行中任务，更新左侧任务列表
		//一、所有按钮未激活
		var arrD=$("nowtasklist").getElementsByTagName("li");
		for(var i=0;i<arrD.length;i++){
				arrD[i].className="tasklistun";
		}
		//二、已激活按钮显示
		for(var i=0;i<curTaskList.length;i++){
			//判断是否已经完成，左list  curTaskList[i+1].ucTaskStat==3 ? "tasklistun" : 
			if(curTaskList[i].ucTaskStat==2||curTaskList[i].ucTaskStat==1){
				$("task_li"+i).className="tasklistno";
			}
		}
		
	//更新任务面板右侧当前打开任务完成情况
	var firstTask=false
	for(i=0;i<curTaskDetail.length;i++){
		taskdetail(curTaskDetail[i].iTaskID)
		if(curTaskDetail[i].iTaskID==1)firstTask=true
	}
	//第一条新手任务没完成时，显示提示
	if(firstTask){
		$("task_new_flash").style.display="block"
	}else{
		$("task_new_flash").style.display="none"
	}
}*/


//1503完成任务响应
function ShowTaskFinish(str){
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>提交任务失败：</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	var arrid = T.CAnsCommitTask.aiPrizeID
	msgbox("任务提交成功，您获得的奖励是：<br><span class='t_red'>"+TaskAnalysisPrize(arrid)+"</span>")	
	//重新拉取任务左侧list
	objFlashEng.Send(getTaskList(1500,T.CTMsgHead.llMsgAct))
	
	//拉取用户所有道具
	objFlashEng.Send(GetUserItems());
}
//1502领取任务响应
function ShowTaskGet(str){
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>领取任务失败：</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	//重新拉取任务左侧list
	objFlashEng.Send(getTaskList(1500,T.CTMsgHead.llMsgAct))
}



function taskdetail(de,type){
	//type:1新手任务 2日常任务
	//css按钮切换
		//一、所有按钮未激活
		var arrD=$("nowtasklist").getElementsByTagName("li");
		for(var i=0;i<arrD.length;i++){
				arrD[i].className="tasklistun";
		}
		//二、已激活按钮显示
		for(var i=0;i<curTaskDetail.length;i++){
			//判断type为需要显示的type：1新手2日常
			//判断任务是否激活：0未激活，3已激活已完成，1未完成，2已完成
			if(curTaskDetail[i].ucType==type){
				$("task_li"+i).className="tasklistno";
			}
		}
		//三、当前按钮选中状态
		$("task_li"+de).className = "tasklist";	
		
		
		
	//根据js配置解析任务详情
	
		//判断是否在协议返回数组里面已经完成  
		if(typeof(curTaskList[de])=="object"){
			$("task_name").innerHTML=(curTaskList[de].ucTaskStat==2)||(curTaskList[de].ucTaskStat==1)?taskConfig[de].name+"(已领取)":taskConfig[de].name+"(未领取)";
		}else{
			$("task_name").innerHTML=taskConfig[de].name+"(未领取)";
		}		
		//当前任务还可以做的次数
		if(type==2 || type==3 || type==4){
			if(curTaskList[de]){
				//如果做过这个任务
				if(todayIsEna(curTaskList[de].iLastFinishTime)){
					//当天的次数
					$("task_name").innerHTML+=" <span class=t_black>今天还可做</span>"+(taskConfig[de].maxFinish-curTaskList[de].ucAccTimes)+"<span class=t_black>次</span>"			
				}else{
					//非当天的次数
					$("task_name").innerHTML+=" <span class=t_black>今天还可做</span>"+taskConfig[de].maxFinish+"<span class=t_black>次</span>"		
				}
			}else{
				//如果没做过这个任务
				//非当天的次数
				$("task_name").innerHTML+=" <span class=t_black>今天还可做</span>"+taskConfig[de].maxFinish+"<span class=t_black>次</span>"		
			}
		}
		$("task_content").innerHTML=taskConfig[de].guide;
		$("task_guide").innerHTML=taskConfig[de].desc;
		
	//解析任务目标
		var tmpTarget=""
		for(var i=0;i<taskConfig[de].targets.length;i++){
			if(taskConfig[de].targets[i]>0)tmpTarget+=targetConfig[taskConfig[de].targets[i]].desc+"，"
		}
		var r= (tmpTarget=="")?"请直接点击完成":tmpTarget.slice(0,tmpTarget.length-1)
		$("task_goal").innerHTML=r;
		
	//解析任务奖励
		$("task_prize").innerHTML=TaskAnalysisPrize(taskConfig[de].prizes)

	//根据1500,1501返回正在进行中任务，比较当前任务
	
		for(var i=0;i<curTaskDetail.length;i++){
			if(curTaskDetail[i].iTaskID == de){
				//更新任务目标完成情况					
				var tmpTarget=""
				for(m=0;m<curTaskDetail[i].astTaskTargets.length;m++){
					if(curTaskDetail[i].astTaskTargets[m].ucTargetStat ==0){
						var id=curTaskDetail[i].astTaskTargets[m].iTargetID
						tmpTarget+=targetConfig[id].desc+"<span class='t_red'>(未完成)</span>，"
					}else{
						var id=curTaskDetail[i].astTaskTargets[m].iTargetID
						tmpTarget+=targetConfig[id].desc+"<span class='t_green'>(已完成)</span>，"
					}
				}			
				$("task_goal").innerHTML=tmpTarget.slice(0,tmpTarget.length-1) 
				$("task_goal").innerHTML=($("task_goal").innerHTML=="")?"请直接点击完成":$("task_goal").innerHTML
		
				//判断是否完成显示不同按钮及文字
				var isAllDone=(curTaskDetail[i].CTaskBriefData.ucTaskStat==2)?true:false;
				if(isAllDone){				
					$("task_btn").onclick=function(){doSubmitTask(de,type)}
					$("task_btn").innerHTML="完 成"
					$("task_btn").className="btnWhite"
				}else{
					$("task_btn").onclick=function(){}
					$("task_btn").innerHTML="完 成"
					$("task_btn").className="btnGray"
				}
			}
		}
	//日常任务领取按钮
	//当前任务列表没有列出时显示领取或不可点击
	if((type==2||type==3||type==4) && (typeof(curTaskDetail[de])!="object")){
		if(curTaskList[de]){
			//如果做过这个任务
			if(curTaskList[de].ucTaskStat==0){
				//判断是否已达当天最大次数
				//是否是今天 并且 配置最大次数等于做过的次数
				if(todayIsEna(curTaskList[de].iLastFinishTime) && taskConfig[de].maxFinish==curTaskList[de].ucAccTimes){
					$("task_btn").onclick=function(){}
					$("task_btn").innerHTML="完 成"
					$("task_btn").className="btnGray"			
				}else{			
					$("task_btn").onclick=function(){doGetthisTask(de,type)}
					$("task_btn").innerHTML="领 取"
					$("task_btn").className="btnWhite"
				}
			}else if(curTaskList[de].ucTaskStat==2){
				$("task_btn").onclick=function(){doSubmitTask(de,type)}
				$("task_btn").innerHTML="完 成"
				$("task_btn").className="btnWhite"		
			}else{
				$("task_btn").onclick=function(){}
				$("task_btn").innerHTML="完 成"
				$("task_btn").className="btnGray"			
			}
		}else{
			//如果没做过这个任务
			$("task_btn").onclick=function(){doGetthisTask(de,type)}
			$("task_btn").innerHTML="领 取"
			$("task_btn").className="btnWhite"			
		}
	}
}
function todayIsEna(t){
	var tt=new Date()
	var ii=new Date();
	ii.setTime(t*1000+LocalTime);	
	if(ii.getDate() == tt.getDate()){
		return true;
	}else{
		return false;	
	}
}

//执行提交任务
function doSubmitTask(de,type){
	$("task_btn").onclick=function(){}
	$("task_btn").className="btnGray"
	objFlashEng.Send(getTaskFinish(de,deTypeAndId(0,type,de)))	
}
//执行领取任务
function doGetthisTask(de,type){
	$("task_btn").onclick=function(){}
	$("task_btn").className="btnGray"
	
	objFlashEng.Send(getTaskGet(de,deTypeAndId(0,type,de)))	
}
function deTypeAndId(opt,type,id){
	if(opt==0){
		return type*10000+id
	}else if(opt==1){
		var tmpArr = []
		tmpArr[0] = Math.floor(type/10000)
		tmpArr[1] = type % 10000 		
		return tmpArr
	}
}
//任务系统
//成长任务tab arrShow:重组后的curTaskList
//ucTaskStat:0 未领取 1领取未完成 2已完成未提交 3已完成已提交
function TaskListShow1(taskid){
	SH("taskright")
	
	var tmpstr=""
	//重新调整list顺序，1已领取 2已完成在最顶端
	var tmparrA=[] //
	var tmparrB=[]
	for(var i=1;i<taskConfig.length;i++){
		//获取成长任务
		if(taskConfig[i].type==1){
			//判断是否在协议返回数组里，有则加入顶端list为1或2显示，无则放入后续
			if(typeof(curTaskList[i]) != "undefined"){
				//显示1已领取 2已完成
				if(curTaskList[i].ucTaskStat==1 || curTaskList[i].ucTaskStat==2){
					tmparrA.push(i)
				}else if(curTaskList[i].ucTaskStat==0){
					tmparrB.push(i)						
				}
			}else{
				tmparrB.push(i)	
			}				
		}
	}
	//不显示未激活的任务
	//tmparrA = tmparrA.concat(tmparrB)
	for(var i=0;i<tmparrA.length;i++){
		tmpstr += "<li id='task_li"+ tmparrA[i] +"' onclick='taskdetail("+tmparrA[i]+",1)'>"+taskConfig[tmparrA[i]].name+"</li>"
	}
	
	
	if(tmpstr==""){tmpstr="暂无";HI("taskright")}
	$("nowtasklist").innerHTML=tmpstr
	$("nowtasktitle").innerHTML="新手篇"
	//在右侧打开当前正在进行中任务
	//修正返回正在进行中任务没按ID大小返回的bug
	var iMin=2000000 //暂时设置taskid最大值	
	for(var i=0;i<curTaskDetail.length;i++){
		if(curTaskDetail[i].CTaskBriefData.ucType==1){
			if(curTaskDetail[i].iTaskID<iMin)iMin = curTaskDetail[i].iTaskID
		}
	}
	if(iMin!=2000000)taskdetail(iMin,1)
}
//日常任务tab
function TaskListShow2(taskid){
	SH("taskright")
	var tmpstr=""
	for(var i=1;i<taskConfig.length;i++){
		//获取成长任务
		if(taskConfig[i].type==2){
			tmpstr += "<li id='task_li"+ i +"' onclick='taskdetail("+i+",2)'>"+taskConfig[i].name+"</li>"
		}
	}
	if(tmpstr==""){tmpstr="暂无";HI("taskright")}
	$("nowtasklist").innerHTML=tmpstr
	$("nowtasktitle").innerHTML="日常任务列表"

	//修正领取任务当前tab改变bug
	if(typeof(taskid)!="undefined" && taskid>0){
		taskdetail(taskid,2);
	}else{
		//默认打开第一个日常任务
		taskdetail(32,2)	
	}
}
//家族任务tab
function TaskListShow3(taskid){
	SH("taskright")
	var tmpstr=""
	for(var i=1;i<taskConfig.length;i++){
		//获取成长任务
		if(taskConfig[i].type==3){
			tmpstr += "<li id='task_li"+ i +"' onclick='taskdetail("+i+",3)'>"+taskConfig[i].name+"</li>"
		}
	}
	if(tmpstr==""){tmpstr="暂无";HI("taskright")}
	$("nowtasklist").innerHTML=tmpstr
	$("nowtasktitle").innerHTML="家族任务列表"
	
	//修正领取任务当前tab改变bug
	if(typeof(taskid)!="undefined" && taskid>0){
		taskdetail(taskid,3);
	}else{
		//默认打开第一个日常任务
		taskdetail(36,3)		
	}
}
//活动任务tab
function TaskListShow4(taskid){
	SH("taskright")
	var tmpstr=""
	for(var i=1;i<taskConfig.length;i++){
		//获取成长任务
		if(taskConfig[i].type==4){
			tmpstr += "<li id='task_li"+ i +"' onclick='taskdetail("+i+",4)'>"+taskConfig[i].name+"</li>"
		}
	}
	if(tmpstr==""){tmpstr="暂无";HI("taskright")}
	$("nowtasklist").innerHTML=tmpstr
	$("nowtasktitle").innerHTML="活动任务列表"
	
	//修正领取任务当前tab改变bug
	if(typeof(taskid)!="undefined" && taskid>0){
		taskdetail(taskid,4);
	}else{
		//默认打开第一个日常任务
		taskdetail(38,4)		
	}
}


function TaskAnalysisPrize(arr){
	var tmpTarget=""
	for(i=0;i<arr.length;i++){
		switch(prizeConfig[arr[i]].type){
			case 1://金钱
				tmpTarget+="金币:<img class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+"<br>"
				break;
			case 2://资源
				tmpTarget+="<img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+" <img class=\"ico_iron\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+" <img class=\"ico_stone\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+" <img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+"<br>"
				break;
			case 3://材料
				tmpTarget+="材料:"+toMaterilName(prizeConfig[arr[i]].prizeID)+"×"+prizeConfig[arr[i]].count+"<br>"
				break;
			case 4://道具
				tmpTarget+="道具:"+getItemConfig(prizeConfig[arr[i]].prizeID).name+"×"+prizeConfig[arr[i]].count+"<br>"
				break;
			case 5://宝物
				tmpTarget+="宝物:"+prizeConfig[arr[i]].prizeID+"<br>"
				break;
			case 6://"英雄
				tmpTarget+="英雄:"+prizeConfig[arr[i]].prizeID+"<br>"
				break;
			case 100://用户积分
				if(prizeConfig[arr[i]].prizeID==1){
					tmpTarget+="声望:"+prizeConfig[arr[i]].count+"<br>"
				}else if(prizeConfig[arr[i]].prizeID==2){
					tmpTarget+="文韬:"+prizeConfig[arr[i]].count+"<br>"
				}else if(prizeConfig[arr[i]].prizeID==4){
					tmpTarget+="武略:"+prizeConfig[arr[i]].count+"<br>"
				}else if(prizeConfig[arr[i]].prizeID==6){
					tmpTarget+="文韬武略:"+prizeConfig[arr[i]].count+"<br>"
				}
				break;
			case 101://家族积分
				tmpTarget+="家族积分:"+prizeConfig[arr[i]].count+"<br>"
				break;
		}
	}
	var r = ( tmpTarget=="") ? "无":tmpTarget.slice(0,tmpTarget.length-1)
	return r
}

//选择题提交答案

function taskChoose(n){
	eval('var b=document.getElementsByName("que_'+n+'")')
	var answer=0
	for(var i=0;i<b.length;i++){
		if(b[i].checked==true)answer=Math.pow(2,i);
	}
	if(answer==0){
		msgbox("请选择一个答案！")
		return false
	}else{
		objFlashEng.Send(getTaskChoose(n,answer))			
	}
}
function taskMutiChoose(n){
	eval('var b=document.getElementsByName("que_'+n+'")')
	var answer=0
	for(var i=0;i<b.length;i++){
		if(b[i].checked==true)answer+=Math.pow(2,i)
	}		
	if(answer==0){
		msgbox("请选择一个答案！")
		return false
	}else{
		objFlashEng.Send(getTaskChoose(n,answer))			
	}
}
//1504提交答案
function ShowTaskChoose(str){
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>提交选择题答案失败：</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	var taskid = T.CTMsgHead.llMsgAct
	//目前新手任务才有选择题，所以type配置为1
	objFlashEng.Send(getTaskFinish(taskid,deTypeAndId(0,1,taskid)))
}

/*
**    ==================================================================================================  
**     
**    英雄系统
**    //激活英雄或者宝物 cmd id :1605 //丢弃英雄或者宝物 cmd id :1606
**    ==================================================================================================  
*/
//激活英雄或者宝物 cmd id :1605 //丢弃英雄或者宝物 cmd id :1606
function ShowActHeroTrea(str)
{
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
	}
	else if(typeof(obj.CAnsDropObject) != "undefined"){
		
			if(obj.CTMsgHead.shMsgID==1606){
				if(obj.CTMsgHead.llMsgAct==0){
					msgbox("丢弃英雄成功！")
					objFlashEng.Send(getTaskList(1601))
				}else if(obj.CTMsgHead.llMsgAct==1){
					msgbox("丢弃宝物成功！")
					//更新显示宝物合成界面
					objFlashEng.Send(getTaskList(1603))
				}
			}
	}else if(typeof(obj.CAnsActiveObject) != "undefined"){
		if(obj.CTMsgHead.shMsgID==1605){
				if(obj.CTMsgHead.llMsgAct==0){
					msgbox("激活英雄成功！")
					objFlashEng.Send(getTaskList(1601))
				}else if(obj.CTMsgHead.llMsgAct==1){
					msgbox("激活宝物成功！")
					//更新显示宝物合成界面
					objFlashEng.Send(getTaskList(1603))
					
				}
		}
	}
}
//1603获取宝物列表
function ShowHeroListTrea(str)
{
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>获取宝物失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		return false;
	}
	else{
		//根据ACT判断是div还是宝物页面
		var heroid=obj.CTMsgHead.llMsgAct
		if(heroid>0){
			//英雄页面调用1603显示装配宝物DIV
			var inHtm=""
			var m=obj.CAnsAllTrea.astTreaMsg;
			for(i=0;i<m.length;i++){
				//顶部两个已经装配的位置
				if(m[i].m_chStatus==1 && m[i].m_iHeroID==heroid){
					//解析宝物效果
					var tmpEffect=""
					for(n=0;n<m[i].m_stPropertyArray.length;n++){
						tmpEffect += m[i].m_stPropertyArray[n].m_szName +":" +m[i].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
					}
					inHtm +='<div class="hero_maindiv_div">'
					inHtm +='<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'"/>'
					inHtm +='<div class="floatleft lineh17">'
					inHtm +=nameColor(m[i].chStar,m[i].szName)+' '+m[i].m_chRank+'级<br />'
					inHtm +='需要'+m[i].chNeedRank+'级'+m[i].chNeedStar+'星以上英雄<br />'
					inHtm +='<span class="a_yellow imghand" onclick="objFlashEng.Send(GetTakeTrea(1609,'+heroid+','+m[i].m_iTreaID+'))">已装备(点击卸下)</span></div>'
					inHtm +='</div>'
				}				
			}
			if(inHtm=="")inHtm+='<div class="hero_maindiv_div"><br>暂未装备</div>'
			inHtm +='<img class="cb" src="/images/army_tabline.gif" width="554" height="9" />'
			inHtm +='<div class="cb" style="font-weight:bold;">所有可装备宝物：</div>'
			//下面列出所有的宝物
			for(i=0;i<m.length;i++){
				if(m[i].m_chStatus==0){
					//解析宝物效果
					var tmpEffect=""
					for(n=0;n<m[i].m_stPropertyArray.length;n++){
						tmpEffect += m[i].m_stPropertyArray[n].m_szName +":" +m[i].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
					}
					inHtm += '<div class="hero_maindiv_div">'
					inHtm += '<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'"/>'
					inHtm +='<div class="floatleft lineh17">'
					inHtm +=''+nameColor(m[i].chStar,m[i].szName)+' '+m[i].m_chRank+'级<br />'
					inHtm +='需要'+m[i].chNeedRank+'级'+m[i].chNeedStar+'星以上英雄<br />'
					inHtm +='<span class="t_green imghand" onclick="objFlashEng.Send(GetTakeTrea(1607,'+heroid+','+m[i].m_iTreaID+'))">未装备(点击装备)</span>		</div>'
					inHtm +='</div>'
				}
			}
			$("hero_maindiv_con").innerHTML = inHtm;
			SH('hero_maindiv');
			SH('maskbg')
		}else if(heroid==0){
			//精炼合成宝物页面
			ShowTreaList(obj.CAnsAllTrea.astTreaMsg,obj.CAnsAllTrea.iStorage)
		}else if(heroid==-10){
			//交易所宝物页面
	   	 	document.frames["marketdiv"].ShowMarketTreaList(obj.CAnsAllTrea.astTreaMsg)
		} 
	}
}
//根据宝物星级，输出不同颜色名称
function nameColor(r,n){
	//判断星级显示宝物颜色
	var arrNameColor=["","","t_lv","t_blue","t_zi","t_juhuang"]
	return "<span class='"+arrNameColor[r]+"'>"+n+"<\/span>"
}
//1609卸下宝物，1607带上宝物
function ShowTakeTrea(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
	}
	else
	{
		var heroid=obj.CTMsgHead.llMsgAct
		if(obj.CTMsgHead.shMsgID==1609){
			objFlashEng.Send(getTaskList(1603,heroid))
			objFlashEng.Send(getTaskList(1601))
		}else if(obj.CTMsgHead.shMsgID==1607){
			objFlashEng.Send(getTaskList(1603,heroid))
			objFlashEng.Send(getTaskList(1601))
		}
	}
}
//1604升级英雄
function ShowHeroUpGrade(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>升级英雄失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
	}
	else
	{
		msgbox("英雄升级 <span class='t_red'>成功！</span>");
		objFlashEng.Send(getTaskList(1601))
	}
}

//错误码相关
function errMsg(id){
	if(eval("errMsgs.e"+id) != null){
		return eval("errMsgs.e"+id)
	}else{
		return "未知错误"
	}
}


//道具相关的输入检查和click函数触发
function ResChangeCheckAndClick(iData1,iData2,iData3,clickFuncStr,divName)
{
	if(!checkNumber(iData1) || !checkNumber(iData2) || !checkNumber(iData3))
	{
		msgbox("请输入大于或等于0的整数");
		return;
	}
	if(parseInt(iData1,10)>=0 && parseInt(iData2,10)>=0 &&parseInt(iData3,10)>=0)
	{
		eval(clickFuncStr);
		HI(divName);
		HI('maskbg');
		return;
		
	}
	msgbox("请输入大于或等于0的整数");
}
//道具购买检查
function itemValueCheckAndClick(iData,clickFuncStr,divName)
{
	if(!checkNumber(iData))
	{
		msgbox("请输入正整数");
		return;
	}
	if(parseInt(iData,10)>=0)
	{	
		eval(clickFuncStr);
		HI(divName);
		HI('maskbg');
		return;
		
	}
	msgbox("请输入正整数");
}

//check 购买资源道具
function BuyResCheckAndClick(clickFuncStr,divName)
{
	if ($("buysource_form").bc[3].checked){
		iItemID=45
	}else if ($("buysource_form").bc[0].checked){
		iItemID=46
	}else if ($("buysource_form").bc[1].checked){
		iItemID=47
	}else if ($("buysource_form").bc[2].checked){
		iItemID=48
	}
	var iBuyCounts = $("use_buys"+(iItemID-44)).value;
	if(!checkNumber(iBuyCounts))
	{
		msgbox("请输入正整数");
		return;
	}
	if(parseInt(iBuyCounts,10)>=0)
	{
		
		eval(clickFuncStr);
		HI(divName);
		HI('maskbg');
		return;
		
	}
	
	msgbox("请输入正整数");
}

//check 迁城符参数检查
function ChangeCityUseCheckAndClick(clickFuncStr,divName)
{
	if(!checkNumber($("use_move_x").value) || !checkNumber($("use_move_y").value))
	{
		msgbox("请输入合法坐标");
		return;
	}
	var x = parseInt($("use_move_x").value,10);
	var y = parseInt($("use_move_y").value,10);
	if(x>=0 && x<=999 && y>=0 && y<=999 )
	{
		eval(clickFuncStr);
		if(divName!="")
		{
			HI(divName);
			HI('maskbg');
		}
		return;
		
	}
	msgbox("请输入合法坐标");
}


function   ap ( obj ) { 
    // 用来保存所有的属性名称和值 
    var   props = "" ; 
    // 开始遍历 
    for ( var   p in obj ){   
        // 方法 
        if ( typeof ( obj [ p ]) == " function " ){   
            obj [ p ]() ; 
        } else {   
            // p 为属性名称，obj[p]为对应属性的值 
            props += p + " = " + obj [ p ] + " \t " ; 
        }   
    }   
    // 最后显示所有的属性 
    return props ; 
} 

function checkNumber(input)
{
  var aim=/^\d+$/; 
  if(aim.test(input))
  {   
  	return true;
  }   
  else
  {   
  		return false;   
  }   
}



//家族加入邀请发送及响应函数1209
function doSeptJoinAgree(t,id){
	if(t==0){
		objFlashEng.Send(GetSeptInvite(1209,id,0,2))	
	}else if(t==1){
		objFlashEng.Send(GetSeptInvite(1209,id,1,3))			
	}	
}
function ShowSeptJoinAgree(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>获取失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	if(obj.CTMsgHead.llMsgAct==2){
		msgbox("发送响应成功！已加入该家族。")
		curLeagueID=obj.CAnsRespondInv.iSeptID
	}else if(obj.CTMsgHead.llMsgAct==3){	
		msgbox("发送响应成功！已拒绝该家族的邀请。")
	}
}

//家族购买令牌界面tab切换
function useSeptTab(n){
	$("use_sept_countquan").innerHTML = arrUserQuan
	$("use_sept_countall").innerHTML = 0
	$("use_sept_buy1").value=0
	$("use_sept_buy2").value=0
	$("use_sept_buy3").value=0
	useSeptInitCount()
	if(n==0){
		SH("use_septbuy")
		HI("use_septuse")
		$("use_sept_tab1").className="index_y_tabstyle"
		$("use_sept_tab2").className="index_y_notabstyle"	
	}else{
		HI("use_septbuy")
		SH("use_septuse")	
		$("use_sept_tab1").className="index_y_notabstyle"
		$("use_sept_tab2").className="index_y_tabstyle"	
		objFlashEng.Send(getTaskList(1026))	
	}
}
function useSeptInitCount(){
	$("use_sept_count11").innerHTML=getItemCount(50)
	$("use_sept_count22").innerHTML=getItemCount(51)
	$("use_sept_count33").innerHTML=getItemCount(52)	
	$("use_sept_count1").innerHTML=getItemCount(50)
	$("use_sept_count2").innerHTML=getItemCount(51)
	$("use_sept_count3").innerHTML=getItemCount(52)	
}

//家族令牌购买
function useSeptCountAll(){
	var a=parseInt($("use_sept_buy1").value,10) || 0
	var b=parseInt($("use_sept_buy2").value,10) || 0
	var c=parseInt($("use_sept_buy3").value,10) || 0
	$("use_sept_countall").innerHTML = a*1+b*1+c*3
}
//发送购买协议
function doUseBuySeptOrder(){
	var a=parseInt($("use_sept_buy1").value,10)
	var b=parseInt($("use_sept_buy2").value,10)
	var c=parseInt($("use_sept_buy3").value,10)
	if(!isNumber(a) ||!isNumber(b) ||!isNumber(c)){
		msgbox("请输入正确的购买数量！")	
	}else{
		var arrid=[]
		var arrcount=[]
		if(a>0){
			arrid.push(50)
			arrcount.push(a)
		}
		if(b>0){
			arrid.push(51)
			arrcount.push(b)
		}
		if(c>0){
			arrid.push(52)
			arrcount.push(c)
		}
		objFlashEng.Send(GetBuyManyItems(arrid,arrcount))	
	}	
}
//打开购买界面
function showBuySeptDiv(){
	useSeptTab(0)
	SH("maskbg")
	SH("use_septorder")
}
//打开使用界面
function showUseSeptDiv(){
	useSeptTab(1)
	SH("maskbg")
	SH("use_septorder")
}

//打开使用界面获取1026信息
function ShowSeptClassInfo(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>获取失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	var o=obj.AnsUserPeerInfo
	//对捐献令牌界面初始化
	$("use_sept_szForceTitle").innerHTML=o.szForceTitle
	$("use_sept_iForceRank").innerHTML=o.iForceRank
	$("use_sept_iForceScore").innerHTML=o.iForceScore
	$("use_sept_iForceValue").innerHTML=o.iForceValue/10+"%"
	$("use_sept_iNForceScore").innerHTML=o.iNForceScore
	$("use_sept_szCultureTitle").innerHTML=o.szCultureTitle
	$("use_sept_iCultureRank").innerHTML=o.iCultureRank
	$("use_sept_iCultureScore").innerHTML=o.iCultureScore
	$("use_sept_iCultureValue").innerHTML=o.iCultureValue/10+"%"
	$("use_sept_iNCultureScore").innerHTML=o.iNCultureScore
	$("use_sept_use1").value=0
	$("use_sept_use2").value=0
	$("use_sept_use3").value=0
}
//捐献令牌1414
function doUseSeptOrder(){	
	var a=parseInt($("use_sept_use1").value,10)
	var b=parseInt($("use_sept_use2").value,10)
	var c=parseInt($("use_sept_use3").value,10)
	if(!isNumber(a) ||!isNumber(b) ||!isNumber(c)){
		msgbox("请输入正确的数量！")	
	}else{		
		//排除为零的项
		var arrid=[]
		var arrcount=[]
		if(a>0){
			arrid.push(50)
			arrcount.push(a)
		}
		if(b>0){
			arrid.push(51)
			arrcount.push(b)
		}
		if(c>0){
			arrid.push(52)
			arrcount.push(c)
		}
		
		var strr=CLength(arrid.length)
		for(var i=0;i<arrid.length;i++){
			strr+=CLength(CLength("1")+CLength(arrid[i])+CLength(arrcount[i]))
		}
		objFlashEng.Send(GetSeptUseOrder(1414,curLeagueID,strr))	
	}	
}
//捐献令牌响应
function ShowSeptUseOrderOk(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>捐献令牌失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	//处理正确的响应
	var strMsg=""
	var I=obj.CAnsEndowMoreItem
		
	strMsg+="捐献令牌完成!<br>"
	strMsg+="<font class=t_tips_yellow>"
	strMsg+="文韬值增加："+I.iAddCulture+"<br>"
	strMsg+="武略值增加："+I.iAddForce+"<br>"
	strMsg+="家族积分增加："+I.iAddSeptScore
	strMsg+="</font>"	
	
	msgbox(strMsg)
	//拉取用户所有道具
	objFlashEng.Send(GetUserItems());	
	//获取用户点券
	objFlashEng.Send(GetUserCoin())	
	//更新家族技能
	top.objFlashEng.Send(top.GetSeptQuit(1225,top.curLeagueID))
	HI("maskbg")
	HI("use_septorder")	
}




/*
**    ==================================================================================================  
**    类名： 
**    功能： 聊天系统
**    示例： 
**    ==================================================================================================  
*/
//聊天send 1781
function doChatSend(){
	var str=$("chat_inputtxt").value
	if(isGoodWord(str)){
		if(chGetLength(str)<=150){
			objFlashEng.Send(GetChatSend(str))	
			$("chat_inputtxt").value=""
		}else{
			msgbox("请不要超过50个汉字！")
		}
	}else{
		msgbox("请不要输入中英文及标点符号以外的字符！")
	}
}
//回车发送
function doSendEnter(evt){	
	if (evt.keyCode == 13){ 
	
		doChatSend()
	} 
}
//清除默认显示
function chatClearTxt(){
	if($("chat_inputtxt").value=="最多一次发送50个汉字")$("chat_inputtxt").value=""
}
//发送错误处理
function ShowChatSend(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		if(obj.CResult.iResultID==1780003)
		{
			msgboxyesno("<br><b>失败：</b><span class='t_tips_yellow'>"+"小喇叭数量不足,点击确定购买小喇叭");
			msgboxFunc="doIndexBuyChat()";
			return false;
		}
		if(obj.CResult.iResultID!=1780001){
			msgbox("Error:"+obj.CResult.iResultID+"<br><b>失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
			return false;
		}
	}
	//拉取用户所有道具，更新小喇叭
	objFlashEng.Send(GetUserItems());	
}

//收到消息处理 1780
function ShowChatGet(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>发送失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	var o=obj.CAnsChatMsg.astMsg
	for(var i=0;i<o.length;i++){
		switch(o[i].m_ucMsgType){
			case 1:
				//用户消息
				//7.4增加点击用户名查看信息
				if(o[i].m_iSender!=Uin)arrChat.push("<div style='color:#dadada'><span style='text-decoration:underline;font-family:\"Arial, Helvetica, sans-serif\";' class='imghand' onclick = 'GetOtherPlayerInfo("+o[i].m_iSender+")'>"+o[i].m_szSendName+"</span>:<span style='color:#33ccff'>"+o[i].m_szChatMsg+"</span></div>")
				break;
			case 2:
				//系统消息
				//arrChat.push("<div style='color:#ff3300'>系统消息:"+o[i].m_szChatMsg+"</div>")
				//7.2修改增加系统消息顶部显示
				arrChatSysMsg.push("<div style='color:#ff3300'><b>系统</b>:"+o[i].m_szChatMsg+"</div>")
				
				break;
			case 3:
				//用户自己发送的消息
				arrChat.unshift("<div style='color:#dadada'>"+o[i].m_szSendName+":<span style='color:#33ccff'>"+o[i].m_szChatMsg+"</span></div>")
				break;
			case 4:
				//系统错误提示
				arrChat.push("<div style='color:#ff9900'>"+o[i].m_szChatMsg+"</div>")		
				break;
			case 5:
				//江湖传闻
				arrChat.push("<div style='color:#33cc00'>江湖传闻:"+o[i].m_szChatMsg+"</div>")				
				break;
			case 6:
				//防沉迷
				arrChat.push("<div>"+o[i].m_szChatMsg+"</div>")				
				break;
		}
		
	}
	//立即显示本机发送聊天
	ShowChatContent();
}
//从数组里读出数据，写入聊天内容DIV
function ShowChatContent(){
	if(arrChat.length>0){
		$("chat_main").innerHTML+=arrChat[0]
		arrChat.shift()	
		$("chat_msg_end").scrollIntoView(); 
	}
	var c=$("chat_main").getElementsByTagName("div");
	if(c.length>40){
		$("chat_main").removeChild($("chat_main").firstChild)
	}
}
//显示系统消息数组，写入聊天框顶部
function ShowChatSysMsg(){
	if(arrChatSysMsg.length>0){
		$("chat_top_sysmsg").innerHTML=arrChatSysMsg[intSysNum]
		if(intSysNum<(arrChatSysMsg.length-1)){
			intSysNum++
		}else{
			intSysNum=0
		}
	}
	if(arrChatSysMsg.length>4)arrChatSysMsg.shift();
}
//设置聊天框大小
function doChatReSize(){
	if($("chat_inputresize").value == "大"){
		//增加聊天高度
		$("chatDivMain").style.height ="366px"
		$("chatDivBg").style.height ="366px"
		$("chat_mainlist").style.height ="320px"
		
		//调整距上边距距离
		$("chatDivMain").style.marginTop ="80px"
		$("chatDivBg").style.marginTop ="82px"	
		
		$("chat_inputresize").value="小"
	}else{
		//减少聊天高度
		$("chatDivMain").style.height ="166px"
		$("chatDivBg").style.height ="166px"
		$("chat_mainlist").style.height ="120px"
		
		//调整距上边距距离
		$("chatDivMain").style.marginTop ="280px"
		$("chatDivBg").style.marginTop ="282px"		
		
		$("chat_inputresize").value="大"
		
	}
}




//maildiv打开func
//优化打开效果
var testMailDev;
var testMailPost;

function doShowMailDev(){
	iframebanner(1);
	if(typeof(testMailDev)== "object")
		testMailDev=clearTimeout(testMailDev);
	testMailDev = setTimeout("testMailDevFunc()",300);
}
function testMailDevFunc(){
	if(typeof(document.frames["maildiv"].clickTab)!="function")
	{
		testMailDev = setTimeout("testMailDevFunc()",300);
		return;
	}
	if(typeof(document.frames["maildiv"].frames["rightframe"].document.getElementById("mailArmyListDiv"))=="object"){
		ShowTab('message',3);
		testMailDev=clearTimeout(testMailDev);
	}
}

//'发信'按钮的响应函数
function gotoSendMail(szNickName)
{
	
	if($("maildiv").src == bannerURL[0])
	{
		document.frames["maildiv"].setRightFrame("/mailtemplate/mail_post.html?name="+szNickName);
		document.frames["maildiv"].showTabClicked(5);
	}
	else 
		$("maildiv").src = bannerURL[0];
	if(typeof(testMailPost)== "object")
		testMailPost=clearTimeout(testMailPost);
	testMailPost = setTimeout("testMailPostFunc('"+szNickName+"')",300);
	
}

function testMailPostFunc(szNickName)
{
	if(typeof(document.frames["maildiv"].clickTab)!="function")
	{
		testMailPost = setTimeout("testMailPostFunc('"+szNickName+"')",300);
		return;
	}
	if(typeof(document.frames["maildiv"].frames["rightframe"].loadMailPost)=="function"){
		ShowTab('message',3);
		testMailPost=clearTimeout(testMailPost);
	}
	else if(typeof(document.frames["maildiv"].clickTab) == "function")
	{
		var url = "/mailtemplate/mail_post.html?name="+szNickName;
		if(document.frames["maildiv"].frames["rightframe"].src!=url)
		{
			document.frames["maildiv"].setRightFrame(url);
			document.frames["maildiv"].showTabClicked(5);
		}
		testMailPost = setTimeout("testMailPostFunc('"+szNickName+"')",300);
	}
}


//分城list显示优化
function TsHideAllCity(){
	var tHeight=document.getElementById("subCity").getElementsByTagName("div").length*23;
	if(event.clientX<270 || event.clientX>390 || event.clientY>(tHeight+24)){
		HI('AllCity')
	}
}
//导航退出游戏
function CloseWin() //不提示是否关闭浏览器    
{    /*
	window.opener=null;     
	window.open("","_self");    
	window.close();   */ 
	chLogout("index.html")
}  
// 退出登录
function chLogout(jumpurl, topjump)
{
	chDeleteCookie("uin");
	chDeleteCookie("skey");	
	chDeleteCookie("zzpaneluin");
	chDeleteCookie("zzpanelkey");
	if (jumpurl)
	{
		if (topjump)
		{
			top.location = jumpurl;
		}
		else
		{
			location = jumpurl;
		}
	}
}
//新开窗口函数
function openwindow(url){
	theproperty= "width=" + 600 + "," 
	+ "height=" + 400 + "," 
	+ "location=yes," 
	+ "menubar=yes,"
	+ "scrollbars=yes,"
	+ "status=yes," 
	+ "resizable=yes," 
	+ "titlebar=yes,"
	+ "toolbar=yes,"
	+ "hotkeys=no"
	window.open(url,"",theproperty);
}

/*
**    ==================================================================================================  
**    类名： 
**    功能： 城池改名
**    示例： 
**    ==================================================================================================  
*/
function doChCityNameSend(){
	var str=$("chNameDiv_input").value
	if(checkName(str)){
		
		objFlashEng.Send(GetChCityName(CityID,str))	
		$("chNameDiv_hide").value=str
		$("chNameDiv_input").value=""
		
	}
}
//发送错误处理 1027
function ShowChCityName(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	msgbox("当前城池改名成功！")
	HI("chNameDiv")
	$("init_szCityName").innerHTML=$("chNameDiv_hide").value
}




/*
**    ==================================================================================================  
**    类名： 
**    功能： 玩家详情
**    示例： 
**    ==================================================================================================  
*/
	
//发送错误处理 1029
function ShowMyInfomation(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	var p=obj.CAnsGetUserAllInfo.CPlayerInfo
	
	$("myInfo_iPlayerNationID").style.display = "inline";
	$("other_playernation").style.display = "none";
	$("upwen_span").style.display = "inline";
	$("upwu_span").style.display = "inline";
	
	
	//基本信息
	$("myInfo_ucHeadPic").src = "/images/player/player_"+p.iUserHead+".jpg"
	$("myInfo_szUserNick").innerHTML=p.szUserNick
	$("myInfo_iPlayerNationID").innerHTML=ToNation(p.iPlayerNationID)
	$("myInfo_szSeptName").innerHTML=(p.szSeptName=="")?"暂无":p.szSeptName
	$("myInfo_chLeagueRank").innerHTML=(p.chLeagueRank==0)?"普通":((p.chLeagueRank==1)?"副族长":"族长")
	$("myInfo_iUserRank").innerHTML=p.iUserRank
	$("myInfo_iUserPoint").innerHTML=p.iUserPoint
	//文韬武略
	$("myInfo_wen").innerHTML=p.iCulturePoint+"（"+p.iCulture+"级）"
	$("myInfo_wentitle").innerHTML=ToUserRank(3,p.iCulture).UserTitle
	$("myInfo_wenattr").innerHTML="+"+(ToUserRank(3,p.iCulture).usAttrValue/10)+"%"
	$("myInfo_wu").innerHTML=p.iForcePoint+"（"+p.iForce+"级）"
	$("myInfo_wutitle").innerHTML=ToUserRank(2,p.iForce).UserTitle
	$("myInfo_wuattr").innerHTML="+"+(ToUserRank(2,p.iForce).usAttrValue/10)+"%"	
	//城池列表
	var tmpHtml=""
	for(var i=0;i<p.astSubCity.length;i++){
		tmpHtml+="<li><span>"+p.astSubCity[i].szCityName+"</span>"
		tmpHtml+='<a class="a_lightgreen" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+p.astSubCity[i].iCityGrid+'));HI(\'myInfomation\');HI(\'maskbg\')">('+ToXY(p.astSubCity[i].iCityGrid)+')</a></li>'
	}
	$("myInfo_right_ullist").innerHTML = tmpHtml
	
	//隐藏mailicon
	HI("myInfo_mail")
	//显示排名
	HI("myInfo_leftrank")
	
	//ie6bug
	hideSelect('hidden');
	
	//显示个人详情
	SH('myInfomation');
	SH('maskbg')
}


/*
**    ==================================================================================================  
**    类名： 
**    功能： 其他玩家详情
**    示例： 
**    ==================================================================================================  
*/
function GetOtherPlayerInfo(uqq,uNick){	
	//ie6bug
	hideSelect('hidden');
	
	if(typeof(uNick) =="undefined" )
	{
		uNick = " ";
	}
	objFlashEng.Send(GetSeptInvite(1028,uqq,uNick))	
}
//处理 1028
function ShowOtherPlayerInfo(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	var p=obj.CAnsGetUserInfo.CPlayerSum
	//基本信息
	$("myInfo_ucHeadPic").src = "/images/player/player_"+p.iUserHead+".jpg"
	$("myInfo_szUserNick").innerHTML=p.szNick
	$("myInfo_iPlayerNationID").innerHTML=ToNation(p.iPlayerNationID)
	$("myInfo_szSeptName").innerHTML=(p.szSeptName=="")?"暂无":p.szSeptName
	$("myInfo_chLeagueRank").innerHTML=""
	$("myInfo_iUserRank").innerHTML=p.iUserRank
	$("myInfo_iUserPoint").innerHTML=p.iUserPoint
	//文韬武略
	$("myInfo_wen").innerHTML="（"+p.iCulture+"级）"
	$("myInfo_wentitle").innerHTML=ToUserRank(3,p.iCulture).UserTitle
	$("myInfo_wenattr").innerHTML="+"+(ToUserRank(3,p.iCulture).usAttrValue/10)+"%"
	$("myInfo_wu").innerHTML="（"+p.iForce+"级）"
	$("myInfo_wutitle").innerHTML=ToUserRank(2,p.iForce).UserTitle
	$("myInfo_wuattr").innerHTML="+"+(ToUserRank(2,p.iForce).usAttrValue/10)+"%"	
	//城池列表
	var tmpHtml=""
	tmpHtml+="<li><span>主城:"+p.CSubCity.szCityName+"</span>"
	tmpHtml+='<a class="a_lightgreen" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+p.CSubCity.iCityGrid+'));HI(\'myInfomation\');HI(\'maskbg\')">('+ToXY(p.CSubCity.iCityGrid)+')</a></li>'
	
	$("myInfo_right_ullist").innerHTML = tmpHtml
	//显示mailicon
	SH("myInfo_mail")
	$("myInfo_mail").onclick=function(){
									gotoSendMail(p.szNick)
									HI('myInfomation');
									HI('maskbg')
	}
	//隐藏排名
	HI("myInfo_leftrank")
	//显示个人详情
	SH('myInfomation');
	
	$("other_playernation").style.display = "inline";
	$("myInfo_iPlayerNationID").style.display = "none";
	$("upwen_span").style.display = "none";
	$("upwu_span").style.display = "none";
	$("other_playernation").innerHTML=ToNation(p.iPlayerNationID);

	
	SH('maskbg')
}

//给人名增加发信按钮
function mailThisName(iUin,szNick){
	if(iUin!=0){
		var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+szNick+'\')"/>';
		return '<span class="imghand" onclick = "top.GetOtherPlayerInfo('+iUin+')">'+szNick+'</span>'+shtml;
	}else{
		var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+szNick+'\')"/>';
		return szNick+shtml;
	}
}

//名字检查
function checkName(username)
{
	var reg = /^(\w|[^\x00-\xff])*$/; 
	if(arr=username.match(reg)) 
	{ 
		if(chChineseLength(username)>14)
		{
			msgbox("请不要超过7个汉字！");
			return false;
		} 
	} 
	else 
	{ 
		msgbox("名称只允许为英文，数字，下划线和汉字的混合,且不能超过7个汉字");
		return false; 
	} 
	
	return true;
}



