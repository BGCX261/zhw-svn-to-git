// JavaScript Document

//获取某种类型的配置列表
function GetItemByClass(iClass,iSubClass)
{
	var curItems=[];
	var iIndex = 0;
	for(var i=0;i<itemConfig.configs.length;i++)
	{
		if(itemConfig.configs[i].fclass == iClass 
			&&itemConfig.configs[i].subClass == iSubClass)
		{
			curItems[iIndex] = new item;
			curItems[iIndex].itemID = itemConfig.configs[i].itemID;
			curItems[iIndex].name = itemConfig.configs[i].name;
			curItems[iIndex].note = itemConfig.configs[i].note;
			curItems[iIndex].useNote = itemConfig.configs[i].useNote;
			curItems[iIndex].price = itemConfig.configs[i].price;
			curItems[iIndex].vipPrice = itemConfig.configs[i].vipPrice;
			curItems[iIndex].effectType = itemConfig.configs[i].effectType;
			curItems[iIndex].fclass = itemConfig.configs[i].fclass;
			curItems[iIndex].subClass = itemConfig.configs[i].subClass;
			curItems[iIndex].online = itemConfig.configs[i].online;
			curItems[iIndex].canExchange = itemConfig.configs[i].canExchange;
			curItems[iIndex].kind = itemConfig.configs[i].kind;
			curItems[iIndex].count = 0;
			iIndex++;
		}
	}
	return curItems;
}
//获取道具的下标
function getItemsIndex(iItemID,sArray)
{
	for(var i=0;i<sArray.length;i++)
	{
		if(sArray[i].CItem.iItemID == iItemID)
			return i;
	}
	return -1;
}
//购买处理函数
function BuyItemClick(iItemID)
{
	//alert("buy item" + iItemID);
	$("maskbg").style.display="none";
	$("multiitem_div").style.display="none";
	objFlashEng.Send(GetBuyItem(iItemID,1,1));
}
//多选择的情景使用
function SendItemUseReq(iItemID)
{
	var aItem= getItemConfig(iItemID);
	var iType = $("multiitem_divPara").value;
	//alert("city id"+CityID+" item id " + iItemID + "iType"+iType);
	if(aItem!=0)
	{
		if(aItem.fclass == 1 && aItem.subClass == 1)
		{
			objFlashEng.Send(GetSpeedBuildingItem(iType,CityID,iItemID,3));
		}
		else if(aItem.fclass == 1 && aItem.subClass == 3)
		{
			objFlashEng.Send(GetSpeedArmyItem(iType,CityID,iItemID,3));
		}
		else if(aItem.fclass == 2 && aItem.subClass == 3)
		{
			if(aItem.effectType == 0)
				objFlashEng.Send(GetBufferItem(CityID,iItemID,false,3));
		}
		else if(aItem.fclass == 3 && aItem.subClass == 10)
		{
			objFlashEng.Send(GetFoodItem(iItemID,iType,3));
		}
	}
}
//通用使用道具处理
function UseItemClick(iItemID)
{
	$("maskbg").style.display="none";
	$("multiitem_div").style.display="none";
	SendItemUseReq(iItemID);
	
}


//初始化用户数据项
function initNeedItems(iClass,iSubclass,sUserItemsData)
{
	var curItems=GetItemByClass(iClass,iSubclass);

	for(var i=0;i<curItems.length;i++)
	{
		//alert(itemsdataObject[i].iItemID);
		var iIndex = getItemsIndex(curItems[i].itemID,sUserItemsData);
		if(iIndex>=0)
		{
		
			curItems[i].count = sUserItemsData[iIndex].CItem.iItemCount;
			curItems[i].endTime = getDateStr(sUserItemsData[iIndex].CItem.iUseExpireTime);
			
		}
	}
	return curItems;

}


//获取item的所有输出数据
function GeneListTDInnerHtml(iClass,iSubClass,sUserItemsData,tableObj,iPara2)
{
	var curItems = initNeedItems(iClass,iSubClass,sUserItemsData);
	var sHtml="";
	
	var iStartPos = 0;
	var iEndPos = curItems.length;
	var curLineNum = 0;
	var LineCount = 1;
	var  tableRow = tableObj.insertRow(-1);
	
	//显示非赠品道具,普通口粮道具在效果15下不显示
	for(var i=iStartPos;i<iEndPos;i++)
	{
			//是否赠品
			if(curItems[i].kind != 5)
			{
				//是否非卖品，非卖品数目为零不显示，不让购买，不为0可以使用
				if( (curItems[i].kind !=4) || (curItems[i].kind == 4 && curItems[i].count > 0 ))
				{
					//判断是否效果15下的普通口粮
					if(iPara2 == 15 && curItems[i].itemID == 49)
					{
					}
					else
					{
						if(curLineNum == 3)
						{
							tableRow = tableObj.insertRow(-1);
							sHtml = "";
							curLineNum = 0;
							LineCount++;
		
						}
						addMuitChooseItem(tableRow,curItems[i]);
						curLineNum++;
					}
				}
			}
			
	}
	
	return LineCount;
	
}

//多选择情景使用界面
function addMuitChooseItem(tableRow,curItem)
{
	var UseTD;
	var InfoTD;
	//赠品数量
	var RelatedID = getRelatedItemID(curItem.itemID);
	var iRelatedCount = getItemCount(RelatedID);
	var iTotal = curItem.count+iRelatedCount;

	var sClinkHtml = '<div id="buy_item_a1" onclick=" '
					+'UseItemClick('+curItem.itemID+')" class="btnWhite floatleft">点击使用</div>';
		if(iTotal==0)
		{
			sClinkHtml = '<div id="buy_item_a1" onclick=" '
			+'BuyItemClick('+curItem.itemID+')" class="btnRed floatleft">点击购买</div>';
		}
		else if(iRelatedCount > 0)
		{
			sClinkHtml = '<div id="buy_item_a1" onclick=" '
			+'UseItemClick('+RelatedID+')" class="btnWhite floatleft">点击使用</div>';
		}
		sHtml = '<img id="use_speedup_pic1" hint="';
		sHtml = sHtml+curItem.note+'" src="images/item/item'+getItemPicID(curItem)+'.gif" style=" margin-bottom:5px;" class="border_hui" /><br />'+
					sClinkHtml;
		//alert(sHtml);
		UseTD = document.createElement('td');
		UseTD.width = 73;
		UseTD.height = 96;
		UseTD.align = "center";
		UseTD.innerHTML = sHtml;
		
		InfoTD = document.createElement('td');
		InfoTD.width = 95;
		InfoTD.align = "left";
		
		sHtml = '<p><strong>'+curItem.name+'</strong><br />'+
					'价格：<span id="use_price1">'+curItem.price+'</span><br />'+
					'vip价格：<span id="use_vipprice1">'+curItem.vipPrice+'</span><br />'+
					'现有数量：<span id="use_count1" class="t_bai">'+iTotal+'</span>个<br /></p>';
		if(curItem.kind == 4)
		{
			sHtml = '<p><strong>'+curItem.name+'</strong><br />'+
					'价格：<span id="use_price1">-</span><br />'+
					'vip价格：<span id="use_vipprice1">-</span><br />'+
					'现有数量：<span id="use_count1" class="t_bai">'+iTotal+'</span>个<br /></p>';
		}
		InfoTD.innerHTML = sHtml;
		tableRow.appendChild(UseTD);
		tableRow.appendChild(InfoTD);
}


