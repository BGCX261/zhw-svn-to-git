// JavaScript Document

function $(id){return document.getElementById(id);}
function w(id){return document.write(id);}
function chkvalue(arr,iIndex) 
{
	if(iIndex<arr.length&&arr[iIndex]!=0) 
		return (arr[iIndex]/10)+"%";
	return 0;
}
//非零计数
function countAttributeNotZero(attribute)
{
	var count = 0;
	for(var i=1;i<attribute.length;i++)
	{
		if(i!=9 && i!=10)
		{
			if(attribute[i]!=0)
				count++;
		}
	}
	return count;
}

function countall(arrm){
	var count=0;
	for(var i=0;i<arrm.length;i++){
		count = count  +  arrm[i];
	}
	return count;
}

function PackArr(array,num){
	var temarr=[];
	temarr.length = 0;
	for(var i=0;i<num;i++){
		if(array.length>i && array[i]>0 ){
			temarr.push(array[i]);
		}else{
			temarr.push(0);
		}
	}
	return temarr;
}

function getArrayValue(array,num)
{
	if( array.length>num &&array[num]>0){
			return array[num];
		}else{
			return 0;
		}
}

function showLostFort(){
	var temstr="";
		for(var i=0;i<oR.CBillFortInfo.astFortInfo[1].ashFort.length;i++){
			if(oR.CBillFortInfo.astFortInfo[1].ashFort[i] > 0){
			temstr= temstr+
					mb.Buidings[top.for_start_arid+i].BuildingName+
					oR.CBillFortInfo.astFortInfo[1].ashFort[i]+"个&nbsp;&nbsp;";
		}
	}
	if(temstr == "")
		temstr = "无";
	return temstr;
}

// 从cookie获取QQ号
// cookie操作
function chGetCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null)
	{
		return unescape(arr[2]);
	}
	return "";
}

function chGetUin()
{

	var aRet = chGetCookie('uin').match(/\d+/);
	return aRet ? parseInt(aRet[0], 10) : -1;
}

//获取用户类型：0 攻击方， 2联防方, 1 防守方,3其它
function getUserType()
{
	if(typeof(oR.astCityInfo) == "undefined")
		return 3;
	if(oR.astMainArmy.length == 0)
		return 2;
	else
	{
		
		if(chGetUin() == oR.astCityInfo[0].iUin)
		{
				return 0;
				
		}
		else if(chGetUin() == oR.astCityInfo[1].iUin)
		{
			return 1;
		}
		else
		{
			return 3;
		}
	}
}



//iClass 0:  获取所有进攻者的兵力总和 ：出征兵力
//iClass 1: 获取所有防守者的兵力总和 出征兵力总和 
function getTotalArmCount(iClass)
{

	var count = 0; 

	count = countall(oR.astMainArmy[iClass].astArmyInfo[0].ashArmy);
	if(iClass>0)
	{
		for(i=0;i<oR.astUniteArmy.length;i++)
		{
			count+=countall(oR.astUniteArmy[i].astArmyInfo[0].ashArmy);
		}
	}
	
	return count;
}

//计算损失兵力
function getTotalLostArmy(iClass)
{
	var count = 0; 
	//计算自己的损失兵力
	count = countall(oR.astMainArmy[iClass].astArmyInfo[1].ashArmy);
	count = count-countall(oR.astMainArmy[iClass].astArmyInfo[2].ashArmy);
	if(iClass>0)
	{
		for(i=0;i<oR.astUniteArmy.length;i++)
		{
			count+=countall(oR.astUniteArmy[i].astArmyInfo[1].ashArmy);
			
			count = count-countall(oR.astUniteArmy[i].astArmyInfo[2].ashArmy);
		}
	}
	return count;
}

//获取损失的汇总信息
function getTotalLostInfo(iClass)
{
	var sTotalInfo = "";
	var sGeneInfo="";
	var soldierInfo="";
	var fitInfo = "";
	if(getUserType() != 2)
	{
		if(iClass ==0 || iClass ==1)
		{
			sGeneInfo = "武将 "+getHeroNumStr(iClass);
			soldierInfo = "士兵 " + getTotalLostArmy(iClass)+"/"+getTotalArmCount(iClass);
			fitInfo = "装备 " + getLostFitCount(iClass)+"/"+getTotalFitCount(iClass);
			sTotalInfo = sGeneInfo+" "+soldierInfo+" "+fitInfo;
		}
	}
	return sTotalInfo;
}

function getTotalFitCount(iClass)
{
	var iCount = 0;
	iCount = countall(oR.astMainArmy[iClass].astOutfitInfo[0].achOutfit);
	if(iClass ==0)
		return iCount;
	for(i=0;i<oR.astUniteArmy.length;i++)
	{
		iCount+=countall(oR.astUniteArmy[i].astOutfitInfo[0].achOutfit);
	}
	return iCount;
}

//获取所有防守者的装备总和 ：iType 0，出征装备总和 ； 1损失装备总和
//iClass 0:  获取所有进攻的装备总和 ：iType 0，出征兵力总和 ； 1损失
//iClass 1: 获取所有防守的装备总和 ：iType 0，出征兵力总和 ； 1损失兵
function getLostFitCount(iClass)
{
	var count = countall(oR.astMainArmy[iClass].astOutfitInfo[1].achOutfit);
	if(iClass == 0)
		return count;
	for(i=0;i<oR.astUniteArmy.length;i++)
	{
		count+=countall(oR.astUniteArmy[i].astOutfitInfo[1].achOutfit);
	}
	return count;
}





/*
*Name : 名字
 SValue : 值
 iNum: 值所占的表格数
*/
function addTableTitle(tableObj,Name,sValue,iNum,iNameWidth)
{
	//名称
	var tableRow = tableObj.insertRow(-1);
	var tableValueTd = document.createElement('td');
	//标题有名称
	if(Name !="")
	{
		tableValueTd.innerHTML = Name;
		tableValueTd.colspan = 1;
		tableValueTd.width = iNameWidth;
		tableRow.appendChild(tableValueTd);
		tableValueTd = document.createElement('td');
		//值
	}
	//没有名称
	else
	{
		iNum = iNum+1;
	}
	tableValueTd.innerHTML = sValue;

	tableValueTd.colSpan  = iNum;
	tableRow.appendChild(tableValueTd);
	return tableRow;
	
}

//往表格中添加一行
function addTableLineInfo(tableObj,lineName,arrValue,iNum,defaultValue,iNameWidth,iValWidth)
{
	var tableRow = tableObj.insertRow(-1);
	var tableValueTd = document.createElement('td');
	tableValueTd.innerHTML = lineName;
	tableValueTd.width = iNameWidth;
	tableRow.appendChild(tableValueTd);
	for(i=0;i<iNum;i++)
	{
			var tableValueTd = document.createElement('td');
			if(arrValue.length>i)
			{
				tableValueTd.innerHTML = arrValue[i];
			}
			else
			{
				
				tableValueTd.innerHTML = defaultValue;
			}
			tableValueTd.colSpan   = 1;
			tableValueTd.width = iValWidth;
			tableRow.appendChild(tableValueTd);
	}
	return tableRow;
}

function getArrayMinus(arry1,arry2)
{
	var retArray =[];
	for(i=0;i<arry1.length;i++)
	{
		retArray[i] = arry1[i] - arry2[i];
	}
	return retArray;
}
//
function getMaskArray(arry1,maskArray)
{
	var retArray =[];
	var iCount = 0;
	for(i=0;i<arry1.length;i++)
	{
		if(i<maskArray.length)
		{
			if(maskArray[i]==0)
				retArray[iCount++] = arry1[i];
		}
		else
			retArray[iCount++] = arry1[i];
	}
	return retArray;	
}

//
function getArrayAdd(arry1,arry2)
{
	var retArray =[];
	var i = 0;
	for(i=0;i<arry1.length();i++)
	{
		if(i<arry2.length)
			retArray[i] = arry1[i] + arry2[i];
		else
			retArray[i] = arry1[i];
	}
	if(i<arry2.length)
	{
		for(;i<arry2.length();i++)
		{
			retArray[i] =arry2[i];
		}
	}
	return retArray;
}


//获取物品的开始表格
function getTableNameIndex(tableObj,IdStr)
{
	var len = tableObj.rows.length;
	for(i=0;i<len;i++)
	{
		if(tableObj.rows[i].id == IdStr)
		{
			return i;
		}
	}
	return -1;
}

//添加一项
function addGetItem(tableObj,itemName,ItemValue,index,styleStr)
{
	//名称
	var tableRow = tableObj.insertRow(index);
	var tableValueTd = document.createElement('td');
	tableValueTd.innerHTML = itemName+": " +ItemValue;
	tableRow.appendChild(tableValueTd);
	//值
	if(styleStr!="")
		tableRow.className = styleStr;
}

//在表格中添加获取或者损失的物品项
function addGetItemsToTable(tableObj)
{
	var iIndex = -1;//getTableNameIndex(tableObj,"LostFlagStart");
	var iType = getUserType();
	//攻击者
	if(iType == 0)
	{
		addAttackGetItem(tableObj,iIndex);
	}
	//防守者
	else if(iType == 1)
	{
		addDefeatGetItem(tableObj,iIndex);
	}
	//联防方和联防邮件转发
	else if(iType == 2)
	{
		addUniteGetItem(tableObj,iIndex);
	}
	//非联防邮件转发
	else
	{
		addOtherGetItem(tableObj,iIndex);
	}
}

