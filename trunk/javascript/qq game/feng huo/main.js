//��Cookie��ȡUIN��SKEY
//һЩ���ó���
	var Uin = chGetUin();
	var UName = "";
	var Skey = chGetCookie('skey');
	//����iframe�õ���URL
	var LocalTime = 0;                 //ʱ���ֵ����λ��
	var timekeep = 0;                  //��ʱˢ��ҳ���ʱ��
	var curGridID =0                   //��ǰ���е����ĸ�����
	var CityID=0                       //��ǰ����ID
	var curNationID = 0                //��ǰ����
	var arrOwnCity = new Array();     //�Լ��ĳ���ID����
	var arrUserItem = new Array();    //�û�ӵ�еĵ�������
	var arrUserQuan = -1;              //�û�ӵ�еĵ�ȯ
	var arrCurBuild=[];                //���ڽ����еĽ������Ƽ�
	var arrCurWaterID=[];              //�����Ƽ���Ӧ��ˮ��
	var tempMapstr = "";               //��ͼ��ʾHTML
	var curFavGrid = 0;                //��ǰ��ͼ������
	var curFavName = "";	           //��ǰ��ͼ�������
	var curFavOwnerName = "";          //��ǰ��ͼ������û���
	var curMapGridID =curGridID        //��ͼ��ʾ�ĵ�ǰ���ĸ�

	var curFoodExpend=0                //��ǰ������ʳ����
	var allCityName=[]                 //��ǰ�û����г�����
	var arrCityBuildRank = new Array() //�����ȼ�����
	var msgboxFunc="";                  //msgboxyesno��ִ�к���
	var curTaskDetail=[]                //���ڽ����е�������������
	var curTaskList=[]                  //��������ժҪ
	var strStartAttact="";              //ʹ�ü��о�ʱ�洢��Э��
	var timecountRich=[];
	var ttimeL=[];
	var nnameL=[];
	var curArmyIng="";                  //��ǰ���о��¶�������
	var Outfit=[]                       //װ������
	var curLeagueID = 0                 //�Ƿ�������
	var curLeagueState = 0              //����Ȩ��0��ͨ 1���峤 9�峤
	var arrChat=[]                      //���������Ϣ
	var arrChatSysMsg=["ÿ�η�����Ҫ����һ��С���ȵ���"]                //���ϵͳ�·�������Ϣ
	var intSysNum=0                     //���ϵͳ�·�������Ϣ �±�
	var unReadMails = []                //��Ÿ������͵�δ���ʼ���Ŀ
	var STime = new Date();             //������ʱ��
	var interSTime = 0                   //������ʱ�䶨ʱ��
	
	



function getInfo(id,type){
	moreinfotab(id,type);
	//MM_effectGrowShrink("moreinfo", 400, '0%', '100%', false, false, true);
	$("moreinfo").style.display="block";
	$("maskbg").style.display="block";
}
//�Գ�ʼ��ʱ��iframe�ļ��ؽ����Ż�
function iframebanner(id){
	switch (id) 
		 {
	 	 	case 1 :
	 			$("maildiv").src = bannerURL[0];//msg.js��������
				break 
	 	 	case 2 :
	 			$("shopdiv").src = bannerURL[1];//msg.js��������
				break 
	 	 	case 3 :
	 			$("JZdiv").src = bannerURL[2];//msg.js��������
				break 
		}
}
//��TAB�л�
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
**    ������ 
**    ���ܣ���ʾ�����
**    ʾ����ShowRichTab(opt1,id)  
**                        opt1:0��ʾ����壬1��ʾ�����
**                        id:��ʾ�����Ĳ�ID
**    ==================================================================================================  
*/
	var arrSPDiv,arrBuildingID,intCurSPD
	arrSPDiv = new Array("SDP_mutou","SDP_liangshi","SDP_shitou","SDP_tie","SDP_miku","SDP_cangku","SDP_guanfu","SDP_junying","SDP_guofangbu","SDP_kexueyuan","SDP_yelianfang","SDP_nongkesuo","SDP_dashiguan","SDP_gongchengbu","SDP_minju","SDP_shijianpu","SDP_muliaofang","SDP_xiulichang","SDP_tuohuangying","SDP_citymap")

	
	//��������cityʱ��ʾ���ؽ�����  ������ͼƬ��id
	arrBuildingID = new Array("blank","blank","blank","blank","miku","cangku","guanfu","junying","guofangbu","kexueyuan","yelianfang","nongkesuo","dashiguan","gongchengbu","minju","shijiangpu","muliaofang","xiulichang","tuohuangying")
	