function getItemPicID(curItem)
{
	if(curItem.kind == 5 && curItem.itemID > 100)
	{
		return curItem.itemID-100;
	}
	else
		return curItem.itemID;
}


function initMutiItemChoose(iClass,iSubClass,iPara,iPara2)
{
	$("multiitem_divPara").value = iPara;
	for(var i=$("multiitem_choose").rows.length-1;i>=0;i--) 
	{ 
		$("multiitem_choose").deleteRow(i); 
	}
	var iLineCount = GeneListTDInnerHtml(iClass,iSubClass,top.arrUserItem,$("multiitem_choose"),iPara2);
	$("multiitem_div").style.height = iLineCount*115;
	
}


function getDateStr(iTime)
{
	var pData = new Date();
	pData.setTime(iTime*1000);
	var mon = pData.getMonth()+1;
	var monstr;
	var date = pData.getDate();
	var datestr = date;
	var year = pData.getYear();
	if(mon<9)
		monstr = "0" + mon;
	if(date<9)
		datestr = "0"+date;
	//year = year+1900;
	var timeStr = year+"-"+monstr+"-"
				  +datestr+" "+pData.getHours()+":"+pData.getMinutes()+":"+pData.getSeconds();
	return timeStr;

}

function isNeedBuyLimit(iItemID)
{
	if(iItemID == 45 || iItemID == 46
	   ||iItemID == 47 || iItemID == 48 )
	{
			return true;
	}
	return false;
}

//更新用户的道具数目和限制
function updateObjecData(iItemID,iNum,iLeftCount,iFlag,iBuyFlag)
{
	var i=0;
	for(i=0;i<top.arrUserItem.length;i++)
	{
		if(top.arrUserItem[i].CItem.iItemID == iItemID)
		{
			top.arrUserItem[i].CItem.iItemCount=iNum;
			//购买限制
			if(isNeedBuyLimit(iItemID) && iBuyFlag)
			{
				//alert("item id "+iItemID+"index"+i+"num"+iNum);
				top.arrUserItem[i].iLeftUseCount = iLeftCount;
			}
			//使用限制 
			else if(!iBuyFlag)
				top.arrUserItem[i].iLeftUseCount = iLeftCount; 
		
			break;
		}
		
	}
	
	if(iFlag == 2)
	{
		document.frames["shopdiv"].onDataChange();
	}
}

function updateCoinData(iNum,iFlag)
{
	top.arrUserQuan = iNum;
	if(document.frames["shopdiv"].disPlayMyCoin!=null)
		document.frames["shopdiv"].disPlayMyCoin(iNum);
	
}


function getItemConfig(itemID)
{
	for(var j=0;j<itemConfig.configs.length;j++)
	{
		if(itemConfig.configs[j].itemID ==itemID)
			return itemConfig.configs[j];
	}
	return 0;
}

function getItemCount(itemID)
{
	for(var i=0;i<top.arrUserItem.length;i++)
	{
		var itemdataObject = top.arrUserItem[i].CItem;
		if(itemdataObject.iItemID == itemID)
		{
			return itemdataObject.iItemCount;
		}
	}
	return 0;
}
//for quick use
function itemUserProcess(itemID)
{
	var itemConfig = getItemConfig(itemID);

	if(itemConfig == 0)
	{
		return 0;
	}
	else
	{
		if(itemConfig.fclass == 1)
		{
			
		}
		switch(parseInt(itemID))
		{
			
			////改国籍
			
			case 19:
				top.ShowChangeNation();
				break;

			//迁城符
			case 18:
				top.ShowUseMove();
				break;
			//随机卷轴
			case 34:
				top.ShowUseMoveRandom();
				break;
			case 50:
			case 51:
			case 52:
				top.showUseSeptDiv();
				break;

			default :
				top.ShowUseDiv(itemConfig.itemID,itemConfig.name,itemConfig.note);
				break;
				
		}
	}
}

function getItemUserProcessName(aItem)
{
	var sName="";
	//所有加速道具不允许在仓库使用
	if(aItem.fclass == 1)
	{
		return sName;
	}
	var itemID = aItem.itemID;
	if(aItem.itemID > 100)
		itemID = getRelatedItemID(aItem.itemID);
	switch(itemID)
	{
		////改国籍
		
		case 19 :
			sName = "top.ShowChangeNation()";
			break;
		//迁城符
		
		case 18:
			sName = "top.ShowUseMove()";
			break;
		//随机卷轴
		
		case 34:
			sName = "top.ShowUseMoveRandom()";
			break;
		case 50:
		case 51:
		case 52:
			sName = "top.showUseSeptDiv()";
			break;
		default :
			sName = "top.ShowUseDiv("+aItem.itemID+",'"+aItem.name+
					"','"+aItem.note+"')";
			break;
			
	}
	return sName;
}

//获取当前道具
function getCurItems()
{
	var Index =0;
	var inerCurItems=[];
	
	for(var i=0;i<top.arrUserItem.length;i++)
	{
		var itemdataObject = top.arrUserItem[i].CItem;
		//alert(itemsdataObject[i].iItemID);
		if(itemClass == 0 || checkItemClass(itemClass,itemdataObject))
		{
			if(itemdataObject.iItemCount>0)
			{
				inerCurItems[Index] = new item();
				inerCurItems[Index].itemID = itemdataObject.iItemID;
				inerCurItems[Index].count = itemdataObject.iItemCount;
				inerCurItems[Index].endTime = getDateStr(itemdataObject.iUseExpireTime);
				Index++;
			}
		}
	}
	
	
	for(var i=0;i<inerCurItems.length;i++)
	{
		var aitem = getItemConfig(inerCurItems[i].itemID);
		if(aitem!=0)
		{
			inerCurItems[i].name = aitem.name;
			inerCurItems[i].note = aitem.note;
			inerCurItems[i].useNote = aitem.useNote;
			inerCurItems[i].fclass = aitem.fclass;
			inerCurItems[i].effectType = aitem.effectType;
			inerCurItems[i].subClass = aitem.subClass;
			inerCurItems[i].kind = aitem.kind;
		}
		
	}
	return inerCurItems;
}