//自己是攻击方
function addAttackGetItem(tableObj,index)
{
	var heroInfo = "";
	var iteminfo = "";
	if(typeof(oR.atAddedPrize)!='undefined')
	{
		for(var i=0;i<oR.atAddedPrize.length;i++)
		{
			if(oR.atAddedPrize[i].iHarvestType == 6)
			{
				//判断英雄是否处于非激活状态
				if(oR.atAddedPrize[i].iHarvestData != 4)
					heroInfo += oR.atAddedPrize[i].szRemark+" ";
				else if(oR.iWarResult == 0)
					heroInfo += oR.atAddedPrize[i].szRemark+"<span style='color:red'>(已有英雄已达上限该英雄被系统临时存储，请尽快清理已有英雄)</span>";
				else
					heroInfo += oR.atAddedPrize[i].szRemark+" ";
			}
			if(oR.atAddedPrize[i].iHarvestType == 4)
			{
				var itemcfg = top.getItemConfig(oR.atAddedPrize[i].iHarvestID);
				if(itemcfg!=0)
						iteminfo += iteminfo+itemcfg.name+"×"+oR.atAddedPrize[i].iHarvestData+" ";
			}
		}
		if(heroInfo!="")
		{
			heroInfo = '<span class="topheroname">'+heroInfo+'</span>';
		}
		
	}
	//获胜
	if(oR.iWarResult == 0)
	{
		var resStr = getResourceInfo();
		if(resStr!="")
			addGetItem(tableObj,"获得资源",resStr,index);
		//检查是否获得英雄和宝物
		//检查是否获得道具

		if(heroInfo!="")
		{
			//判断英雄状态
			addGetItem(tableObj,"俘虏英雄",heroInfo,index);
		}
		if(iteminfo!="")
		{
			addGetItem(tableObj,"获得道具",iteminfo,index);
		}
	}
	//失败
	else if(oR.iWarResult == 1)
	{
		//检查是否获损失英雄和宝物
		if(heroInfo!="")
		{
			addGetItem(tableObj,"损失英雄",heroInfo,index);
		}
		
	}
}
//自己是防守方
function addDefeatGetItem(tableObj,index)
{
	var heroInfo = "";
	var iteminfo = "";
	if(typeof(oR.atAddedPrize)!='undefined')
	{
		for(var i=0;i<oR.atAddedPrize.length;i++)
		{
			if(oR.atAddedPrize[i].iHarvestType == 6)
			{
				//判断英雄是否处于非激活状态
				if(oR.atAddedPrize[i].iHarvestData != 4)
					heroInfo += oR.atAddedPrize[i].szRemark+" ";
				else if(oR.iWarResult == 1)
					heroInfo += oR.atAddedPrize[i].szRemark+"<span style='color:red'>(已有英雄已达上限该英雄被系统临时存储，请尽快清理已有英雄)</span>";
				else
					heroInfo += oR.atAddedPrize[i].szRemark+" ";
			}
			if(oR.atAddedPrize[i].iHarvestType == 4)
			{
				var itemcfg = top.getItemConfig(oR.atAddedPrize[i].iHarvestID);
				if(itemcfg!=0)
						iteminfo += iteminfo+itemcfg.name+"×"+oR.atAddedPrize[i].iHarvestData+" ";
			}
		}
		if(heroInfo!="")
		{
			heroInfo = '<span class="topheroname">'+heroInfo+'</span>';
		}
		
	}
	//失败
	if(oR.iWarResult == 0)
	{
		var resStr = getResourceInfo();
		if(resStr!="")
			addGetItem(tableObj,"损失资源",resStr,index);
		//检查是否获损失英雄和宝物
		if(heroInfo!="")
		{
			addGetItem(tableObj,"损失英雄",heroInfo,index);
		}
		
		
	}
	//胜利
	else if(oR.iWarResult == 1)
	{
		var resStr = getResourceInfo();
		if(resStr!="")
			addGetItem(tableObj,"获得资源",resStr,index);
		//检查是否获得英雄和宝物
		//检查是否获得道具
		if(heroInfo!="")
		{
			addGetItem(tableObj,"俘虏英雄",heroInfo,index);
		}
		if(iteminfo!="")
		{
			addGetItem(tableObj,"获得道具",iteminfo,index);
		}
	}
}
//自己是联防方或者联防邮件转发
function addUniteGetItem(tableObj,index)
{
	//失败
	if(oR.iWarResult == 0)
	{
		//检查是否获损失英雄和宝物
	}
	//胜利
	else if(oR.iWarResult == 1)
	{
		//nothing
	}
}
//自己是军情转发的接受者
function addOtherGetItem(tableObj,index)
{
	var sName = "";
	if(oR.iWarResult == 0)
	{
	}
	else if(oR.iWarResult == 1)
	{
	}
	else
	{
		return ;
	}
	var resStr = getResourceInfo();
	if(resStr!="")
		addGetItem(tableObj,sName+"获得资源",resStr,index);
	var heroInfo = "";
	var iteminfo = "";
	if(typeof(oR.atAddedPrize)!='undefined')
	{
		for(var i=0;i<oR.atAddedPrize.length;i++)
		{
			if(oR.atAddedPrize[i].iHarvestType == 6)
				heroInfo += oR.atAddedPrize[i].szRemark+" ";
			if(oR.atAddedPrize[i].iHarvestType == 4)
			{
				var itemcfg = top.getItemConfig(oR.atAddedPrize[i].iHarvestID);
				if(itemcfg!=0)
						iteminfo += iteminfo+itemcfg.name+"×"+oR.atAddedPrize[i].iHarvestData+" ";
			}
		}
		if(heroInfo!="")
		{
			heroInfo = '<span class="topheroname">'+heroInfo+'</span>';
		}
		
	}
	//检查是否获得英雄和宝物
	//检查是否获得道
	if(heroInfo!="")
	{
		addGetItem(tableObj,"俘虏英雄",heroInfo,index);
	}
	if(iteminfo!="")
	{
		addGetItem(tableObj,"获得道具",iteminfo,index);
	}
}

//获取兵种图片的url
function getArmyPicUrl(iType,maskArray)
{
	var arrPicUrl=[];
	var iStart0 = 39;//top.arm_start_arid;
	var iNum0 = 11;
	var iStart1 = 50;//top.arm_end_arid;
	var iNum1 = 9;
	if(iType == 0)
	{
		var iCount = 0;
		for(i =0;i<iNum0;i++)
		{
			var hintstr = mb.Buidings[iStart0+i].BuildingName;
			if((maskArray.length>i&&maskArray[i] == 0)||maskArray.length<=i)
				arrPicUrl[iCount++] = '<img  title="'+hintstr+'" src=\"../../images/army/bz'+(i+1)+'.png\" />';
			
		}
	}
	else
	{
		
		for(i = 0;i<iNum1;i++)
		{
			var hintstr = mb.Buidings[iStart1+i].BuildingName;
			arrPicUrl[i] = '<img title="'+hintstr+'" src="../../images/army/sz'+(i+1)+'.png" />'
		}
	}
	return arrPicUrl;
}

//获取资源图片
function getResPicUrl(strName,hintstr)
{
	var sUrl="";
	
	sUrl = '<img title="'+hintstr+'" src="../../images/army/'+strName+'.png" />';
	
	return sUrl;
}


//添加战斗方表格信息
function addBatArmyTableInfo(tableObj,dataObject,sTitle,sName,maskArray,fitObject,iNum,iType)
{
	//出征
	var iNameWidth = 55;
	var iValuieWidth = 44;
	var outArray = getMaskArray(dataObject[0],maskArray);
	var injureArray = getMaskArray(dataObject[1],maskArray);
	var reliveArray = getMaskArray(dataObject[2],maskArray);
	//injureArray-reliveArray = diedArray
	var diedArray = getArrayMinus(injureArray,reliveArray);
	var picArrayUrl = getArmyPicUrl(iType,maskArray);

	addTableTitle(tableObj,sTitle,sName,iNum,55);
	addTableLineInfo(tableObj,"兵种",picArrayUrl,iNum,"-",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"出征",outArray,iNum,"0",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"伤亡",injureArray,iNum,"0",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"复活",reliveArray,iNum,"0",iNameWidth,iValuieWidth);
	var tableRow = addTableLineInfo(tableObj,"阵亡",diedArray,iNum,"0",iNameWidth,iValuieWidth);
	tableRow.className = "death";

	addFitToTable(tableObj,fitObject);
}
//添加随机点的战斗信息
function addRandomArmyTableInfo(tableObj,dataObject,sName,maskArray,iNum)
{
	//出征
	var iNameWidth = 55;
	var iValuieWidth = 44;
	var outArray = getMaskArray(dataObject[0],maskArray);
	var injureArray = getMaskArray(dataObject[1],maskArray);

	var picArrayUrl = getArmyPicUrl(1,maskArray);

	addTableTitle(tableObj,"",sName,iNum,55);
	addTableLineInfo(tableObj,"兵种",picArrayUrl,iNum,"-",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"出征",outArray,iNum,"0",iNameWidth,iValuieWidth);
	var tableRow = addTableLineInfo(tableObj,"阵亡",injureArray,iNum,"0",iNameWidth,iValuieWidth);
	tableRow.className = "death";
}

//添加联防方信息汇总表格信息
function addAllUniteTableInfo(tableObj,dataObject,maskArray,iNum)
{
	var iNameWidth = 55;
	var iValuieWidth = 44;
	var iLen = dataObject.length;
	var armData = {"astArmyInfo":[{"ashArmy":[0,0,0,0,0,0,0,0,0,0,0,0,0]},
				{"ashArmy":[0,0,0,0,0,0,0,0,0,0,0,0,0]},
				{"ashArmy":[0,0,0,0,0,0,0,0,0,0,0,0,0]}]};
	var fitData =[0,0,0,0];
	for(i=0;i<iLen;i++)
	{
		for(j=0;j<iNum;j++)
		{
			armData.astArmyInfo[0].ashArmy[j] += getArrayValue(dataObject[i].astArmyInfo[0].ashArmy,j);
			armData.astArmyInfo[1].ashArmy[j] += getArrayValue(dataObject[i].astArmyInfo[1].ashArmy,j);
			armData.astArmyInfo[2].ashArmy[j] += getArrayValue(dataObject[i].astArmyInfo[2].ashArmy,j);
		}
		for(j=0;j<4;j++)
		{
			fitData[j] = fitData[j]+getArrayValue(oR.astUniteArmy[i].astOutfitInfo[1].achOutfit,j);
		}
	}

	var outArray = getMaskArray(armData.astArmyInfo[0].ashArmy,maskArray);
	var injureArray = getMaskArray(armData.astArmyInfo[1].ashArmy,maskArray);
	var reliveArray = getMaskArray(armData.astArmyInfo[2].ashArmy,maskArray);
	//injureArray-reliveArray = diedArray
	var diedArray = getArrayMinus(injureArray,reliveArray);
	
	var picArrayUrl = getArmyPicUrl(0,maskArray);
	var sHeroContent = getUniteHeroNumStr();
	//addTableLineInfo(tableObj,"联防英雄",sName,outArray.length);
	addTableTitle(tableObj,"联防英雄",sHeroContent,iNum,55);
	addTableLineInfo(tableObj,"联防兵力",picArrayUrl,iNum,"-",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"出征",outArray,iNum,"0",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"伤亡",injureArray,iNum,"0",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,"复活",reliveArray,iNum,"0",iNameWidth,iValuieWidth);
	var tableRow = addTableLineInfo(tableObj,"阵亡",diedArray,iNum,"0",iNameWidth,iValuieWidth);
	tableRow.className = "death";
	addFitToTable(tableObj,fitData);
	
}
//添加防守方表格信息
function addDefeatTableInfo(tableObj,dataObject,sName,maskArray,fitObject,iNum)
{

	addBatArmyTableInfo(tableObj,dataObject,"防守方",sName,maskArray,fitObject,iNum,0);
	addCityToTable(tableObj);
	addBuildToTable(tableObj);
	
}



function addAttackTableInfo(tableObj,dataObject,sName,maskArray,fitObject,iNum)
{
	addBatArmyTableInfo(tableObj,dataObject,"进攻方",sName,maskArray,fitObject,iNum,0);
}

