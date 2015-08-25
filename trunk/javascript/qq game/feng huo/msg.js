	
/*
**    ==================================================================================================  
**     
**    对请求进行编码
**                            
**    ==================================================================================================  
*/
/** 请求自己的基本信息 */
function GetMineInfo(){
	var Ver     = "1"
	var MsgID   = "1002"
	var MsgType = "1"
	var ACT     = "0"
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body
}


/** 请求自己有所有城池摘要 */
function GetMineAllCity(){
	var Ver     = "1"
	var MsgID   = "1022"
	var MsgType = "1"
	var ACT     = "0"
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body
}

/** 请求自己当前城市信息 */
function GetMineCity(cityid,act){
	var Ver     = "1"
	var MsgID   = "1003"
	var MsgType = "1"
	var ACT     = act
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(cityid)) //数组长度  城市ID

	return Head+Body
}


/** 请求取消建造任务 */
function GetCancleTask(str){
	var Ver     = "1"
	var MsgID   = "1004"
	var MsgType = "1"
	var ACT     = "0"
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(str)) //数组长度  城市ID

	return Head+Body
}


/** 请求建造任务的详情 */
function GetBuildingTask(arrTaskID){
	var Ver     = "1"
	var MsgID   = "1005"
	var MsgType = "1"
	var ACT     = "0"
	
	var str = ""
	for(var i=0;i<arrTaskID.length;i++)
	{
		str=str+CLength(arrTaskID[i]);
	}
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(arrTaskID.length)+str+CLength(CityID)) //数组长度  城市ID

	return Head+Body
}


/** 请求建造 */
function GetBuild(buildID,buildTY,rank,count){
	var Ver     = "1"
	var MsgID   = "1007"
	var MsgType = "1"
	var ACT     = "0"
	
	var BuildID = buildID
	var BuildTY = buildTY
	var Rank    = rank
	var Count   = count
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(CityID)+CLength(BuildID)+CLength(BuildTY)+CLength(Rank)+CLength(Count))
																				//cityID          buiID   buiTY    rank    count
	return Head+Body
}


/** 请求地图数据 */
//根据玩家昵称或者QQ号码查询城市坐标的协议
function SearchMapN(Type,Searchkey){
	var Ver     = "1"
	var MsgID   = "1008"
	var MsgType = "1"
	var ACT     = "0"
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(Type)+CLength(Searchkey))
	
	return Head+Body
}

//收藏地图:查询、收藏、修改描述、删除
function GetFavMap(Type,GridID,GridIntro,GridArray,act){
	var Ver     = "1"
	var MsgID   = "1009"
	var MsgType = "1"
	var ACT     = act==null?"0":act
	
	var Head,Body
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(Type)+CLength(GridID)+CLength(GridIntro)+CLength(GridArray))

	return Head+Body
}

//返回地图信息
function GetWorldMap(gridid,act){
	var Ver     = "1"
	var MsgID   = "1006"
	var MsgType = "1"
	var ACT     = "0"
	if(typeof(act)!="undefined")ACT = act //act=0一般请求 act=1地图搜索之后请求
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(gridid))
	return Head+Body
}

//返回一个地图格是否可用
function GetIsSpace(gridid){
	var Ver     = "1"
	var MsgID   = "1023"
	var MsgType = "1"
	var ACT     = "0"
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(gridid))
	return Head+Body
}

//请求战斗 刺探 派驻 运输
function GetCreatArmy(iTargetiGridID,iType,ashArmy,asOutfit,iMarchTime,iEmergency,iNewname,iHero){
	var Ver     = "1"
	var MsgID   = "1010"
	var MsgType = "1"
	var ACT     = "0"
	iEmergency = iEmergency ? 20 : 0;
	///
	if(iEmergency>0)
	{
		//情景使用，优先使用系统赠送道具
		var iItemID = getSceneUseItemID(iEmergency);
		if(iItemID !=0)
			iEmergency = iItemID;
	}
	
	var iLeaveCityID= CityID
	if(iHero==null)iHero="00010"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iLeaveCityID)+CLength(iTargetiGridID)+CLength(iType)+ashArmy+asOutfit+CLength(iMarchTime)+CLength(iEmergency)+CLength(iNewname)+iHero
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	return Head+Body
}

//据点战斗
function GetCreatArmyRandom(iTargetiGridID,iType,ashArmy,asOutfit,iMarchTime,iEmergency,iNewname,iHero){
	var Ver     = "1"
	var MsgID   = "1024"
	var MsgType = "1"
	var ACT     = "0"
	iEmergency = iEmergency ? 20 : 0;
	if(iEmergency>0)
	{
		//情景使用，优先使用系统赠送道具
		var iItemID = getSceneUseItemID(iEmergency);
		if(iItemID !=0)
			iEmergency = iItemID;
	}
	var iLeaveCityID= CityID

	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iLeaveCityID)+CLength(iTargetiGridID)+CLength(iType)+ashArmy+asOutfit+CLength(iMarchTime)+CLength(iEmergency)+CLength(iNewname)+iHero
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	return Head+Body
}

//查询派出需要的时间和负载
function GetMarchInfo(iTargetiGridID,iType,iMarchTime,strArmy,itemid,herostr){
	var Ver     = "1"
	var MsgID   = "1017"
	var MsgType = "1"
	var ACT     = "0"
	herostr=(herostr==null)?"00010":herostr
	var iLeaveCityID= CityID
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iLeaveCityID)+CLength(iTargetiGridID)+CLength(iType)+strArmy+CLength(iMarchTime)+CLength(itemid)+herostr
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//查询军事队列概要
function GetArmyList(iCheckType,iCityID,act){
	var Ver     = "1"
	var MsgID   = "1019"
	var MsgType = "1"
	var ACT     = "0"
	if(act!=null)ACT=act//1：点击军情弹开总表,null：富面板下侧
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCheckType)+CLength(iCityID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//查询军事队列详情
function GetArmyListInfo(iWater,iCityID,act){
	var Ver     = "1"
	var MsgID   = "1018"
	var MsgType = "1"
	var ACT     = (act!=null)?act:0;
	//1000为点将台查看详情
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iWater);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//召回部队
function GetCancleArmy(waterid,itemid,act){
	var Ver     = "1"
	var MsgID   = "1020"
	var MsgType = "1"
	var ACT     = (act!=null)?act:0;
	//1000为点将台遣返
	
	//add by welchzhu
	var iItemID = getSceneUseItemID(itemid);
	if(iItemID !=0)
			itemid = iItemID;
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	//32
	strr=CLength(waterid)+CLength(itemid);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//请求任务列表1500、更新当前任务列表1501、查询英雄列表1601 、 获取所有英雄1602 、获取所有宝物1603、登录认证协议1001、获取材料1613
function getTaskList(num,act)
{
	var Ver     = "1"
	var MsgID   = num
	var MsgType = "1"
	var ACT     = act || 0
	//1603请求宝物信息，其中act>0为英雄页面调用act=0为宝物精炼合成act=-10为交易所
	//获取英雄act=-10，交易所页面调用
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body
}
//发送任务完成请求
function getTaskFinish(id,act)
{
	var Ver     = "1"
	var MsgID   = "1503"
	var MsgType = "1"
	var ACT     = act || 0
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id))
	
	return Head+Body
}
//发送任务领取请求
function getTaskGet(id,act)
{
	var Ver     = "1"
	var MsgID   = "1502"
	var MsgType = "1"
	var ACT     = act || 0
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id))
	
	return Head+Body
}
//发送选择题任务答案
function getTaskChoose(id,answer)
{
	var Ver     = "1"
	var MsgID   = "1504"
	var MsgType = "1"
	var ACT     = id
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id)+CLength(answer))
	
	return Head+Body
}
//激活英雄或者宝物 cmd id :1605
//丢弃英雄或者宝物 cmd id :1606 iType=0丢弃英雄，=1丢弃宝物
function GetActHeroTrea(x,m_iID,iType){
	var Ver     = "1"
	var MsgID   = x
	var MsgType = "1"
	var ACT     = iType
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iID)+CLength(iType))
	return Head+Body
}
//佩戴宝物 cmd id :1607
//卸下宝物 cmd id :1609
function GetTakeTrea(x,m_iID,iType){
	var Ver     = "1"
	var MsgID   = x
	var MsgType = "1"
	var ACT     = m_iID //英雄ID
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iID)+CLength(iType))
	return Head+Body
}
//英雄升级
function GetUpGradeHero(heroid){
	var Ver     = "1"
	var MsgID   = 1604
	var MsgType = "1"
	var ACT     = 0 
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(heroid))
	return Head+Body
}