function getItemLeftUseCount(iItemID)
{
	for(i=0;i<top.arrUserItem.length;i++)
	{
		if(top.arrUserItem[i].CItem.iItemID == iItemID)
			return top.arrUserItem[i].iLeftUseCount;
	}
	return -1;
} 





/*
**    ==================================================================================================  
**    类名： 
**    功能： 显示商城相关使用、购买DIV
**    示例： 
**    ==================================================================================================  
*/
//通用购买层
function ShowBuyDiv(itemid,itemname,price,vipprice,date,itemstr){
	$("shop_itemname").innerHTML=itemname;
	$("shop_price").innerHTML=price;
	$("shop_vipprice").innerHTML=vipprice;
	$("shop_date").innerHTML=formattime(date).toString().replace("00:00:00","");
	$("shop_itemstr").innerHTML=itemstr;
	$("shop_itemid").value = itemid;
	$("shop_pic").src = "/images/item/item"+itemid+".gif";
	
	$("maskbg").style.display="block";
	$("shopitembox").style.display="block";
	
}
function shopChangeCount(){
	var intCount = $("shop_buycount").value;
	if(isPlusNumber(intCount))
	{
		$("shop_allprice").innerHTML=$("shop_price").innerHTML*intCount;
		$("shop_vipallprice").innerHTML=$("shop_vipprice").innerHTML*intCount;
	}
	else
	{
		$("shop_allprice").innerHTML=0;
		$("shop_vipallprice").innerHTML=0;
	}
	
}
function shopClickFunc(){
	//购买一般资源
	if($("shop_itemid").value!= 55)
		objFlashEng.Send(GetBuyItem($("shop_itemid").value,$("shop_buycount").value,0));
	//购买金元宝
	else
		objFlashEng.Send(GetBuyGold($("shop_itemid").value,$("shop_buycount").value));
}



//通用使用层
function ShowUseDiv(itemid,itemname,itemstr){
	$("shop_use_itemname").innerHTML=itemname;
	$("shop_use_itemstr").innerHTML=itemstr;
	$("shop_use_itemid").value = itemid;
	$("shopusebox_pic").src = "/images/item/item"+itemid+".gif";
	
	$("maskbg").style.display="block";
	$("shopusebox").style.display="block";
	
}
function shopUseFunc(){
	var  iItemID = $("shop_use_itemid").value ;
	var  aItem = getItemConfig(iItemID);
	if(aItem!=0)
	{
		if(iItemID == 53)
		{
			if(curLeagueID != 0)
				objFlashEng.Send(GetUseSeptItem(iItemID,curLeagueID));
			else
				msgbox("你没有加入家族，不能使用家族令牌！");
		}
		if(aItem.effectType == 0)
		{
			//alert("etype 0 item use");
			objFlashEng.Send(GetBufferItem(CityID,iItemID,0,2));
		}
		else if(aItem.effectType == 9)
		{
				//alert("etype 0 item use");
				objFlashEng.Send(GetTributaryItem(CityID,iItemID,2));
		}
		
	}
}





//随机迁城符
function ShowUseMoveRandom(){	
	showCitySelect("use_moverandom_select");
	$("maskbg").style.display="block";
	$("use_moverandom").style.display="block";
	$("use_moverandom_select").style.visibility = "visible";
}
function UseMoveRandom(){
	//alert($("use_moverandom_select").value)
	objFlashEng.Send(GetMoveCityItem($("use_moverandom_select").value,0,34,2))
}



//迁城符
function ShowUseMove(){
	showCitySelect("use_move_select")
	
	$("maskbg").style.display="block";
	$("use_move").style.display="block";
	$("use_move_select").style.visibility = "visible";
}
function UseMove(){

	var x = parseInt($("use_move_x").value,10)*1000;
	var y = parseInt($("use_move_y").value,10);
	var gridid = x+y;
	//alert(posValue);
	objFlashEng.Send(GetMoveCityItem($("use_move_select").value,gridid,18,2))
}
function UseMoveCheck(){
	//协议暂无
	var x = parseInt($("use_move_x").value,10)*1000;
	var y = parseInt($("use_move_y").value,10);
	var gridid = x+y;
	objFlashEng.Send(GetIsSpace(gridid))
}
function ShowMoveCheck(str){
	//协议暂无
	var T=eval('('+str+')');
	if(T.CAnsTestGrid.CResult.iResultID != 0){
		msgbox("获取城市信息 <b>失败</b>!<br>error code:"+T.CAnsTestGrid.CResult.iResultID+"<br>error info:"+T.CAnsTestGrid.CResult.szResultMsg)	
		return false;
	}
	if(T.CAnsTestGrid.iIsSpace == 1){
		$("use_move_errstr").innerHTML = "可以迁移到该坐标！"
	}else{
	 	$("use_move_errstr").innerHTML = "该地点已被占用，请另选坐标！"
	}
}



//改国籍
function ShowChangeNation(){
	$("use_change_nationname").innerHTML=ToNation(curNationID);
	
	$("maskbg").style.display="block";
	$("use_changenation").style.display="block";
	$("use_changenation_id").style.visibility = "visible";
}
function UseChangeNation(){
	//alert($("use_changenation_id").value)	
	objFlashEng.Send(GetChangeItem($("use_changenation_id").value,19,2))	
}