function addOneUniteTableInfo(tableObj,dataObject,sName,maskArray,fitObject,iNum)
{
	addBatArmyTableInfo(tableObj,dataObject,"联防方",sName,maskArray,fitObject,iNum,0);
}

//获取装备名字
function getFitName(iIndex)
{
	var fitName;

	if(iIndex == 0)
		fitName = "青铜甲";
	if(iIndex == 1)
		fitName = "白银甲";
	if(iIndex == 2)
		fitName = "黄金甲";
	if(iIndex == 3)
		fitName = "圣甲";
	return fitName;
}
//表格装备信息
function addFitToTable(tableObj,dataObject)
{
	var tableRow = tableObj.insertRow(-1);
	var tableNameTd = document.createElement('td');
	
	tableNameTd.innerHTML = "装备损失";

	tableRow.appendChild(tableNameTd);
	
	var tableValueTd = document.createElement('td');
	tableValueTd.colSpan=11;
	tableValueTd.align="center";
	var sContent="";
	for(i=0;i<4;i++)
	{
	if(dataObject[i] != 0)
		sContent = sContent+getFitName(i)+" "+dataObject[i]+"件  ";
	}
	if(sContent == "")
		sContent = "无";
	tableValueTd.innerHTML = sContent;
	tableRow.appendChild(tableValueTd);
}
//表格城防信息
function addCityToTable(tableObj)
{
	var tableRow = tableObj.insertRow(-1);
	var tableNameTd = document.createElement('td');
	
	tableNameTd.innerHTML = "城防损失";

	tableRow.appendChild(tableNameTd);
	
	var tableValueTd = document.createElement('td');
	tableValueTd.colSpan=11;
	var sContent=showLostFort();
	
	tableValueTd.innerHTML = sContent;
	tableRow.appendChild(tableValueTd);
	
	var secondRow = tableObj.insertRow(-1);
	tableValueTd = document.createElement('td');
	tableValueTd.colSpan=12;
	if(oR.CBillFortInfo.iSerStation <=0)
	{
		sContent ="没有工匠铺,无法恢复"
	}
	else
		sContent = oR.CBillFortInfo.iSerStation+"级工匠铺 "+mbr.Buidingranks[17].rank[oR.CBillFortInfo.iSerStation-1].Data;
	tableValueTd.innerHTML = sContent;
	secondRow.appendChild(tableValueTd);
	
}
//表格建筑信息
function addBuildToTable(tableObj)
{
	var tableRow = tableObj.insertRow(-1);
	var tableNameTd = document.createElement('td');
	
	tableNameTd.innerHTML = "建筑损失";

	tableRow.appendChild(tableNameTd);
	
	var tableValueTd = document.createElement('td');
	tableValueTd.colSpan=11;
	var sContent="建筑A××级->××级    建筑A××级->××级    建筑A××级->××级";
	
	tableValueTd.innerHTML = sContent;
	tableRow.appendChild(tableValueTd);
}

//获取防守方的装备信息
function getachOutfit( iType)
{
	if(getUserType()!= 2)
		return oR.astMainArmy[1].astOutfitInfo[1].achOutfit[iType];
	else
		return oR.astUniteArmy[0].astOutfitInfo[1].achOutfit[iType];
}
//当前时间字符串
function getTimeStr()
{
	var str;
	var starttimeL = new Date();
	starttimeL.setTime(oR.iTime*1000);
	str = starttimeL.toLocaleString()
	return str;
}

//获取掉落物品的种类名字
function getObjectTypeName(iType)
{
	var sNames= ["未知物品","金币","资源","材料","道具","宝物","英雄"];
	if(iType>6)
		return "未知物品";
	return sNames[iType];
}

function getObjectPicStr(iType,id,iData,szRemark)
{
	var sPicStr = "";
	if(iType ==1)
	{
		sPicStr = getResPicUrl("jb","金币")+iData;
	}
	else if(iType ==2)
	{
		var sData = [];
		sData[0] = sData[1] = sData[2] = sData[3] = iData;
		sPicStr = getResource(sData);
	}
	else if(iType == 4)
	{
		var itemcfg = top.getItemConfig(id);
		if(itemcfg!=0)
			sPicStr = sPicStr+itemcfg.name+"×"+iData;
	}
	else if(iType == 5)
	{
		sPicStr = getResPicUrl("bw","宝物")+szRemark;
		//状态为临时区宝物
		if(iData == 3)
		{
			sPicStr = sPicStr+"<span style='color:red'>(已有宝物已达上限该宝物被系统临时存储，请尽快清理已有宝物)</span>";
		}
	}
	else if(iType==6)
	{
		sPicStr = getResPicUrl("hero","英雄")+szRemark;
		//状态为临时区英雄
		if(iData == 4)
		{
			sPicStr = sPicStr+"<span style='color:red'>(已有英雄已达上限该英雄被系统临时存储，请尽快清理已有英雄)</span>";
		}
	}
	else if(iType==3)
	{
		sPicStr = sPicStr+top.toMaterilName(id)+"×"+iData;
	}
	else
	{
		sPicStr = sPicStr+iData;
	}
	return sPicStr;
}

//添加掉落物品项
function addLostObjectToTable(tableObj,dataObject,index)
{
	var tableRow = tableObj.insertRow(index);
	var tableNameTd = document.createElement('td');
	var sName = getObjectTypeName(dataObject.iHarvestType);

	tableNameTd.innerHTML = "获得"+sName+": "+getObjectPicStr(dataObject.iHarvestType,dataObject.iHarvestID,dataObject.iHarvestData,dataObject.szRemark);
	

	tableRow.appendChild(tableNameTd);
}

//随机点添加所有的掉落物品项
function addAllLostObject(tableObj,dataObject,index)
{
	for(i=0;i<dataObject.length;i++)
	{
		addLostObjectToTable(tableObj,dataObject[i],index);
	}
}

function addRandomItemsToTable(tableObj)
{
	var iIndex = -1; //getTableNameIndex(tableObj,"LostFlagStart");
	addAllLostObject(tableObj,oR.atPayPrize,iIndex);
}


function showMapTab(iCityGrid)
{
	top.ShowTab('citymap',2);
	top.objFlashEng.Send(top.GetWorldMap(iCityGrid));
}

function getNickNameStr(cityInfo)
{
	var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+cityInfo.szNick+'\')"/>';
	return '<span class="playername" onclick = "top.GetOtherPlayerInfo('+cityInfo.iUin+')">'+cityInfo.szNick+'</span>'+shtml;
}

function getStyleNickName(szNick,iUin)
{
	var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+szNick+'\')"/>';
	return '<span class="playername" onclick = "top.GetOtherPlayerInfo('+iUin+')">'+szNick+'</span>'+shtml;
}

function getUniteNameStr(index)
{
	var shtml = '<img align="absmiddle"  src="/images/mail_armymailicon.gif" class="imghand" onclick = "top.gotoSendMail(\''+cityInfo.szNick+'\')"/>';
	return '<span class="playername" onclick = "top.GetOtherPlayerInfo('+oR.astUniteArmy[index].iMasterUin+')">'+oR.astUniteArmy[index].szMasterNick+'</span>'+shtml;
}

function getCityNameStr(cityInfo)
{
	return '<span class="cityname" onclick = "showMapTab('+cityInfo.iCityGrid+')">'+cityInfo.szCityName+getCityPivot(cityInfo.iCityGrid)+'</span>';
}

function getCityStyleName(iCrid,szCityName)
{
	return '<span class="cityname" onclick = "showMapTab('+iCrid+')">'+szCityName+getCityPivot(iCrid)+'</span>';
}

function getResultNameStr(cityInfo)
{
	return '<span class="result">'+getNickNameStr(cityInfo)+'</span>';	
}

function getWarResultStr()
{
	var result;
	if(oR.iWarResult ==0) result=getResultNameStr(oR.astCityInfo[0]) + " 胜";
	if(oR.iWarResult ==1) result=getResultNameStr(oR.astCityInfo[1]) + " 胜";
	if(oR.iWarResult ==2) result="平局";
	return result;
}

//输出标题
function outPutTitle()
{
	var userType = getUserType();
	var sTitle;
	if(userType == 0 || userType == 3)
	{
		var result;
		if(oR.iWarResult ==0) result="大胜而归。";
		if(oR.iWarResult ==1) result="失败而回。";
		if(oR.iWarResult ==2) result="平局收场。";
		sTitle =getNickNameStr(oR.astCityInfo[0])+"的部队对" +
				getNickNameStr(oR.astCityInfo[1])+"的"+getCityNameStr(oR.astCityInfo[1])+
				"城发起攻击行动，"+result;
	}
	else if(userType == 1)
	{
		if(oR.iWarResult ==0) result="防守失败。";
		if(oR.iWarResult ==1) result="防守成功。";
		if(oR.iWarResult ==2) result="平局收场。";
		sTitle =getNickNameStr(oR.astCityInfo[1])+"的" +getCityNameStr(oR.astCityInfo[1])+
				"城受到"+getNickNameStr(oR.astCityInfo[0])+
				"前来的袭击，"+result;
	}
	else if(userType == 2)
	{
		//昵称，没有传过来，先用qq号
		sTitle =getUniteNameStr(0)+"在"+getCityNameStr(oR.astCityInfo[1])+"城的部队遭受攻击！";
	}
	return sTitle;
}

//获取联防方的名字
function getUniteName()
{
	if(getUserType()!= 2)
		return "联防方";
	else 
		return getUniteNameStr(0);
}


//获取城市信息：0 进攻方，1防守方
function getCityInfo(iType)
{
 	var sName="";
	if(iType ==0 || iType ==1)
	{
		sName = getNickNameStr(oR.astCityInfo[iType])+"辖下的"+getCityNameStr(oR.astCityInfo[iType])+"城";
	}
	
	return sName;
}