//宝物合成
function GetTreaConpose(f,s,i){
	var Ver     = 1
	var MsgID   = 1611
	var MsgType = 1
	var ACT     = 1
	
	var m_iMainTreaID    = f
	var m_iClientTreaID  = s
	var m_iItemID        = i
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iMainTreaID)+CLength(m_iClientTreaID)+CLength(m_iItemID))
	return Head+Body
}
//宝物精炼
function GetTreaRefine(f,i){
	var Ver     = 1
	var MsgID   = 1610
	var MsgType = 1
	var ACT     = 1
	
	var m_iTreaID     = f
	var m_iItemID     = i
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iTreaID)+CLength(m_iItemID))
	return Head+Body
}
//合成装备
function getMakeOutfit(id,n){
	var Ver     = 1
	var MsgID   = 1612
	var MsgType = 1
	var ACT     = 1
		
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id)+CLength(n))
	return Head+Body
}
//交易所拉取列表
function GetMarketList(m_iType,m_iSubType,m_iClass,m_iBeginID,m_iCount){
	var Ver     = 1
	var MsgID   = 1700
	var MsgType = 1
	var ACT     = 1	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iType)+CLength(m_iSubType)+CLength(m_iClass)+CLength(m_iBeginID)+CLength(m_iCount))
	return Head+Body
}
//交易所挂单
function GetMarketSell(ty,count,id,price){
	var Ver     = 1
	var MsgID   = 1702
	var MsgType = 1
	var ACT     = ty
	
	var m_iItemType    = ty
	var m_iCount       = count
	var m_iItemObjID   = id
	var m_iPrice       = price
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(m_iItemType)+CLength(m_iCount)+CLength(m_iItemObjID)+CLength(m_iPrice))
	return Head+Body
}
//交易购买1701、撤销交易1703、获取用户交易单详细信息1705、查询单条交易单1706
function GetMarketBill(msgid,billid){
	var Ver     = 1
	var MsgID   = msgid
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(billid))
	return Head+Body
}
//发送撤销交易单的协议包
function sendCancelItem(disID)
{
	if(disID.length < 10)
		return "";
	var pos = disID.length-10; 
	var value = parseInt(disID.substr(pos,10),10);
	objFlashEng.Send(GetMarketBill(1703,value));
}


//家族系统
/**脱离家族 msgID: 1210*/
/**获取家族概要信息msgID: 1200 */
/**解散一个家族msgID: 1202 */
/**获取家族成员列表 msID: 1203*/
/**获取家族列表 msgID: 1204*/
/**获取家族外务信息 msgID: 1205*/
/**加入家族申请 msgID: 1206*/
function GetSeptQuit(msgid,billid,act){
	var Ver     = 1
	var MsgID   = msgid
	var MsgType = 1
	var ACT     = act || 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(billid))
	return Head+Body
}
//创建一个家族msgID: 1201
function GetSeptCreat(name){
	var Ver     = 1
	var MsgID   = 1201
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(name))
	return Head+Body
}
//响应入族申请msgID: 1207
//处理同盟请求msgID: 1213
function GetSeptApplyAgree(msg,uin,sept,opt){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(uin)+CLength(sept)+CLength(opt))
	return Head+Body
}
//邀请申请msgID: 1208
//查询其他家族 1230
function GetSeptInvite(msg,sept,uin,act){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = act || 100
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(sept)+CLength(uin))
	return Head+Body
}
//修改家族文档内容 1215
function GetSeptModInfo(msg,septid,oint,qqclub,announce,board){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(septid)+CLength(oint)+CLength(qqclub)+CLength(announce)+CLength(board))
	return Head+Body
}
//修改家族成员角色 1219
function GetSeptFour(msg,septid,oint,qqclub,announce){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(septid)+CLength(oint)+CLength(qqclub)+CLength(announce))
	return Head+Body
}
//修改家族成员角色 1414
function GetSeptUseOrder(msg,id,str){
	var Ver     = 1
	var MsgID   = msg
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(id)+str)
	return Head+Body
}


//发送聊天信息 1781
function GetChatSend(str){
	var Ver     = 1
	var MsgID   = 1781
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(str)+"00012"+"000236"+"000235")
	return Head+Body
}



//发送城池改名 1781
function GetChCityName(cid,str){
	var Ver     = 1
	var MsgID   = 1027
	var MsgType = 1
	var ACT     = 1
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+CLength(cid)+CLength(str))
	return Head+Body
}















///////////////////////add by welchzhu
//购买道具请求
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2商城使用，iFlag =3 情景使用 
function GetBuyItem(iItemID,iItemCount,iFlag){
	var Ver     = "1"
	var MsgID   = "1408"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iItemID)+CLength(iItemCount);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//使用家族令牌道具