//资源转换
function ShowChangeSource(){
	//根据仓库等级获取最大容量信息
	maxLoad = (arrCityBuildRank[5]-1)<0 ? 10000 : $("init_iStoneMax").innerHTML;
	$("use_changesource_c1").innerHTML=maxLoad;
	$("use_changesource_c2").innerHTML=maxLoad;
	$("use_changesource_c3").innerHTML=maxLoad;	
	$("use_changesource_s1").value = 0;
	$("use_changesource_s2").value = 0;
	$("use_changesource_s3").value = 0;
	$("use_changesource_max").innerHTML=maxLoad;	
	//根据当前粮食存量计算可分配资源
	nowLoad = nWood + nIron + nStone;
	$("use_changesource_now").innerHTML=nowLoad;
	$("use_changesource_old").innerHTML=nowLoad;		
	//显示当前城市
	$("use_changesource_cityname").innerHTML=CityID;
	$("use_changesource_price").innerHTML= 20; //这里需要获取当前价格信息
	
	$("maskbg").style.display="block";
	$("use_changesource").style.display="block";
}
function UseChangeAv(){
	var nowLoad=$("use_changesource_old").innerHTML;
	$("use_changesource_s1").value = Math.round(nowLoad/3);
	$("use_changesource_s2").value = Math.round(nowLoad/3);
	$("use_changesource_s3").value = nowLoad - 2*($("use_changesource_s2").value);
	UseCountLeft();
}
function UseMax(id){
	switch (id)
	{
	 case 1:
		$("use_changesource_s1").value = $("use_changesource_old").innerHTML-$("use_changesource_s2").value-$("use_changesource_s3").value;
		break;
	 case 2:
		$("use_changesource_s2").value = $("use_changesource_old").innerHTML-$("use_changesource_s1").value-$("use_changesource_s3").value;
		break; 
	 case 3:
		$("use_changesource_s3").value = $("use_changesource_old").innerHTML-$("use_changesource_s1").value-$("use_changesource_s2").value;
		break;
	}
	UseCountLeft();
}
function UseCountLeft(){
	var nowLeft = $("use_changesource_old").innerHTML;
	nowLeft = nowLeft - $("use_changesource_s1").value - $("use_changesource_s2").value - $("use_changesource_s3").value;
	$("use_changesource_now").innerHTML=nowLeft;
}
function UseChangeSource(){
	if($("use_changesource_now").innerHTML != 0){
		msgbox("请配平各种资源，保证剩余为0")	
	}else{
		HI('use_changesource');HI('maskbg');
		//GetTransItem(iCityID,iNewWood,iNewIron,iNewStone,iItemID,iFlag)
		objFlashEng.Send(GetTransItem(CityID,$("use_changesource_s1").value,
									$("use_changesource_s2").value,$("use_changesource_s3").value,
									12,3))
	}
}



//资源购买
function ShowBuySource(){
	//初始化0
	for(i=1;i<5;i++){
		$("use_buysource_res"+i).innerHTML=0
		$("use_buysource_"+i).innerHTML=0
		$("use_buys"+i).value=0;
	}
	$("use_buysource_money").innerHTML=0
	$("use_buysource_vipmoney").innerHTML=0
	
	//显示城市显示Select
	hideSelect("");
	showCitySelect('use_buysource_select')
	
	//返回当前兑换比例
	objFlashEng.Send(GetBuyResItem(1))
	
	//显示第一项资源购买次数
	$("buysource_form").bc[0].checked=true;
	$("use_buysource_leftcount").innerHTML=getItemLeftUseCount(46)*10+"点券的木头"
	
	//根据仓库等级获取最大容量信息
	$("maskbg").style.display="block";
	$("use_buysource").style.display="block";
}
function CountBuySourc(va,type){
	$("use_buysource_str").innerHTML=""
	if(isPlusNumber(va)){
		if(va>10){
			$("use_buysource_str").innerHTML="<span style='color:red'>请一次不要购买太多</span>"
		}else{
			var nameS=["粮食","木头","铁矿","石料"]
			$("use_buysource_leftcount").innerHTML=getItemLeftUseCount(type+44)*10+"点券的"+nameS[type-1]
			$("use_buysource_"+type).innerHTML=va*$("use_buysource_res"+type).innerHTML
			$("use_buysource_money").innerHTML=va*10
			$("use_buysource_vipmoney").innerHTML=va*8//vip价格
		}
	}else{
		$("use_buysource_str").innerHTML="<span style='color:red'>请输入正整数</span>"
	}
}
function cleanInput(n){
	for(i=1;i<5;i++){
		$("use_buysource_"+i).innerHTML=0
		$("use_buys"+i).value=0
	}
	var nameS=["粮食","木头","铁矿","石料"]
	$("use_buysource_leftcount").innerHTML=getItemLeftUseCount(n+44)*10+"点券的"+nameS[n-1]
}
function UseBuyS(){
	if ($("buysource_form").bc[3].checked){
		iItemID=45
	}else if ($("buysource_form").bc[0].checked){
		iItemID=46
	}else if ($("buysource_form").bc[1].checked){
		iItemID=47
	}else if ($("buysource_form").bc[2].checked){
		iItemID=48
	}

	var iCityID = $("use_buysource_select").value
	var iBuyCounts = $("use_buys"+(iItemID-44)).value;
	//alert(GetBuyRItem(iCityID,iBuyCounts,iItemID))
	objFlashEng.Send(GetBuyRItem(iCityID,iBuyCounts,iItemID))
}
//显示城市显示Select
function showCitySelect(id){
	$(id).length=0;
	for(i=0;i<allCityName.length;i++){
		var oOption = document.createElement("OPTION");
		oOption.text=allCityName[i].szCityName;
		oOption.value=allCityName[i].iCityID;
		$(id).add(oOption);
	}
}
//1412比例返回协议
function ShowBuyResItem(str){
	var objS=eval('('+str+')');
	if(typeof(objS.CResult) != "undefined")
	{
		//msgbox("Error:"+objT.CResult.iResultID+"<br>获取兑换比例<b>失败</b>:"+objS.CResult.iResultID);
		msgbox("Error:"+objS.CResult.iResultID+"<br><b>获取兑换比例失败:</b><span class='t_tips_yellow'>"+errMsg(objS.CResult.iResultID)+"!</span>");

	}
	else if(objS.CAnsResPar.CResult.iResultID != 0)
	{
		//msgbox("获取兑换比例<b>失败</b>!errorcode :"+objS.CAnsResPar.CResult.iResultID);
		msgbox("Error:"+objS.CAnsResPar.CResult.iResultID+"<br><b>获取兑换比例失败:</b><span class='t_tips_yellow'>"+errMsg(objS.CAnsResPar.CResult.iResultID)+"!</span>");
	}
	else
	{
		for(i=1;i<5;i++){
			$("use_buysource_res"+i).innerHTML=objS.CAnsResPar.iBuyRate;
		}
	}
}
//1405资源购买成功返回处理
function ShowBuyRItem(str){
	var objS=eval('('+str+')');
	if(typeof(objS.CResult) != "undefined")
	{
		//msgbox("获取兑换比例<b>失败</b>!errorcode :"+objS.CResult.iResultID);
		msgbox("Error:"+objS.CResult.iResultID+"<br><b>获取兑换比例失败:</b><span class='t_tips_yellow'>"+errMsg(objS.CResult.iResultID)+"!</span>");
	}
	else if(objS.CAnsResPar.CResult.iResultID != 0)
	{
		//msgbox("获取兑换比例<b>失败</b>!errorcode :"+objS.CAnsResPar.CResult.iResultID);
		msgbox("Error:"+objS.CAnsResPar.CResult.iResultID+"<br><b>获取兑换比例失败:</b><span class='t_tips_yellow'>"+errMsg(objS.CAnsResPar.CResult.iResultID)+"!</span>");
	}
	else
	{
		for(i=1;i<5;i++){
			$("use_buysource_res"+i).innerHTML=objS.CAnsResPar.iBuyRate;
		}
	}
}