//iType = 0 攻击 ;iType=1 联防
function buildAddTable(tableobj,astCityInfo,armyinfo,iType)
{
	var iNameWidth = 165;
	var iValuieWidth = 80;
	var sName=[];
	var iCount = 0;
	for(i = 0;i<armyinfo.length;i++)
	{
		if(iType == 0)
			sName[i] = getNickNameStr(oR.astCityInfo[i]);
		//昵称，没有传过来，先用qq号
		else
		{
			sName[i] = getUniteNameStr(i);
		}
		if(countAttributeNotZero(armyinfo[i].ashAttribute) != 0)
		{
			iCount++;
		}
	}
	if(iCount == 0)
		return;
	addTableLineInfo(tableobj,"玩家名：",sName,sName.length,"",iNameWidth,iValuieWidth);
	
	var sValue = ["-","-"];
	//addTableLineInfo(tableobj,"武将对攻击力加成：",sValue,armyinfo.length,"-",iNameWidth,iValuieWidth);
	//addTableLineInfo(tableobj,"文韬武略对攻击力加成:",sValue,armyinfo.length,"-",iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,1,"科技（利刃）对战斗力加成：",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,2,"科技（神箭）对战斗力加成：",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,3,"科技（护甲）对防御力加成：",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,4,"科技（筑城）对城防加成",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,6,"宝物对近战攻击加成：",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,7,"宝物对远程攻击加成：",armyinfo,iNameWidth,iValuieWidth);
	addItemToAddTable(tableobj,8,"宝物对防御力加成：",armyinfo,iNameWidth,iValuieWidth);	
	addItemToAddTable(tableobj,11,"家族对攻击属性加成：",armyinfo,iNameWidth,iValuieWidth);	
	addItemToAddTable(tableobj,12,"家族对防御属性加成：",armyinfo,iNameWidth,iValuieWidth);	
	addItemToAddTable(tableobj,13,"武略对攻击属性加成：",armyinfo,iNameWidth,iValuieWidth);	
	addItemToAddTable(tableobj,14,"文韬对防御属性加成：",armyinfo,iNameWidth,iValuieWidth);	
}

function addItemToAddTable(tableobj,index,name,armyinfo,iNameWidth,iValueWidth)
{
	var attributeValue=[];
	var iCount = 0;
	for(i=0;i< armyinfo.length;i++)
	{
		if(armyinfo[i].ashAttribute.length<index+1)
			attributeValue[i] = "-";
		else
		{
			if(armyinfo[i].ashAttribute[index] == 0)
				attributeValue[i] = "-";
			else
			{
				attributeValue[i]= (armyinfo[i].ashAttribute[index]/10)+"%";
				iCount++;
			}
		}
	}
	if(iCount!=0)
		addTableLineInfo(tableobj,name,attributeValue,armyinfo.length,"-",iNameWidth,iValueWidth);
}


//获取坐标字符串
function getCityPivot(sGriID,iNum)
{
	if(sGriID.length<iNum)
	  alert("city : "+sGriID+" not valid" );
	var sID = sGriID.toString();
	var xPos = (sGriID-sGriID%1000)/1000;
	var yPos = sGriID%1000;
	var sPovit = "("+xPos+","+yPos+")";
	
	return sPovit;
	 
}

//
function getResource(obj)
{
	var str = getResPicUrl("ls","粮食")+" "+obj[0]+"  "+getResPicUrl("mt","木头")+" "+obj[1]+"  "+getResPicUrl("tk","铁矿")+" "+obj[2]+"  "+getResPicUrl("sl","石料")+" "+obj[3];
	return str;
}


function getWarResultInfo()
{
	var sInfo="";
	if(getUserType() != 2)
	{
		if(oR.iWarResult ==0) sInfo = getResultNameStr(oR.astCityInfo[0])+"胜";
		if(oR.iWarResult ==1) sInfo = getResultNameStr(oR.astCityInfo[1])+"胜";
		if(oR.iWarResult ==2) sInfo = "平局";
	}
	return sInfo;
}
function getResourceInfo()
{
	var sInfo = "";
	var iCount = 0;
	for(i=0;i<oR.atPayPrize.length;i++)
		iCount= iCount+oR.atPayPrize[i];
	if(iCount == 0)
		return sInfo;
		
	if(getUserType() != 2) 
	{
		sInfo = getResource(oR.atPayPrize);//getResPicUrl("ls","粮食")+" "+oR.atPayPrize[0]+"  "+getResPicUrl("mt","木头")+" "+oR.atPayPrize[1]+"  "+getResPicUrl("tk","铁矿")+" "+oR.atPayPrize[2]+"  "+getResPicUrl("sl","石料")+" "+oR.atPayPrize[3];
	}
	return sInfo;
}



//获取掉落道具信息
function getItemInfo()
{
	var sInfo = "";
	return sInfo;
}

//获取战力信息
function getPowerInfo(iType)
{
	var sInfo = "";
	if(getUserType() != 2)
	{ 
		if(iType == 0)
		{
			sInfo = sInfo+oR.iInvaderValue;
		}
		else if(iType == 1)
		{
			sInfo = sInfo+oR.iTargetValue;
		}
	}
	return sInfo;
	
}

function addAttackPowerInfo(tableObj)
{

	var tableRow = tableObj.insertRow(-1);
	var tableValueTd = document.createElement('td');
	var itemName = '<span class="power">攻方战力:' + getPowerInfo(0);
	var ItemValue = "   攻方损失:" + getTotalLostInfo(0);
	tableValueTd.innerHTML = itemName+ItemValue;
	tableRow.appendChild(tableValueTd);
	tableRow = tableObj.insertRow(-1);
	
	tableValueTd = document.createElement('td');
	itemName = '<span class="power">守方战力:' + getPowerInfo(1);
	ItemValue = "   守方损失:" + getTotalLostInfo(1);
	tableValueTd.innerHTML = itemName+ItemValue;
	tableRow.appendChild(tableValueTd);
	
}

//显示攻击方的信息
function showAttackTableInfo()
{
	var maskArray = [0,0,1,1];
	var astArmy = [];
	if(getUserType() != 2)
	{
		$("attack_info").style.display="block";
		if(oR.astMainArmy.length == 0)
			return;
		astArmy[0] = oR.astMainArmy[0].astArmyInfo[0].ashArmy;
		astArmy[1] = oR.astMainArmy[0].astArmyInfo[1].ashArmy;
		astArmy[2] = oR.astMainArmy[0].astArmyInfo[2].ashArmy;
		addAttackTableInfo($("attack_info"),astArmy,getCityInfo(0),maskArray,oR.astMainArmy[0].astOutfitInfo[1].achOutfit,9);
	}
}
//随机点攻击方信息
function showRandomAttackInfo()
{
	var maskArray = [0,0,1,1];
	var astArmy = [];
	if(oR.astMainArmy.length == 0)
			return;
	$("attack_info").style.display="block";
	astArmy[0] = oR.astMainArmy[0].astArmyInfo[0].ashArmy;
	astArmy[1] = oR.astMainArmy[0].astArmyInfo[1].ashArmy;
	astArmy[2] = oR.astMainArmy[0].astArmyInfo[2].ashArmy;
	addAttackTableInfo($("attack_info"),astArmy,getRandomCityInfo(0),maskArray,oR.astMainArmy[0].astOutfitInfo[1].achOutfit,9);
}
//显示联防方的信息
function showUniteTableInfo()
{
	var maskArray = [0];
	var astArmy = [];
	$("unite_info").style.display="block";
	if(getUserType() == 2)
	{
		if(oR.astUniteArmy.length>0)
		{
			astArmy[0] = oR.astUniteArmy[0].astArmyInfo[0].ashArmy;
			astArmy[1] = oR.astUniteArmy[0].astArmyInfo[1].ashArmy;
			astArmy[2] = oR.astUniteArmy[0].astArmyInfo[2].ashArmy;
			var sName = getStyleStr(getUniteName(),"randomname");
			addOneUniteTableInfo($("unite_info"),astArmy,
					sName,maskArray,oR.astUniteArmy[0].astOutfitInfo[1].achOutfit,11);
		}
	}
	else if(oR.astUniteArmy.length>0) addAllUniteTableInfo($("unite_info"),oR.astUniteArmy,		                           maskArray,11);
	else $("unite_info").style.display="none";
	
}
//显示防御方的信息
function showDefeadTableInfo()
{
	var maskArray = [0];
	var astArmy = [];
	if(getUserType() != 2)
	{
		$("defeat_info").style.display= "block"
		if(oR.astMainArmy.length <= 1)
				return;
		astArmy[0] = oR.astMainArmy[1].astArmyInfo[0].ashArmy;
		astArmy[1] = oR.astMainArmy[1].astArmyInfo[1].ashArmy;
		astArmy[2] = oR.astMainArmy[1].astArmyInfo[2].ashArmy;
		addDefeatTableInfo($("defeat_info"),astArmy,getCityInfo(1),maskArray,oR.astMainArmy[1].astOutfitInfo[1].achOutfit,11);
	}
}

//随机点防御信息
function showDefeadRandomInfo()
{
	var maskArray = [0];
	var astArmy = [];
	if(oR.astMainArmy.length <= 1)
				return;
	$("defeat_info").style.display= "block";
	astArmy[0] = oR.astMainArmy[1].astArmyInfo[0].ashArmy;
	astArmy[1] = oR.astMainArmy[1].astArmyInfo[1].ashArmy;
	astArmy[2] = oR.astMainArmy[1].astArmyInfo[2].ashArmy;
	var sRandomName = getStyleStr("据点"+getCityPivot(oR.iRandomPlace),"randomname");
	addRandomArmyTableInfo($("defeat_info"),astArmy,sRandomName,maskArray,9);	
}
//添加部队详情信息
function addArmyInfo(tableObj,stArmy,Name,Num)
{

	var maskArray = [0];
	var picArrayUrl = getArmyPicUrl(0,maskArray);
	var iNameWidth = 55;
	var iValuieWidth = 44;
	
	//addTableTitle(tableObj,"联防方",sName,outArray.length);
	addTableLineInfo(tableObj,"兵种",picArrayUrl,Num,"-",iNameWidth,iValuieWidth);
	addTableLineInfo(tableObj,Name,stArmy,Num,"0",iNameWidth,iValuieWidth);
}

//显示加成信息
function showAddTableInfo()
{
	$("addValueTable").style.display= "block"
	if(getUserType() == 2)
	{
		buildAddTable($("addValueTable"),oR.astCityInfo,oR.astUniteArmy,1)
	}
	else 
	{
		buildAddTable($("addValueTable"),oR.astCityInfo,oR.astMainArmy,0);
	}
}

//for attack
////////////////////////////////////////////////////////

function getAttackBackTitle()
{
	var sTitle = "";
	var sAction = "返回"
	
	sTitle =getNickNameStr(oR.astCityInfo[0])+"辖下的"+getCityNameStr(oR.astCityInfo[0])+"城对" +
				getNickNameStr(oR.astCityInfo[1])+"的"+getCityNameStr(oR.astCityInfo[1])+
				"城进攻的部队已";
	if(oR.iWarResult == 4 )
	{
		sAction = "召回"
	}
	sTitle = sTitle+sAction;
	return sTitle;
	
}
function getAttackNoActionTitle()
{
	var sName = "";
	sName = "攻击失败,目标城坐标已经改变,部队开始返回";
	
	return sName;
}
////////////////////////////////////////////////////////////////////////

//for exploit 
//
//获取exploit的 title
function getExploitTitle()
{
	var sTitle = "";
	if(oR.iWarResult == 0)
	{
		sTitle = getNickNameStr(oR.CCitySumInfo)+"成功在荒地"+
				getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3)+"建立了新城";
	}
	else
	{
		sTitle = getNickNameStr(oR.CCitySumInfo)+"在荒地"+
				getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3)+"建立新城的拓荒行动失败";
	}
	return sTitle;
}