function ShowThisSPD(obj){
	for(var i=0;i<arrSPDiv.length;i++)
	{
	    $(arrSPDiv[i]).style.display = "none";
	}
	$(obj).style.display = "block"
}
function ShowRichTab(swt,id){	
	if(!swt){                                  //�����+��ɫ�����
		for(var i=0;i<arrSPDiv.length;i++)
		{
			$(arrSPDiv[i]).style.display = "none";
		}
		$("mainpanel").style.display="block";
		$("richtab1").style.display="block";
		$("richtab2").style.display="none";
		$("richtab0").style.display="none";		
	}else{                                     //��ɫ�����+�����
		//��ʾ��ͼ�����
		if(id >=0)intCurSPD = id;
		if(intCurSPD == 1007){
			ShowMapTab(intCurSPD_MapDiv);
		}else{
			//����tabname��ʾ��ǰtab
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
			//��ʼ��ʱ��ֹ����
			if(id >= 0){
				//����ȫ�ֱ�����������index��ť�ϵĺ�������
				intCurSPD = id;
				ShowThisSPD(arrSPDiv[id]);
				$("richtab1name").innerHTML = mb.Buidings[id].BuildingName;	
				$("richtab2name").innerHTML = mb.Buidings[id].BuildingName;		
				//��ʾ���������
				if(arrCityBuildRank.length > 0){		//�ж��Ƿ��ǻ�δ��ʼ��	
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
	$("richtab1name").innerHTML ="��ͼ��Ϣ";
	$("richtab2name").innerHTML ="��ͼ��Ϣ";
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
//��ʼ���콨���Ƽ�
function cBuild(id,ty,rank){
	objFlashEng.Send(GetBuild(id,ty,rank,0))
}
//��ʼ������ַ���
function cArmy(id,ty,i){
	if(ty ==3){
		eval("var num = document.form_FO.num"+i+".value");
	}else if(ty ==4){
		eval("var num = document.form_AR.num"+i+".value");
	}
	if(isPlusNumber(num)==false){
		msgbox("������������!")
	}else{
		if(num>999){
			msgbox("һ�����ֻ������999��")	
		}else{
			objFlashEng.Send(GetBuild(id,ty,0,num))
		}
	}
}



/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ���ʼ��������Ϣ
**    ʾ����
**                        
**    ==================================================================================================  
*/
function initHtml(){		
	//�򵥵�¼�ж�
	if(!chIsLogin())location.href="index.html";
	
	
	
	
	if(typeof(document.frames['proxy_iframe'].webbg)=="object"){
		getID('webbg');
		getCityID('citybg');
		
		//������
		setInterval("ShowChatContent()",1000)	
		setInterval("ShowChatSysMsg()",5000)	
	}else{		
		setTimeout("initHtml();",100);
		return false;
	} 
}


/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ�Flash��������
**    ʾ����
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
	//�����ʱ��
	timekeep=clearInterval(timekeep)
	objFlashEng.Close(); 
}

//flash����ҳ��js
function OnConnect(str){ 

	if(str!=0){		
		$("perloading").innerHTML="<br><br><br><br><div style='color:#000;'>����ʧ��!!<br><br><a style='color:#000;' href='javascript:location.reload()'>>>�����������</a>����<a style='color:#000;' href='javascript:$(\"maskbg\").style.display=\"none\";$(\"perloading\").style.display=\"none\";'>>>���ȡ��</a></div>"
	}else{	
		objFlashEng.Send(getTaskList(1001));	
		$("perloading").style.display="none";	
		$("maskbg").style.display="none";			
	} 
}

function onReconnect(){ 
    //editor.innerHTML="���������ߣ������������ӣ�---"
}
//�ر�flash����ָ��
function GuideClose(){
	$("guideDiv").style.display="none"
}
function onRecv(str){ 	
	//����Ѿ�flash�Ѿ����ϣ���ҳ��û�м����꣬����setTimeout�ظ�onRecv����
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
	   case 1700 ://��ѯ�������б�
	   	  document.frames["marketdiv"].ShowMarketList(str);
		  break;
	   case 1706 ://��ѯ��������
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
	   //�ʼ�ϵͳ
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
**    ������ 
**    ���ܣ� ��¼���cookie����
**    ʾ����
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
// ��cookie��ȡQQ��
function chGetUin()
{
	var aRet = chGetCookie('uin').match(/\d+/);
	return aRet ? parseInt(aRet[0], 10) : -1;
}
// ����cookie���ж��Ƿ��¼
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
	badChar += " "+"��";//�����ȫ�ǿո� 
	badChar += "`~!@#$%^&()-_=+]\|:;'<,>?\"/";  //������*��.��Ӣ�ķ��� 
	var isC = true;
	if(""==str){ 
		isC=false //return false; 
	}else{
		for(var i=0;i<str.length;i++){ 
			var c = str.charAt(i);//�ַ���str�е��ַ� 
			if(badChar.indexOf(c) > -1)isC=false
		}
	}
	return isC
} 
function isGoodWord(str){ 
	var badChar =""; 
	badChar += "\\|'<>\"/";  //������*��.��Ӣ�ķ��� 
	var isC = true;
	if(""==str){ 
		isC=false //return false; 
	}else{
		for(var i=0;i<str.length;i++){ 
			var c = str.charAt(i);//�ַ���str�е��ַ� 
			if(badChar.indexOf(c) > -1)isC=false
		}
	}
	return isC
} 
function isGoodName(str){ 
	var badChar =" "+"��";//�����ȫ�ǿո� 
	badChar += "`~!@#$%^&()-*.=+]\|:;'<,>?\"/";  //������*��.��Ӣ�ķ��� 
	var isC = true;
	if(""==str){ 
		isC=false //return false; 
	}else{
		for(var i=0;i<str.length;i++){ 
			var c = str.charAt(i);//�ַ���str�е��ַ� 
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
**    ������ 
**    ���ܣ� Tips��ʾ����
**    ʾ����
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
**    ������ 
**    ���ܣ� ������ϸ��Ϣ�б�
**    ʾ���� moreinfotab(id)
**                       id 1-19 �������±겻ͬ    
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
			//��ʾ�Ƿ�
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
			//��ʾ����
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
**    ������ 
**    ���ܣ� ������Ϣ��ʾ�ӿ�
**    ʾ���� msgbox(str)
**                  str�����Ǵ�HTML���ַ���
**    ==================================================================================================  
*/
//��֪�Ի���
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
//����ȷ��ѡ��Ի���
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
**    ������ 
**    ���ܣ� ת�������±�����ʵ������ID
**    ʾ���� 
**    ==================================================================================================  
*/
function transToID(id){
	//0-18Ϊ����
	if(id<tec_start_arid){
		return id+1;
	}else if(id>=tec_start_arid && id<for_start_arid){
	//19-30Ϊ�Ƽ�	
		return id+14;		
	}else if(id>=for_start_arid && id<arm_start_arid){
	//31-38Ϊ����
		return id+34;	
	}else if(id>=arm_start_arid && id<arm_end_arid){
	//39-49Ϊ����
		return id+58;
	}
}
function transToArrID(id){
	//0-18Ϊ����
	if(id<20){
		return id-1;
	}else if(id>=33 && id<46){
	//19-30Ϊ�Ƽ�	
		return id-14;		
	}else if(id>=65 && id<73){
	//31-38Ϊ����
		return id-34;	
	}else if(id>=97 && id<108){
	//39-49Ϊ����
		return id-58;
	}else if(id>=129){
	//50�������
		return id-79;
	}
}

/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� ��ͼ����
**    ʾ���� 1008 1009���
**    ==================================================================================================  
*/
//��ͨ����
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
			msgbox("�����������\n������0-999������!")
		}
	}else if(document.form_searchn.searchn[1].checked){
		objFlashEng.Send(SearchMapN(1,document.form_searchn.name.value))
	}else if(document.form_searchn.searchn[2].checked){	
		if(isPlusNumber(document.form_searchn.qq.value)==false){
			msgbox("������������!")
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
//��ѯ��ͼ�ղ�
function ShowGetFavMap(){
	objFlashEng.Send(GetFavMap(3,0,0,0))
}
//�ղز���
function DoFavMap(xy,desc){
	objFlashEng.Send(GetFavMap(0,xy,desc,0,1))
}
//�޸��ղ�����
function ModFavMap(xy,arrID){
	var desc = $("ModFavMap_input_"+ arrID).value;
	//��ֹΪ��
	if(desc==""){
		msgbox("��������ȷ����!")	
	}else{
		objFlashEng.Send(GetFavMap(2,xy,desc,arrID))
	}
}
//ɾ���ղ�
function DelFavMap(xy,arrID){
	msgboxyesno("��ȷ��Ҫɾ���������ղ���")
	msgboxFunc="objFlashEng.Send(GetFavMap(1,"+xy+",0,"+arrID+"))";
}
//�༭�޸��ղ�
function callModFavMap(xy,desc,arrID){
	//��ֹ�����༭��δȷ��
	var iInput=0;
	for(var i=0;i<$("citymap_fav_tab").rows.length;i++){
		var s=$("citymap_fav_tab").rows[i].cells[0].innerHTML
		if(s.indexOf("ModFavMap_input_")!= -1)iInput++
	}
	if(iInput>0){
		msgbox("����ͬʱ�༭�������!")	
	}else{
		$("citymap_fav_tab").rows[arrID+1].cells[0].innerHTML="<input onkeydown='javascript:if(window.event.keyCode == 0xD)ModFavMap("+xy+","+arrID+")' onblur='ModFavMap("+xy+","+arrID+")' id='ModFavMap_input_"+ arrID + "' type='text' value='"+ desc + "' style='width:80px; border:1px solid #666666; background-color:#CCCCCC'>"
	}
}
/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� ��ͼ��ʾ
**    ʾ���� 1006���
**    ==================================================================================================  
*/
//��ʼ����ʾ
function initMyMap(){
	objFlashEng.Send(GetWorldMap(curGridID));
	curMapGridID = curGridID;
}
//ȷ��y���겻������Χ
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
//ȷ��X���겻������Χ
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



//ת������ID
function ToNation(id){
	var arrTmpNa=['',"��",
				  "��", 
				  "��", 
				  "��", 
				  "��", 
				  "κ",
				  "��"]
	return arrTmpNa[id]
}

function ToNationKe(id){
	var arrTmpNa=['',"�ء�<b>��</b>����",
				  "���<b>��</b>����", 
				  "����<b>��</b>����", 
				  "���<b>��</b>����", 
				  "����<b>��</b>��κ", 
				  "�ԡ�<b>κ</b>����",
				  "κ��<b>��</b>����"]
	return arrTmpNa[id]
}
/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� �ɱ�tab��ʾ
**    ʾ���� 1010�ɱ� 1017���Բ���ʱ�����
**    ==================================================================================================  
*/
//ʹ�ɳ��������ֵ���
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

//�������
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
//�㽫̨��ʼ��
function DoDJ(allUnForce){
	//ÿСʱ����
	$("dj_army_food").innerHTML=curFoodExpend;
	//װ������	
	for(var i=0;i<4;i++){
		eval("$('dj_army_armor"+i+"').innerHTML = Outfit["+i+"];")
	}
	
	//�����Լ����еı��ֱ��
	var D=[]
	for(var i=39;i<50;i++){
		D.push(arrCityBuildRank[i])
	}
	//��ձ��
	var TabLength=$("dj_army_info").rows.length;	
	for(var i=0;i<TabLength;i++){
		$("dj_army_info").deleteRow(-1);
	}
	addArmyInfo($("dj_army_info"),D,"��Ŀ",11);	
	
	
	//dj_army_fortlist�Ƿ��б�
	var tmFort=""
	for(var i=for_start_arid;i<arm_start_arid;i++){
		tmFort+=mb.Buidings[i].BuildingName+":"+arrCityBuildRank[i]+"����"
	}
	$("dj_army_fortlist").innerHTML = tmFort;

	//������������
		var tempF='';
		//�ж��Ƿ����Լ���פ����صĲ���
		for(i=0;i<allUnForce.length;i++){
			if(allUnForce[i].iUin==Uin){
				tempF+='<div style="margin-top:6px; width:560px; height:24px;"><div class="floatleft" style="line-height:24px;">��פ�� <strong class="t_green imghand" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+allUnForce[i].iTarGrid+'))">'+allUnForce[i].szMarrowCityName+'</strong>('+ToXY(allUnForce[i].iTarGrid)+') �Ĳ���</div><div style="float:right" class="btnWhite"  onclick="objFlashEng.Send(GetArmyListInfo(\''+allUnForce[i].stCarmyWaterID+'\','+CityID+',1000));SHI_DJ(\'dj_info'+allUnForce[i].stCarmyWaterID+'\',this)" id="dj_infodiv'+allUnForce[i].stCarmyWaterID+'">��ʾ����</div></div><div id="dj_info'+allUnForce[i].stCarmyWaterID+'" style="display:none"></div>'
			}
		}
		tempF=(tempF=="")?"<br>����":tempF
		$("dj_army_myotherforce").innerHTML = tempF;	
	
		//�ж��Ƿ����Ѿ�����
		var tempF='';	
		for(i=0;i<allUnForce.length;i++){
			if(allUnForce[i].iUin!=Uin){
				tempF+='<div style="margin-top:6px; width:560px; height:24px;"><div class="floatleft" style="line-height:24px;">���� <strong class="t_green">'+allUnForce[i].iUin+'</strong> Ͻ�µ� <strong class="t_green">'+allUnForce[i].szMarrowCityName+'</strong>�Ĳ���</div><div style="float:right" class="btnWhite" onclick="objFlashEng.Send(GetArmyListInfo(\''+allUnForce[i].stCarmyWaterID+'\','+CityID+',1000));SHI_DJ(\'dj_info'+allUnForce[i].stCarmyWaterID+'\',this)" id="dj_infodiv'+allUnForce[i].stCarmyWaterID+'">��ʾ����</div></div><div id="dj_info'+allUnForce[i].stCarmyWaterID+'" style="display:none"></div>'
			}
		}
		tempF=(tempF=="")?"<br>����":tempF
		$("dj_army_otherforce").innerHTML = tempF;	
}
function SHI_DJ(ob,ob2){
	if($(ob).style.display!="none"){
		$(ob).style.display="none"
		ob2.innerHTML="��ʾ����"
	}else{
		$(ob).style.display="block"
		ob2.innerHTML="�ر�����"
	}
}
//����1018�������ݣ���ʾ������������
function ShowDJ_ArmyInfo(obj){	
	var tempF=""
	tempF+='	<table width="560" height="104"border="1" bordercolor="#dedede" style="border-collapse:collapse;margin:6px 0 0 0" cellpadding="0" cellspacing="0" class="border_hui">'
	tempF+='		<tr>'
	tempF+='			<td height="24" bgcolor="#E3E3DD"><img src="../images/army/hero.png" width="22" height="22"  align="absmiddle" />'
	//����Ӣ��	
	tempF+= '						Ӣ�ۣ�'+formatHero(obj)
	tempF+='		</td></tr>'
	tempF+='		<tr>'
	tempF+='			<td height="39" align="center">'
	tempF+='			<table id="dj_infotab'+obj.stCarmyWaterID+'" width="560" cellpadding="0" cellspacing="1"></table>'
	tempF+='			</td>'
	tempF+='		</tr>'
	tempF+='		<tr>'
	tempF+='			<td height="39" align="center">��ͭ�ף�0 �����ף�0 �ƽ�ף�0 ʥ�ף�0 ��ʳ���ģ�'+obj.iFoodExpenHour+'/Сʱ <span class="a_deepred imghand" onclick="objFlashEng.Send(GetCancleArmy(\''+obj.stCarmyWaterID+'\',0,1000))">>>�øò��ӷ���</span></td>'
	tempF+='		</tr>'
	tempF+='	</table>'
	$("dj_info"+obj.stCarmyWaterID).innerHTML = tempF
	addArmyInfo($("dj_infotab"+obj.stCarmyWaterID),PackArr(obj.CCityArmy.ashArmy,11),"��Ŀ",11);	
}

//����1019����ժҪ������
function ShowDJ_Army(obj){
	//��istat=3�����Ĳ�����Ϣ��������
	var allUnForce=[]
	for(i=0;i<obj.length;i++){
		if(obj[i].iStat==3){
			allUnForce.push(obj[i])
		}	
	}	
	DoDJ(allUnForce);
}
//�յ�1017֮����ʾҳ�� ����������ʳ��ʱ��
function ShowMarchInfo(str){
	var objM=eval('('+str+')');
	if(typeof(objM.CResult) != "undefined")	{
		msgbox("Error:"+objM.CResult.iResultID+"<br><b>��������ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objM.CResult.iResultID)+"!</span>")
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
	//���Ӷ����Դ��
	$('army_take_attack').innerHTML = objM.CAnsTestArmy.CTestArmy.iArmyLoadMax;
}

//
//-----------------------------------------------------------
//���������־��¶���

//
// ������
//
function DoSpy(grid,name,ownwer){
	//��ǰӵ�е���������
	$("amry_spy_sendmax41").innerHTML = arrCityBuildRank[41];
	$("amry_spy_send41").value = 0;
	//Ŀ�������Ϣ
	$("amry_spy_city").innerHTML = name;
	$("amry_spy_x").value = ToXY(grid,"x");
	$("amry_spy_y").value = ToXY(grid,"y");
	$("amry_spy_gridid").innerHTML = grid;
	
	//���ԭ�в���������Ϣ
	$("army_time_spy").innerHTML = "00:00:00";
	$("army_food_spy").innerHTML = "0";
	
}
function StartSpy(){
	var gridid=inputToGird($("amry_spy_x").value,$("amry_spy_y").value)
	if(gridid!=""){
		strStartAttact = "objFlashEng.Send(GetCreatArmy(\""+gridid+"\",3,mkArmyArr(2,$(\"amry_spy_send41\").value),'00010',$(\"army_spy_select\").value,$(\"army_spy_iEmergency\").checked,\"NewCity\"))";
		objFlashEng.Send(GetCreatArmy(gridid,3,mkArmyArr(2,$("amry_spy_send41").value),'00010',$("army_spy_select").value,$("army_spy_iEmergency").checked,"NewCity"));
	}else{
		msgbox("�����������<br>������0-999������!")
	}

}
//1017��ѯ�ɳ�����ʱ��
function getSpySendTime(){
	if(inputToGird($("amry_spy_x").value,$("amry_spy_y").value)!=""){
		var itemid=$("army_spy_iEmergency").checked?20:0
		objFlashEng.Send(GetMarchInfo(inputToGird($("amry_spy_x").value,$("amry_spy_y").value),0,$("army_spy_select").value,mkArmyArr(2,$("amry_spy_send41").value),itemid))
	}else{
		msgbox("�����������<br>������0-999������!")
	}
}
function checkSpyValue(){
	var a=$("amry_spy_sendmax41").innerHTML
	var b=$("amry_spy_send41").value
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("�ɳ����������ܳ���ӵ�е�����")
		}else{
			getSpySendTime();	
		}
	}else{
		msgbox("������������")
	}
}


//
// �ػ����
//
function DoExploit(grid){
	//��ǰӵ�е���������
	$("amry_exploit_sendmax42").innerHTML = arrCityBuildRank[42];
	$("amry_exploit_send42").value = 1;
	//Ŀ�������Ϣ
	$("amry_exploit_city").innerHTML = "ĬĬ���ŵĻĵ�";
	$("amry_exploit_x").value = ToXY(grid,"x");
	$("amry_exploit_y").value = ToXY(grid,"y");
	$("amry_exploit_gridid").innerHTML = grid;
	
	//���ԭ�в���������Ϣ
	$("army_time_exploit").innerHTML = "00:00:00";
	$("army_food_exploit").innerHTML = "0";
	
	$("army_exploit_iCityname").value = ""
}
function StartExploit(){
	//�ж����������Ƿ���ȷ	
	if(inputToGird($("amry_exploit_x").value,$("amry_exploit_y").value)!=""){
		$("amry_exploit_gridid").innerHTML=inputToGird($("amry_exploit_x").value,$("amry_exploit_y").value)
		//����Ƿ����ػı�
		if(arrCityBuildRank[42] > 0){
			//����³������Ƿ�Ϊ��
			if($("army_exploit_iCityname").value!=""){
				if(checkName($("army_exploit_iCityname").value)){
					strStartAttact="objFlashEng.Send(GetCreatArmy($(\"amry_exploit_gridid\").innerHTML,2,mkArmyArr(3,$(\"amry_exploit_send42\").value),'00010',$(\"army_exploit_select\").value,$(\"army_exploit_iEmergency\").checked,$(\"army_exploit_iCityname\").value))";
					objFlashEng.Send(GetCreatArmy($("amry_exploit_gridid").innerHTML,2,mkArmyArr(3,$("amry_exploit_send42").value),'00010',$("army_exploit_select").value,$("army_exploit_iEmergency").checked,$("army_exploit_iCityname").value));
				}
			}else{
				msgbox("����û�������ػ��³����ƣ�")
			}
		}else{
			msgbox("����û���ػı������Ƚ���һ����")	
		}
	}else{
		msgbox("�����������<br>������0-999������!")
	}
}
//1017��ѯ�ɳ�����ʱ��
function getExploitSendTime(){
	var itemid=$("army_exploit_iEmergency").checked?20:0
	if(inputToGird($("amry_exploit_x").value,$("amry_exploit_y").value)!=""){
		objFlashEng.Send(GetMarchInfo(inputToGird($("amry_exploit_x").value,$("amry_exploit_y").value),0,$("army_exploit_select").value,mkArmyArr(3,$("amry_exploit_send42").value),itemid))
	}else{
		msgbox("�����������<br>������0-999������!")
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
			msgbox("�ɳ����������ܳ���ӵ�е�����")
		}else{
			getExploitSendTime();	
		}
	}else{
		msgbox("������������")
	}
}

//
// �������
//
function DoAttack(grid,name,ownwer){
	//��ʼ�������ɳ�Ӣ��
	objFlashEng.Send(getTaskList(1602))
	$("attack_hero_tab").style.visibility="visible"
	$("attack_hero_hidetype").innerHTML = "0";
	
	//װ������
	for(i=0;i<4;i++){
		eval("$('army_attack_shieldmax"+i+"').innerHTML='"+Outfit[i]+"'");
		eval("$('army_attack_shield"+i+"').value='0'");
	}
	//����������ʼ��
	for(i=39;i<50;i++){
		if(i!=42 && i!=41)eval("$('amry_attack_sendmax"+i+"').innerHTML='"+arrCityBuildRank[i]+"'");
		if(i!=42 && i!=41)eval("$('amry_attack_send"+i+"').value='0'");
	}
	//Ŀ�������Ϣ
	$("amry_attack_randomOrCity").innerHTML= name=="�ݵ�"?"�ݵ�":"����"
	
	$("amry_attack_city").innerHTML = name;
	$("amry_attack_gridid").innerHTML = grid;
	$("amry_attack_x").value = ToXY(grid,"x");
	$("amry_attack_y").value = ToXY(grid,"y");
	
	
	//���ԭ�в���������Ϣ
	$("army_time_attack").innerHTML = "00:00:00";
	$("army_food_attack").innerHTML = "0";
	$("army_take_attack").innerHTML = "0";
	
}
//1017��ѯ�ɳ�����ʱ��
function getAttackSendTime(){
	//�ж���������Ϸ���
	if(inputToGird($("amry_attack_x").value,$("amry_attack_y").value)!=""){
		//����ɱ��ַ���
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			if(i!=2 && i!=3)eval("arrarmy[i] = $('amry_attack_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		
		//Ӣ�������ַ���
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
		msgbox("�����������<br>������0-999������!")
	}
}
function StartAttack(){
	//�ж���������Ϸ���
	var gridid = inputToGird($("amry_attack_x").value,$("amry_attack_y").value)
	if(gridid!=""){
		//���ɱ��������ַ���	
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			if(i!=2 && i!=3)eval("arrarmy[i] = $('amry_attack_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//װ�������ַ���
		var strshield="";
		for(i=0;i<4;i++){
			eval("strshield = strshield + CLength($('army_attack_shield"+i+"').value)");
		}
		strshield = CLength(4)+strshield;
		//Ӣ�������ַ���
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
	
		//��������
		//�ж����Ӷ�սor�����ս
		if($("amry_attack_randomOrCity").innerHTML =="�ݵ�"){
			strStartAttact="objFlashEng.Send(GetCreatArmyRandom("+gridid+",6,'"+str+"','"+strshield+"',$(\"army_attack_select\").value,$(\"army_attack_iEmergency\").checked,'str','"+strhero+"'))";
			objFlashEng.Send(GetCreatArmyRandom(gridid,6,str,strshield,$("army_attack_select").value,$("army_attack_iEmergency").checked,'str',strhero));	
		}else{
			strStartAttact="objFlashEng.Send(GetCreatArmy("+gridid+",1,'"+str+"','"+strshield+"',$(\"army_attack_select\").value,$(\"army_attack_iEmergency\").checked,'str','"+strhero+"'))";
			objFlashEng.Send(GetCreatArmy(gridid,1,str,strshield,$("army_attack_select").value,$("army_attack_iEmergency").checked,'str',strhero));			
		}
	}else{
		msgbox("�����������<br>������0-999������!")
	}
}
function checkAttackValue(i){
	var a=arrCityBuildRank[i]
	eval("var b=$('amry_attack_send"+i+"').value")
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("�ɳ����������ܳ���ӵ�е�����")
		}else{
			getAttackSendTime();	
		}
	}else{
		msgbox("������������")
	}
}



//
// פ�����
//
function DoSend(grid,name,ownwer){
	//��ʼ�������ɳ�Ӣ��
	objFlashEng.Send(getTaskList(1602))	
	$("attack_hero_tab").style.visibility="visible"
	$("attack_hero_hidetype").innerHTML = "1";
	
	//��ǰӵ�еı���
	
	//����������ʼ��
	for(i=39;i<50;i++){
		eval("$('amry_send_sendmax"+i+"').innerHTML='"+arrCityBuildRank[i]+"'");
		eval("$('amry_send_send"+i+"').value='0'");
	}
	//Ŀ�������Ϣ
	$("amry_send_city").innerHTML = name;
	$("amry_send_x").value = ToXY(grid,"x");
	$("amry_send_y").value = ToXY(grid,"y");
	$("amry_send_gridid").innerHTML = grid;
	
	//���ԭ�в���������Ϣ
	$("army_time_send").innerHTML = "00:00:00";
	$("army_food_send").innerHTML = "0";
}
function StartSend(){
	//�ж���������
	var gridid=inputToGird($("amry_send_x").value,$("amry_send_y").value)
	if(gridid!=""){
		//���ɱ��������ַ���	
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			eval("arrarmy[i] = $('amry_send_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//װ�������ַ���
		//��פʱװ��Ϊ��Դ����ʱȫ����Ϊ0
		strshield = CLength(4)+"00010"+"00010"+"00010"+"00010"
		
		//Ӣ�������ַ���
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
		
		//��������
		strStartAttact="objFlashEng.Send(GetCreatArmy(\""+gridid+"\",5,'"+str+"','"+strshield+"',$(\"army_send_select\").value,$(\"army_send_iEmergency\").checked,'str',"+strhero+"))"
		objFlashEng.Send(GetCreatArmy(gridid,5,str,strshield,$("army_send_select").value,$("army_send_iEmergency").checked,'str',strhero));
	}else{
		msgbox("�����������<br>������0-999������!")
	}
}
//1017��ѯ�ɳ�����ʱ��
function getSendSendTime(){
	//�ж���������
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
		
		
		//Ӣ�������ַ���
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
		msgbox("�����������<br>������0-999������!")
	}
}
function checkSendValue(i){
	var a=arrCityBuildRank[i]
	eval("var b=$('amry_send_send"+i+"').value")
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("�ɳ����������ܳ���ӵ�е�����")
		}else{
			getSendSendTime();	
		}
	}else{
		msgbox("������������")
	}
}


//
// �������
//
function DoSendother(grid,name,ownwer){
	//��ʼ�������ɳ�Ӣ��
	objFlashEng.Send(getTaskList(1602))	
	$("attack_hero_tab").style.visibility="visible"
	$("attack_hero_hidetype").innerHTML = "2";
	
	//��ǰӵ�еı���	
	//����������ʼ��
	for(i=39;i<50;i++){
		eval("$('amry_sendother_sendmax"+i+"').innerHTML='"+arrCityBuildRank[i]+"'");
		eval("$('amry_sendother_send"+i+"').value='0'");
	}
	
	
	//װ������
	for(i=0;i<4;i++){
		eval("$('army_sendother_shieldmax"+i+"').innerHTML='"+Outfit[i]+"'");
		eval("$('army_sendother_shield"+i+"').value='0'");
	}
	//Ŀ�������Ϣ
	$("amry_sendother_city").innerHTML = name;
	$("amry_sendother_x").value = ToXY(grid,"x");
	$("amry_sendother_y").value = ToXY(grid,"y");
	$("amry_sendother_gridid").innerHTML = grid;
	
	//���ԭ�в���������Ϣ
	$("army_time_sendother").innerHTML = "00:00:00";
	$("army_food_sendother").innerHTML = "0";
	
}
function StartSendother(){
	var gridid=inputToGird($("amry_sendother_x").value,$("amry_sendother_y").value)
	if(gridid!=""){
		//���ɱ��������ַ���	
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(i=0;i<11;i++){
			eval("arrarmy[i] = $('amry_sendother_send"+(i+39)+"').value");
		}
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//��ͼ������
		//װ�������ַ���
		var strshield="";
		for(i=0;i<4;i++){
			eval("strshield = strshield + CLength($('army_sendother_shield"+i+"').value)");
		}
		strshield = CLength(4)+strshield;
		
		//Ӣ�������ַ���
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
		//��������
		strStartAttact="objFlashEng.Send(GetCreatArmy(\""+gridid+"\",4,'"+str+"','"+strshield+"',$(\"army_sendother_select\").value,$(\"army_sendother_iEmergency\").checked,'str',"+strhero+"))"
		objFlashEng.Send(GetCreatArmy(gridid,4,str,strshield,$("army_sendother_select").value,$("army_sendother_iEmergency").checked,'str',strhero));
	}else{
		msgbox("�����������<br>������0-999������!")
	}

	
}
//1017��ѯ�ɳ�����ʱ��
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
		
		//Ӣ�������ַ���
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
		msgbox("�����������<br>������0-999������!")
	}
}
function checkSendotherValue(i){
	var a=arrCityBuildRank[i]
	eval("var b=$('amry_sendother_send"+i+"').value")
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("�ɳ����������ܳ���ӵ�е�����")
		}else{
			getSendotherSendTime();	
		}
	}else{
		msgbox("������������")
	}
}