//iPara: 1 建筑 2 科技 3 征募
function ShowMultiChose(iClass,iSubClass,iPara){
	//$("use_change_nationname").innerHTML=ToNation(curNationID);
	//初始化数量等信息	
	initMutiItemChoose(iClass,iSubClass,iPara,0);
	$("maskbg").style.display="block";
	$("multiitem_div").style.display="block";
}
function ShowHeroHealth(HeroID,foodType)
{
	ShowFoodMultiChose(3,10,HeroID,foodType);
}
//iPara : 英雄id,iFoodType， food的类型
function ShowFoodMultiChose(iClass,iSubClass,iPara,foodType){
	//$("use_change_nationname").innerHTML=ToNation(curNationID);
	//初始化数量等信息	
	initMutiItemChoose(iClass,iSubClass,iPara,foodType);
	$("maskbg").style.display="block";
	$("multiitem_div").style.display="block";
}

//立即使用界面
function showQuickUse(itemID)
{
	$("quickuse_itemid").value = itemID;
	var itemConfig = getItemConfig(itemID);
	//排除情景使用的道具情景：加速类道具,鸣金收兵,急行军,英雄口粮,令牌宝石类道具的合成和精炼石头
	if(itemConfig.fclass == 1 || itemID == 20 || itemID == 32 || itemID ==35 ||
	   (itemConfig.fclass == 3 && itemConfig.subClass==10)||
	   	(itemConfig.fclass == 4&& itemConfig.itemID!=53))
	{
		$("NowUse_checkbox").checked = false;
		$("NowUse_checkbox").disabled = true;
	}
	SH("itemmsgbox");
}
//立即使用道具
function NowItemUse()
{
	if($("NowUse_checkbox").checked)
	{
		itemUserProcess($("quickuse_itemid").value);
		$("NowUse_checkbox").checked = false;
	}
	$("NowUse_checkbox").disabled = false;
}
//发送金币
function SendGoldMsg(iOtherUin,szNick,igold,sContent)
{
	if(igold<=0)
	{
		msgbox("金币数目非法");
	}
	var sMsg = getGoldMsg(iOtherUin,szNick,igold,sContent);
	top.objFlashEng.Send(sMsg);
	
}

function checkUserItemsAndCoin()
{
	if(arrUserQuan == -1)
	{
		objFlashEng.Send(GetUserCoin());
	}
	if(arrUserItem.length == 0)
	{
		objFlashEng.Send(GetUserItems());
	}
}