function getExploiter()
{
	return getNickNameStr(oR.CCitySumInfo)+"辖下的" + getCityNameStr(oR.CCitySumInfo)+"城";
}
//获取新城名字
function addNewCityName(tableObj)
{
	if(oR.iWarResult == 0)
	{
		var tableRow = tableObj.insertRow(-1);
		var tableNameTd = document.createElement('td');
		tableNameTd.colspan = 2;
		tableNameTd.innerHTML = "新城名："+getCityStyleName(oR.astNewCityInfo[0].iNewCityGridID,oR.astNewCityInfo[0].szCityName)+"城";
		tableRow.appendChild(tableNameTd);
	}
}

function getExploitBackTitle()
{
	var sTitle = "";
	
	sTitle = getNickNameStr(oR.CCitySumInfo)+"去荒地"+
				getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3)+"拓荒的部队已";
	
	var sInfo = "返回.";
	if(oR.iWarResult == 4)
	{
		sInfo = "召回."
	}
	return sTitle+sInfo;
}
//////////////////////////////////////

function getStyleStr(str,style)
{
	return '<span class="'+style+'">'+str+'</span>';
}


//////////////
//for random
//输出标题

//获取攻打随机点的城市信息：0 进攻方，1防守方
function getRandomCityInfo(iType)
{
 	var sName="";
	if(iType ==0 )
	{
		sName = getNickNameStr(oR.CCitySumInfo)+"辖下的"+getCityNameStr(oR.CCitySumInfo)+"城";
	}
	else
	{
		var sRandomName = "据点"+getCityPivot(oR.iRandomPlace);
		sName= getStyleStr(sRandomName,"randomname");
	}
	
	return sName;
}

function outPutRandomTitle()
{
	var sTitle;
	
	var result;
	if(oR.iWarResult ==0) result="大胜而归。";
	if(oR.iWarResult ==1) result="失败而回。";
	if(oR.iWarResult ==2) result="平局收场。";
	var sRandomName = "据点"+getCityPivot(oR.iRandomPlace);
	sTitle =getNickNameStr(oR.CCitySumInfo)+"的部队对" +
			getStyleStr(sRandomName,"randomname")+
			"发起剿灭行动，"+result;

	return sTitle;
}




function getRandomWarResultInfo()
{
	var sInfo="";
	var sRandomName = getStyleStr("据点"+getCityPivot(oR.iRandomPlace),"randomname");
	if(oR.iWarResult ==0) sInfo = getResultNameStr(oR.CCitySumInfo)+"胜";
	if(oR.iWarResult ==1) sInfo = getStyleStr(sRandomName,"result")+"胜";
	if(oR.iWarResult ==2) sInfo = "平局";
	
	return sInfo;
}

function getRandomBackTitle()
{
	var sTitle = "";
	var sAction = "返回"
	var sRandomName = "据点"+getCityPivot(oR.iRandomPlace);
	
	sTitle =getNickNameStr(oR.CCitySumInfo)+"辖下的"+getCityNameStr(oR.CCitySumInfo)+"城对" +
				getStyleStr(sRandomName,"randomname")+
				"进攻的部队已";
	if(oR.iWarResult == 4 )
	{
		sAction = "召回"
	}
	sTitle = sTitle+sAction;
	return sTitle;
	
}

function getRandomNoActionTitle()
{
	var sName = "";
	sName = "征剿失败,目标据点已经消失,部队开始返回";
	
	return sName;
}
/////////////////////////////////////////////////////////////////
//for redeploy

//输出标题
function getDeployTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"的"+getCityNameStr(oR.astCityInfo[0])+"城派驻"+
	getCityNameStr(oR.astCityInfo[1])+"城的部队已安全到达！";
	return sName;
}

function getDeployBackTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"的"+
	getCityNameStr(oR.astCityInfo[0])+"城派驻"+
	getCityNameStr(oR.astCityInfo[1])+"城的部队已被召回。";
	return sName;
}

function getDeployNoActionTitle()
{
	var sName = "";
	sName = "派驻失败,目标城的坐标已经改变,部队开始返回";
	
	return sName;
}
//获取城市信息：0 进攻方，1防守方
function getDeployCityInfo(iType)
{
	return getCityNameStr(oR.astCityInfo[iType])+"城";
}
////////////////////////////////////////////////////////////////

/////////////
//for spy
//输出摘要信息
function outputSpySumary(Obj)
{
	var sResult;
	if(Obj.iWarResult == 0)
	{
		sResult = getNickNameStr(Obj.astCityInfo[0])+"的侦查部队成功侦查"+
				getNickNameStr(Obj.astCityInfo[1])+"的"+getCityNameStr(Obj.astCityInfo[1])+"城！";
	}
	else if(Obj.iWarResult == 1)
	{
		sResult = getNickNameStr(Obj.astCityInfo[0])+"的侦查部队侦查"+
		getNickNameStr(Obj.astCityInfo[1])+"的"+getCityNameStr(Obj.astCityInfo[1])+"城失败";
	}
	else
	{
		sResult = getNickNameStr(Obj.astCityInfo[0])+"的侦查部队对"+
		getNickNameStr(Obj.astCityInfo[1])+"的"+getCityNameStr(Obj.astCityInfo[1])+"城的侦查未进行";
	}
	return sResult;
}
//输出结果信息
function outputSpyResult(Obj)
{
	var sResult;
	if(Obj.iWarResult == 0)
	{
		if(Obj.iGraspValue == 1000)
		{
			sResult = "成功(完美侦查)";
		}
		else
		{
			sResult = "成功";
		}
	}
	else if(Obj.iWarResult == 1)
		sResult = "失败";
	else
		sResult = "侦查未进行";
	return sResult;
	
}

function outputSpyInfoSummary(Obj)
{
	var sResProdect;
	var sResTotal;
	sResTotal = "资源产量："+getResPicUrl("mt","木头")+Obj.stSpyCity[0].atResPer[1]+
				"/小时 "+getResPicUrl("tk","铁矿")+Obj.stSpyCity[0].atResPer[2]+
				"/小时 "+getResPicUrl("sl","石料")+Obj.stSpyCity[0].atResPer[3]+
				"/小时 "+getResPicUrl("ls","粮食")+Obj.stSpyCity[0].atResPer[0]+"/小时";
	sResProdect = "资源库存："+getResPicUrl("mt","木头")+Obj.stSpyCity[0].atResCount[1]+
					"　"+getResPicUrl("tk","铁矿")+Obj.stSpyCity[0].atResCount[2]+
					"　"+getResPicUrl("sl","石料")+Obj.stSpyCity[0].atResCount[3]+
					"　"+getResPicUrl("ls","粮食")+Obj.stSpyCity[0].atResCount[0];
					
	var Row1 = $("summary_tab").insertRow(-1);
	var Row2 = $("summary_tab").insertRow(-1);
	var totalTD = document.createElement('td');

	totalTD.innerHTML=sResTotal;
	var prodectTD = document.createElement('td');

	prodectTD.innerHTML=sResProdect;
	Row1.appendChild(prodectTD);
	Row2.appendChild(totalTD);
}



function getStartIndex(iType)
{
	var startIndex = -1;
	for(var i=0;i<mb.Buidings.length;i++)
	{
		if(mb.Buidings[i].BuildingType == iType)
		{
			if(startIndex == -1)
				startIndex = i;
		}
		
	}
	return startIndex;
}
function getMbItemNum(iIndex,iType)
{
	if(iType == 4)
		return 11;
	var startIndex;
	var endIndex = -1;
	startIndex = -1;
	for(var i=iIndex;i<mb.Buidings.length;i++)
	{
		if(mb.Buidings[i].BuildingType == iType)
		{
			if(startIndex == -1)
				startIndex = i;
		}
		else if(mb.Buidings[i].BuildingType > iType)
		{
			endIndex = i;
			break;
		}
		if(i==mb.Buidings.length-1)
			endIndex = mb.Buidings.length;
		
	}
	return endIndex-startIndex;
	
}

function getInfoTypeStr(iType)
{
	if(iType>4)
		return "";
	var sValue = ["","建筑信息","科技信息","城防信息","军队信息"];
	return sValue[iType];
}

function addSpyTableInfo(table,sValues,iType,lineNum,sTiTleStyleName)
{
	if(iType<1||iType>4 )
		return;
	var endStr;
	if(iType == 1 || iType == 2)
		endStr = "级";
	else 
		endStr = "个";
		
	var startIndex =getStartIndex(iType);
	var iLen = getMbItemNum(startIndex,iType);
	
	if(startIndex == -1)
	{
		alert(iType +"not find");
	}
	var titleRow = addTableTitle(table,"",getInfoTypeStr(iType),lineNum-1,20);
	titleRow.cells[0].className = sTiTleStyleName;
	var tableValueRow;
	var tableNameRow;
	var  iDataLine = 0;
	for(var i=0;i<iLen;i++)
	{
		if(i%lineNum == 0)
		{
			//中间加一个空行
			if(i!=0)
			{
				var tableRow = table.insertRow(-1);
				var tableBlankTd = document.createElement('td');
				tableBlankTd.height = "12";
				tableBlankTd.colSpan = lineNum;
				tableRow.appendChild(tableBlankTd);
			}
			tableNameRow = table.insertRow(-1);
			tableValueRow = table.insertRow(-1);
			iDataLine++;
			
		}
		var tableNameTd = document.createElement('td');
		tableNameTd.style.fontWeight = "bold"
		var tableValueTd = document.createElement('td');
		tableNameTd.innerHTML = mb.Buidings[startIndex+i].BuildingName;
		if(sValues.length<=i || sValues[i]==0)
			tableValueTd.innerHTML ="-";
		else
			tableValueTd.innerHTML = sValues[i]+endStr;
		tableNameRow.appendChild(tableNameTd);
		tableValueRow.appendChild(tableValueTd);
	}
	var leftBank = lineNum*iDataLine-iLen;
	if(iDataLine>1)
	{
		for(j=0;j<leftBank;j++)
		{
			var tableNameTd = document.createElement('td');
			//tableNameTd.style.fontWeight = "bold"
			var tableValueTd = document.createElement('td');
			tableNameRow.appendChild(tableNameTd);
			tableValueRow.appendChild(tableValueTd);
		}
	}
}


function showSpyInfo()
{
	if(oR.iWarResult == 0)
	{
		$("total_info").style.display="block"
		outputSpyInfoSummary(oR);
		addSpyTableInfo($("armyInfo"),oR.stSpyCity[0].CCityArmy.ashArmy,4,11,"info_title");
		addSpyTableInfo($("FortInfo"),oR.stSpyCity[0].CCityFort.ashFort,3,10,"info_title");
		addSpyTableInfo($("cityInfo"),oR.stSpyCity[0].CCityItem.achItem,1,10,"info_title");					    	addSpyTableInfo($("techInfo"),oR.stSpyCity[0].CPlayerTech.achTech,2,10,"info_title");
	}
	
	
}