//
// �������
//
function DoTrans(grid,name,ownwer){
	//��ǰӵ�еı���	
	$("amry_trans_show39").innerHTML = arrCityBuildRank[39];
	$("amry_trans_send39").value = 0;
	$("amry_trans_show40").innerHTML = arrCityBuildRank[40];
	$("amry_trans_send40").value = 0;
	
	//Ŀ�������Ϣ		
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
	
	//���ԭ�в���������Ϣ
	$("army_time_trans").innerHTML = "00:00:00";
	$("army_food_trans").innerHTML = "0";
	
}
function StartTrans(){
	var gridid=inputToGird($("amry_trans_x").value,$("amry_trans_y").value)
	if(gridid!=""){
		//���ɱ��������ַ���	
		var arrarmy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		arrarmy[0] = $('amry_trans_send39').value
		arrarmy[1] = $('amry_trans_send40').value
		var str="";
		for(i in arrarmy){
			str = str+ CLength(arrarmy[i]);
		}
		str = CLength(arrarmy.length)+str;
		//װ�������ַ���
		var strshield="";
		for(i=1;i<5;i++){
			eval("strshield = strshield + CLength($('amry_trans_s"+i+"').value)");
		}
		strshield = CLength(4)+strshield;
		//��������
		strStartAttact="objFlashEng.Send(GetCreatArmy(\""+gridid+"\",0,'"+str+"','"+strshield+"',$(\"army_trans_select\").value,$(\"army_trans_iEmergency\").checked,'str'))"
		objFlashEng.Send(GetCreatArmy(gridid,0,str,strshield,$("army_trans_select").value,$("army_trans_iEmergency").checked,'str'));
	}else{
		msgbox("�����������<br>������0-999������!")
	}
}
//1017��ѯ�ɳ�����ʱ��
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
		msgbox("�����������<br>������0-999������!")
	}
}
function checkTransValue(i){
	var a=arrCityBuildRank[i]
	eval("var b=$('amry_trans_send"+i+"').value");
	if(parseInt(b)>=0){
		if(parseInt(a)<parseInt(b)){
			msgbox("�ɳ����������ܳ���ӵ�е�����")
		}else{
			getTransSendTime();	
		}
	}else{
		msgbox("������������")
	}
}
/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� ��ʼ���ɱ� Ӣ����ʾ
**    ʾ���� 1602
**    ==================================================================================================  
*/
function ShowHeroAttack(str){
	var objT=eval('('+str+')');
	if(typeof(objT.CResult) != "undefined")	{
		msgbox("Error:"+objT.CResult.iResultID+"<br><b>Ӣ����ʾʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")
		return false;
	}else{
		if(objT.CAnsAllHero.CResult.iResultID == 0){
			var tmpHero=""
			var b=objT.CAnsAllHero.astHeroMsg
			for(i in b){
				if(b[i].m_chStatus==0 && b[i].m_iCurCity == CityID)tmpHero+= '<div style="margin-left:6px;display:inline;" class="floatleft" hint="<img src=\'\/images\/blank.gif\' width=\'90\' height=\'90\' class=\'border_hui\' style=\'background:url(\/images\/hero\/hero_'+b[i].m_iPicID+'.jpg)\' \/><br>'+b[i].m_chRank+'��<br>����:'+b[i].m_iNearAttack+'<br>Զ��:'+b[i].m_iFarAttack+'<br>����:'+b[i].m_iNearFort+'<br>Զ��:'+b[i].m_iFarFort+'<br>�ٶ�:'+b[i].m_iMoveSpeed+'<br>����:'+b[i].m_iAffordCount+'"><input type="checkbox" name="attack_hero_ckb" value="'+b[i].HeroID+'" onclick="testHeroTime()" />'+b[i].m_szName+'</div>'
			}
			if(tmpHero=="")tmpHero="���޿���Ӣ��"
			$("attack_hero_list").innerHTML=tmpHero
			
		}
	}
	
}
//����Я��Ӣ������ʱ�估����
function testHeroTime(){
	var type = $("attack_hero_hidetype").innerHTML
	//0 ����
	//1 ��פ
	//2 ����
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
**    ������ 
**    ���ܣ� ȡ���������
**    ʾ���� 1004���
**    ==================================================================================================  
*/
function CancleTask(waterid){
	msgboxyesno("��ȷ��Ҫȡ��������<br>��ֻ����<span style='color:red'>80%</span>�Ľ�����Դ����������ҡ�������Դ��")
	msgboxFunc="objFlashEng.Send(GetCancleTask('"+waterid+"'))";
	ShowRichTab(0,0);
}

/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� �ɳ����Ӻ����ʾ��Ϣ
**    ʾ���� 1010��ͨ�ɱ� 1024������ɱ�
**    ==================================================================================================  
*/
function ShowIsSendOk(str){
	var objT=eval('('+str+')');
	if(typeof(objT.CResult) != "undefined")	{
		if(objT.CResult.iResultID == 1400027 || objT.CResult.iResultID == 1400028){
			/*
			msgboxFunc="objFlashEng.Send(GetBuyItem(20,1,20));";
			msgboxyesno("����ʱû�С����о������ߣ��Ƿ���������ʹ�ã�</b>!")	
			*/
			objFlashEng.Send(GetBuyItem(20,1,20));
		}else{
			msgbox("Error:"+objT.CResult.iResultID+"<br><b>�ɳ�����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")	
		}
		return false;
	}else{
		if(objT.CAnsCreatArmy.CResult.iResultID == 0){
			objFlashEng.Send(GetMineCity(CityID,0));
			msgbox("�ɳ����� <b>�ɹ�</b>!")	
			ShowTab('building',0)
			ShowRichTab(0,0)
			//������ȡ����
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
			msgboxyesno("����ʱû�С����о������ߣ��Ƿ���������ʹ�ã�</b>!")
			*/
			objFlashEng.Send(GetBuyItem(20,1,20));
		}else{
			msgbox("Error:"+objT.CResult.iResultID+"<br><b>�ɳ�����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")	
		}
	}else{
		if(objT.CAnsCreatArmy.CResult.iResultID == 0){
			objFlashEng.Send(GetMineCity(CityID,0));
			msgbox("�ɳ����� <b>�ɹ�</b>!")	
			//!!!!!!!!!!������Ҫ������и��º����Ϣ������
			ShowTab('building',0)
			ShowRichTab(0,0)
			//������ȡ����
			objFlashEng.Send(GetUserItems());
		}
	}
	
}

/*����Select*/
function hideSelect(visibility){
	//��ҳ���select
    for(var i = 0; i < document.getElementsByTagName('select').length; i++) {
		document.getElementsByTagName('select')[i].style.visibility = visibility;
	}
	//iframe���selcet	
	if(typeof(document.frames['JZdiv'].hideSelect)=="function"){
		 for(var i = 0; i < document.frames['JZdiv'].document.getElementsByTagName('select').length; i++) {
			document.frames['JZdiv'].document.getElementsByTagName('select')[i].style.visibility = visibility;
		}
	}
}




/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� �ٻز��Ӻ����ʾ��Ϣ
**    ʾ���� 1020���
**    ==================================================================================================  
*/
function ShowcallbackArmy(str){
	var objT=eval('('+str+')');
	var waterid="";
	if(typeof(objT.CResult) != "undefined")	{
		if(objT.CResult.iResultID == 1020002){
			msgboxFunc="objFlashEng.Send(GetCancleArmy(curArmyIng,32,0));";
			msgboxyesno("�ٻز���ʧ�ܣ��ɳ�ʱ���Ѿ�����3���ӣ��Ƿ�ʹ�á������ձ��������ٻأ�</b>!")	
			
		}else if(objT.CResult.iResultID == 1400027 || objT.CResult.iResultID == 1400028){
			msgboxFunc="objFlashEng.Send(GetBuyItem(32,1,32));";
			msgboxyesno("����ʱû�С������ձ������ߣ��Ƿ���������ʹ�ã�</b>!")				
		}else{
			msgbox("Error:"+objT.CResult.iResultID+"<br><b>�ٻز���ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")	
		}
	}else{
		if(objT.CAnsReturnArmy.CResult.iResultID == 0){
			//�����ǲ������
			if(objT.CTMsgHead.llMsgAct==1000){
				msgbox("ǲ������ <b>�ɹ�</b>!")
				//������ʾ�㽫̨
				Show_army_tab(0)
			}else{
				msgbox("�ٻز��� <b>�ɹ�</b>!")
				//������ʾ���¶���
				objFlashEng.Send(GetArmyList(1,CityID,1))
				objFlashEng.Send(GetMineCity(CityID))
			}
		}
	}
}






/*
**    ==================================================================================================  
**     
**    ����ϵͳ
**                            
**    ==================================================================================================  
*/
//1500�������������б�
function ShowTaskList(str){
	//Э������
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>��ȡ�����б�ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	curTaskList=T.CAnsGetAllTaskList.CUserTasksData.astTaskBriefs
	curTaskDetail = T.CAnsGetAllTaskList.CUserTasksData.astValidTasks
	
	//��һ����������û���ʱ����ʾ��ʾ
	//CheckIsFirstTask();

	//���µ�ǰ�б�״̬
	var tabid=deTypeAndId(1,T.CTMsgHead.llMsgAct)[0]
	var taskid=deTypeAndId(1,T.CTMsgHead.llMsgAct)[1]
	if(taskid==0){
		eval("TaskListShow"+tabid+"();")
	}else{
		eval("TaskListShow"+tabid+"("+taskid+");")
	}
	
}
//��һ����������û���ʱ����ʾ��ʾ
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

/*//1501�������ڽ���������
function ShowUpdateTaskList(str){
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>��ȡ��ǰ����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	curTaskDetail = T.CAnsGetValidTaskList.CUserValidTaskData.astValidTasks	
	//���û�н��������񣬸�����������б�
		//һ�����а�ťδ����
		var arrD=$("nowtasklist").getElementsByTagName("li");
		for(var i=0;i<arrD.length;i++){
				arrD[i].className="tasklistun";
		}
		//�����Ѽ��ť��ʾ
		for(var i=0;i<curTaskList.length;i++){
			//�ж��Ƿ��Ѿ���ɣ���list  curTaskList[i+1].ucTaskStat==3 ? "tasklistun" : 
			if(curTaskList[i].ucTaskStat==2||curTaskList[i].ucTaskStat==1){
				$("task_li"+i).className="tasklistno";
			}
		}
		
	//������������Ҳ൱ǰ������������
	var firstTask=false
	for(i=0;i<curTaskDetail.length;i++){
		taskdetail(curTaskDetail[i].iTaskID)
		if(curTaskDetail[i].iTaskID==1)firstTask=true
	}
	//��һ����������û���ʱ����ʾ��ʾ
	if(firstTask){
		$("task_new_flash").style.display="block"
	}else{
		$("task_new_flash").style.display="none"
	}
}*/


//1503���������Ӧ
function ShowTaskFinish(str){
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>�ύ����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	var arrid = T.CAnsCommitTask.aiPrizeID
	msgbox("�����ύ�ɹ�������õĽ����ǣ�<br><span class='t_red'>"+TaskAnalysisPrize(arrid)+"</span>")	
	//������ȡ�������list
	objFlashEng.Send(getTaskList(1500,T.CTMsgHead.llMsgAct))
	
	//��ȡ�û����е���
	objFlashEng.Send(GetUserItems());
}
//1502��ȡ������Ӧ
function ShowTaskGet(str){
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>��ȡ����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	//������ȡ�������list
	objFlashEng.Send(getTaskList(1500,T.CTMsgHead.llMsgAct))
}



function taskdetail(de,type){
	//type:1�������� 2�ճ�����
	//css��ť�л�
		//һ�����а�ťδ����
		var arrD=$("nowtasklist").getElementsByTagName("li");
		for(var i=0;i<arrD.length;i++){
				arrD[i].className="tasklistun";
		}
		//�����Ѽ��ť��ʾ
		for(var i=0;i<curTaskDetail.length;i++){
			//�ж�typeΪ��Ҫ��ʾ��type��1����2�ճ�
			//�ж������Ƿ񼤻0δ���3�Ѽ�������ɣ�1δ��ɣ�2�����
			if(curTaskDetail[i].ucType==type){
				$("task_li"+i).className="tasklistno";
			}
		}
		//������ǰ��ťѡ��״̬
		$("task_li"+de).className = "tasklist";	
		
		
		
	//����js���ý�����������
	
		//�ж��Ƿ���Э�鷵�����������Ѿ����  
		if(typeof(curTaskList[de])=="object"){
			$("task_name").innerHTML=(curTaskList[de].ucTaskStat==2)||(curTaskList[de].ucTaskStat==1)?taskConfig[de].name+"(����ȡ)":taskConfig[de].name+"(δ��ȡ)";
		}else{
			$("task_name").innerHTML=taskConfig[de].name+"(δ��ȡ)";
		}		
		//��ǰ���񻹿������Ĵ���
		if(type==2 || type==3 || type==4){
			if(curTaskList[de]){
				//��������������
				if(todayIsEna(curTaskList[de].iLastFinishTime)){
					//����Ĵ���
					$("task_name").innerHTML+=" <span class=t_black>���컹����</span>"+(taskConfig[de].maxFinish-curTaskList[de].ucAccTimes)+"<span class=t_black>��</span>"			
				}else{
					//�ǵ���Ĵ���
					$("task_name").innerHTML+=" <span class=t_black>���컹����</span>"+taskConfig[de].maxFinish+"<span class=t_black>��</span>"		
				}
			}else{
				//���û�����������
				//�ǵ���Ĵ���
				$("task_name").innerHTML+=" <span class=t_black>���컹����</span>"+taskConfig[de].maxFinish+"<span class=t_black>��</span>"		
			}
		}
		$("task_content").innerHTML=taskConfig[de].guide;
		$("task_guide").innerHTML=taskConfig[de].desc;
		
	//��������Ŀ��
		var tmpTarget=""
		for(var i=0;i<taskConfig[de].targets.length;i++){
			if(taskConfig[de].targets[i]>0)tmpTarget+=targetConfig[taskConfig[de].targets[i]].desc+"��"
		}
		var r= (tmpTarget=="")?"��ֱ�ӵ�����":tmpTarget.slice(0,tmpTarget.length-1)
		$("task_goal").innerHTML=r;
		
	//����������
		$("task_prize").innerHTML=TaskAnalysisPrize(taskConfig[de].prizes)

	//����1500,1501�������ڽ��������񣬱Ƚϵ�ǰ����
	
		for(var i=0;i<curTaskDetail.length;i++){
			if(curTaskDetail[i].iTaskID == de){
				//��������Ŀ��������					
				var tmpTarget=""
				for(m=0;m<curTaskDetail[i].astTaskTargets.length;m++){
					if(curTaskDetail[i].astTaskTargets[m].ucTargetStat ==0){
						var id=curTaskDetail[i].astTaskTargets[m].iTargetID
						tmpTarget+=targetConfig[id].desc+"<span class='t_red'>(δ���)</span>��"
					}else{
						var id=curTaskDetail[i].astTaskTargets[m].iTargetID
						tmpTarget+=targetConfig[id].desc+"<span class='t_green'>(�����)</span>��"
					}
				}			
				$("task_goal").innerHTML=tmpTarget.slice(0,tmpTarget.length-1) 
				$("task_goal").innerHTML=($("task_goal").innerHTML=="")?"��ֱ�ӵ�����":$("task_goal").innerHTML
		
				//�ж��Ƿ������ʾ��ͬ��ť������
				var isAllDone=(curTaskDetail[i].CTaskBriefData.ucTaskStat==2)?true:false;
				if(isAllDone){				
					$("task_btn").onclick=function(){doSubmitTask(de,type)}
					$("task_btn").innerHTML="�� ��"
					$("task_btn").className="btnWhite"
				}else{
					$("task_btn").onclick=function(){}
					$("task_btn").innerHTML="�� ��"
					$("task_btn").className="btnGray"
				}
			}
		}
	//�ճ�������ȡ��ť
	//��ǰ�����б�û���г�ʱ��ʾ��ȡ�򲻿ɵ��
	if((type==2||type==3||type==4) && (typeof(curTaskDetail[de])!="object")){
		if(curTaskList[de]){
			//��������������
			if(curTaskList[de].ucTaskStat==0){
				//�ж��Ƿ��Ѵﵱ��������
				//�Ƿ��ǽ��� ���� �������������������Ĵ���
				if(todayIsEna(curTaskList[de].iLastFinishTime) && taskConfig[de].maxFinish==curTaskList[de].ucAccTimes){
					$("task_btn").onclick=function(){}
					$("task_btn").innerHTML="�� ��"
					$("task_btn").className="btnGray"			
				}else{			
					$("task_btn").onclick=function(){doGetthisTask(de,type)}
					$("task_btn").innerHTML="�� ȡ"
					$("task_btn").className="btnWhite"
				}
			}else if(curTaskList[de].ucTaskStat==2){
				$("task_btn").onclick=function(){doSubmitTask(de,type)}
				$("task_btn").innerHTML="�� ��"
				$("task_btn").className="btnWhite"		
			}else{
				$("task_btn").onclick=function(){}
				$("task_btn").innerHTML="�� ��"
				$("task_btn").className="btnGray"			
			}
		}else{
			//���û�����������
			$("task_btn").onclick=function(){doGetthisTask(de,type)}
			$("task_btn").innerHTML="�� ȡ"
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

//ִ���ύ����
function doSubmitTask(de,type){
	$("task_btn").onclick=function(){}
	$("task_btn").className="btnGray"
	objFlashEng.Send(getTaskFinish(de,deTypeAndId(0,type,de)))	
}
//ִ����ȡ����
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
//����ϵͳ
//�ɳ�����tab arrShow:������curTaskList
//ucTaskStat:0 δ��ȡ 1��ȡδ��� 2�����δ�ύ 3��������ύ
function TaskListShow1(taskid){
	SH("taskright")
	
	var tmpstr=""
	//���µ���list˳��1����ȡ 2����������
	var tmparrA=[] //
	var tmparrB=[]
	for(var i=1;i<taskConfig.length;i++){
		//��ȡ�ɳ�����
		if(taskConfig[i].type==1){
			//�ж��Ƿ���Э�鷵�������������붥��listΪ1��2��ʾ������������
			if(typeof(curTaskList[i]) != "undefined"){
				//��ʾ1����ȡ 2�����
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
	//����ʾδ���������
	//tmparrA = tmparrA.concat(tmparrB)
	for(var i=0;i<tmparrA.length;i++){
		tmpstr += "<li id='task_li"+ tmparrA[i] +"' onclick='taskdetail("+tmparrA[i]+",1)'>"+taskConfig[tmparrA[i]].name+"</li>"
	}
	
	
	if(tmpstr==""){tmpstr="����";HI("taskright")}
	$("nowtasklist").innerHTML=tmpstr
	$("nowtasktitle").innerHTML="����ƪ"
	//���Ҳ�򿪵�ǰ���ڽ���������
	//�����������ڽ���������û��ID��С���ص�bug
	var iMin=2000000 //��ʱ����taskid���ֵ	
	for(var i=0;i<curTaskDetail.length;i++){
		if(curTaskDetail[i].CTaskBriefData.ucType==1){
			if(curTaskDetail[i].iTaskID<iMin)iMin = curTaskDetail[i].iTaskID
		}
	}
	if(iMin!=2000000)taskdetail(iMin,1)
}
//�ճ�����tab
function TaskListShow2(taskid){
	SH("taskright")
	var tmpstr=""
	for(var i=1;i<taskConfig.length;i++){
		//��ȡ�ɳ�����
		if(taskConfig[i].type==2){
			tmpstr += "<li id='task_li"+ i +"' onclick='taskdetail("+i+",2)'>"+taskConfig[i].name+"</li>"
		}
	}
	if(tmpstr==""){tmpstr="����";HI("taskright")}
	$("nowtasklist").innerHTML=tmpstr
	$("nowtasktitle").innerHTML="�ճ������б�"

	//������ȡ����ǰtab�ı�bug
	if(typeof(taskid)!="undefined" && taskid>0){
		taskdetail(taskid,2);
	}else{
		//Ĭ�ϴ򿪵�һ���ճ�����
		taskdetail(32,2)	
	}
}
//��������tab
function TaskListShow3(taskid){
	SH("taskright")
	var tmpstr=""
	for(var i=1;i<taskConfig.length;i++){
		//��ȡ�ɳ�����
		if(taskConfig[i].type==3){
			tmpstr += "<li id='task_li"+ i +"' onclick='taskdetail("+i+",3)'>"+taskConfig[i].name+"</li>"
		}
	}
	if(tmpstr==""){tmpstr="����";HI("taskright")}
	$("nowtasklist").innerHTML=tmpstr
	$("nowtasktitle").innerHTML="���������б�"
	
	//������ȡ����ǰtab�ı�bug
	if(typeof(taskid)!="undefined" && taskid>0){
		taskdetail(taskid,3);
	}else{
		//Ĭ�ϴ򿪵�һ���ճ�����
		taskdetail(36,3)		
	}
}
//�����tab
function TaskListShow4(taskid){
	SH("taskright")
	var tmpstr=""
	for(var i=1;i<taskConfig.length;i++){
		//��ȡ�ɳ�����
		if(taskConfig[i].type==4){
			tmpstr += "<li id='task_li"+ i +"' onclick='taskdetail("+i+",4)'>"+taskConfig[i].name+"</li>"
		}
	}
	if(tmpstr==""){tmpstr="����";HI("taskright")}
	$("nowtasklist").innerHTML=tmpstr
	$("nowtasktitle").innerHTML="������б�"
	
	//������ȡ����ǰtab�ı�bug
	if(typeof(taskid)!="undefined" && taskid>0){
		taskdetail(taskid,4);
	}else{
		//Ĭ�ϴ򿪵�һ���ճ�����
		taskdetail(38,4)		
	}
}


function TaskAnalysisPrize(arr){
	var tmpTarget=""
	for(i=0;i<arr.length;i++){
		switch(prizeConfig[arr[i]].type){
			case 1://��Ǯ
				tmpTarget+="���:<img class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+"<br>"
				break;
			case 2://��Դ
				tmpTarget+="<img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+" <img class=\"ico_iron\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+" <img class=\"ico_stone\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+" <img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+prizeConfig[arr[i]].count+"<br>"
				break;
			case 3://����
				tmpTarget+="����:"+toMaterilName(prizeConfig[arr[i]].prizeID)+"��"+prizeConfig[arr[i]].count+"<br>"
				break;
			case 4://����
				tmpTarget+="����:"+getItemConfig(prizeConfig[arr[i]].prizeID).name+"��"+prizeConfig[arr[i]].count+"<br>"
				break;
			case 5://����
				tmpTarget+="����:"+prizeConfig[arr[i]].prizeID+"<br>"
				break;
			case 6://"Ӣ��
				tmpTarget+="Ӣ��:"+prizeConfig[arr[i]].prizeID+"<br>"
				break;
			case 100://�û�����
				if(prizeConfig[arr[i]].prizeID==1){
					tmpTarget+="����:"+prizeConfig[arr[i]].count+"<br>"
				}else if(prizeConfig[arr[i]].prizeID==2){
					tmpTarget+="���:"+prizeConfig[arr[i]].count+"<br>"
				}else if(prizeConfig[arr[i]].prizeID==4){
					tmpTarget+="����:"+prizeConfig[arr[i]].count+"<br>"
				}else if(prizeConfig[arr[i]].prizeID==6){
					tmpTarget+="�������:"+prizeConfig[arr[i]].count+"<br>"
				}
				break;
			case 101://�������
				tmpTarget+="�������:"+prizeConfig[arr[i]].count+"<br>"
				break;
		}
	}
	var r = ( tmpTarget=="") ? "��":tmpTarget.slice(0,tmpTarget.length-1)
	return r
}

//ѡ�����ύ��

function taskChoose(n){
	eval('var b=document.getElementsByName("que_'+n+'")')
	var answer=0
	for(var i=0;i<b.length;i++){
		if(b[i].checked==true)answer=Math.pow(2,i);
	}
	if(answer==0){
		msgbox("��ѡ��һ���𰸣�")
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
		msgbox("��ѡ��һ���𰸣�")
		return false
	}else{
		objFlashEng.Send(getTaskChoose(n,answer))			
	}
}
//1504�ύ��
function ShowTaskChoose(str){
	var T=eval('('+str+')');
	if(T.CResult!= null){
		msgbox("Error:"+T.CResult.iResultID+"<br><b>�ύѡ�����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(T.CResult.iResultID)+"!</span>")
		return false;
	}
	var taskid = T.CTMsgHead.llMsgAct
	//Ŀǰ�����������ѡ���⣬����type����Ϊ1
	objFlashEng.Send(getTaskFinish(taskid,deTypeAndId(0,1,taskid)))
}

/*
**    ==================================================================================================  
**     
**    Ӣ��ϵͳ
**    //����Ӣ�ۻ��߱��� cmd id :1605 //����Ӣ�ۻ��߱��� cmd id :1606
**    ==================================================================================================  
*/
//����Ӣ�ۻ��߱��� cmd id :1605 //����Ӣ�ۻ��߱��� cmd id :1606
function ShowActHeroTrea(str)
{
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
	}
	else if(typeof(obj.CAnsDropObject) != "undefined"){
		
			if(obj.CTMsgHead.shMsgID==1606){
				if(obj.CTMsgHead.llMsgAct==0){
					msgbox("����Ӣ�۳ɹ���")
					objFlashEng.Send(getTaskList(1601))
				}else if(obj.CTMsgHead.llMsgAct==1){
					msgbox("��������ɹ���")
					//������ʾ����ϳɽ���
					objFlashEng.Send(getTaskList(1603))
				}
			}
	}else if(typeof(obj.CAnsActiveObject) != "undefined"){
		if(obj.CTMsgHead.shMsgID==1605){
				if(obj.CTMsgHead.llMsgAct==0){
					msgbox("����Ӣ�۳ɹ���")
					objFlashEng.Send(getTaskList(1601))
				}else if(obj.CTMsgHead.llMsgAct==1){
					msgbox("�����ɹ���")
					//������ʾ����ϳɽ���
					objFlashEng.Send(getTaskList(1603))
					
				}
		}
	}
}
//1603��ȡ�����б�
function ShowHeroListTrea(str)
{
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>��ȡ����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		return false;
	}
	else{
		//����ACT�ж���div���Ǳ���ҳ��
		var heroid=obj.CTMsgHead.llMsgAct
		if(heroid>0){
			//Ӣ��ҳ�����1603��ʾװ�䱦��DIV
			var inHtm=""
			var m=obj.CAnsAllTrea.astTreaMsg;
			for(i=0;i<m.length;i++){
				//���������Ѿ�װ���λ��
				if(m[i].m_chStatus==1 && m[i].m_iHeroID==heroid){
					//��������Ч��
					var tmpEffect=""
					for(n=0;n<m[i].m_stPropertyArray.length;n++){
						tmpEffect += m[i].m_stPropertyArray[n].m_szName +":" +m[i].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
					}
					inHtm +='<div class="hero_maindiv_div">'
					inHtm +='<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'"/>'
					inHtm +='<div class="floatleft lineh17">'
					inHtm +=nameColor(m[i].chStar,m[i].szName)+' '+m[i].m_chRank+'��<br />'
					inHtm +='��Ҫ'+m[i].chNeedRank+'��'+m[i].chNeedStar+'������Ӣ��<br />'
					inHtm +='<span class="a_yellow imghand" onclick="objFlashEng.Send(GetTakeTrea(1609,'+heroid+','+m[i].m_iTreaID+'))">��װ��(���ж��)</span></div>'
					inHtm +='</div>'
				}				
			}
			if(inHtm=="")inHtm+='<div class="hero_maindiv_div"><br>��δװ��</div>'
			inHtm +='<img class="cb" src="/images/army_tabline.gif" width="554" height="9" />'
			inHtm +='<div class="cb" style="font-weight:bold;">���п�װ�����</div>'
			//�����г����еı���
			for(i=0;i<m.length;i++){
				if(m[i].m_chStatus==0){
					//��������Ч��
					var tmpEffect=""
					for(n=0;n<m[i].m_stPropertyArray.length;n++){
						tmpEffect += m[i].m_stPropertyArray[n].m_szName +":" +m[i].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
					}
					inHtm += '<div class="hero_maindiv_div">'
					inHtm += '<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'"/>'
					inHtm +='<div class="floatleft lineh17">'
					inHtm +=''+nameColor(m[i].chStar,m[i].szName)+' '+m[i].m_chRank+'��<br />'
					inHtm +='��Ҫ'+m[i].chNeedRank+'��'+m[i].chNeedStar+'������Ӣ��<br />'
					inHtm +='<span class="t_green imghand" onclick="objFlashEng.Send(GetTakeTrea(1607,'+heroid+','+m[i].m_iTreaID+'))">δװ��(���װ��)</span>		</div>'
					inHtm +='</div>'
				}
			}
			$("hero_maindiv_con").innerHTML = inHtm;
			SH('hero_maindiv');
			SH('maskbg')
		}else if(heroid==0){
			//�����ϳɱ���ҳ��
			ShowTreaList(obj.CAnsAllTrea.astTreaMsg,obj.CAnsAllTrea.iStorage)
		}else if(heroid==-10){
			//����������ҳ��
	   	 	document.frames["marketdiv"].ShowMarketTreaList(obj.CAnsAllTrea.astTreaMsg)
		} 
	}
}
//���ݱ����Ǽ��������ͬ��ɫ����
function nameColor(r,n){
	//�ж��Ǽ���ʾ������ɫ
	var arrNameColor=["","","t_lv","t_blue","t_zi","t_juhuang"]
	return "<span class='"+arrNameColor[r]+"'>"+n+"<\/span>"
}
//1609ж�±��1607���ϱ���
function ShowTakeTrea(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
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
//1604����Ӣ��
function ShowHeroUpGrade(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>����Ӣ��ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
	}
	else
	{
		msgbox("Ӣ������ <span class='t_red'>�ɹ���</span>");
		objFlashEng.Send(getTaskList(1601))
	}
}

//���������
function errMsg(id){
	if(eval("errMsgs.e"+id) != null){
		return eval("errMsgs.e"+id)
	}else{
		return "δ֪����"
	}
}


//������ص��������click��������
function ResChangeCheckAndClick(iData1,iData2,iData3,clickFuncStr,divName)
{
	if(!checkNumber(iData1) || !checkNumber(iData2) || !checkNumber(iData3))
	{
		msgbox("��������ڻ����0������");
		return;
	}
	if(parseInt(iData1,10)>=0 && parseInt(iData2,10)>=0 &&parseInt(iData3,10)>=0)
	{
		eval(clickFuncStr);
		HI(divName);
		HI('maskbg');
		return;
		
	}
	msgbox("��������ڻ����0������");
}
//���߹�����
function itemValueCheckAndClick(iData,clickFuncStr,divName)
{
	if(!checkNumber(iData))
	{
		msgbox("������������");
		return;
	}
	if(parseInt(iData,10)>=0)
	{	
		eval(clickFuncStr);
		HI(divName);
		HI('maskbg');
		return;
		
	}
	msgbox("������������");
}

//check ������Դ����
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
		msgbox("������������");
		return;
	}
	if(parseInt(iBuyCounts,10)>=0)
	{
		
		eval(clickFuncStr);
		HI(divName);
		HI('maskbg');
		return;
		
	}
	
	msgbox("������������");
}

//check Ǩ�Ƿ��������
function ChangeCityUseCheckAndClick(clickFuncStr,divName)
{
	if(!checkNumber($("use_move_x").value) || !checkNumber($("use_move_y").value))
	{
		msgbox("������Ϸ�����");
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
	msgbox("������Ϸ�����");
}


function   ap ( obj ) { 
    // �����������е��������ƺ�ֵ 
    var   props = "" ; 
    // ��ʼ���� 
    for ( var   p in obj ){   
        // ���� 
        if ( typeof ( obj [ p ]) == " function " ){   
            obj [ p ]() ; 
        } else {   
            // p Ϊ�������ƣ�obj[p]Ϊ��Ӧ���Ե�ֵ 
            props += p + " = " + obj [ p ] + " \t " ; 
        }   
    }   
    // �����ʾ���е����� 
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



//����������뷢�ͼ���Ӧ����1209
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
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>��ȡʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	if(obj.CTMsgHead.llMsgAct==2){
		msgbox("������Ӧ�ɹ����Ѽ���ü��塣")
		curLeagueID=obj.CAnsRespondInv.iSeptID
	}else if(obj.CTMsgHead.llMsgAct==3){	
		msgbox("������Ӧ�ɹ����Ѿܾ��ü�������롣")
	}
}

//���幺�����ƽ���tab�л�
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

//�������ƹ���
function useSeptCountAll(){
	var a=parseInt($("use_sept_buy1").value,10) || 0
	var b=parseInt($("use_sept_buy2").value,10) || 0
	var c=parseInt($("use_sept_buy3").value,10) || 0
	$("use_sept_countall").innerHTML = a*1+b*1+c*3
}
//���͹���Э��
function doUseBuySeptOrder(){
	var a=parseInt($("use_sept_buy1").value,10)
	var b=parseInt($("use_sept_buy2").value,10)
	var c=parseInt($("use_sept_buy3").value,10)
	if(!isNumber(a) ||!isNumber(b) ||!isNumber(c)){
		msgbox("��������ȷ�Ĺ���������")	
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
//�򿪹������
function showBuySeptDiv(){
	useSeptTab(0)
	SH("maskbg")
	SH("use_septorder")
}
//��ʹ�ý���
function showUseSeptDiv(){
	useSeptTab(1)
	SH("maskbg")
	SH("use_septorder")
}

//��ʹ�ý����ȡ1026��Ϣ
function ShowSeptClassInfo(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>��ȡʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	var o=obj.AnsUserPeerInfo
	//�Ծ������ƽ����ʼ��
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
//��������1414
function doUseSeptOrder(){	
	var a=parseInt($("use_sept_use1").value,10)
	var b=parseInt($("use_sept_use2").value,10)
	var c=parseInt($("use_sept_use3").value,10)
	if(!isNumber(a) ||!isNumber(b) ||!isNumber(c)){
		msgbox("��������ȷ��������")	
	}else{		
		//�ų�Ϊ�����
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
//����������Ӧ
function ShowSeptUseOrderOk(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>��������ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	//������ȷ����Ӧ
	var strMsg=""
	var I=obj.CAnsEndowMoreItem
		
	strMsg+="�����������!<br>"
	strMsg+="<font class=t_tips_yellow>"
	strMsg+="���ֵ���ӣ�"+I.iAddCulture+"<br>"
	strMsg+="����ֵ���ӣ�"+I.iAddForce+"<br>"
	strMsg+="����������ӣ�"+I.iAddSeptScore
	strMsg+="</font>"	
	
	msgbox(strMsg)
	//��ȡ�û����е���
	objFlashEng.Send(GetUserItems());	
	//��ȡ�û���ȯ
	objFlashEng.Send(GetUserCoin())	
	//���¼��弼��
	top.objFlashEng.Send(top.GetSeptQuit(1225,top.curLeagueID))
	HI("maskbg")
	HI("use_septorder")	
}




/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� ����ϵͳ
**    ʾ���� 
**    ==================================================================================================  
*/
//����send 1781
function doChatSend(){
	var str=$("chat_inputtxt").value
	if(isGoodWord(str)){
		if(chGetLength(str)<=150){
			objFlashEng.Send(GetChatSend(str))	
			$("chat_inputtxt").value=""
		}else{
			msgbox("�벻Ҫ����50�����֣�")
		}
	}else{
		msgbox("�벻Ҫ������Ӣ�ļ�������������ַ���")
	}
}
//�س�����
function doSendEnter(evt){	
	if (evt.keyCode == 13){ 
	
		doChatSend()
	} 
}
//���Ĭ����ʾ
function chatClearTxt(){
	if($("chat_inputtxt").value=="���һ�η���50������")$("chat_inputtxt").value=""
}
//���ʹ�����
function ShowChatSend(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		if(obj.CResult.iResultID==1780003)
		{
			msgboxyesno("<br><b>ʧ�ܣ�</b><span class='t_tips_yellow'>"+"С������������,���ȷ������С����");
			msgboxFunc="doIndexBuyChat()";
			return false;
		}
		if(obj.CResult.iResultID!=1780001){
			msgbox("Error:"+obj.CResult.iResultID+"<br><b>ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
			return false;
		}
	}
	//��ȡ�û����е��ߣ�����С����
	objFlashEng.Send(GetUserItems());	
}

//�յ���Ϣ���� 1780
function ShowChatGet(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	var o=obj.CAnsChatMsg.astMsg
	for(var i=0;i<o.length;i++){
		switch(o[i].m_ucMsgType){
			case 1:
				//�û���Ϣ
				//7.4���ӵ���û����鿴��Ϣ
				if(o[i].m_iSender!=Uin)arrChat.push("<div style='color:#dadada'><span style='text-decoration:underline;font-family:\"Arial, Helvetica, sans-serif\";' class='imghand' onclick = 'GetOtherPlayerInfo("+o[i].m_iSender+")'>"+o[i].m_szSendName+"</span>:<span style='color:#33ccff'>"+o[i].m_szChatMsg+"</span></div>")
				break;
			case 2:
				//ϵͳ��Ϣ
				//arrChat.push("<div style='color:#ff3300'>ϵͳ��Ϣ:"+o[i].m_szChatMsg+"</div>")
				//7.2�޸�����ϵͳ��Ϣ������ʾ
				arrChatSysMsg.push("<div style='color:#ff3300'><b>ϵͳ</b>:"+o[i].m_szChatMsg+"</div>")
				
				break;
			case 3:
				//�û��Լ����͵���Ϣ
				arrChat.unshift("<div style='color:#dadada'>"+o[i].m_szSendName+":<span style='color:#33ccff'>"+o[i].m_szChatMsg+"</span></div>")
				break;
			case 4:
				//ϵͳ������ʾ
				arrChat.push("<div style='color:#ff9900'>"+o[i].m_szChatMsg+"</div>")		
				break;
			case 5:
				//��������
				arrChat.push("<div style='color:#33cc00'>��������:"+o[i].m_szChatMsg+"</div>")				
				break;
			case 6:
				//������
				arrChat.push("<div>"+o[i].m_szChatMsg+"</div>")				
				break;
		}
		
	}
	//������ʾ������������
	ShowChatContent();
}
//��������������ݣ�д����������DIV
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
//��ʾϵͳ��Ϣ���飬д������򶥲�
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
//����������С
function doChatReSize(){
	if($("chat_inputresize").value == "��"){
		//��������߶�
		$("chatDivMain").style.height ="366px"
		$("chatDivBg").style.height ="366px"
		$("chat_mainlist").style.height ="320px"
		
		//�������ϱ߾����
		$("chatDivMain").style.marginTop ="80px"
		$("chatDivBg").style.marginTop ="82px"	
		
		$("chat_inputresize").value="С"
	}else{
		//��������߶�
		$("chatDivMain").style.height ="166px"
		$("chatDivBg").style.height ="166px"
		$("chat_mainlist").style.height ="120px"
		
		//�������ϱ߾����
		$("chatDivMain").style.marginTop ="280px"
		$("chatDivBg").style.marginTop ="282px"		
		
		$("chat_inputresize").value="��"
		
	}
}




//maildiv��func
//�Ż���Ч��
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

//'����'��ť����Ӧ����
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


//�ֳ�list��ʾ�Ż�
function TsHideAllCity(){
	var tHeight=document.getElementById("subCity").getElementsByTagName("div").length*23;
	if(event.clientX<270 || event.clientX>390 || event.clientY>(tHeight+24)){
		HI('AllCity')
	}
}
//�����˳���Ϸ
function CloseWin() //����ʾ�Ƿ�ر������    
{    /*
	window.opener=null;     
	window.open("","_self");    
	window.close();   */ 
	chLogout("index.html")
}  
// �˳���¼
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
//�¿����ں���
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
**    ������ 
**    ���ܣ� �ǳظ���
**    ʾ���� 
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
//���ʹ����� 1027
function ShowChCityName(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	msgbox("��ǰ�ǳظ����ɹ���")
	HI("chNameDiv")
	$("init_szCityName").innerHTML=$("chNameDiv_hide").value
}




/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� �������
**    ʾ���� 
**    ==================================================================================================  
*/
	
//���ʹ����� 1029
function ShowMyInfomation(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	var p=obj.CAnsGetUserAllInfo.CPlayerInfo
	
	$("myInfo_iPlayerNationID").style.display = "inline";
	$("other_playernation").style.display = "none";
	$("upwen_span").style.display = "inline";
	$("upwu_span").style.display = "inline";
	
	
	//������Ϣ
	$("myInfo_ucHeadPic").src = "/images/player/player_"+p.iUserHead+".jpg"
	$("myInfo_szUserNick").innerHTML=p.szUserNick
	$("myInfo_iPlayerNationID").innerHTML=ToNation(p.iPlayerNationID)
	$("myInfo_szSeptName").innerHTML=(p.szSeptName=="")?"����":p.szSeptName
	$("myInfo_chLeagueRank").innerHTML=(p.chLeagueRank==0)?"��ͨ":((p.chLeagueRank==1)?"���峤":"�峤")
	$("myInfo_iUserRank").innerHTML=p.iUserRank
	$("myInfo_iUserPoint").innerHTML=p.iUserPoint
	//�������
	$("myInfo_wen").innerHTML=p.iCulturePoint+"��"+p.iCulture+"����"
	$("myInfo_wentitle").innerHTML=ToUserRank(3,p.iCulture).UserTitle
	$("myInfo_wenattr").innerHTML="+"+(ToUserRank(3,p.iCulture).usAttrValue/10)+"%"
	$("myInfo_wu").innerHTML=p.iForcePoint+"��"+p.iForce+"����"
	$("myInfo_wutitle").innerHTML=ToUserRank(2,p.iForce).UserTitle
	$("myInfo_wuattr").innerHTML="+"+(ToUserRank(2,p.iForce).usAttrValue/10)+"%"	
	//�ǳ��б�
	var tmpHtml=""
	for(var i=0;i<p.astSubCity.length;i++){
		tmpHtml+="<li><span>"+p.astSubCity[i].szCityName+"</span>"
		tmpHtml+='<a class="a_lightgreen" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+p.astSubCity[i].iCityGrid+'));HI(\'myInfomation\');HI(\'maskbg\')">('+ToXY(p.astSubCity[i].iCityGrid)+')</a></li>'
	}
	$("myInfo_right_ullist").innerHTML = tmpHtml
	
	//����mailicon
	HI("myInfo_mail")
	//��ʾ����
	HI("myInfo_leftrank")
	
	//ie6bug
	hideSelect('hidden');
	
	//��ʾ��������
	SH('myInfomation');
	SH('maskbg')
}


/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ� �����������
**    ʾ���� 
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
//���� 1028
function ShowOtherPlayerInfo(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
		return false;
	}
	var p=obj.CAnsGetUserInfo.CPlayerSum
	//������Ϣ
	$("myInfo_ucHeadPic").src = "/images/player/player_"+p.iUserHead+".jpg"
	$("myInfo_szUserNick").innerHTML=p.szNick
	$("myInfo_iPlayerNationID").innerHTML=ToNation(p.iPlayerNationID)
	$("myInfo_szSeptName").innerHTML=(p.szSeptName=="")?"����":p.szSeptName
	$("myInfo_chLeagueRank").innerHTML=""
	$("myInfo_iUserRank").innerHTML=p.iUserRank
	$("myInfo_iUserPoint").innerHTML=p.iUserPoint
	//�������
	$("myInfo_wen").innerHTML="��"+p.iCulture+"����"
	$("myInfo_wentitle").innerHTML=ToUserRank(3,p.iCulture).UserTitle
	$("myInfo_wenattr").innerHTML="+"+(ToUserRank(3,p.iCulture).usAttrValue/10)+"%"
	$("myInfo_wu").innerHTML="��"+p.iForce+"����"
	$("myInfo_wutitle").innerHTML=ToUserRank(2,p.iForce).UserTitle
	$("myInfo_wuattr").innerHTML="+"+(ToUserRank(2,p.iForce).usAttrValue/10)+"%"	
	//�ǳ��б�
	var tmpHtml=""
	tmpHtml+="<li><span>����:"+p.CSubCity.szCityName+"</span>"
	tmpHtml+='<a class="a_lightgreen" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+p.CSubCity.iCityGrid+'));HI(\'myInfomation\');HI(\'maskbg\')">('+ToXY(p.CSubCity.iCityGrid)+')</a></li>'
	
	$("myInfo_right_ullist").innerHTML = tmpHtml
	//��ʾmailicon
	SH("myInfo_mail")
	$("myInfo_mail").onclick=function(){
									gotoSendMail(p.szNick)
									HI('myInfomation');
									HI('maskbg')
	}
	//��������
	HI("myInfo_leftrank")
	//��ʾ��������
	SH('myInfomation');
	
	$("other_playernation").style.display = "inline";
	$("myInfo_iPlayerNationID").style.display = "none";
	$("upwen_span").style.display = "none";
	$("upwu_span").style.display = "none";
	$("other_playernation").innerHTML=ToNation(p.iPlayerNationID);

	
	SH('maskbg')
}

//���������ӷ��Ű�ť
function mailThisName(iUin,szNick){
	if(iUin!=0){
		var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+szNick+'\')"/>';
		return '<span class="imghand" onclick = "top.GetOtherPlayerInfo('+iUin+')">'+szNick+'</span>'+shtml;
	}else{
		var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+szNick+'\')"/>';
		return szNick+shtml;
	}
}

//���ּ��
function checkName(username)
{
	var reg = /^(\w|[^\x00-\xff])*$/; 
	if(arr=username.match(reg)) 
	{ 
		if(chChineseLength(username)>14)
		{
			msgbox("�벻Ҫ����7�����֣�");
			return false;
		} 
	} 
	else 
	{ 
		msgbox("����ֻ����ΪӢ�ģ����֣��»��ߺͺ��ֵĻ��,�Ҳ��ܳ���7������");
		return false; 
	} 
	
	return true;
}