/*
    1408处理函数
    购买道具
*/
function OnBuyItemRes(str)
{
	var objBuyItem=eval('('+str+')');
	if(typeof(objBuyItem.CResult) != "undefined")
	{
		//msgbox("购买道具 <b>失败</b>! errorcode :"+objBuyItem.CResult.iResultID);
		msgbox("Error:"+objBuyItem.CResult.iResultID+"<br><b>购买道具失败:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CResult.iResultID)+"!</span>");
	}
	else if(objBuyItem.CAnsBuyingItem.CResult.iResultID != 0)
	{
		//msgbox("购买道具 <b>失败</b>! errorcode :"+objBuyItem.CAnsBuyingItem.CResult.iResultID);
		msgbox("Error:"+objBuyItem.CAnsBuyingItem.CResult.iResultID+"<br><b>购买道具失败:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CAnsBuyingItem.CResult.iResultID)+"!</span>");
	}
	else
	{

		updateCoinData(objBuyItem.CAnsBuyingItem.iCoinCount,objBuyItem.CTMsgHead.llMsgAct);
		//alert("item id "+ objBuyItem.CAnsBuyingItem.iItemID+"count "+objBuyItem.CAnsBuyingItem.iResidual);
		updateObjecData(objBuyItem.CAnsBuyingItem.iItemID,objBuyItem.CAnsBuyingItem.iResidual,-1,
						objBuyItem.CTMsgHead.llMsgAct,true);
		if(objBuyItem.CTMsgHead.llMsgAct == 1)
		{
			//msgbox("购买道具 <b>成功</b>!开始使用道具");
			SendItemUseReq(objBuyItem.CAnsBuyingItem.iItemID);
		}
		//add by mario 090119 “鸣金收兵”“急行军”道具的单独协议
		else if(objBuyItem.CTMsgHead.llMsgAct == 32 )
		{
			//msgbox("购买道具 <b>成功</b>!开始使用道具");
			objFlashEng.Send(GetCancleArmy(curArmyIng,32));
		}
		else if(objBuyItem.CTMsgHead.llMsgAct == 20)
		{
			//msgbox("购买道具 <b>成功</b>!开始使用道具");
			eval(strStartAttact);
		}
		//add end
		else
		{
			//重新拉取道具数据
			objFlashEng.Send(GetUserItems());
			
			showQuickUse(objBuyItem.CAnsBuyingItem.iItemID);
			//msgbox("购买道具 <b>成功</b>!");
			
			
		}
	}
		
}

function OnUseLinPai(str)
{
	var objUseItem=eval('('+str+')');
	if(typeof(objUseItem.CResult) != "undefined")
	{
		//msgbox("购买道具 <b>失败</b>! errorcode :"+objBuyItem.CResult.iResultID);
		msgbox("Error:"+objUseItem.CResult.iResultID+"<br><b>使用家族令牌失败:</b><span class='t_tips_yellow'>"+errMsg(objUseItem.CResult.iResultID)+"!</span>");
	}
	else if(objUseItem.CAnsEndowPopulItem.CResult.iResultID != 0)
	{
		//msgbox("购买道具 <b>失败</b>! errorcode :"+objBuyItem.CAnsBuyingItem.CResult.iResultID);
		msgbox("Error:"+objUseItem.CAnsEndowPopulItem.CResult.iResultID+"<br><b>使用家族令牌失败:</b><span class='t_tips_yellow'>"+errMsg(objUseItem.CAnsEndowPopulItem.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetUserItems());
		msgbox("家族令牌使用 <b>成功</b>!");
	}
}


/*
    1416处理函数
    购买家族令牌
*/
function OnBuyManyItems(str)
{
	var objBuyItem=eval('('+str+')');
	if(typeof(objBuyItem.CResult) != "undefined")
	{
		//msgbox("购买道具 <b>失败</b>! errorcode :"+objBuyItem.CResult.iResultID);
		msgbox("Error:"+objBuyItem.CResult.iResultID+"<br><b>购买道具失败:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CResult.iResultID)+"!</span>");
	}
	else if(objBuyItem.CAnsBuyItems.CResult.iResultID != 0)
	{
		//msgbox("购买道具 <b>失败</b>! errorcode :"+objBuyItem.CAnsBuyingItem.CResult.iResultID);
		msgbox("Error:"+objBuyItem.CAnsBuyItems.CResult.iResultID+"<br><b>购买道具失败:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CAnsBuyItems.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetUserItems());
		var str = "成功的购买了以下道具：<br>";
		for(var i=0;i<objBuyItem.CAnsBuyItems.astItemID.length;i++)
		{
			str +="<span class='t_red'>"+getItemConfig(objBuyItem.CAnsBuyItems.astItemID[i]).name+":"+objBuyItem.CAnsBuyItems.astItemCount[i]	+"个</span><br>";
		}
		
		HI("use_septorder")
		msgbox(str);
		updateCoinData(objBuyItem.CAnsBuyItems.iCoinCount,0);
	}
}

/*
    1409处理函数
    获取道具列表
*/
function OnGetUserItemRes(str)
{
	var objGetItem=eval('('+str+')');
	if(typeof(objGetItem.CResult) != "undefined")
	{
		//msgbox("获取道具 <b>失败</b>! errorcode :"+objGetItem.CResult.iResultID);
		msgbox("Error:"+objGetItem.CResult.iResultID+"<br><b>获取道具失败:</b><span class='t_tips_yellow'>"+errMsg(objGetItem.CResult.iResultID)+"!</span>");
	}
	else if(objGetItem.CAnsGetingUserItem.CResult.iResultID != 0)
	{
		//msgbox("获取道具 <b>失败</b>! errorcode :"+objGetItem.CAnsGetingUserItem.CResult.iResultID);
		msgbox("Error:"+objGetItem.CAnsGetingUserItem.CResult.iResultID+"<br><b>获取道具失败:</b><span class='t_tips_yellow'>"+errMsg(objGetItem.CAnsGetingUserItem.CResult.iResultID)+"!</span>");
	}
	else
	{	
		if(objGetItem.CAnsGetingUserItem.iUin == Uin)
		{
			//msgbox("获取道具 <b>成功</b>!"+str);
			//用户拥有道具全局变量
			arrUserItem = objGetItem.CAnsGetingUserItem.astItems;	
			
			//如果是交易所发出的请求，更新交易所的道具列表
			if(objGetItem.CTMsgHead.llMsgAct==-10){
				document.frames["marketdiv"].ShowMarketItem(arrUserItem)
			}	
			
			//宝物合成系统，更新石头数目
			if($("trea_item16"))updataItemNum()
			//聊天系统，更新小喇叭数量	
			$("chat_div_item1").innerHTML=getItemCount(36)	
			$("chat_div_item2").innerHTML=getItemCount(35)
		}
		
		
	}
}
/*
	1400的消息处理函数
	buff类道具使用的消息处理函数
*/
function OnUserItemResMsg(str)
{
	var objUserItem=eval('('+str+')');
	//用个位数表示购买和使用的标志
	var iFlag = objUserItem.CTMsgHead.llMsgAct%10;
	var itemID = (objUserItem.CTMsgHead.llMsgAct - iFlag)/10;
	if(typeof(objUserItem.CResult) != "undefined")
	{
		if(objUserItem.CResult.iResultID == 1400003)
		{
			if(itemID == "24")
			{
				msgboxyesno("您的城池已有“实而虚之”的效果，\r\n使用“虚而实之”将覆盖“实而虚之”的效果");
				msgboxFunc="objFlashEng.Send(GetBufferItem("+CityID+",24,1,"
													  +objUserItem.CTMsgHead.llMsgAct+"))";
			}
			else if(itemID == "23")
			{
				msgboxyesno("您的城池已有“虚而实之”的效果，\r\n使用“实而虚之”将覆盖“虚而实之”的效果");
				msgboxFunc="objFlashEng.Send(GetBufferItem("+CityID+",23,1,"
													  +objUserItem.CTMsgHead.llMsgAct+"))";
			}
			else if(itemID == "22")
			{
				msgboxyesno("您的城池已有“草木皆兵”的效果，\r\n使用“空城计”将覆盖“草木皆兵”的效果");
				msgboxFunc="objFlashEng.Send(GetBufferItem("+CityID+",22,1,"
													  +objUserItem.CTMsgHead.llMsgAct+"))";
			}
			else if(itemID == "21")
			{
				msgboxyesno("您的城池已有“空城计”的效果，\r\n使用“草木皆兵”将覆盖“空城计”的效果");
				msgboxFunc="objFlashEng.Send(GetBufferItem("+CityID+",21,1,"
													  +objUserItem.CTMsgHead.llMsgAct+"))";
			}
			else
			{
				msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
				
			}
			
		}
		else 
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>道具使用失败:</b><span class='t_red'>"		                       +errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsUseingItem.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsUseingItem.CResult.iResultID+"<br><b>道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsUseingItem.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("道具使用 <b>成功</b>!");
		//更新道具数目
		//alert("item id "+ objUserItem.CAnsUseingItem.iItemID+"count "+objUserItem.CAnsUseingItem.iResidual);
		objFlashEng.Send(GetMineCity(CityID,0));
		updateObjecData(objUserItem.CAnsUseingItem.iItemID,
						objUserItem.CAnsUseingItem.iResidual,-1,
						iFlag,false);
	}
}
/*
	1401的消息处理函数
	迁城符使用的消息处理函数
*/
function OnMoveCityResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>迁城符道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsItemMoverCity.CResult.iResultID != 0)
	{
		
			msgbox("Error:"+objUserItem.CAnsItemMoverCity.CResult.iResultID+"<br><b>迁城符道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsItemMoverCity.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("迁城符道具使用 <b>成功</b>!");
		//此处需要添加更新用户城市信息的处理函数
		//更新道具数目
		//alert("item id "+ objUserItem.CAnsItemMoverCity.iItemID+"count "+objUserItem.CAnsItemMoverCity.iResidual);
		updateObjecData(objUserItem.CAnsItemMoverCity.iItemID,
						objUserItem.CAnsItemMoverCity.iResidual,-1,
						objUserItem.CTMsgHead.llMsgAct,false);
		//document.frames["shopdiv"].onDataChange();
	}
}
/*
	1402的消息处理函数
	改旗易帜道具使用的消息处理函数
*/
function OnChangeNationResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>改旗易帜道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsItemChangeNation.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsItemChangeNation.CResult.iResultID+"<br><b>改旗易帜道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsItemChangeNation.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("改旗易帜道具使用 <b>成功</b>!");
		//此处需要添加更新用户国籍信息的处理函数
		//更新前台国籍
		curNationID = objUserItem.CAnsItemChangeNation.iNewNationID;
		$("init_iPlayerNationID").innerHTML = ToNation(curNationID);		
		//更新道具数目
		updateObjecData(objUserItem.CAnsItemChangeNation.iItemID,
						objUserItem.CAnsItemChangeNation.iResidual,-1,
						objUserItem.CTMsgHead.llMsgAct,false);
	}
}
/*
	1403的消息处理函数
	建造任务加速类道具使用的消息处理函数
*/
function OnSpeedBuildResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		if(objUserItem.CResult.iResultID == 1400018)
		{
			msgbox("加速锦囊类道具一天最多只能使用10次！\r\n如果还需使用,请使用不限次数的“月光宝盒”");
		}
		else
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>建造加速道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsItemSpeedupBuild.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsItemSpeedupBuild.CResult.iResultID+"<br><b>建造加速道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsItemSpeedupBuild.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("建造加速道具使用 <b>成功</b>!");
		//更新道具数目
		updateObjecData(objUserItem.CAnsItemSpeedupBuild.iItemID,
						objUserItem.CAnsItemSpeedupBuild.iResidual,
						objUserItem.CAnsItemSpeedupBuild.iBeUseConuts,
						objUserItem.CTMsgHead.llMsgAct,false);
	}
}
/*
	1404的消息处理函数
	征募任务加速道具使用的消息处理函数
*/
function OnSpeedArmyResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		if(objUserItem.CResult.iResultID == 1400018)
		{
			msgbox("加速兵符类道具一天最多只能使用10次！\r\n如果还需使用,请使用不限次数的“孙子兵法宝典”");
		}
		else
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>征募加速道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsItemSpeedupBuild.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsItemSpeedupBuild.CResult.iResultID+"<br><b>征募加速道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsItemSpeedupBuild.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("征募加速道具使用 <b>成功</b>!");
		//更新道具数目
		updateObjecData(objUserItem.CAnsItemSpeedupBuild.iItemID,
						objUserItem.CAnsItemSpeedupBuild.iResidual,
						objUserItem.CAnsItemSpeedupBuild.iBeUseConuts,
						objUserItem.CTMsgHead.llMsgAct,false);
	}
}
/*
	1405的消息处理函数
	购买资源道具使用的消息处理函数
*/
function OnBuyResourceResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		if(objUserItem.CResult.iResultID == 1400018)
		{
			msgbox("购买失败,购买资源超过最大限制!");
		}
		else
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>购买资源道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsBuyRes.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsBuyRes.CResult.iResultID+"<br><b>购买资源道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsBuyRes.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("购买资源道具使用 <b>成功</b>!");
		//此处需要添加更新用户资源信息的处理函数
		//更新道具数目
		//updateObjecData(iItemID,iNum,iLeftCount,iFlag,iBuyFlag)
		//alert("left times "+objUserItem.CAnsBuyRes.iLeftUseCount + "coin :"+objUserItem.CAnsBuyRes.iCoinCount);
		updateCoinData(objUserItem.CAnsBuyRes.iCoinCount,0);
		updateObjecData(objUserItem.CAnsBuyRes.iItemID,objUserItem.CAnsBuyRes.iResidual,
						objUserItem.CAnsBuyRes.iLeftUseCount,0,true);
	}
}
/*
	1406的消息处理函数
	资源转化道具使用的消息处理函数
*/
function OnExChangeResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>资源转化道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsExchangeRes.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsExchangeRes.CResult.iResultID+"<br><b>资源转化道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsExchangeRes.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		updateCoinData(objUserItem.CAnsExchangeRes.iCoinCount,0);
		msgbox("资源转化道具使用 <b>成功</b>!");
		//此处需要添加更新用户资源信息的处理函数
		//更新道具数目
		//document.frames["shopdiv"].onChangeItemNum(-1,objUserItem.CTMsgHead.llMsgAct);
	}
}
/*
	1407的消息处理函数
	退兵符道具使用的消息处理函数
*/
function OnTributaryResMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>退兵符道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsTributary.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsTributary.CResult.iResultID+"<br><b>退兵符道具使用失败:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsTributary.CResult.iResultID)+"!</span>");
	}
	else
	{
		objFlashEng.Send(GetMineCity(CityID,0));
		msgbox("退兵符道具使用 <b>成功</b>!");
		//更新道具数目
		updateObjecData(objUserItem.CAnsTributary.iItemID,
						objUserItem.CAnsTributary.iResidual,-1,
						objUserItem.CTMsgHead.llMsgAct);
	}
}
/*
	1410的消息处理函数
	获取点卷的消息处理函数
*/
function OnGetCoinResMsg(str)
{
	var objGetCoinItem=eval('('+str+')');
	if(typeof(objGetCoinItem.CResult) != "undefined")
	{
		msgbox("Error:"+objGetCoinItem.CResult.iResultID+"<br><b>获取点券失败:</b><span class='t_tips_yellow'>"+errMsg(objGetCoinItem.CResult.iResultID)+"!</span>");
	}
	else if(objGetCoinItem.CAnsUserGetCoin.CResult.iResultID != 0)
	{
		msgbox("Error:"+objGetCoinItem.CAnsUserGetCoin.CResult.iResultID+"<br><b>获取点券失败:</b><span class='t_tips_yellow'>"+errMsg(objGetCoinItem.CAnsUserGetCoin.CResult.iResultID)+"!</span>");
	}
	else
	{
		//msgbox("获取点券:"+objGetCoinItem.CAnsGetCoin.iCoinCount);
		//对点券全局变量赋值
		arrUserQuan = objGetCoinItem.CAnsUserGetCoin.iCoinCount;
		//alert("coin : "+arrUserQuan);
		document.frames["shopdiv"].disPlayMyCoin(objGetCoinItem.CAnsUserGetCoin.iCoinCount);
	}
}