function getSpyBackTitle()
{
	var sName = "";
	sName =getNickNameStr(oR.astCityInfo[0])+"的"+
	getCityNameStr(oR.astCityInfo[0])+"城派往"+getNickNameStr(oR.astCityInfo[1])+"的"+
	getCityNameStr(oR.astCityInfo[1])+"城的侦查部队已";
	var sInfo = "返回.";
	if(oR.iWarResult == 4)
	{
		sInfo = "召回."
	}
	return sName+sInfo;
}
function getSpyNoActionTitle()
{
	var sName = "";
	sName = "刺探失败,目标城的坐标已经改变,部队开始返回";
	
	return sName;
}


//////////////////////////////////
//js  fpr transform
function getTransFormTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"的"+
	getCityNameStr(oR.astCityInfo[0])+"城运往"+getNickNameStr(oR.astCityInfo[1])+"的"+
	getCityNameStr(oR.astCityInfo[1])+"城的部队已安全到达！";
	return sName;
}


function getTransBackTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"的"+
	getCityNameStr(oR.astCityInfo[0])+"城运往"+getNickNameStr(oR.astCityInfo[1])+"的"+
	getCityNameStr(oR.astCityInfo[1])+"城的运输部队已";
	var sInfo = "返回.";
	if(oR.iWarResult == 4)
	{
		sInfo = "召回."
	}
	return sName+sInfo;
}

function getTransNoActionTitle()
{
	var sName = "";
	sName = "运输失败,目标城的坐标已经改变,部队开始返回";
	
	return sName;
}
//
///////// for unite
//js 
function getUniteTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"的"+
	getCityNameStr(oR.astCityInfo[0])+"城派往"+getNickNameStr(oR.astCityInfo[1])+"的"+
	getCityNameStr(oR.astCityInfo[1])+"城的部队已安全到达！";
	return sName;
}

function getFitInfo(obj)
{
	return "青铜甲"+obj[0]
	+"　白银甲"+obj[1]
	+"　黄金甲"+obj[2]
	+"　圣甲"+obj[3];
}

function getUniteBackTitle()
{
	var sName = "";
	sName = getNickNameStr(oR.astCityInfo[0])+"的"+
	getCityNameStr(oR.astCityInfo[0])+"城派往"+getNickNameStr(oR.astCityInfo[1])+"的"+
	getCityNameStr(oR.astCityInfo[1])+"城的部队已";
	var sInfo = "返回.";
	if(oR.iWarResult == 4)
	{
		sInfo = "召回."
	}
	return sName+sInfo;
}

function getUniteNoActionTitle()
{
	var sName = "";
	sName = "联防失败,目标城的坐标已经改变,部队开始返回";
	
	return sName;
}

///////////////////

///// 
//获取攻击的武将名字信息
//用于攻击返回和攻打随机点返回
function getAttHeroNamesStr(heroObject)
{
	
	if(typeof(heroObject) != 'undefined' && heroObject.length>0)
	{
		var Names="";
		for(var i=0;i<heroObject.length;i++)
		{
			Names+= heroObject[i].szName+" ";
			
		}
		return '<span class="topheroname">'+Names+'</span>';
	}
	return "无";
}

function getHeroNamesStr(heroNames)
{
	var Names= ""
	if(typeof(heroNames) != 'undefined')
	{
		for(var i=0;i<heroNames.length;i++)
		{
			Names+=heroNames[i]+" ";
		}
	}
	if(Names!="")
		return '<span class="topheroname">'+Names+'</span>';
	return "无"
}


function getHeroNumStr(iClass)
{
	if(iClass == 0)
	{
		return getAttHeroNumStr(oR.astMainArmy[0].stArmyHeroInfo);
	}
	else if(iClass == 1)
	{
		return getDefeatHeroNumStr(oR.astMainArmy[1].stArmyHeroInfo);
	}
	return "";
	
}


//获取攻击方武将的数目和损失信息
function getAttHeroNumStr(heroObject)
{
	var numStr = "0/0";
	if(typeof(heroObject) != 'undefined' && heroObject.length>0)
	{
		var iCount = 0;
		var totalCount = 0;
		for(var i=0;i<heroObject.length;i++)
		{
			if(heroObject[i].iHeroStat == 1)
				iCount++;
		}
		totalCount += heroObject.length;
		
		numStr = iCount+"/"+totalCount;
	}
	return numStr;
}
//获取防守方武将的数目和损失信息
function getDefeatHeroNumStr(heroObject)
{
	var numStr = "0/0";
	if(typeof(heroObject) != 'undefined' && heroObject.length>=0)
	{
		var totalCount = heroObject.length;
		var iCount = 0;
		for(var i=0;i<heroObject.length;i++)
		{
			if(heroObject[i].iHeroStat == 1)
				iCount++;
		}
		if(typeof(oR.astUniteArmy)!='undefined')
		{

			if(oR.astUniteArmy.length>0)
			{
				for(var i=0;i<oR.astUniteArmy.length;i++)
				{

					if(typeof(oR.astUniteArmy[i].stArmyHeroInfo) != 'undefined')
					{
						for(var j=0;j<oR.astUniteArmy[i].stArmyHeroInfo.length;j++)
						{
							if(oR.astUniteArmy[i].stArmyHeroInfo[j].iHeroStat == 1)
								iCount++;
						}
						totalCount += oR.astUniteArmy[i].stArmyHeroInfo.length;
					}
					else if(typeof(oR.astUniteArmy[i].CUniteHeroSummry) != 'undefined')
					{
						totalCount += oR.astUniteArmy[i].CUniteHeroSummry.iHeroNum;
						iCount += oR.astUniteArmy[i].CUniteHeroSummry.iLostNum;
					}
				}
			}
			
		}
		numStr = iCount+"/"+totalCount;
	}
	return numStr;
}

function getUniteHeroNumStr()
{
	var Num=[0,0];
	if(typeof(oR.astUniteArmy)!='undefined')
	{

		if(oR.astUniteArmy.length>0)
		{
			for(var i=0;i<oR.astUniteArmy.length;i++)
			{

				if(typeof(oR.astUniteArmy[i].stArmyHeroInfo) != 'undefined')
				{
					for(var j=0;j<oR.astUniteArmy[i].stArmyHeroInfo.length;j++)
					{
						if(oR.astUniteArmy[i].stArmyHeroInfo[j].iHeroStat == 1)
							Num[1]++;
					}
					Num[0] += oR.astUniteArmy[i].stArmyHeroInfo.length;
				}
				else if(typeof(oR.astUniteArmy[i].CUniteHeroSummry) != 'undefined')
				{
					Num[0] += oR.astUniteArmy[i].CUniteHeroSummry.iHeroNum;
					Num[1] += oR.astUniteArmy[i].CUniteHeroSummry.iLostNum;
				}
			}
		}
		
	}
	return "参战英雄："+Num[0] + "  损失："+Num[1];
}

//武将信息显示
function addHeroTableTitle(table,sName)
{
	var tableRow = table.insertRow(-1);
	var tableNameTd = document.createElement('th');

	tableNameTd.colSpan = 2;
	tableNameTd.align="center";
	
	tableNameTd.innerHTML = '<span class="playername">'+sName+'</span>的英雄';

	tableRow.appendChild(tableNameTd);
}

//武将单元格显示
function addHeroTableTd(tableRow,objectName,Name,
						sPicArray,hintArray,expValue,expItemFlag,strength,proFlag)
{
	var tableNameTd = document.createElement('td');
	tableNameTd.className = "self";
	if(Name == "" && objectName == "")
	{
		
	}
	else
	{

		var sExpItemStr = "";
		if(expItemFlag > 0)
		{
			//sExpItemStr = '<a href="../../shoptemplate/shop_func1.html">(双倍经验)</a>';
			sExpItemStr = '<span onclick="top.document.getElementById(\'shopdiv\').scr=\'../../shoptemplate/shop_func1.html\';top.ShowTab(\'shop\',6);" class="spanhand">(双倍经验)</span>';
		}
		var sProStr = '<div class="num"> </div>';
		if(proFlag==2)
		{
			sProStr = '<div class="num">因<span onclick="top.document.getElementById(\'shopdiv\').scr=\'../../shoptemplate/shop_func2.html\';top.ShowTab(\'shop\',6);" class="spanhand">护身符</span>道具生效，英雄被俘后成功逃脱</div>'+
			'</div>';
		}
		else if(proFlag==1)
		{
			sProStr = '<div class="num">被'+objectName+'玩家俘虏</div>';
		}
		var sPicStr=["../../images/blank.gif","../../images/blank.gif"];
		for(i=0;i<sPicArray.length;i++)
		{
			if(sPicArray[i]>0)
			{
				sPicStr[i] ='../../images/hero/trea_'+sPicArray[i]+'.gif'; 
			}
		}
		tableNameTd.innerHTML = '<td class="self"><div class="main">'+
			'<img hint = "'+hintArray[0]+'" src="../../images/army/hero.png" align="absmiddle" width="20" height="20">'+
			'<span class="heroname">'+Name+'</span>携带宝物：'+
			'<img hint = "'+hintArray[1]+'" src="'+sPicStr[0]+'" align="absmiddle" width="20" height="20"/>'+
			'<img hint = "'+hintArray[2]+'" src="'+sPicStr[1]+'" align="absmiddle" width="20" height="20"/></div>'+'<div class="info">'+
			'<div class="num"><span class="exp">经验值：</span>+'+expValue+sExpItemStr+'</div>'+
			'<div class="num"><span class="hp">体力值：</span>-'+strength+'</div>'+sProStr+'</td>';
	}

	tableRow.appendChild(tableNameTd);
}

//获取英雄tips的内容
function getHeroHint(hero)
{
	var porpertyValue="";
	porpertyValue += "英雄级别" +":" +hero.iHeroLv+"<br>";
	porpertyValue += "近程攻击" +":" +hero.iNearAttack +"<br>";
	porpertyValue += "远程攻击" +":" +hero.iFarAttack +"<br>";
	porpertyValue += "近程防御" +":" +hero.iNearFort +"<br>";
	porpertyValue += "远程防御" +":" +hero.iFarFort +"<br>";
	porpertyValue += "负载数量" +":" +hero.iHeroLoad +"<br>";
	porpertyValue += "移动速度" +":" + hero.iHeroSleep +"<br>";
	var hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' 			          class=\'hero_star_"+hero.iHeroStar+'\'><br>'+porpertyValue;
	return hint;
}
//获取宝物tips的内容
function getTreaHint(trea)
{
	var porpertyValue="";
	porpertyValue += trea.szName +"<br>";
	for(var i=0;i<trea.stEff.length;i++)
	{
		var value = trea.stEff[i].iEffValue/10;
		porpertyValue += trea.stEff[i].m_szName +":" +value +"%<br>";
	}
	var hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'6\' align=\'absmiddle\'" 			          +"><br>"+porpertyValue;
	return hint;
}