function GetUseSeptItem(iItemID,septID)
{
	var Ver     = "1"
	var MsgID   = "1415"
	var MsgType = "1"
	var ACT     = "0"

	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(septID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//使用英雄口粮道具
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2商城使用，iFlag =3 情景使用 
function GetFoodItem(iItemID,iHeroID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1413"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();

		
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iHeroID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body;
}

//购买金元宝
function GetBuyGold(iItemID,iNum)
{
	var Ver     = "1"
	var MsgID   = "1417"
	var MsgType = "1"
	var ACT     = "0"


		
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iItemID)+CLength(iNum);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body;
}


//批量购买
function GetBuyManyItems(items,counts)
{
	var Ver     = "1"
	var MsgID   = "1416"
	var MsgType = "1"
	var ACT     = "0"

	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	var len = items.length>counts.length?counts.length:items.length;
	len = len>5?5:len;
	var strr = CLength(len);
	for(var i=0;i<len;i++)
	{
		strr = strr+CLength(items[i]);
	}
	strr += CLength(len);
	for(var i=0;i<len;i++)
	{
		strr = strr+CLength(counts[i]);
	}
	
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//获取用户所有道具
//act 表示交易所发出的请求
function GetUserItems(act){
	var Ver     = "1"
	var MsgID   = "1409"
	var MsgType = "1"
	var ACT     = (act!=null)?act:0;
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	
	return Head+Body
}

//使用buffer类道具:无参道具使
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2商城使用，iFlag =3 情景使用 
function GetBufferItem(iCityID,iItemID,iIsForce,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1400"
	var MsgType = "1"
	var ACT     = "0"
	//为了获取响应的itemId做特殊处理
	//num = itemID*10+iFlag
	var num = iItemID*10+iFlag;
	ACT = num.toString();
	
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iItemID)+CLength(iIsForce);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//使用迁城符
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2商城使用，iFlag =3 情景使用 
function GetMoveCityItem(iCityID,iNewGrid,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1401"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iNewGrid)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//改旗易帜
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2商城使用，iFlag =3 情景使用 
function GetChangeItem(iNewNationID,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1402"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iNewNationID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//建造加速
//iListTpye: 队列类型 ，建造只能取值：1,2
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2商城使用，iFlag =3 情景使用 
function GetSpeedBuildingItem(iListTpye,iCityID,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1403"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iListTpye)+CLength(iCityID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//征募加速
//iListTpye: 队列类型 ，建造只能取值：3,4
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2商城使用，iFlag =3 情景使用 
function GetSpeedArmyItem(iListTpye,iCityID,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1404"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iListTpye)+CLength(iCityID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//购买资源
//iFlag = 0,45-48 粮食 木头 铁 石头
function GetBuyRItem(iCityID,iBuyCounts,iItemID)
{
	var Ver     = "1"
	var MsgID   = "1405"
	var MsgType = "1"
	var ACT     = "0"
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iBuyCounts)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//购买资源测试兑换比例
function GetBuyResItem(iType)
{
	var Ver     = "1"
	var MsgID   = "1412"
	var MsgType = "1"
	var ACT     = "0"
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iType);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//资源转化
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2商城使用，iFlag =3 情景使用 
function GetTransItem(iCityID,iNewWood,iNewIron,iNewStone,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1406"
	var MsgType = "1"
	var ACT     = "0"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iNewWood)
			+CLength(iNewIron)+CLength(iNewStone)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}
//退兵符
//iFlag = 0,商城购买 ; iFlag=1 情景购买;iFlag = 2仓库使用，iFlag =3 情景使用 
function GetTributaryItem(iCityID,iItemID,iFlag)
{
	var Ver     = "1"
	var MsgID   = "1407"
	var MsgType = "1"
	if(iFlag !=0)
		ACT = iFlag.toString();
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	strr=CLength(iCityID)+CLength(iItemID);
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	
	return Head+Body
}

//获取用户的点卷
function GetUserCoin()
{
	var Ver     = "1"
	var MsgID   = "1410"
	var MsgType = "1"
	var ACT     = "0"
	
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body
}
//发送金币
function getGoldMsg(iOtherUin,szNick,goldNum,addMsg)
{
	var Ver     = "1"
	var MsgID   = "1021"
	var MsgType = "1"
	var ACT     = "0"
	
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var strr = CLength(iOtherUin)+CLength(goldNum)+CLength(szNick)+CLength(addMsg);
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body
}

////////////////////////邮件系统命令
//发送邮件
function getSendMailMsg(szContent,szTitle,ucType,iAttach,iRecver,szRecvName)
{
	var Ver     = "1"
	var MsgID   = "1750"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var strr = CLength(iRecver)+CLength(ucType)+CLength(iAttach)+CLength(szRecvName)+
				CLength(szTitle)+CLength(szContent);
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

//删除邮件
function getDelMailMsg(mailArray,iPostion)
{
	var Ver     = "1"
	var MsgID   = "1751"
	var MsgType = "1"
	var ACT     = iPostion.toString();
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT));
	var len = mailArray.length>10?10:mailArray.length;
	var strr = CLength(len);
	for(var i=0;i<len;i++)
	{
		strr = strr+CLength(mailArray[i]);
	}
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

//获取邮件详情
function getMailMsg(iMailID)
{
	var Ver     = "1"
	var MsgID   = "1752"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var strr = CLength(iMailID);
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

//设置邮件已读
function getSetMailReadMsg(mailArray)
{
	var Ver     = "1"
	var MsgID   = "1754"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var len = mailArray.length>10?10:mailArray.length;
	var strr = CLength(len);
	for(var i=0;i<len;i++)
	{
		strr = strr+CLength(mailArray[i]);
	}
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

//获取邮件列表
function getMailListMsg(ucType,ucSubType,iPos)
{
	var Ver     = "1"
	var MsgID   = "1753"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
	var strr = CLength(ucType)+CLength(ucSubType)+CLength(iPos);
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey))+strr)
	
	return Head+Body;
}

function getMailUnRead()
{
		var Ver     = "1"
	var MsgID   = "1755"
	var MsgType = "1"
	var ACT     = "0"
	Head=CLength(CLength(Ver)+CLength(MsgID)+CLength(MsgType)+CLength(ACT))
				
	Body=CLength(CLength("1")+CLength(CLength("1")+CLength(Uin)+CLength(Skey)))
	
	return Head+Body;
}


//////////////////////////////////////////////////////////////////////////
/*
**    ==================================================================================================  
**     
**    对返回的数据解码
**    并在页面上显示        
**                       
**    ==================================================================================================  
*/

/*  
    1002处理函数
    返回自己的基本信息 
*/

//1001处理函数
function ShowLoginInfo(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		//判断用户未注册登录
		if(obj.CResult.iResultID == 1004){			
			var regUrl="register.htm"+window.location.search
			window.location=regUrl
			return false;
		}else{
			msgbox("Error:"+obj.CResult.iResultID+"<br><b>获取用户信息失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>");
			EnpClose()
			//确定之后到登录界面
			//改变msgbox确认按钮事件
			$("msgbox_img1").onclick=function(){HI('msgbox');HI('maskbg');window.location="/index.html"}
			return false;
		}
	}
	if(obj.CAnsLogin.CResult.iResultID == 0){
		//发送1002协议
		objFlashEng.Send(GetMineInfo())
		//拉取用户所有道具
		objFlashEng.Send(GetUserItems());	
		//获取用户点券
		setTimeout("checkUserItemsAndCoin()",3000)
		//获取用户新邮件数目
		objFlashEng.Send(getMailUnRead());
	}
}
//用户未注册倒计时函数
function doReDirection(t,Url){
	if(t>=0){
		$("login_lefttime").innerHTML = t;
		logintime--
	}else{
		window.location=Url
	}
}

//1002处理
function ShowMineInfo(str){
	var MineInfo=eval('('+str+')');
	if(typeof(MineInfo.CResult) != "undefined")	{
		msgbox("Error:"+MineInfo.CResult.iResultID+"<br><b>获取用户信息失败：</b><span class='t_tips_yellow'>"+errMsg(MineInfo.CResult.iResultID)+"!</span>");
		return false;
	}
	var z=MineInfo.CAnsGetMineInfo.CPlayerInfoToClient

	//判断是否是服务器主动推回协议，更新金币、国籍、积分、更新分城信息
	if(MineInfo.CTMsgHead.llMsgAct== -1){		
		
		//显示页面城主基本信息
		$("init_szNick").innerHTML = z.szNick;
		UName = z.szNick;
		curNationID = z.iPlayerNationID;
		//玩家头像
		$("init_ucHeadPic").src = "/images/player/player_"+z.ucHeadPic+".jpg"
		//家族信息赋值
		curLeagueID = z.iLeagueID;
		curLeagueState = z.chLeagueRank;
		$("init_iLeagueName").innerHTML = curLeagueID==0?"暂无":z.szLeagueName;
		
		$("init_iUserPoint").innerHTML = z.iUserPoint;
		$("init_iPlayerNationID").innerHTML = ToNation(z.iPlayerNationID);		
		$("init_iUserSeq").innerHTML = z.iUserSeq;
		$("init_iUserRank").innerHTML = ToUserRank(1,z.iUserRank).UserTitle;
		$("init_iCulture").innerHTML = ToUserRank(3,z.iCulture).UserTitle;
		$("init_iForce").innerHTML = ToUserRank(2,z.iForce).UserTitle;		
		$("init_iGlod").innerHTML = z.iMoney;
		
		//用户装备初始化
		Outfit = z.CPlayerOutfit.achOutfit
		
		arrOwnCity = z.aiSubCity;
		arrOwnCity.push(z.iMainCity);
		
	}else{
		//判断用户初次登录
		if(z.iOnlineTime == 0)$("guideDiv").style.display="block"
		//
		//设置本地与服务器的时间差
		LocalTime = MineInfo.CAnsGetMineInfo.CResult.szResultMsg;  
		var now1 = new Date();
		now1.setTime(now1);
		LocalTime = now1.getTime()/1000-LocalTime;
		
		//显示页面城主基本信息
		$("init_szNick").innerHTML = z.szNick;
		UName = z.szNick;
		curNationID = z.iPlayerNationID;
		//玩家头像
		$("init_ucHeadPic").src = "/images/player/player_"+z.ucHeadPic+".jpg"
		//家族信息赋值
		curLeagueID = z.iLeagueID;
		curLeagueState = z.chLeagueRank;
		$("init_iLeagueName").innerHTML = curLeagueID==0?"暂无":z.szLeagueName;
		
		$("init_iUserPoint").innerHTML = z.iUserPoint;
		$("init_iPlayerNationID").innerHTML = ToNation(z.iPlayerNationID);
		
		$("init_iUserSeq").innerHTML = z.iUserSeq;
		$("init_iUserRank").innerHTML = ToUserRank(1,z.iUserRank).UserTitle;
		$("init_iCulture").innerHTML = ToUserRank(3,z.iCulture).UserTitle;
		$("init_iForce").innerHTML = ToUserRank(2,z.iForce).UserTitle;
		
		$("init_iGlod").innerHTML = z.iMoney;
		
		//用户装备初始化
		Outfit = z.CPlayerOutfit.achOutfit
		
		arrOwnCity = z.aiSubCity;
		arrOwnCity.push(z.iMainCity);		
		
		
		//发送1003请求城市信息
		//保持连接心跳协议
		CityID = z.iMainCity;
		objFlashEng.Send(GetMineCity(CityID,0));	
		
		
		//更新任务信息
		objFlashEng.Send(getTaskList(1500,1))
		timekeep = setInterval("doInterval()",30000);
		
		//判断是否今日首次登录
		var btime=z.iLastLoginTime
		now1.setTime(btime*1000);
		var svrtime=new Date()
		svrtime.setTime(MineInfo.CAnsGetMineInfo.CResult.szResultMsg*1000)		
		var timetmp=parseInt(MineInfo.CAnsGetMineInfo.CResult.szResultMsg,10)
		if(now1.getDate()!=svrtime.getDate()){
			$("everyday_uin").innerHTML= Uin
			$("everyday_uname").innerHTML= UName
			$("everyday_time").innerHTML= formattimeNOW(timetmp,false)
			SH("everyday")
			SH("maskbg")
		}	
	}
}
//var how_meny_times=1
//每30秒更新city信息
function doInterval(){
	objFlashEng.Send(GetMineCity(CityID,0));
}
//服务器时间iSerTime
function doSTimeShow(stime){
	var nowtime = formattimeNum(stime.getHours())+":"+formattimeNum(stime.getMinutes())+":"+formattimeNum(stime.getSeconds())
	$("serverTimeShow").innerHTML = nowtime
	stime.setTime(STime.getTime()+1000)
}

function ToUserRank(type,rank){
	for(var i=0;i<mbu.UserRank.length;i++){
		if(type == mbu.UserRank[i].RankType && 
			rank == mbu.UserRank[i].RankNumber)
		return mbu.UserRank[i]
	}
}
/*  
    1022处理函数
    返回所有城市的概要信息 
*/
function ShowMineAllCity(str){
	var MineCity=eval('('+str+')')
	if(typeof(MineCity.CResult) != "undefined")	{
		msgbox("Error:"+MineCity.CResult.iResultID+"<br><b>获取城市失败：</b><span class='t_tips_yellow'>"+errMsg(MineCity.CResult.iResultID)+"!</span>");
		return false;
	}
	allCityName=MineCity.CAnsGetMyCity.astSubCity;
	var tempstr = "";
	for(var i=0;i<allCityName.length;i++){
		if(CityID != allCityName[i].iCityID){
			tempstr += "<div class='AllCityClass imghand' onclick=\"changeCity('"+allCityName[i].iCityID+"');\">";
			tempstr += allCityName[i].szCityName + "</div>";
		}
	}
	$("subCity").innerHTML = tempstr;
	$("showAllCity").style.height = 24*(i-1)+"px"
	arrOwnCity.length=0;
	for(var i=0;i<allCityName.length;i++){
		arrOwnCity.push(allCityName[i].iCityID)
	}
}


function changeCity(cityid){
	objFlashEng.Send(GetMineCity(cityid,0));
	//切换到内城图
	ShowTab('building',0)
	
	//显示主TAB
	ShowRichTab(0,0,1);	
}

/*  
    1003处理函数
    返回城市的基本信息 
*/

function ShowMineCity(str){
	var MineCity=eval('('+str+')')
	if(typeof(MineCity.CResult) != "undefined")	{
		msgbox("Error:"+MineCity.CResult.iResultID+"<br><b>获取城市信息失败：</b><span class='t_tips_yellow'>"+errMsg(MineCity.CResult.iResultID)+"!</span>");
		return false;
	}
	//服务器主动推送的
	var CITY = MineCity.CAnsGetMineCity.CCityInfoToClient
	if(MineCity.CTMsgHead.llMsgAct== -1){
		if(CityID == CITY.iCityID){
			initSource(CITY)
			//显示建筑
			initBuilding(CITY.achItem)
			//根据1003返回的数据组合【建筑科技防御造兵】的数组，下标 0-51
			makeCityBuildRank(CITY)
		}
	}else{
		//发送城市信息时的CITYID
		CityID = CITY.iCityID
		
		
		
		//显示页面上的资源信息
		initSource(CITY)
		
		
		
		//显示建筑
		initBuilding(CITY.achItem)
		
		
		
		//根据1003返回的数据组合【建筑科技防御造兵】的数组，下标 0-51
		makeCityBuildRank(CITY)
		
		
		
		//1022返回所有城市名称	
		objFlashEng.Send(GetMineAllCity());
		
		
		
		
		//设置服务器时间倒计时
		STime.setTime(MineCity.CAnsGetMineCity.iSerTime*1000);
		//倒计时
		interSTime=clearInterval(interSTime)
		interSTime=setInterval("doSTimeShow(STime)",1000);
		
		//当前正在建造中的建造项，全局数组，用来显示正在建造中的建造项
		arrCurBuild = [];
		arrCurWaterID = [];
		//根据当前操作的富面板，更新list层,以显示最新状态
		 switch (listdivID) 
		 {
			case 1 :
				ShowBuildListDiv();
				break 
			case 2 :
				ShowTEListDiv();
				break 
			case 3 :
				ShowFOListDiv();
				break 
			case 4 :
				ShowARListDiv();
				break 
		}
		//1005组合建造流水列表
	
		//所有建造的流水号数组
		var arr_astTaskID = CITY.astBuildTaskID.
			concat(CITY.astTechTaskID).
			concat(CITY.astFortTaskID).
			concat(CITY.astSoldierTaskID);
	
		// 保存到全局的Task中
		gTask.clearAllTasks();
		if(arr_astTaskID.length==0){
			//清除原来的队列显示
			delBuildTab(arr_astTaskID);
		}else{
			for (var i = 0; i < arr_astTaskID.length; ++i)
			{
				gTask.insertTaskID(arr_astTaskID[i]);
			}
		
			//按10条段发送
			for (var start = 0, step = 10;  start < arr_astTaskID.length; start += step)
			{
				var newa = arr_astTaskID.slice(start, start + step);
				objFlashEng.Send(GetBuildingTask(newa));
				gTask.incCount(); //每发送一次请求, 计数+1
			}
		}
		//1019请求军事队列列表
		objFlashEng.Send(GetArmyList(1,CityID))
	}
}
function initSource(obj){
	$("init_szCityName").innerHTML = obj.szCityName;	
	$("CurCityMPName").innerHTML = obj.szCityName;	
	$("CurCityMPGrid").innerHTML = ToXY(obj.iGridID);
	$("init_iWoodCount").innerHTML = obj.iWoodCount;	
	$("init_iWoodMax").innerHTML = obj.iWoodMax;	
	$("init_iWoodPerhour").innerHTML = obj.iWoodPerhour;	
	$("init_iIronCount").innerHTML = obj.iIronCount;	
	$("init_iIronPerhour").innerHTML = obj.iIronPerhour;	
	$("init_iIronMax").innerHTML = obj.iIronMax;	
	$("init_iFoodCount").innerHTML = obj.iFoodCount;	
	$("init_iFoodPerhour").innerHTML = ((obj.iFoodPerhour-obj.iFoodExpend)<=0)?"<span title='每小时部队消耗超过粮食生产数量' class='t_red'>"+(obj.iFoodPerhour-obj.iFoodExpend)+"</span>":(obj.iFoodPerhour-obj.iFoodExpend); //实际每小时产量,负数标红
	$("init_iFoodMax").innerHTML = obj.iFoodMax;	
	$("init_iStoneCount").innerHTML = obj.iStoneCount;	
	$("init_iStoneMax").innerHTML = obj.iStoneMax;	
	$("init_iStonePerhour").innerHTML = obj.iStonePerhour;	
	$("init_iPopulationLeft").innerHTML = obj.iUsedPopulation;	//当前已用人口数
	$("init_iPopulationCount").innerHTML = obj.iPopulationCount;
	nWood = obj.iWoodCount;
	nIron = obj.iIronCount;
	nFood = obj.iFoodCount;
	nStone = obj.iStoneCount;	
	nPop = obj.iPopulationCount-obj.iUsedPopulation;	
	curGridID = obj.iGridID
	curFoodExpend = obj.iFoodExpend
	
	
	
	//解析buff图标显示
	var arrbuff=obj.CityBuff.astCityBuff
	var arrImg=$("CurCityStatu").getElementsByTagName("img");
	for(var i=0;i<arrImg.length;i++)
	{
		arrImg[i].className = "fgray border_hui imghand";
		arrImg[i].style.background = "url(/images/icon_buff.gif) -"+20*i+"px 0px";
		arrImg[i].style.width = "20px";
		arrImg[i].style.height = "20px";
	}
	//初始显示都为默认hint
	arrImg[0].title = "双倍经验 暂无\n点击购买";
	arrImg[1].title = "护身符 暂无\n点击购买";
	arrImg[2].title = "免战牌 暂无\n点击购买\n使用后48小时内不能取消！";
	arrImg[3].title = "增大仓库 暂无\n点击购买";
	arrImg[4].title = "产量加成 暂无\n点击购买";
	arrImg[5].title = "实而虚之 暂无\n点击购买";
	arrImg[6].title = "虚而实之 暂无\n点击购买";
	arrImg[7].title = "草木皆兵 暂无\n点击购买";
	arrImg[8].title = "空城计 暂无\n点击购买";
	
	//根据返回值显示正确信息hint
	for(var i=0;i<arrbuff.length;i++)
	{
		switch(arrbuff[i].iBuffID){
			case 100:
				arrImg[0].className = "border_hui imghand";//积分加成增加200
				arrImg[0].title = "双倍经验\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				break
			case 102:
				arrImg[1].className = "border_hui imghand";//护身符200
				arrImg[1].title = "护身符\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				break
			case 101:
				arrImg[2].className = "border_hui imghand"; //免战效果101
				arrImg[2].title = "免战牌\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				break
			case 104:
				//arrImg[1].className = "border_hui";//104vip效果
				break
			case 200:
				arrImg[3].className = "border_hui imghand";//仓库容量增加200
				arrImg[3].title = "增大仓库\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				//增大仓库显示绿色容量					
				$("init_iWoodMax").innerHTML = "<span title='使用了增大仓库道具，到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"' class='t_green'>"+obj.iWoodMax+"</span>";				
				$("init_iIronMax").innerHTML = "<span title='使用了增大仓库道具，到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"' class='t_green'>"+obj.iIronMax+"</span>";				
				$("init_iFoodMax").innerHTML = "<span title='使用了增大仓库道具，到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"' class='t_green'>"+obj.iFoodMax+"</span>";				
				$("init_iStoneMax").innerHTML = "<span title='使用了增大仓库道具，到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"' class='t_green'>"+obj.iStoneMax+"</span>";	
				
				
				break
			case 201:
				arrImg[4].className = "border_hui imghand";//增加城市资源产量201
				arrImg[4].title = "产量加成\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				break
			case 202:
				arrImg[5].className = "border_hui imghand";//资源(显示)比例，正数为放大202
				arrImg[5].title = "实而虚之\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				break
			case -202:
				arrImg[6].className = "border_hui imghand";//资源(显示)比例，负数为缩小-202
				arrImg[6].title = "虚而实之\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				break
			case 203:
				arrImg[7].className = "border_hui imghand";//草木皆兵203
				arrImg[7].title = "草木皆兵\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				break
			case -203:
				arrImg[8].className = "border_hui imghand";//空城计-203
				arrImg[8].title = "空城计\n到期时间:"+formattimeNOW(arrbuff[i].iEndTime,true)+"\n点击续费";
				break
		}
	}
}
//显示建筑
function initBuilding(arrBuildingList){
	//获得Name数组
	var arrBuildingName=[];	
	var a=PackArr(arrBuildingList,19)	
	for (i=0; i<19; i++) {
		arrBuildingName.push(mb.Buidings[i].BuildingName);
	}
	//向flash发送等级及Name数组
	objFlashCity.initShowBuild(a,arrBuildingName)
	
}
//根据1003返回的数据组合【建筑科技防御造兵】的数组，下标 0-51
function makeCityBuildRank(CITY){
	arrCityBuildRank.length = 0; //首先清空
	
	arrCityBuildRank = PackArr(CITY.achItem,19).
		concat(PackArr(CITY.achTech,12)).
		concat(PackArr(CITY.ashFort,8)).
		concat(PackArr(CITY.ashArmy,11));

	//更新外城资源页面tips	
	$("resource_wood").hint = "林场 "+arrCityBuildRank[0] + "级"
	$("resource_food").hint = "农田 "+arrCityBuildRank[1] + "级"
	$("resource_stone").hint = "石料场 "+arrCityBuildRank[2] + "级"
	$("resource_iron").hint = "矿山 "+arrCityBuildRank[3] + "级"
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


/*  1005处理函数
返回城市的建筑任务列表信息  
*/
function ShowBuildingTask(str,init){
	var BuildingTask=eval('('+str+')');
	if(typeof(BuildingTask.CResult) != "undefined")	{
		msgbox("Error:"+BuildingTask.CResult.iResultID+"<br><b>获取队列失败：</b><span class='t_tips_yellow'>"+errMsg(BuildingTask.CResult.iResultID)+"!</span>");	
		return false;
	}
	var arrBuilding=BuildingTask.CAnsGetMineBuildingTask.astBuilding;
	
	for (var i = 0; i < arrBuilding.length; ++i)
	{
		gTask.setTaskData(arrBuilding[i].szWaterID, arrBuilding[i]);
	}
	
//	// 所有task的数据都有了才显示
//	if (!gTask.isAllTaskHasData())
//	{
//		return false;
//	}
	// 所有响应回来了才显示
	// 在重复发请求的情况下, 可能多个响应要处理
	gTask.decCount(); //每收到一次响应, 计数减1
	if (gTask.countReq > 0)
	{
		return false;
	}
	gTask.eraseNullTask(); // 清除没有数据的无效流水

	//当前正在建造中的建造项，全局数组，用来显示正在建造中的建造项
	for(var i=0;i<arrBuilding.length;i++)
	{	
		arrCurBuild.push(arrBuilding[i].iBuildingID)
		arrCurWaterID.push(arrBuilding[i].szWaterID)		
	} 
	
	//使Flash显示正在建造中
	objFlashCity.ShowDoing(arrCurBuild.length == 0 ? 0 : arrCurBuild[0]);
	
	for (var i = 0; i < Task.NAMES.length; ++i)
	{
		var n = Task.NAMES[i];
		//$(n + "_SpeedUp").style.display = gTask["arr" + n].length > 0 ? "block" : "none";

		// 先删除旧的行
		var TabLength = $(n + "Tab").rows.length;
		for (var m = 1; m < TabLength; ++m)
		{
			$(n + "Tab").deleteRow(-1);
		}
		
		var arr = gTask["arr" + n];

		// 如果数组为空填充“暂无”
		if (arr.length == 0)
		{
			var otr = $(n + "Tab").insertRow(-1);
			var checkTd = document.createElement("td");
			checkTd.innerHTML = "暂无";
			otr.appendChild(checkTd);
		}
		else
		{
			for (var j = 0; j < arr.length; ++j)
			{
				var dat = arr[j].taskData;
				addBuildTab(n + "Tab", dat.iBuildingID, (n == "IT" || n == "TE" ? dat.iData : dat.iReserve2),
					dat.iStartTime, dat.iNeedTime, dat.szWaterID,
					dat.chStatus);
			}
		}
	}

	//根据当前操作的层，更新list层,以显示最新状态
		//根据当前操作的富面板，更新list层,以显示最新状态
		 switch (listdivID) 
		 {
			case 1 :
				ShowBuildListDiv();
				break 
			case 2 :
				ShowTEListDiv();
				break 
			case 3 :
				ShowFOListDiv();
				break 
			case 4 :
				ShowARListDiv();
				break 
		}
}

//生成表格
function addBuildTab(tabid,name,data,starttime,time,waterid,status)
{
    var otr = $(tabid).insertRow(-1);
    var checkTd=document.createElement("td");
    checkTd.innerHTML = mb.Buidings[transToArrID(name)].BuildingName;
    var otd0 = document.createElement("td");
    var otd1 = document.createElement("td");
	otd1.id = waterid;
	
    
	
	var speedstr=""
	var typeName = waterid.slice(0,2);
	var desc = (typeName == "IT" || typeName == "TE" ? "级" : "个");
	otd0.innerHTML = (data) + desc;
	if(!status)
	{
		otd1.innerHTML = "队列中";
	}
	else
	{
		var t = (starttime + LocalTime + time) * 1000;
		otd1.innerHTML = getTimeDiff(t);
		var timerID = setInterval("diff("+t+", '"+waterid+"', '"+typeName+"')", 1000);
		gTask.setTaskTimer(typeName, timerID);
		//显示加速
		var speedup=""
		if(typeName == "IT")speedup="ShowMultiChose(1,1,1)"
		if(typeName == "TE")speedup="ShowMultiChose(1,1,2)"
		if(typeName == "FO")speedup="ShowMultiChose(1,3,3)"
		if(typeName == "AR")speedup="ShowMultiChose(1,3,4)"
		speedstr="<a href=\"javascript:"+speedup+
							";\" class=\"a_red\">加速</a> "
	}

	var otd2 = document.createElement("td");
	otd2.align = "center";
/*	//判断是否显示取消
	if(typeName == "IT" || typeName == "TE")
	{
    	
	}else{
		otd2.innerHTML = speedstr;
	}*/
	//090618修改，造兵城防可取消
	otd2.innerHTML = speedstr+"<a href=\"javascript:CancleTask('"+waterid+
						"');\" class=\"t_juhuang\">取消</a>";
							
	checkTd.width="70";
	otd0.width="35";
	otd1.width="90";
	otd2.width="56";
	otd2.align="right";
    otr.appendChild(checkTd);
    otr.appendChild(otd0); 
    otr.appendChild(otd1); 
    otr.appendChild(otd2);
}

//计算时间
function diff(inputtime, waterid, typeName)
{
	var diffInt = inputtime - new Date().getTime();
	if (diffInt > 0)
	{
		if ($(waterid))
		{
			$(waterid).innerHTML = getTimeDiff(inputtime);
		}
	}
	else
	{
		//清空定时器数组
		gTask.clearTaskTimer(typeName);
		objFlashEng.Send(GetMineCity(CityID,0));	
		//更新任务列表完成情况
		objFlashEng.Send(getTaskList(1500,1));
	}
}
//格式化时间,输入为秒数
function formattime(inputtime){  
	var s=0;
	var h=0;
	var m=0;
	var d=0;
	if(inputtime <60){
		s = inputtime
		return "00:00:"+formattimeNum(s);
	}else if(inputtime>=60 && inputtime<3600){
		s = inputtime % 60
		m = Math.floor(inputtime/60)
		return "00:"+formattimeNum(m)+":"+formattimeNum(s);
	}else if(inputtime>=3600 && inputtime<86400){
		h = Math.floor(inputtime/3600)
		s = inputtime % 60
		m = Math.floor(inputtime/60)- h*60
		return formattimeNum(h)+":"+formattimeNum(m)+":"+formattimeNum(s);
	}else if(inputtime>=86400){
		d = Math.floor(inputtime/86400);
		h = Math.floor(inputtime/3600) - d*24
		s = inputtime % 60
		m = Math.floor(inputtime/60)- h*60-d*60*24
		return d +"天 "+ formattimeNum(h)+":"+formattimeNum(m)+":"+formattimeNum(s);
	}
}
function formattimeNum(num){
	if(num<10){
		return "0"+num;
	}else{
		return num;
	}
}
function delBuildTab(arr_astTaskID){
	for (var i = 0; i < Task.NAMES.length; ++i)
	{
		var n = Task.NAMES[i];
		var TabLength = $(n + "Tab").rows.length;
		for (var m = 1; m < TabLength; ++m)
		{
			$(n + "Tab").deleteRow(-1);
		}

		if (gTask["arr" + n].length == 0)
		{
			//如果数组为空填充“暂无”
			var otr = $(n + "Tab").insertRow(-1);
			var checkTd = document.createElement("td");
			checkTd.innerHTML = "暂无";
			otr.appendChild(checkTd);
			
		}
		$(n + "_SpeedUp").style.display = gTask["arr" + n].length > 0 ? "block" : "none";
	}
	objFlashCity.ShowDoing(0);
}



/*
    1007处理函数
    更新页面信息
*/
function ShowDoBuild(str){
	var objBuild=eval('('+str+')');	
	if(typeof(objBuild.CResult) != "undefined")	{
		msgbox("Error:"+objBuild.CResult.iResultID+"<br><b>建造失败：</b><span class='t_tips_yellow'>"+errMsg(objBuild.CResult.iResultID)+"!</span>");
		return false;
	}else{
		var CITY=objBuild.CAnsBuild.CCityInfoToClient;
		//更新显示页面上文字信息
		initSource(CITY);
		//所有建造的流水号数组
		var arr_astTaskID = CITY.astBuildTaskID.
			concat(CITY.astTechTaskID).
			concat(CITY.astFortTaskID).
			concat(CITY.astSoldierTaskID);
	
		// 保存到全局的Task中
		gTask.clearAllTasks();
		if(arr_astTaskID.length==0){
			//清除原来的队列显示
			delBuildTab(arr_astTaskID);
		}else{
			for (var i = 0; i < arr_astTaskID.length; ++i)
			{
				gTask.insertTaskID(arr_astTaskID[i]);
			}
		
			//按10条段发送
			for (var start = 0, step = 10;  start < arr_astTaskID.length; start += step)
			{
				var newa = arr_astTaskID.slice(start, start + step);
				objFlashEng.Send(GetBuildingTask(newa));
				gTask.incCount(); //每发送一次请求, 计数+1
			}
		}		
		ShowRichTab(0,0,1);	
		//根据当前操作的富面板，更新list层,以显示最新状态
		 switch (listdivID) 
		 {
			case 1 :
				ShowBuildListDiv();
				break 
			case 2 :
				ShowTEListDiv();
				break 
			case 3 :
				ShowFOListDiv();
				break 
			case 4 :
				ShowARListDiv();
				break 
		}
	}
}

/*
    1008处理函数
    显示查询地图结果
*/
function ShowSearchMapN(str){
	var objBuild=eval('('+str+')');
	if(typeof(objBuild.CResult) != "undefined")	{
		msgbox("Error:"+objBuild.CResult.iResultID+"<br><b>查询失败：</b><span class='t_tips_yellow'>"+errMsg(objBuild.CResult.iResultID)+"!</span>");
		return false;
	}else{
		/*//显示左侧搜索结果
		//删除表格多余行
		var TabLength=$("citymap_search_tab").rows.length;	
		for(var i=1;i<TabLength;i++){
			$("citymap_search_tab").deleteRow(-1);
		}
		//添加行
		var otr = $("citymap_search_tab").insertRow(-1);
		for(i=1;i<4;i++){
			eval("var TD"+i+"=document.createElement('td')");
		}
			//行内容
			TD1.innerHTML=objBuild.CAnsSearchMap.szCityName;
			TD2.innerHTML="("+ToXY(objBuild.CAnsSearchMap.iGrid)+")";
			TD3.innerHTML="<a onclick='objFlashEng.Send(GetWorldMap("+objBuild.CAnsSearchMap.iGrid+",1))' href='#' class='a_yellow'>GO&gt;&gt;</a>";	
		for(i=1;i<4;i++){
			eval("otr.appendChild(TD"+i+")");
		}*/
		//发送1006显示中心位置
		objFlashEng.Send(GetWorldMap(objBuild.CAnsSearchMap.iGrid,1)); ///1005
	}
}


/*
    1009处理函数
    显示收藏地图结果
*/
function ShowFavMap(str){
	var objBuild=eval('('+str+')');
	/*---------错误信息处理---------- will 版 非简略*/
	/*if(typeof(objBuild.CResult) != "undefined")	{
		msgbox("Error:"+objBuild.CResult.iResultID+"<br><b>收藏失败：</b><span class='t_tips_yellow'>"+errMsg(objBuild.CResult.iResultID)+"!</span>");
		return false;
	}
	---------错误信息处理完----------*/
	if(objBuild.CAnsCollectMap.CResult.iResultID!=0)	{
		msgbox("Error:"+objBuild.CAnsCollectMap.CResult.iResultID+"<br><b>收藏失败：</b><span class='t_tips_yellow'>"+errMsg(objBuild.CAnsCollectMap.CResult.iResultID)+"!</span>");
		return false;
	}
	else if(objBuild.CAnsCollectMap.CResult.iResultID == 0){	
		//act 1收藏
		if(objBuild.CTMsgHead.llMsgAct == 1)msgbox("收藏成功，请进入我的收藏夹查看!")
		
		//显示左侧搜索结果
		//删除表格多余行
		var TabLength=$("citymap_fav_tab").rows.length;	
		for(var i=1;i<TabLength;i++){
			$("citymap_fav_tab").deleteRow(-1);
		}
		//增加行
		var arrResult = objBuild.CAnsCollectMap.CCollectMapSuit.astCollectMaps;
		for(n=0;n<arrResult.length;n++){
			var otr = $("citymap_fav_tab").insertRow(-1);
			for(i=1;i<4;i++){
				eval("var TD"+i+"=document.createElement('td')");
			}
			//收藏描述
			TD1.innerHTML= "<a onclick='objFlashEng.Send(GetWorldMap("+arrResult[n].iGrid+",1))' href='#' class='a_yellow'>"+arrResult[n].szDesc;+"</a>";	
			//收藏坐标
			TD2.innerHTML="("+ToXY(arrResult[n].iGrid)+")";
			//功能按钮
			TD3.innerHTML="<img title=\"点击修改名称\" class=\"imghand\" onclick=\"callModFavMap("+arrResult[n].iGrid+",'"+arrResult[n].szDesc+"',"+n+")\" src=\"images/map_tab1_edit.gif\" width=\"19\" height=\"19\" />&nbsp;<img title=\"点击删除该坐标\" class=\"imghand\" onclick=\"DelFavMap("+arrResult[n].iGrid+","+n+")\" src=\"images/map_tab1_del.gif\" width=\"19\" height=\"19\" />";	
			TD1.height="20";
			for(i=1;i<4;i++){
				eval("otr.appendChild(TD"+i+")");
			}	
		}
	}
}

/*
    1006处理函数
    显示地图
*/
function ShowMaps(str){
	var objMap=eval('('+str+')');
	if(typeof(objMap.CResult) != "undefined")	{
		msgbox("Error:"+objMap.CResult.iResultID+"<br><b>显示地图失败：</b><span class='t_tips_yellow'>"+errMsg(objMap.CResult.iResultID)+"!</span>");
		return false;
	}
	tempMapstr = "";
	//当前中心格坐标
	curMapGridID = objMap.CAnsGetWorldMap.astGrid[24].iGridID;
	//修正地图遮挡问题，下面地图遮挡上面
	var dearr=[6,5,4,3,2,1,0,13,12,11,10,9,8,7,20,19,18,17,16,15,14,27,26,25,24,23,22,21,34,33,32,31,30,29,28,41,40,39,38,37,36,35,48,47,46,45,44,43,42]
	for(i=0;i<49;i++){
		//判断是第几行
		var x=0;
		switch (dearr[i]%7) 
		{
		 case 0 :
			x=0;
			break 
		 case 1 :
			x=1;
			break 
		 case 2 :
			x=2;
			break 
		 case 3 :
			x=3;
			break 
		 case 4 :
			x=4;
			break 
		 case 5 :
			x=5;
			break 
		 case 6 :
			x=6;
			break 
		}
		//传入坐标和对象，显示城市
		doShowGrid(objMap.CAnsGetWorldMap.astGrid[dearr[i]],dearr[i],x)	
	}
	
	//模拟点击选中的随机点1:得到当前选中序号
	z=0;
	for(b=0;b<49;b++){
		try{
			if(typeof($("map_bgmask"+b).height) == "number")z=b;
		}catch(x){
		}
	}
	
	//显示最终城市组合的字符串
	$("citymap_grid").innerHTML = tempMapstr;
	tempMapstr = '';
	
	//确保搜索时点中地图中心
	if(z == 0 || objMap.CTMsgHead.llMsgAct==1)z=24
	//模拟点击选中的随机点2:模拟点击
	$("citymap_grid").getElementsByTagName("img")[dearr[z]*2].click()
	
	
	
	//显示XY坐标
	var int = objMap.CAnsGetWorldMap.astGrid[0].iGridID
	var xxx,yyy
	if(int>=0 && int<1000){
		xxx=0;
		yyy=int;
	}else if(int>=1000 && int<1000000){
		xxx = Math.floor(int/1000);
		yyy = int-xxx*1000;
	}
	//根据数组下标，生成XY坐标轴其他坐标值
	for(i=1;i<8;i++){
		eval("$('citymap_y"+i+"').innerHTML = '"+ (yyy+i-1) +"'");
		eval("$('citymap_x"+i+"').innerHTML = '"+ (xxx+i-1) +"'");
	}
	
}
//组合地图格字符串
function doShowGrid(o,i,x){
	var cityid = o.chGridType ? o.iData : 0;
	//判断空地随机点的图片显示
	var classofpic;
	var newX = getNewPos((i-x)/7,x)[0];//图片左边距
	var newY = getNewPos((i-x)/7,x)[1];//图片上边距
	var oldX =newX
	var oldY =newY
	var nowNation = o.chCityNationID
	var nowPop = o.iPopulationCount;
	var nowName = o.szCityName;
	if(o.chGridType == 2){
		//随机点
		var arrTmpName=["","初级据点","中级据点","高级据点"]
		classofpic = "map_r_"+o.chCityNationID;
		nowNation = 0;
		nowPop = ""
		nowName = arrTmpName[o.chCityNationID]
	}else if(o.chGridType == 0){
		//空地显示3种地表
		if(o.iData == 1) classofpic = "map_g_1";
		if(o.iData == 2) classofpic = "map_g_5";//空地无图片
		if(o.iData == 3) classofpic = "map_g_4";
		if(o.iData == 4) classofpic = "map_g_3";
		howbigpic = "m"
		nowName = "默默无闻的荒地"
	}else if(o.chGridType == 1){	
		//城池
		newY = newY -15;
		//根据城池规模判断图片
		if(o.iPopulationCount<200){
			classofpic = "map_i_s map_icon_city"
		}else if(o.iPopulationCount>=200 && o.iPopulationCount<4000){
			classofpic = "map_i_m map_icon_city"
		}else if(o.iPopulationCount>=4000 && o.iPopulationCount<20000){
			classofpic = "map_i_b map_icon_city"
		}else if(o.iPopulationCount>=20000 && o.iPopulationCount<60000){
			classofpic = "map_i_c map_icon_city"
		}else if(o.iPopulationCount>=60000){
			classofpic = "map_i_d map_icon_city"
		}
	}
	
	
	//tips显示
	var tempTips=nowName;
	//判断是否城市，只有城市显示人口和家族
	if(nowNation)tempTips+="<br>人口："+nowPop+"<br>家族："+o.szLeagueName
	//判断是否随机点,判断产出奖励种类，与运算
	var arrkind=[1,2,4,8,16,32]
	var M=["金币","资源","材料","道具","宝物","英雄"]
	var strprize=""
	for(k=0;k<6;k++){
		if(arrkind[k] == (arrkind[k]&o.iMoney)){// 与运算
			strprize += M[k]+" ";
		}
	}			
	if(!nowNation && strprize!='')tempTips+="<br>奖励："+ strprize
	tempTips+="<br>坐标："+ToXY(o.iGridID);
	
	tempMapstr += "<span style='margin:"+(newY+9)+"px 0 0 "+(newX+11)+"px;width:12px;height:13px;position:absolute;z-index:1001;color:#ffffff'>"+ToNation(nowNation)+"</span><img src=\"\/images\/blank.gif\" style='margin:"+(oldY+7)+"px 0 0 "+(oldX+20)+"px;width:46px;height:24px;position:absolute;z-index:1004;' class='imghand' onclick=\"mapTab("+cityid+","+o.iGridID+","+o.chGridType+",'"+o.szCityName+"',"+o.iPopulationCount+",'"+o.szCityOwnerNick+"',"+o.chCityNationID+","+o.iUserPoint+",'"+o.szLeagueName+"',"+o.iCulture+","+o.iForce+","+o.iMoney+","+o.iCityOwner+");setThisBg("+oldY+","+oldX+","+i+")\" hint=\""+tempTips+"\"><img src=\"\/images\/blank.gif\" width=\"58\" height=\"58\" class=\"map_icon_size "+classofpic+"\"  style=\"position:absolute;margin:"+newY+"px 0 0 "+newX+"px;z-index:1000;\"  hint=\""+tempTips+"\" \/>";	
}
function setThisBg(marginT, marginL,i) {
	for(b=0;b<49;b++){
		try{
			$("citymap_grid").removeChild($("map_bgmask"+b))
		}catch(x){
		}
	}
	var objD = document.createElement("img");
	objD.id = "map_bgmask"+i;
	objD.src = "images/citymap_bg_mask.gif";
	objD.width = 92;
	objD.height = 45;
	var oS = objD.style;
	oS.display = "block";	
	oS.margin = marginT+"px 0 0 "+(marginL-1)+"px";
	oS.position = "absolute";
	oS.zIndex = 991;
	$("citymap_grid").appendChild(objD);
}
//显示tab内容
//转换成斜45视角公式，感谢rapier友情提供
function getNewPos(girdx, girdy) {
	var mapwidth = 644
	var mapheight = 322
	nx=Math.ceil((girdx+girdy)*mapwidth/14)
	ny=Math.ceil((7+girdx-girdy)*mapheight/14)
	return [nx,ny]
}
//显示tab内容
function mapTab(cityid,gridid,type,name,people,owner,nation,point,league,wen,wu,gold,uin){
	
	
	//更新tab信息
	writeMapTabHtml("citymaptab_name_",name)
	writeMapTabHtml("citymaptab_pop_",people)
	writeMapTabHtml("citymaptab_country_",ToNation(nation))
	writeMapTabHtml("citymaptab_ke_",ToNationKe(nation))
	writeMapTabHtml("citymaptab_xy_",ToXY(gridid))
	writeMapTabHtml("citymaptab_owner_",owner)
	writeMapTabHtml("citymaptab_point_",ToUserRank(1,point).UserTitle)
	writeMapTabHtml("citymaptab_league_",league)
	writeMapTabHtml("citymaptab_wen_",toUserTitle(wen,3))
	writeMapTabHtml("citymaptab_wu_",toUserTitle(wu,2))
	writeMapTabHtml("citymaptab_gold_",gold)
	//他人弹出信息框
	$('citymaptab_owner_self').innerHTML ="<span class=t_yellow>"+mailThisName(uin,owner)+"</span>"
	$('citymaptab_owner_other').innerHTML ="<span class=t_yellow>"+mailThisName(uin,owner)+"</span>"
	
	if(name==""){
		curFavName = "默默无闻的荒地";
		curFavOwnerName = "荒地"
	}else{
		curFavOwnerName = owner;
		curFavName = name;	
	}		
/*  chGridType
	EGT_SPACE = 0,  ///< 空地
    EGT_CITY = 1,   ///< 城市
    EGT_RANDOM = 2, ///< 随机点
    EGT_NPC = 3,    ///< NPC
    EGT_LOCK = 4,   ///< 锁定
    EGT_SYSTEM = 5, ///< 系统预留*/
	switch (type)
		{
		 case 0 :
		 	$('citymaptab_name_nobody').innerHTML = '默默无闻的荒地';			
		 	$('citymaptab_xy_nobody').innerHTML = ToXY(gridid);
			ShowMapTab("nobody");	
			break 
		 case 1 :
		 	//判断是否是自己的城市
		 	var isOwn = false;
		 	for(i=0;i<arrOwnCity.length;i++){
				if(cityid == arrOwnCity[i]){
					isOwn = true;
				}
			}
			if(isOwn){	
				//判断是否是当前城市
				$("citymaptab_isCurCity").style.display="block";
				if(CityID == cityid){
					$("citymaptab_isCurCity").style.display="none";
				}
				//自己的城市
				ShowMapTab("self");
			}else{
				//陌生人的城市
				ShowMapTab("other");
			}
			break 
		 case 2 :
			//随机点解析
			$('citymaptab_name_random').innerHTML = "据点";
			switch(nation){
				case 1:
					$('citymaptab_class_random').innerHTML = "初级据点"
					break;
				case 2:
					$('citymaptab_class_random').innerHTML = "中级据点"
					break;
				case 3:
					$('citymaptab_class_random').innerHTML = "高级据点"
					break;
			}
			var c = new Date();
			if(c.getHours()>=18){
				$('citymaptab_endtime_random').innerHTML = (c.getMonth()+1)+"月"+(c.getDate()+1)+"日 18:00:00";
			}else{
				$('citymaptab_endtime_random').innerHTML = (c.getMonth()+1)+"月"+c.getDate()+"日 18:00:00";
			}
			$('citymaptab_much_random').innerHTML = "<span style='color:red'>"+point+"</span> ";
			curFavOwnerName = "据点"
			
			//判断产出奖励种类，与运算
			var arrkind=[1,2,4,8,16,32]
			var M=["金币","资源","材料","道具","宝物","英雄"]
			var strprize=""
			for(i=0;i<6;i++){
				if(arrkind[i] == (arrkind[i]&gold)){// 与运算
					strprize += M[i]+" ";
				}
			}			
			$('citymaptab_prize_random').innerHTML = strprize;
			
			//解析随机点兵种
			var arrb=league.split("|")
			var strarmy=""
			for(i=0;i<arrb.length-1;i++){ 
				strarmy+="<img src='/images/blank.gif' width='20' height='20' style='background:url(/images/icon_randomforce.gif) -"+(arrb[i].split(":")[0]-129)*20+"px 0px no-repeat' align='absmiddle' /> "+mb.Buidings[transToArrID(arrb[i].split(":")[0])].BuildingName+"("+arrb[i].split(":")[1]+"个)<br>"
			} 
			$('citymaptab_army_random').innerHTML = strarmy;
			
			ShowMapTab("random");			
			break 
		 case 3 :
			ShowMapTab("nobody");
			break 
		 case 4 :
			ShowMapTab("nobody");
			break 
		 case 5 :
			ShowMapTab("nobody");
			break 
		}
	curFavGrid = gridid;
}
//写入地图tab3种地图格内容函数
function writeMapTabHtml(divid,str){
	var arrTabDiv = ["other","random","self"]
	for(i=0;i<arrTabDiv.length;i++){
		try {
     		eval("$('"+divid+arrTabDiv[i]+"').innerHTML = '"+ str+"'");
      	}
      	catch(e) {           
      	}  
	}
}


/*
    1004处理函数
    取消队列
*/
function ShowCancleTask(str){
	var objT=eval('('+str+')');
	if(typeof(objT.CResult) != "undefined")	{
		msgbox("Error:"+objT.CResult.iResultID+"<br><b>取消失败：</b><span class='t_tips_yellow'>"+errMsg(objT.CResult.iResultID)+"!</span>")
		return false;
	}else{
		objFlashEng.Send(GetMineCity(CityID,0));
	}
}


/*
    1019处理函数
    初始化城市信息时更新
*/
function ShowArmyList(str){
	var objA=eval('('+str+')');
	if(typeof(objA.CResult) != "undefined")	{
		msgbox("Error:"+objA.CResult.iResultID+"<br><b>军事队列失败：</b><span class='t_tips_yellow'>"+errMsg(objA.CResult.iResultID)+"!</span>")
		return false;
	}
	var A=objA.CAnsArmySummary.astArmyHand;
	//act=0为右下角概要，act非0为军情面板
	if(objA.CTMsgHead.llMsgAct==0){
		//判断是否全部是联防部队驻军iStat=3的			
		var isallUN=true  
		for(i=0;i<A.length;i++){
			if(A[i].iStat!=3)isallUN=false
		}
		
		if(A.length==0 || isallUN==true){
			//全是联防部队
			
			var TabLength=$("AMYTab").rows.length;	
			for(var i=0;i<TabLength-1;i++){
				$("AMYTab").deleteRow(-1);
			}		
			var otr = $("AMYTab").insertRow(-1);
			var TD1=document.createElement('td')
			TD1.height="18";
			TD1.width ="24%";
			TD1.innerHTML="暂无"
			otr.appendChild(TD1);		
		}else{
			//不全是联防部队
			
			//清空AMYTab
			var TabLength=$("AMYTab").rows.length;	
			for(var i=0;i<TabLength-1;i++){
				$("AMYTab").deleteRow(-1);
			}	
			//清空军事队列
			timecountRich.length=0;
			ttimeL.length=0;
			nnameL.length=0;
			//生成TR
			for(i=0;i<A.length;i++){
				if(A[i].iStat!=3){
					var otr = $("AMYTab").insertRow(-1);
					for(n=1;n<5;n++){
						eval("var TD"+n+"=document.createElement('td')");
					}
					TD1.innerHTML=toArmyType(A[i].iType)+" "+toFangXiang(A[i].iStat);
					TD2.innerHTML=(A[i].iType==6) ? "据点" : (A[i].iType==2)?"拓荒新城":A[i].szMarrowCityName;	
					TD2.innerHTML+='<span title="点击查看该地" class="imghand" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+A[i].iTarGrid+'))">('+ToXY(A[i].iTarGrid)+')</span>'
					//添加定时器timecountRich
					ttimeL.push((A[i].ileaveTime+A[i].iMarchTime+LocalTime)*1000);
					nnameL.push("iTDListLeftTime"+i);	
					TD4.innerHTML="&nbsp;"
					//召回的判断
					if(A[i].iStat ==1)TD4.innerHTML="<a class='t_juhuang' href='javascript:void(0)' onclick='objFlashEng.Send(GetCancleArmy(\""+A[i].stCarmyWaterID+"\",0));curArmyIng=\""+A[i].stCarmyWaterID+"\"' title='超过3分钟只能使用道具召回，3分钟内免费召回'>召回</a>";
					
					
					TD1.height="18";
					TD1.width ="24%";
					TD2.width ="35%";
					TD3.width ="23%";
					TD3.id="iTDListLeftTime"+i;
					for(m=1;m<5;m++){
						eval("TD"+m+".className = toArmyTypeColor(A[i].iType)");
						eval("otr.appendChild(TD"+m+")");
					}
				}
			}
			_dotime();
		}
	}
	//军情面板所需数据
	else if(objA.CTMsgHead.llMsgAct==100)
	{
		ShowARingDiv(A)
		addZindex();
	}
	//点将台所需数据
	else if(objA.CTMsgHead.llMsgAct==200)
	{
		ShowDJ_Army(A)
	}
}
function __timeout(inputtime,inputInterval){
	var starttimeL = new Date();
	starttimeL.setTime(inputtime);	
	var nowL = new Date();
	nowL.setTime(nowL);
	var sectimeold,secondsold,msPerDay,e_daysold,daysold,e_hrsold,hrsold,e_minsold,minsold,e_seconds,seconds,timeoldL
	timeoldL = starttimeL - nowL;
	if (timeoldL>0){
		sectimeold=timeoldL/1000 
		secondsold=Math.floor(sectimeold); 
		msPerDay=24*60*60*1000
		e_daysold=timeoldL/msPerDay 
		daysold=Math.floor(e_daysold); 
		e_hrsold=(e_daysold-daysold)*24; 
		hrsold=Math.floor(e_hrsold); 
		e_minsold=(e_hrsold-hrsold)*60;
		minsold=Math.floor((e_hrsold-hrsold)*60); 
		e_seconds = (e_minsold-minsold)*60;
		seconds=Math.floor((e_minsold-minsold)*60); 
		if(hrsold<10)hrsold="0"+hrsold;
		if(minsold<10)minsold="0"+minsold;
		if(seconds<10)seconds="0"+seconds;
		try {
			if(daysold>0){
				$(inputInterval).innerHTML = daysold+"天"+hrsold+":"+minsold+":"+seconds;
			}else{
				$(inputInterval).innerHTML =  hrsold+":"+minsold+":"+seconds;			
			}
      	}
      	catch(e) {           
        } 
	}else if (timeoldL<=0){
		//清空定时器数组
		var niu = inputInterval.charAt(inputInterval.length-1)
		for(i=0;i<timecountRich.length;i++){
			timecountRich[i]=clearInterval(timecountRich[i])
		}
		timecountRich.length=0;		
		ttimeL.length=0;
		nnameL.length=0;
		objFlashEng.Send(GetMineCity(CityID,0));
	}
}
function _dotime(){
	for(i=0;i<ttimeL.length;i++){
		eval("timecountRich.push(setInterval(\"__timeout(ttimeL["+i+"],nnameL["+i+"])\",1000))");
	}	
}
//格式化时间，输入为自70年的整数
//isNeedDay:null 不带年月，true 带年月，false 只返回年月
function formattimeNOW(inputtime,isNeedDay){
	inputtime=inputtime+LocalTime;
	var starttimeT = new Date();
	starttimeT.setTime(inputtime*1000);	
	if(isNeedDay==null){
		return formattimeNum(starttimeT.getHours())+":"+formattimeNum(starttimeT.getMinutes())+":"+formattimeNum(starttimeT.getSeconds())
	}else if(isNeedDay==true){
		return formattimeNum(starttimeT.getYear())+"年"+
				formattimeNum(starttimeT.getMonth()+1) +"月"+
				formattimeNum(starttimeT.getDate())	+"日 "+
				formattimeNum(starttimeT.getHours())+":"+
				formattimeNum(starttimeT.getMinutes())+":"+
				formattimeNum(starttimeT.getSeconds())	
	}else if(isNeedDay==false){
		return formattimeNum(starttimeT.getYear())+"年"+
				formattimeNum(starttimeT.getMonth()+1) +"月"+
				formattimeNum(starttimeT.getDate())	+"日"
	}
}
function toArmyType(itype){
	switch (itype) {
	   case 0 :
		  return "运输"
		  break 
	   case 1 :
		  return "<span class='t_red'><b>攻击</b></span>"
		  break 
	   case 2 :
		  return "拓荒"
		  break 
	   case 3 :
		  return "刺探"
		  break 
	   case 4 :
		  return "联防"
		  break 
	   case 5 :
		  return "派驻"
		  break 
	   case 6 ://据点
		  return "<span class='t_red'><b>攻击</b></span>"
		  break 
	}
}
function toArmyTypeColor(itype){
	switch (itype) {
	   case 0 :
		  return "ArmyTypeColor_green"
		  break 
	   case 1 :
		  return "ArmyTypeColor_red"
		  break 
	   case 2 :
		  return "ArmyTypeColor_green"
		  break 
	   case 3 :
		  return "ArmyTypeColor_red"
		  break 
	   case 4 :
		  return "ArmyTypeColor_green"
		  break 
	   case 5 :
		  return "ArmyTypeColor_green"
		  break 
	   case 6 :
		  return "ArmyTypeColor_red"
		  break 
	}
}
function toFangXiang(itype,txt){
	switch (itype) {
	   case 0 ://组建
		  return ""
		  break 
	   case 1 :
		  return (txt==null)?">>":"出发"
		  break 
	   case 2 ://战斗
		  return ""
		  break 
	   case 3 ://联防
		  return ""
		  break 
	   case 4 ://遣返或手动召回
		  return (txt==null)?"&lt;&lt;":"遣返"
		  break 
	   case 5 :
		  return (txt==null)?"&lt;&lt;":"返回"
		  break 
	}
}

/*
**    ==================================================================================================  
**    类名： 
**    功能：通用函数
**    示例：
**                        
**    ==================================================================================================  
*/
function  SH(table1){
	$(table1).style.display ="block";	
}  
function  HI(table1){
	$(table1).style.display = "none";
}  
function $(id){return document.getElementById(id);}
function $F(name){return document.getElementsByTagName(name);}
function $N(name){return document.getElementsByName(name);}
function replaceTextareaN(str){
    var reg=new RegExp("\r\n","g");
    var reg1=new RegExp(" ","g");    
    str = str.replace(reg,"<br>");
    str = str.replace(reg1,"<p>");    
    return str;
}
function replaceTextareaBR(str){
    var reg=new RegExp("<br>","g");
    var reg1=new RegExp("<p>","g");    
    str = str.replace(reg,"\r\n");
    str = str.replace(reg1," ");    
    return str;
}
/*
**    ==================================================================================================  
**    类名： 
**    功能：得到字符串的总长度 返回值为0000+str
**    示例：CLength('str')
**                        
**    ==================================================================================================  
*/
function CLength(TmpStr){
	switch (chGetLength(chGetLength(TmpStr).toString())) {
	   case 1 :
		  AllLength="000"+chGetLength(TmpStr).toString()
		  break 
	   case 2 :
          AllLength="00"+chGetLength(TmpStr).toString()
		  break 
	   case 3 :
          AllLength="0"+chGetLength(TmpStr).toString()
		  break 
	   case 4 :
		  AllLength=+chGetLength(TmpStr).toString()
		  break 
	}
	return AllLength+TmpStr
}
// 得到字符串的长度,utf8汉字算3个 
function chGetLength(value)
{
		value=value+""; //修正数字无长度
		var totalLength = 0;
        var i;
        var charCode;
        for (i = 0; i < value.length; i++) {
          charCode = value.charCodeAt(i);
          if (charCode < 0x007f) {
            totalLength = totalLength + 1;
          } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
          } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
          }
        }
        //msgbox(totalLength);
        return totalLength;
}
// 得到字符串的长度，汉字算两个
function chChineseLength(value)
{
	var len = 0;
	for(var i = 0; i < value.length; i++)
	{
		if (value.charCodeAt(i) > 255) // 双字节
		{
			len += 2;
		}
		else
		{
			++len;
		}
	}
	return len;
}
//转换材料ID和材料数组下标
function toMaterilName(id){
	var arrName=["棉","细麻","羊皮","狼皮","豹皮","虎皮","青铜碎片","白银碎片","黄金碎片","圣石"]
	if(id == 100)return arrName[0]
	if(id == 101)return arrName[1]
	if(id == 200)return arrName[2]
	if(id == 201)return arrName[3]
	if(id == 202)return arrName[4]
	if(id == 203)return arrName[5]
	if(id == 300)return arrName[6]
	if(id == 301)return arrName[7]
	if(id == 302)return arrName[8]
	if(id == 303)return arrName[9]
}
//转换文物官衔
function toUserTitle(id,ty){
	var txt="无"
	for(var i=0;i<mbu.UserRank.length;i++){
		if(ty==mbu.UserRank[i].RankType && id==mbu.UserRank[i].RankNumber){
			txt=mbu.UserRank[i].UserTitle
		}
	}
	return txt
}