/*
1021的消息处理函数
发送金币
*/

function OnSendGoldMsg(str)
{
	var objSendGoldItem=eval('('+str+')');
	if(typeof(objSendGoldItem.CResult) != "undefined")
	{
		msgbox("Error:"+objSendGoldItem.CResult.iResultID+"<br><b>发送金币失败:</b><span class='t_tips_yellow'>"+errMsg(objSendGoldItem.CResult.iResultID)+"!</span>");
		document.frames["maildiv"].frames["rightframe"].SendGoldFailed();
	}
	else if(objSendGoldItem.CAnsTransferGold.CResult.iResultID != 0)
	{
		msgbox("Error:"+objSendGoldItem.CAnsTransferGold.CResult.iResultID+"<br><b>发送金币失败:</b><span class='t_tips_yellow'>"+errMsg(objSendGoldItem.CAnsTransferGold.CResult.iResultID)+"!</span>");
		document.frames["maildiv"].frames["rightframe"].SendGoldFailed();
	}
	else
	{
		//msgbox("获取点券:"+objGetCoinItem.CAnsGetCoin.iCoinCount);
		//对点券全局变量赋值
		var arrUserGold = objSendGoldItem.CAnsTransferGold.iNowGold;
		//alert("now coin "+arrUserGold);
		top.$("init_iGlod").innerHTML = arrUserGold;
		document.frames["maildiv"].frames["rightframe"].location = "/mailtemplate/mail_gold_ok.html";
	}
}
/////////////////////////////////