//显示英雄列表的表格信息
function addUserHeroInfo(table,userName,objectName,heroObject,attribute)
{
	if(typeof(heroObject) != 'undefined' && heroObject.length>0)
	{
		
		addHeroTableTitle(table,userName);
		var tableRow;
		for(var i=0;i<heroObject.length;i++)
		{
			if(i%2==0)
			{
				tableRow = table.insertRow(-1);
			}
			var Name = heroObject[i].szName;
			var sPicArray=[0,0];
			var hintArray = ["","",""];
			hintArray[0] = getHeroHint(heroObject[i]);
			var len = heroObject[i].astTrea.length;
			for(var j=0;j<len;j++)
			{
				sPicArray[j] = heroObject[i].astTrea[j].iPicID;
				hintArray[j+1] = getTreaHint(heroObject[i].astTrea[j]);
			}
			var expValue = heroObject[i].iHeroExpUp;
			var proFlag = heroObject[i].iHeroStat;
			var expItemFlag = 0;
			if(attribute.length>=11)
				expItemFlag = attribute[10];
			var strength = heroObject[i].iStrength;
			addHeroTableTd(tableRow,objectName,Name,sPicArray,hintArray,
				   expValue,expItemFlag,strength,proFlag);
		}
		if(i%2 == 1)
		{
			addHeroTableTd(tableRow,"","",0,0,
				   0,0,0,0);
		}
	}
	else
	{
		table.display = "none";
	}

}
//显示进攻方的英雄列表
function showAttackHeroInfo()
{
	if(getUserType() != 2)
	{
		$("attack_hero").style.display = "block";
		addUserHeroInfo($("attack_hero"),getNickNameStr(oR.astCityInfo[0]),getNickNameStr(oR.astCityInfo[1]),
oR.astMainArmy[0].stArmyHeroInfo,oR.astMainArmy[0].ashAttribute);
	}
	
}

//显示防守方的英雄列表
function showDefeatHeroInfo()
{
	if(getUserType() != 2)
	{
		$("defeat_hero").style.display = "block";
		addUserHeroInfo($("defeat_hero"),getNickNameStr(oR.astCityInfo[1]),getNickNameStr(oR.astCityInfo[0]),
oR.astMainArmy[1].stArmyHeroInfo,oR.astMainArmy[1].ashAttribute);
	}
	
}
//显示联防邮件的英雄列表
function showUniteHeroInfo()
{
	if(getUserType() == 2)
	{
		if(oR.astUniteArmy.length>0)
		{
			$("unite_hero").style.display = "block";
			addUserHeroInfo($("unite_hero"),getStyleNickName(oR.astUniteArmy[0].szMasterNick,oR.astUniteArmy[0].iMasterUin),getNickNameStr(oR.astCityInfo[0]),
oR.astUniteArmy[0].stArmyHeroInfo,oR.astUniteArmy[0].ashAttribute);
			return;
		}
	}
}

//显示随机点进攻方的英雄列表
function showAttackRanodmHeroInfo()
{
	if(getUserType() != 2)
	{
		$("attack_hero").style.display = "block";
		addUserHeroInfo($("attack_hero"),getNickNameStr(oR.CCitySumInfo),"",
oR.astMainArmy[0].stArmyHeroInfo,oR.astMainArmy[0].ashAttribute);
	}
	
}



/*
显示iframetips消息
*/
var curFrameMouseObj
function quickiframealt() 
{
	var evt=evt?evt:(window.event?window.event:null)
	if(curFrameMouseObj != evt.srcElement){
		curFrameMouseObj = evt.srcElement
		var scrollPos; 
		if (typeof window.pageYOffset != 'undefined') { 
			scrollPos = window.pageYOffset; 
		} 
		else if (typeof document.curFrameMouseObj != 'undefined' && 
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
			altlayer.style.top=evt.y+scrollPos+10;
			altlayer.innerHTML=evt.srcElement.hint
		}
		else
		{ 
			altlayer.style.visibility='hidden';
		}
	}
}

function initMailHtml(){		

	//tips创建函数
	document.body.onmousemove=quickiframealt;  //tips触发
	var objScreen = document.getElementById("altlayer");
	if (!objScreen){
		var objScreen = document.createElement("div");
	}
	var oS = objScreen.style;
	objScreen.id = "altlayer";
	oS.display = "block";
	oS.filter = " Alpha(Opacity=95)";
	oS.opacity = "0.9";
	oS.visibility = "hidden";
	oS.color = "#121212";
	oS.border = "1px solid #ffab86";
	oS.background = "url(/images/hero_tips_bg.gif)";
	oS.position = "absolute";
	oS.padding = "5px 10px";
	oS.lineHeight = "20px";
	oS.textAlign="left"
	oS.zIndex = "200000";
	document.body.appendChild(objScreen);
}




//军情显示
//summary表格显示
function addSummaryLineInfo(summaryTab,linestr,sColor,cName)
{
	var tableRow = summaryTab.insertRow(-1);
	var tableValueTd = document.createElement('td');
	tableValueTd.innerHTML = linestr;
	//值
	if(sColor!="")
		tableValueTd.style.color = sColor;
	if(cName!="")
	{
		tableValueTd.className = cName;
	}
	tableRow.appendChild(tableValueTd);
}

//添加一个表格行
function addTableCommonLine(objTab,lineValues,iWidths)
{
	var tableRow = objTab.insertRow(-1);
	for(var i=0;i<lineValues.length;i++)
	{
		var tableValueTd = document.createElement('td');
		tableValueTd.innerHTML = lineValues[i];
		if(iWidths[i]!=0 && iWidths[i]!="0")
			tableValueTd.width =iWidths[i]; 
		tableRow.appendChild(tableValueTd);
	}
}
//显示攻打随机点的加成
function showAttRandomAddValue(addTab)
{
	if(countAttributeNotZero(oR.astMainArmy[0].ashAttribute)==0)
		return;
	addTab.style.display = "block";
	var LineValues = [];
	var iWidths = [0,0];
	LineValues[0] = "玩家名：";
	LineValues[1] = getNickNameStr(oR.CCitySumInfo);
	addTableCommonLine(addTab,LineValues,iWidths);
	
	LineValues[0] = "科技（利刃）对战斗力加成:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,1);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
	
	LineValues[0] = "科技（神箭）对战斗力加成:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,2);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
	
	LineValues[0] = "宝物对近战攻击加成:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,6);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
	
	LineValues[0] = "宝物对远程攻击加成:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,7);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
		
	LineValues[0] = "家族对攻击属性加成:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,11);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
		
	LineValues[0] = "家族对攻击属性加成:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,12);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
		
	LineValues[0] = "武略对攻击属性加成:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,13);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
		
	LineValues[0] = "文韬对防御属性加成:";
	LineValues[1] = chkvalue(oR.astMainArmy[0].ashAttribute,14);
	if(LineValues[1]!=0)
		addTableCommonLine(addTab,LineValues,iWidths);
}