function onFoodItemMsg(str)
{
	var objUserItem=eval('('+str+')');
	if(typeof(objUserItem.CResult) != "undefined")
	{
		
			msgbox("Error:"+objUserItem.CResult.iResultID+"<br><b>英雄口粮道具使用:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CResult.iResultID)+"!</span>");
	}
	else if(objUserItem.CAnsUseHeroFood.CResult.iResultID != 0)
	{
		msgbox("Error:"+objUserItem.CAnsUseHeroFood.CResult.iResultID+"<br><b>英雄口粮道具使用:</b><span class='t_tips_yellow'>"+errMsg(objUserItem.CAnsUseHeroFood.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("英雄口粮道具使用 <b>成功</b>!");
		//更新英雄列表
		objFlashEng.Send(getTaskList(1601));
		//更新道具数目
		updateObjecData(objUserItem.CAnsUseHeroFood.iItemID,
						objUserItem.CAnsUseHeroFood.iResidual,
						objUserItem.CAnsUseHeroFood.iLeftUseCount,
						objUserItem.CTMsgHead.llMsgAct,false);
	}
}


function onBuyGoldMsg(str)
{
	var objBuyItem=eval('('+str+')');
	if(typeof(objBuyItem.CResult) != "undefined")
	{
		
			msgbox("Error:"+objBuyItem.CResult.iResultID+"<br><b>购买金元宝:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CResult.iResultID)+"!</span>");
	}
	else if(objBuyItem.CAnsBuyGold.CResult.iResultID != 0)
	{
		msgbox("Error:"+objBuyItem.CAnsBuyGold.CResult.iResultID+"<br><b>购买金元宝:</b><span class='t_tips_yellow'>"+errMsg(objBuyItem.CAnsBuyGold.CResult.iResultID)+"!</span>");
	}
	else
	{
		msgbox("购买金元宝 <b>成功</b>! 您增加了 <b>"+objBuyItem.CAnsBuyGold.iAddGold+"</b> 金币");
		var arrUserGold = objBuyItem.CAnsBuyGold.iGoldCount;
		//alert("now coin "+arrUserGold);
		top.$("init_iGlod").innerHTML = arrUserGold;
		//更新金币数目
		arrUserQuan = objBuyItem.CAnsBuyGold.iCoinCount;
		//alert("coin : "+arrUserQuan);
		//if(document.frames["shopdiv"].src!="")
		document.frames["shopdiv"].disPlayMyCoin(objBuyItem.CAnsBuyGold.iCoinCount);
	}	
}

//获取情景使用的道具id，如果有赠送道具，优先返回赠送道具id,
//为0表示该道具的数目不足，需要购买
function getSceneUseItemID(itemID)
{
	var iCount =getItemCount(itemID);
	if(iCount > 0)
		return itemID;
	else
	{
		var iRelatedID = getRelatedItemID(itemID);
		iCount = getItemCount(iRelatedID);
		if(iCount > 0)
			return iRelatedID;
	}
	return 0;
}

function getRelatedItemID(itemID)
{
	if(parseInt(itemID,10)>100)
		return parseInt(itemID,10)-100;
	else
		return parseInt(itemID,10)+100;
}



function onBuyClick(iItemID,sName,iPrice,iVipPrice,vTime,sNotes)
{
	if(iItemID == 11)
	{
		ShowBuySource();
	}
	else if(iItemID == 12)
	{
		ShowChangeSource();
	}
	else if(iItemID == 54)
	{
		showBuySeptDiv();
	}
	else
	{
		ShowBuyDiv(iItemID,sName,iPrice,iVipPrice,vTime,sNotes);
	}
}



/*
**    ==================================================================================================  
**    类名： 
**    功能： 购买第二入口
**    示例： 
**    ==================================================================================================  
*/
var testShopMyItem

//购买资源第二入口
function doIndexBuySource(){
	//getItemConfig(11)
	onBuyClick(11,getItemConfig(11).name,
				getItemConfig(11).price,
				getItemConfig(11).vipPrice,
				getItemConfig(11).expireTime,
				getItemConfig(11).note)	
}


//打开我的仓库第二入口
function doIndexMyItem(){
	iframebanner(2);
	if(typeof(testShopMyItem)== "object")
		testShopMyItem=clearTimeout(testShopMyItem);
	testShopMyItem = setTimeout("testShopDivItem()",300);
}
function testShopDivItem(){
	if(typeof(document.frames['shopdiv'].onBuyClick)=="function"){
		$("shopdiv").src = "/shoptemplate/myitem.html"
		ShowTab('shop',6)
		testShopMyItem=clearTimeout(testShopMyItem);
	}
}



//购买小喇叭第二入口
function doIndexBuyChat(){
	onBuyClick(35,getItemConfig(35).name,
				getItemConfig(35).price,
				getItemConfig(35).vipPrice,
				getItemConfig(35).expireTime,
				getItemConfig(35).note)	
}

//拉取点券
function sendGetCoin()
{
	if(typeof(top.objFlashEng)!="object")
	{
		setTimeout("sendGetCoin()",500);
		return false;
	}
	else
	{
	   if(top.arrUserQuan == -1)
			top.objFlashEng.Send(top.GetUserCoin());
		return true;
	}
}