//////////////////////////////////////
/*
*随机点战报
*/
function showRandomAttPage()
{
	addSummaryLineInfo($("summary_tab"),outPutRandomTitle(),"FF0000","");
	var linestr = '战斗摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getRandomCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getRandomCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"战斗结果："+getRandomWarResultInfo(),"","");
	
	addRandomItemsToTable($("summary_tab"));
	
	linestr = '<span class="power">攻方战力:'+oR.iInvaderValue+'</span>	   攻方损失：'+getTotalLostInfo(0);
	addSummaryLineInfo($("summary_tab"),linestr,"","");
	linestr = '<span class="power">守防战力:'+oR.iTargetValue+'</span>'
	addSummaryLineInfo($("summary_tab"),linestr,"","");
	addSummaryLineInfo($("summary_tab"),"战斗详情","","title");
	
	showRandomAttackInfo();
	showDefeadRandomInfo();
	showAttackRanodmHeroInfo();
	
	showAttRandomAddValue($("addValueTable"));
}
function showRandomBackPage()
{
	addSummaryLineInfo($("summary_tab"),getRandomBackTitle(),"FF0000","");
	var linestr = '战斗摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getRandomCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getRandomCityInfo(1),"","");

	addSummaryLineInfo($("summary_tab"),"武将："+getAttHeroNamesStr(oR.astMainArmy[0].stArmyHeroInfo),"","");
	
	addSummaryLineInfo($("summary_tab"),"士兵总数："+countall(oR.astMainArmy[0].astArmyInfo[0].ashArmy),"","");
	addSummaryLineInfo($("summary_tab"),"部队详情","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.astMainArmy[0].astArmyInfo[0].ashArmy,"数目",11);
}

function showRandomNoAttPage()
{
	addSummaryLineInfo($("summary_tab"),getRandomNoActionTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getRandomCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getRandomCityInfo(1),"","");	
}

//////////////////////////////////////
/*
*掠夺战战报
*/
function showAttPage()
{
	addSummaryLineInfo($("summary_tab"),outPutTitle(),"FF0000","");
	var linestr = '战斗摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"战斗结果："+getWarResultStr(),"","");
	
	addGetItemsToTable($("summary_tab"));
	//显示双方战力
	if(getUserType() != 2)
		addAttackPowerInfo($("summary_tab"));
	addSummaryLineInfo($("summary_tab"),"战斗详情","","title");
	if(getUserType() != 2)
	{
		showAttackTableInfo();
		showDefeadTableInfo();
		showUniteTableInfo();
		showAttackHeroInfo();
		showDefeatHeroInfo();
		showUniteHeroInfo();	
	}
	else
	{
		showUniteTableInfo();
		showUniteHeroInfo();
	}
	showAddTableInfo();
}

function showAttBackPage()
{
	addSummaryLineInfo($("summary_tab"),getAttackBackTitle(),"FF0000","");
	var linestr = '战斗摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getCityInfo(1),"","");

	addSummaryLineInfo($("summary_tab"),"武将："+getAttHeroNamesStr(oR.astMainArmy[0].stArmyHeroInfo),"","");
	
	addSummaryLineInfo($("summary_tab"),"士兵总数："+countall(oR.astMainArmy[0].astArmyInfo[0].ashArmy),"","");
	addSummaryLineInfo($("summary_tab"),"部队详情","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.astMainArmy[0].astArmyInfo[0].ashArmy,"数目",11);
}

function showNoAttPage()
{
	addSummaryLineInfo($("summary_tab"),getAttackNoActionTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getCityInfo(1),"","");	
}

////////////////////////////////////////////////////////////////////////
/*
*刺探战报
*/
function showSpyPage()
{
	addSummaryLineInfo($("summary_tab"),outputSpySumary(oR),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getCityInfo(1),"","");
	linestr = "侦察兵数量："+oR.iSpySoldier+"个  " +"损失："+ oR.iLossSoldier+"个"
	addSummaryLineInfo($("summary_tab"),linestr,"","");
	addSummaryLineInfo($("summary_tab"),"侦查结果："+outputSpyResult(oR),"","");
	showSpyInfo();
}

function showSpyBackPage()
{
	addSummaryLineInfo($("summary_tab"),getSpyBackTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getCityInfo(1),"","");
	linestr = "侦察兵数量："+oR.iSpySoldier+"个";
	addSummaryLineInfo($("summary_tab"),linestr,"","");
}

function showNoSpyPage()
{
	addSummaryLineInfo($("summary_tab"),getSpyNoActionTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"攻击方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"防御方："+getCityInfo(1),"","");
}

/////////////////////////////////////////////////////////////////////////
/*
*派驻战报
*/
function showReDeployPage()
{
	addSummaryLineInfo($("summary_tab"),getDeployTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"发兵方："+getDeployCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getDeployCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"携带资源："+getResource(oR.atConvRes),"","");
	addSummaryLineInfo($("summary_tab"),"消耗粮食："+oR.iFoodExp+"/小时","","");
	addSummaryLineInfo($("summary_tab"),"武将："+getHeroNamesStr(oR.asHeroList),"","");
	addSummaryLineInfo($("summary_tab"),"士兵总数："+countall(oR.CCityArmy.ashArmy),"","");
	
	addSummaryLineInfo($("summary_tab"),"部队详情","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.CCityArmy.ashArmy,"数目",11);
}

function showReDeployBackPage()
{
	addSummaryLineInfo($("summary_tab"),getDeployBackTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"发兵方："+getDeployCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getDeployCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"携带资源："+getResource(oR.atConvRes),"","");
	addSummaryLineInfo($("summary_tab"),"消耗粮食："+oR.iFoodExp+"/小时","","");
	addSummaryLineInfo($("summary_tab"),"武将："+getHeroNamesStr(oR.asHeroList),"","");
	addSummaryLineInfo($("summary_tab"),"士兵总数："+countall(oR.CCityArmy.ashArmy),"","");
	
	addSummaryLineInfo($("summary_tab"),"部队详情","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.CCityArmy.ashArmy,"数目",11);
}

function showNoReDeployPage()
{
	addSummaryLineInfo($("summary_tab"),getDeployTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"发兵方："+getDeployCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getDeployCityInfo(1),"","");
}

/////////////////////////////////////////////////////////////////////////
/*
*联防战报
*/
function showUnitePage()
{
	addSummaryLineInfo($("summary_tab"),getUniteTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"发兵方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getCityInfo(1),"","");

	addSummaryLineInfo($("summary_tab"),"武将："+getHeroNamesStr(oR.asHeroList),"","");
	addSummaryLineInfo($("summary_tab"),"消耗粮食："+oR.iFoodExp+"/小时","","");
	addSummaryLineInfo($("summary_tab"),"携带装备："+getFitInfo(oR.atOutfit),"","");
	addSummaryLineInfo($("summary_tab"),"士兵总数："+countall(oR.CCityArmy.ashArmy),"","");
	
	addSummaryLineInfo($("summary_tab"),"部队详情","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.CCityArmy.ashArmy,"数目",11);
}

function showUniteBackPage()
{
	addSummaryLineInfo($("summary_tab"),getUniteBackTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"发兵方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getCityInfo(1),"","");

	addSummaryLineInfo($("summary_tab"),"武将："+getHeroNamesStr(oR.asHeroList),"","");
	addSummaryLineInfo($("summary_tab"),"消耗粮食："+oR.iFoodExp+"/小时","","");
	addSummaryLineInfo($("summary_tab"),"携带装备："+getFitInfo(oR.atOutfit),"","");
	addSummaryLineInfo($("summary_tab"),"士兵总数："+countall(oR.CCityArmy.ashArmy),"","");
	
	addSummaryLineInfo($("summary_tab"),"部队详情","","title");
	
	$("army_info").style.display = "block";
	addArmyInfo($("army_info"),oR.CCityArmy.ashArmy,"数目",11);
}

function showNoUnitePage()
{
	addSummaryLineInfo($("summary_tab"),getUniteNoActionTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"发兵方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getCityInfo(1),"","");
}

/////////////////////////////////////////////////////////////////////////
/*
*运输战报
*/
function showTransPage()
{
	addSummaryLineInfo($("summary_tab"),getTransFormTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"运输方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"运输兵数量："+getArrayValue(oR.CCityArmy.ashArmy,0),"","");
	addSummaryLineInfo($("summary_tab"),"运输车数量："+getArrayValue(oR.CCityArmy.ashArmy,1),"","");
	addSummaryLineInfo($("summary_tab"),"携带资源："+getResource(oR.atConvRes),"","");
}

function showTransBackPage()
{
	addSummaryLineInfo($("summary_tab"),getTransBackTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"运输方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getCityInfo(1),"","");
	addSummaryLineInfo($("summary_tab"),"运输兵数量："+getArrayValue(oR.CCityArmy.ashArmy,0),"","");
	addSummaryLineInfo($("summary_tab"),"运输车数量："+getArrayValue(oR.CCityArmy.ashArmy,1),"","");
	addSummaryLineInfo($("summary_tab"),"携带资源："+getResource(oR.atConvRes),"","");
}

function showNoTransPage()
{
	addSummaryLineInfo($("summary_tab"),getTransNoActionTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	addSummaryLineInfo($("summary_tab"),"运输方："+getCityInfo(0),"","");
	addSummaryLineInfo($("summary_tab"),"接受方："+getCityInfo(1),"","");
}

/////////////////////////////////////////////////////////////////////////
/*
*拓荒战报
*/

function showExpoitBakePage()
{
	addSummaryLineInfo($("summary_tab"),getExploitBackTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","");
	
	addSummaryLineInfo($("summary_tab"),"拓荒者："+getExploiter(),"","");
	addSummaryLineInfo($("summary_tab"),"目标荒地："+getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3),"","");
}

function showExploitPage()
{
	addSummaryLineInfo($("summary_tab"),getExploitTitle(),"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	
	addSummaryLineInfo($("summary_tab"),"拓荒者："+getExploiter(),"","");
	addSummaryLineInfo($("summary_tab"),"目标荒地："+getCityPivot(oR.astNewCityInfo[0].iNewCityGridID,3),"","");
	addNewCityName($("summary_tab"))
}

function getExObjName(iType,id,sName)
{
	//材料
	if(iType == 3)
	{
		return top.toMaterilName(id);
	}
	//道具
	else if(iType == 4)
	{
		return top.getItemConfig(id).name;
	}
	else
	{
		return sName;
	}
}


function getExObjTypeName(iType)
{
	var sName = "";
	switch(iType)
	{
		case 3:
		sName = "材料";
		break;
		case 4:
		sName = "道具";
		break;
		case 6:
		sName = "英雄";
		break;
		case 5:
		sName = "宝物";
		break;
		
	}
	return sName;
}

/*
*显示交易邮件 1 显示附件，0 显示邮件
*/
function showExchangePage(bAttach)
{
	var sTitle = "";
	var iPrice;
	var soldName;
	var buyName;
	var taxPrice;
	var sysPrice = 5;
	var iItemCount = 1;
	var objectName;
	var itemID;
	objectName = getExObjName(oR.m_iType,oR.m_iItemObjID,oR.m_szObjName);
	var TypeName = getExObjTypeName(oR.m_iType);
	itemID   = oR.m_iItemID;
	iItemCount = oR.m_iCount;
	iPrice   = oR.m_iPrice;
	soldName = getStyleNickName(oR.m_szOwner,oR.m_iOwner);
	if(oR.iStats == 1)
	{
		if(oR.m_iOwner == chGetUin())
		{
			if(!bAttach)
			{
				sTitle = "您的"+TypeName+" "+objectName+" 已成功售出";
				$("mail_title").innerHTML = $("mail_title").innerHTML+objectName+"已成功售出";
			}
			else
			{
				sTitle = soldName+" 的"+TypeName+" "+objectName+" 已成功售出";
			}
		}
		else 
		{
			if(!bAttach)
			{
				sTitle = "您已成功购买"+TypeName+" "+objectName;
				$("mail_title").innerHTML = $("mail_title").innerHTML+objectName+"已成功购买";
			}
			else
			{
				sTitle = soldName+" 已成功购买"+ TypeName+" "+ objectName;
			}
		}
		buyName  = getStyleNickName(oR.m_szBuyer,oR.m_iBuyer);
		taxPrice = oR.m_iTaxGold;
	
	}
	else if(oR.iStats == 2)
	{
			
			if(!bAttach)
			{
				sTitle = TypeName+" "+objectName+" 交易单已过期";
				$("mail_title").innerHTML = $("mail_title").innerHTML+sTitle;
			}
			else
			{
				sTitle = soldName+" 的"+TypeName+" "+objectName+" 交易单已过期";
			}
	}
	else if(oR.iStats == 3)
	{
			if(!bAttach)
			{
				sTitle = TypeName+" "+objectName+"交易单被系统清理";
				$("mail_title").innerHTML = $("mail_title").innerHTML+sTitle;
			}
			else
			{
				sTitle = soldName+" 的"+TypeName+" "+objectName+"交易单被系统清理";
			}
	}
	else
	{
		return;
	}
	addSummaryLineInfo($("summary_tab"),sTitle,"FF0000","");
	var linestr = '摘要<span class="time">时间: '+getTimeStr()+"</span>";
	addSummaryLineInfo($("summary_tab"),linestr,"","title");
	//addSummaryLineInfo($("summary_tab"),"交易单号："+itemID,"","");
	addSummaryLineInfo($("summary_tab"),"物品名称："+objectName,"","");
	addSummaryLineInfo($("summary_tab"),"物品数目："+iItemCount,"","");
	if(oR.iStats == 1)
	{
		addSummaryLineInfo($("summary_tab"),"","","");
		addSummaryLineInfo($("summary_tab"),"卖   方："+soldName,"","");
		addSummaryLineInfo($("summary_tab"),"买   方："+buyName,"","");
	}
	addSummaryLineInfo($("summary_tab"),"交易价格："+getResPicUrl("jb","金币")+iPrice,"","");
	if(oR.iStats == 1)
	{
		if(oR.m_iOwner == chGetUin())
		{
			addSummaryLineInfo($("summary_tab"),"挂单手续费："+getResPicUrl("jb","金币")+sysPrice,"","");
			addSummaryLineInfo($("summary_tab"),"已扣交易费："+getResPicUrl("jb","金币")+taxPrice,"","");
		}
	}
}

