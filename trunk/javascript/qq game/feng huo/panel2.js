//副面板tab显示
var gov_arid=6
var tec_arid=9
var for_arid=8
var arm_arid=7
var tec_start_arid=19
var for_start_arid=31
var arm_start_arid=39
var arm_end_arid=50 //上限
var listdivID=0;//定义当前正在操作的填充mainDIV

//显示右侧副面板
function WriteDiv(id,NowRank){
	var temHtml = "";
	var NextRank = NowRank+1;
	
	if(NextRank < mbr.Buidingranks[id].rank.length ){
		temHtml += "<div style=\"margin:10px 0 10px 0;\">";
		temHtml += "                     <div style=\"float:left;\"><img style=\"background:url(images2/mgb2_iconbuilding.jpg) -"+ (71*(id)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+id+")\" title=\"点击查看详情\" \/><\/div>";
		temHtml += "                     <div style=\"text-align:left; margin:3px 10px 0 88px;\"><b>"+ mb.Buidings[id].BuildingName +"<\/b>  ("+ NextRank +"级) <span class=\"a_yellow\"  onclick=\"getInfo("+id+")\"> &gt;&gt;查看详情<\/span><br \/>";
		temHtml += "    "+ mb.Buidings[id].BuildingDesc1 +"<\/div>";
		temHtml += "   			   <\/div>";
		temHtml += "				  <div style=\"clear:both;\"><b>效果<\/b><br><img src=\"images2\/richtab_line.gif\" width=\"278\" height=\"2\" \/><\/div><div>";
		if(NowRank >= 0 ){
			temHtml += "                  当前等级："+ mbr.Buidingranks[id].rank[NowRank].Data +"<br \/>";
			temHtml += "                  升级后："+ mbr.Buidingranks[id].rank[NextRank].Data +"<\/div>";
		}else{
			temHtml += "                  当前等级：暂未建造<br \/>";		
			temHtml += "                  建造后："+ mbr.Buidingranks[id].rank[NextRank].Data +"<\/div>";
		}
		//判断资源不足的情况
		var strWood,strIron,strFood,strStone
		if(mbr.Buidingranks[id].rank[NextRank].NeedWood <= nWood){
			strWood = mbr.Buidingranks[id].rank[NextRank].NeedWood;
		}else{
			strWood = "<span title='木材不足' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedWood+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedIron<= nIron){
			strIron = mbr.Buidingranks[id].rank[NextRank].NeedIron;
		}else{
			strIron = "<span title='铁矿不足' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedIron+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedFood <= nFood){
			strFood = mbr.Buidingranks[id].rank[NextRank].NeedFood;
		}else{
			strFood = "<span title='粮食不足' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedFood+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedStone <= nStone){
			strStone = mbr.Buidingranks[id].rank[NextRank].NeedStone;
		}else{
			strStone = "<span title='石料不足' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedStone+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedPopulation <= nPop){
			strPop = mbr.Buidingranks[id].rank[NextRank].NeedPopulation;
		}else{
			strPop = "<span title='人口不足' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedPopulation+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedMoney <= $("init_iGlod").innerHTML){
			strMoney = mbr.Buidingranks[id].rank[NextRank].NeedMoney;
		}else{
			strMoney = "<span title='金币不足' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedMoney+"</span>";			
		}
		
		temHtml += "                  <div style=\"margin:5px auto;\"><b>成本<\/b><br><img src=\"images2\/richtab_line.gif\" width=\"278\" height=\"2\" \/><\/div>";
		temHtml += "                  <div align=left><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strWood +" <img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strIron +" <img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strStone +" <img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strFood +"<br \/>";
		temHtml += "                    需时："+ formattime(mbr.Buidingranks[id].rank[NextRank].NeedTime) +" <br>人口："+ strPop+" <br>"
		temHtml += (mbr.Buidingranks[id].rank[NextRank].NeedMoney>0)?(" 金币："+ strMoney+"<br \/>"):"";
		temHtml += "              需:"+transPreCondition(mbr.Buidingranks[id].rank[NextRank].Precondition)[0]+"<br \/>";
		temHtml += "                  <\/div>";
		temHtml += "                  <div style=\"text-align:center;\">";
		temHtml += "                    <p>&nbsp;<\/p>";
		temHtml += "                    <p>";
		temHtml += "                    <\/p>";
		temHtml += "                    <p>";
		
		
		
		
		//判断正在建造中
		var isDoing = false;
		var isGovDoing = false;
		var isFODoing = false;
		var isARDoing = false;
		var waterid = "";
		for(n=0;n < arrCurBuild.length;n++){
			if(id == arrCurBuild[n]-1 ){
				waterid = arrCurWaterID[n];
				isDoing = true
			}
			if(arrCurBuild[n] == 7 ){
				isGovDoing = true
			}
			if(arrCurBuild[n] >=65 && arrCurBuild[n]<73 ){
				isFODoing = true
			}		
			if(arrCurBuild[n] >=97 && arrCurBuild[n]<108 ){
				isARDoing = true
			}
		}
		//判断该建筑是否在升级
		if(isDoing){
			temHtml += "                        <div class='t_red2'>*正在队列中*</div> <div class=\"btnWhite\" onclick=\"javascript:CancleTask('"+waterid+"');\">取 消</div> <\/div>";
		}else if(!transPreCondition(mbr.Buidingranks[id].rank[NextRank].Precondition)[1]){
			//判断前置条件
			if(NowRank >= 0 ){
				temHtml += "                    <div class='t_red2'>*前置条件不足*</div><img src=\"images2\/building_upgrade.gif\" width=\"102\" height=\"34\" class='picgray' \/><\/div>";
			}else{	
				temHtml += "                    <div class='t_red2'>*前置条件不足*</div><img src=\"images2\/building_build.gif\" width=\"102\" height=\"34\" class='picgray' \/>";
			}
		}else{
			//如果该建筑没有正在升级，则判断官府是否在升级
			if(isGovDoing){
				temHtml += "                         <div class='t_red2'>*官府升级中*</div> <div class=\"btnGray\">升 级</div><\/div>";
			}else{
				//如果官府没有在升级，分别判断兵营，城防，和其他建筑的情况
				if(transToID(id) == 8){
					//如果是军营，判断是否正在招兵
					if(isARDoing){
						temHtml += "                   <div class='t_red2'>*正在造兵，不能升级*</div>  <div class=\"btnGray\">升 级</div><\/div>";
					}else{
						//如果没有造兵，判断兵营是否为0级
						if(NowRank >= 0 ){
							temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_upgrade.gif\" width=\"102\" height=\"34\" \/>";
						}else{	
							temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_build.gif\" width=\"102\" height=\"34\" \/>";
						}
					}
				}else if(transToID(id) == 9){
					//如果是城防处，判断是否正在造城防
					if(isFODoing){
						temHtml += "                    <div class='t_red2'>*正在造城防，不能升级*</div>  <div class=\"btnGray\">升 级</div><\/div>";
					}else{
						//如果没有造兵，判断兵营是否为0级
						if(NowRank >= 0 ){
							temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_upgrade.gif\" width=\"102\" height=\"34\" \/>";
						}else{	
							temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_build.gif\" width=\"102\" height=\"34\" \/>";
						}
					}
				}else{
					//其他建筑
					if(NowRank >= 0 ){
						temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_upgrade.gif\" width=\"102\" height=\"34\" \/>";
					}else{	
						temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_build.gif\" width=\"102\" height=\"34\" \/>";
					}
				}
			}
		}
		
		
		
		temHtml += "               <\/p><\/div>";
	}else{		
		//最高等级的情况
		temHtml += "<div style=\"margin:10px 0 10px 0;\">";
		temHtml += "                     <div style=\"float:left;\"><img style=\"background:url(images2/mgb2_iconbuilding.jpg) -"+ (71*(id)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+id+")\" title=\"点击查看详情\" \/><\/div>";
		temHtml += "                     <div style=\"text-align:left; margin:3px 10px 0 88px;\"><b>"+ mb.Buidings[id].BuildingName +"<\/b>  ("+ NextRank +"级) <span class=\"a_yellow\"  onclick=\"getInfo("+id+")\"> &gt;&gt;查看详情<\/span><br \/>";
		temHtml += "    "+ mb.Buidings[id].BuildingDesc +"<\/div>";
		temHtml += "   			   <\/div>";
		temHtml += "				  <div style=\"clear:both;\"><b>效果<\/b><br><img src=\"images2\/richtab_line.gif\" width=\"278\" height=\"2\" \/><\/div><div style=\"padding-left:10px;\">";		
		temHtml += "                  当前等级："+ mbr.Buidingranks[id].rank[NowRank].Data +"<br \/>";		
		temHtml += "                  已经是最高级，不能升级" +"<\/div>";
	}
	return temHtml;
}


//点击官府显示列表
function ShowBuildListDiv(){	
	listdivID=1;
	$("blist_newtitle").innerHTML = "建筑";
	var temHtml = "";
	if(arrCityBuildRank.length>0 ){
		//按一定顺序重新组合建筑物ID
		var order=[14,7,12,9,5,4,8,17,16,10,15,11,18,13]
		var newBuildRank=[]
		var newBuildInfo=[]
		var newBuildRankInfo=[]
		for(var i=0;i<order.length;i++){
			//重组当前等级Rank信息
			newBuildRank.push(arrCityBuildRank[order[i]])
			//重组资料mb
			newBuildInfo.push(mb.Buidings[order[i]])
			//重组建造等级mbr信息
			newBuildRankInfo.push(mbr.Buidingranks[order[i]])
		}
		
		
		for(var i=0;i<newBuildRank.length;i++){
			var NextRank = newBuildRank[i]; 
			//判断是否为最高级情况
			if(NextRank < newBuildRankInfo[i].rank.length ){
				
				//判断资源不足的情况
				var strWood,strIron,strFood,strStone
				if(newBuildRankInfo[i].rank[NextRank].NeedWood <= nWood){
					strWood = newBuildRankInfo[i].rank[NextRank].NeedWood;
				}else{
					strWood = "<span style='color=#f00;font-weight:bold'>"+newBuildRankInfo[i].rank[NextRank].NeedWood+"</span>";			
				}
				if(newBuildRankInfo[i].rank[NextRank].NeedIron<= nIron){
					strIron = newBuildRankInfo[i].rank[NextRank].NeedIron;
				}else{
					strIron = "<span style='color=#f00;font-weight:bold'>"+newBuildRankInfo[i].rank[NextRank].NeedIron+"</span>";			
				}
				if(newBuildRankInfo[i].rank[NextRank].NeedFood <= nFood){
					strFood = newBuildRankInfo[i].rank[NextRank].NeedFood;
				}else{
					strFood = "<span style='color=#f00;font-weight:bold'>"+newBuildRankInfo[i].rank[NextRank].NeedFood+"</span>";			
				}
				if(newBuildRankInfo[i].rank[NextRank].NeedStone <= nStone){
					strStone = newBuildRankInfo[i].rank[NextRank].NeedStone;
				}else{
					strStone = "<span style='color=#f00;font-weight:bold'>"+newBuildRankInfo[i].rank[NextRank].NeedStone+"</span>";			
				}
				if(newBuildRankInfo[i].rank[NextRank].NeedPopulation <= nPop){
					strPop = newBuildRankInfo[i].rank[NextRank].NeedPopulation;
				}else{
					strPop = "<span title='人口不足' style='color=#f00;font-weight:bold'>"+newBuildRankInfo[i].rank[NextRank].NeedPopulation+"</span>";			
				}
				if(newBuildRankInfo[i].rank[NextRank].NeedMoney <= $("init_iGlod").innerHTML){
					strMoney = newBuildRankInfo[i].rank[NextRank].NeedMoney;
				}else{
					strMoney = "<span style='color=#f00;font-weight:bold'>"+newBuildRankInfo[i].rank[NextRank].NeedMoney+"</span>";			
				}
				
				temHtml +="<div class=\"blist_listdiv\">";
				temHtml +="				<div class=\"blist_listdiv_left\">　"+newBuildInfo[i].BuildingName+"-"+newBuildRank[i]  +"级 <img style=\"background:url(images2/mgb2_iconbuilding.jpg) -"+ (71*(order[i])) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+order[i]+")\" title=\"点击查看详情\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+newBuildInfo[i].BuildingDesc+"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_source\"><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strWood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strIron;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strStone;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_source\"><img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strFood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"人口\" class=\"ico_pop\" height=\"16\" width=\"12\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strPop;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"金币\" class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strMoney;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_righttime\">需要 "+ formattime(newBuildRankInfo[i].rank[NextRank].NeedTime) /*+" [特殊资源] "+ newBuildRankInfo[i].rank[NextRank].NeedSpecial*/ +"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_right_button\">";
				//判断正在建造中
				var isDoing = false;
				var isGovDoing = false;
				var isFODoing = false;
				var isARDoing = false;
				var waterid = "";
				for(n=0;n < arrCurBuild.length;n++){
					if(order[i] == transToArrID(arrCurBuild[n])){
						waterid = arrCurWaterID[n];
						isDoing = true
					}
					if(arrCurBuild[n] == 7 ){
						isGovDoing = true
					}
					if(arrCurBuild[n] >=65 && arrCurBuild[n]<73 ){
						isFODoing = true
					}		
					if(arrCurBuild[n] >=97 && arrCurBuild[n]<108 ){
						isARDoing = true
					}
				}
				if(isDoing){
					temHtml += "                        <div class='btFrontLeft t_red2'>*正在队列中*</div> <div class=\"btnWhite btFrontRight\" onclick=\"javascript:CancleTask('"+waterid+"');\">取 消</div> <\/div>";
				}else if(!transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[1]){
					//判断前置条件
					if(NextRank > 0 ){
						temHtml += "                   <div class='btFrontLeft'>需:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div><div title='前置条件不满足' class=\"btnGray btFrontRight\">升 级</div>";
					}else{	
						temHtml += "                   <div class='btFrontLeft'>需:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div><div title='前置条件不满足' class=\"btnGray btFrontRight\">建 造</div>";
					}
				}else{
					//如果该建筑没有正在升级，则判断官府是否在升级
					if(isGovDoing){
						temHtml += "                         <div class='btFrontLeft t_red2'>*官府升级中*</div> <div class=\"btnGray btFrontRight\">升 级</div><\/div>";
					}else{
						//如果官府没有在升级，分别判断兵营，城防，和其他建筑的情况
						if(transToID(order[i]) == 8){
							//如果是军营，判断是否正在招兵
							if(isARDoing){
								temHtml += "                     <div class='btFrontLeft t_red2'>*正在造兵，不能升级*</div>  <div class=\"btnGray btFrontRight\">升 级</div><\/div>";
							}else{
								//如果没有造兵，判断兵营是否为0级
								if(NextRank == 0 ){
									temHtml +="<div class='btFrontLeft'>需:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">建 造</div>";
								}else{
									temHtml +="<div class='btFrontLeft'>需:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">升 级</div>";
								}
							}
						}else if(transToID(order[i]) == 9){
							//如果是城防处，判断是否正在造城防
							if(isFODoing){
								temHtml += "                     <div class='btFrontLeft t_red2'>*正在造城防，不能升级*</div>  <div class=\"btnGray btFrontRight\">升 级</div><\/div>";
							}else{
								//如果没有造兵，判断兵营是否为0级
								if(NextRank == 0 ){
									temHtml +="<div class='btFrontLeft'>需:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">建 造</div>";
								}else{
									temHtml +="<div class='btFrontLeft'>需:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">升 级</div>";
								}
							}
						}else{
							//其他建筑
							if(NextRank == 0 ){
								temHtml +="<div class='btFrontLeft'>需:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">建 造</div>";
							}else{
								temHtml +="<div class='btFrontLeft'>需:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div><div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">升 级</div>";
							}
						}
					}
				}
				//
				temHtml +="					<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";
			}else{
				temHtml +="<div class=\"blist_listdiv\">";
				temHtml +="				<div class=\"blist_listdiv_left\">　"+newBuildInfo[i].BuildingName+"-"+newBuildRank[i]  +"级 <img style=\"background:url(images2/mgb2_iconbuilding.jpg) -"+ (71*(order[i])) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+order[i]+")\" title=\"点击查看详情\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+newBuildInfo[i].BuildingDesc+"<\/div><br \/>";
				temHtml +="					<div><a href=\"#\" class=\"a_yellow\" onclick=\"getInfo("+order[i]+")\">&gt;&gt;查看详情<\/a> ";
				temHtml +="					已经是最高级，不能升级<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";			}
		}
		$("blist_list").innerHTML = temHtml;
	}
}

//点击太学院显示列表
function ShowTEListDiv(){	
	listdivID=2;
	$("blist_newtitle").innerHTML = "太学院";
	var temHtml = "";
	if(arrCityBuildRank.length>0 ){
		//科技数组下标19--31
		for(i=tec_start_arid;i<for_start_arid;i++){
			// 数组差一，返回数组与定义数组的区别
			var NextRank = arrCityBuildRank[i];
			//判断是否为最高级
			if(NextRank < mbr.Buidingranks[i].rank.length ){
				//判断资源不足的情况
				var strWood,strIron,strFood,strStone
				if(mbr.Buidingranks[i].rank[NextRank].NeedWood <= nWood){
					strWood = mbr.Buidingranks[i].rank[NextRank].NeedWood;
				}else{
					strWood = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[NextRank].NeedWood+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[NextRank].NeedIron<= nIron){
					strIron = mbr.Buidingranks[i].rank[NextRank].NeedIron;
				}else{
					strIron = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[NextRank].NeedIron+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[NextRank].NeedFood <= nFood){
					strFood = mbr.Buidingranks[i].rank[NextRank].NeedFood;
				}else{
					strFood = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[NextRank].NeedFood+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[NextRank].NeedStone <= nStone){
					strStone = mbr.Buidingranks[i].rank[NextRank].NeedStone;
				}else{
					strStone = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[NextRank].NeedStone+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[NextRank].NeedMoney <= $("init_iGlod").innerHTML){
					strMoney = mbr.Buidingranks[i].rank[NextRank].NeedMoney;
				}else{
					strMoney = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[NextRank].NeedMoney+"</span>";			
				}
				
				temHtml +="<div class=\"blist_listdiv\">";
				temHtml +="				<div class=\"blist_listdiv_left\">　"+mb.Buidings[i].BuildingName+"-"+arrCityBuildRank[i]  +"级 <img style=\"background:url(images2/mgb2_icontech.jpg) -"+ (71*(i-19)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+i+")\" title=\"点击查看详情\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+mb.Buidings[i].BuildingDesc+"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_source\"><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strWood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strIron;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strStone;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_source\"><img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strFood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"人口\" class=\"ico_pop\" height=\"16\" width=\"12\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ mbr.Buidingranks[i].rank[NextRank].NeedPopulation;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"金币\" class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strMoney;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_righttime\">需要 "+ formattime(mbr.Buidingranks[i].rank[NextRank].NeedTime) /*+" [特殊资源] "+ mbr.Buidingranks[i].rank[NextRank].NeedSpecial*/ +"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_right_button\">";
				//判断正在建造中
				var isDoing = false;
				var isTEDoing = false;
				for(n=0;n < arrCurBuild.length;n++){
					if(arrCurBuild[n] ==10 ){
						isTEDoing = true
					}
				}
				for(n=0;n < arrCurBuild.length;n++){ //在msg里定义的全局数组，1003时赋值，当前正在建造中的建造项
					if(i == transToArrID(arrCurBuild[n])){
						waterid = arrCurWaterID[n];
						isDoing = true
					}
				}
				if(isTEDoing){
					temHtml +="				 <div class='btFrontLeft t_red2'>*太学院升级中*</div>  <div class=\"btnGray btFrontRight\">升 级</div><\/div>";
				}else if(!transPreCondition(mbr.Buidingranks[i].rank[NextRank].Precondition)[1]){
					//判断前置条件
					temHtml += "             <div class='btFrontLeft'>需:"+transPreCondition(mbr.Buidingranks[i].rank[NextRank].Precondition)[0]+"</div><div title='前置条件不满足' class=\"btnGray btFrontRight\">升 级</div>";
				}else{
					if(isDoing){
						temHtml += "                        <div class='btFrontLeft t_red2'>*正在队列中*</div> <div class=\"btnWhite btFrontRight\" onclick=\"javascript:CancleTask('"+waterid+"');\">取 消</div> <\/div>";

					}else{
						temHtml +="<div class='btFrontLeft'>需:"+transPreCondition(mbr.Buidingranks[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(i)+",2,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">升 级</div>";
					}
				}
				//
				temHtml +="					<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";
			}else{
				temHtml +="<div class=\"blist_listdiv\">";
				temHtml +="				<div class=\"blist_listdiv_left\">　"+mb.Buidings[i].BuildingName+"-"+arrCityBuildRank[i]  +"级 <img style=\"background:url(images2/mgb2_icontech.jpg) -"+ (71*(i-19)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+i+")\" title=\"点击查看详情\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+mb.Buidings[i].BuildingDesc+"<\/div><br \/>";
				temHtml +="					<div><a href=\"#\" class=\"a_yellow\" onclick=\"getInfo("+i+")\">&gt;&gt;查看详情<\/a> ";
				temHtml +="					已经是最高级，不能升级<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";			}
		}
		$("blist_list").innerHTML = temHtml;
	}
}

//点击城防显示列表
function ShowFOListDiv(){	
	listdivID=3;
	$("blist_newtitle").innerHTML = "城防处";
	var temHtml = "";
	temHtml +="<form name=\"form_FO\">";
	if(arrCityBuildRank.length>0 ){
		//城防数组下标31-38
		for(i=for_start_arid;i<arm_start_arid;i++){
				//判断资源不足的情况
				var strWood,strIron,strFood,strStone,strMoney
				if(mbr.Buidingranks[i].rank[0].NeedWood <= nWood){
					strWood = mbr.Buidingranks[i].rank[0].NeedWood;
				}else{
					strWood = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedWood+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[0].NeedIron<= nIron){
					strIron = mbr.Buidingranks[i].rank[0].NeedIron;
				}else{
					strIron = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedIron+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[0].NeedFood <= nFood){
					strFood = mbr.Buidingranks[i].rank[0].NeedFood;
				}else{
					strFood = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedFood+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[0].NeedStone <= nStone){
					strStone = mbr.Buidingranks[i].rank[0].NeedStone;
				}else{
					strStone = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedStone+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[0].NeedMoney <= $("init_iGlod").innerHTML){
					strMoney = mbr.Buidingranks[i].rank[0].NeedMoney;
				}else{
					strMoney = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedMoney+"</span>";			
				}
				
				temHtml +="<div class=\"blist_listdiv\">";
				temHtml +="				<div class=\"blist_listdiv_left\">　"+mb.Buidings[i].BuildingName+" <img style=\"background:url(images2/mgb2_iconfort.jpg) -"+ (71*(i-for_start_arid)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+i+",1)\" title=\"点击查看详情\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+mb.Buidings[i].BuildingDesc+"(现有<span class='t_green'>"+arrCityBuildRank[i]+"</span>个)<\/div>";
				temHtml +="					<div class=\"blist_listdiv_source\"><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strWood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strIron;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strStone;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_source\"><img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strFood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"人口\" class=\"ico_pop\" height=\"16\" width=\"12\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ mbr.Buidingranks[i].rank[0].NeedPopulation;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"金币\" class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strMoney;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_righttime\">需要 "+ formattime(mbr.Buidingranks[i].rank[0].NeedTime) /*+" [特殊资源] "+ mbr.Buidingranks[i].rank[0].NeedSpecial*/ +" "+transPreCondition(mbr.Buidingranks[i].rank[0].Precondition)[0]+"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_right_button\">";
				
				//判断城防处正在升级的情况
				var isFODoing = false;
				for(n=0;n < arrCurBuild.length;n++){
					if(arrCurBuild[n] ==9 ){
						isFODoing = true
					}
				}
				if(isFODoing){
					temHtml +="				 <div class='btFrontLeft t_red2'>*城防处升级中*</div>  <div class=\"btnGray btFrontRight\">建 造</div><\/div>";
				}else if(!transPreCondition(mbr.Buidingranks[i].rank[0].Precondition)[1]){
					//判断前置条件
					temHtml += "             <div class='btFrontLeft t_red2'>*前置条件不满足*</div><div title='前置条件不满足' class=\"btnGray btFrontRight\">建 造</div>";
				}else{
					temHtml +="				<div class='btFrontLeft'>建造 <input name=\"num"+i+"\" type=\"text\" id=\"num"+i+"\" value=\"0\" class=\"inputboxhui\" style=\"width:30px;\"> (可造<span class='t_green imghand' onclick='$(\"num"+i+"\").value=this.innerHTML'>"+CountMax(mbr.Buidingranks[i].rank[0].NeedWood,mbr.Buidingranks[i].rank[0].NeedIron,mbr.Buidingranks[i].rank[0].NeedFood,mbr.Buidingranks[i].rank[0].NeedStone,mbr.Buidingranks[i].rank[0].NeedMoney)+"</span>个)</div> 	<div onclick=\"cArmy("+transToID(i)+",3,"+i+");\" class=\"btnWhite btFrontRight\">建 造</div>";
				}
				
				temHtml +="					<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";
			
		}
		temHtml +="	</form>";
		$("blist_list").innerHTML = temHtml;
	}
}

//点击兵营显示列表
function ShowARListDiv(){	
	listdivID=4;
	$("blist_newtitle").innerHTML = "兵营";
	var temHtml = "";
	temHtml += "<form name=\"form_AR\">";
	if(arrCityBuildRank.length>0 ){
		//兵种数组下标40-50
		for(i=arm_start_arid;i<arm_end_arid;i++){
				//判断资源不足的情况
				var strWood,strIron,strFood,strStone,strMoney
				if(mbr.Buidingranks[i].rank[0].NeedWood <= nWood){
					strWood = mbr.Buidingranks[i].rank[0].NeedWood;
				}else{
					strWood = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedWood+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[0].NeedIron<= nIron){
					strIron = mbr.Buidingranks[i].rank[0].NeedIron;
				}else{
					strIron = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedIron+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[0].NeedFood <= nFood){
					strFood = mbr.Buidingranks[i].rank[0].NeedFood;
				}else{
					strFood = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedFood+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[0].NeedStone <= nStone){
					strStone = mbr.Buidingranks[i].rank[0].NeedStone;
				}else{
					strStone = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedStone+"</span>";			
				}
				if(mbr.Buidingranks[i].rank[0].NeedMoney <= $("init_iGlod").innerHTML){
					strMoney = mbr.Buidingranks[i].rank[0].NeedMoney;
				}else{
					strMoney = "<span style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[i].rank[0].NeedMoney+"</span>";			
				}
				
				temHtml +="<div class=\"blist_listdiv\">";
				temHtml +="				<div class=\"blist_listdiv_left\">　"+mb.Buidings[i].BuildingName+" <img style=\"background:url(images2/mgb2_iconarmy.jpg) -"+ (71*(i-arm_start_arid)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+i+",2)\" title=\"点击查看详情\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+mb.Buidings[i].BuildingDesc+"(现有<span class='t_green'>"+arrCityBuildRank[i]+"</span>个)<\/div>";
				temHtml +="					<div class=\"blist_listdiv_source\"><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strWood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strIron;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strStone;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_source\"><img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strFood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"金币\" class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strMoney;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\" style='line-height:16px'>耗粮："+ mbr.Buidingranks[i].rank[0].Reserve8;
				temHtml +="/时					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_righttime\">需要 "+ formattime(mbr.Buidingranks[i].rank[0].NeedTime) /*+" [特殊资源] "+ mbr.Buidingranks[i].rank[0].NeedSpecial*/ +" "+transPreCondition(mbr.Buidingranks[i].rank[0].Precondition)[0]+"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_right_button\">";
				
				//判断兵营正在升级的情况
				var isARDoing = false;
				for(n=0;n < arrCurBuild.length;n++){
					if(arrCurBuild[n] ==8 ){
						isARDoing = true
					}
				}
				if(isARDoing){
					temHtml +="				<div class='btFrontLeft t_red2'>*兵营升级中*</div>  <div class=\"btnGray btFrontRight\">招 募</div><\/div>";
				}else if(!transPreCondition(mbr.Buidingranks[i].rank[0].Precondition)[1]){
					//判断前置条件
					temHtml += "             <div class='btFrontLeft t_red2'>*前置条件不满足*</div><div title='前置条件不满足' class=\"btnGray btFrontRight\">招 募</div>";
				}else{
					temHtml +="				<div class='btFrontLeft'>招募 <input name=\"num"+i+"\" type=\"text\" id=\"num"+i+"\" value=\"0\"  class=\"inputboxhui\" style=\"width:30px;\"> (可造<span class='t_green imghand' onclick='$(\"num"+i+"\").value=this.innerHTML'>"+CountMax(mbr.Buidingranks[i].rank[0].NeedWood,mbr.Buidingranks[i].rank[0].NeedIron,mbr.Buidingranks[i].rank[0].NeedFood,mbr.Buidingranks[i].rank[0].NeedStone,mbr.Buidingranks[i].rank[0].NeedMoney)+"</span>个)</div> 		<div onclick=\"cArmy("+transToID(i)+",4,"+i+");\" class=\"btnWhite btFrontRight\">招 募</div>";
				}
				
				temHtml +="					<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";
		}
		temHtml +="	</form>";
		$("blist_list").innerHTML = temHtml;
	}
}

//计算当前资源最大能造兵数目
function CountMax(strWood,strIron,strFood,strStone,strMoney){
	var newArr=[]
	if(strWood != 0)newArr.push(Math.floor(nWood/strWood))
	if(strIron != 0)newArr.push(Math.floor(nIron/strIron))
	if(strFood != 0)newArr.push(Math.floor(nFood/strFood))
	if(strStone != 0)newArr.push(Math.floor(nStone/strStone))	
	if(strMoney != 0)newArr.push(Math.floor($("init_iGlod").innerHTML/strMoney))
	newArr.sort(function(a,b){return a-b});
	return newArr[0]
}
function transPreCondition(data){
	if(data==""){
		return ["无",true]
	}else{
		var tempC=""
		var pa=data.split("|")
		var preIs=true
		for(var i=0;i<pa.length;i++){
			var pairs = pa[i].split(":"); 
			//判断前置条件是否满足
			//arrCityBuildRank[transToArrID(pairs[0])]：当前建筑等级
			//pairs[1]:需要等级
			
			if(arrCityBuildRank[transToArrID(pairs[0])] >= pairs[1]){
				tempC +=mb.Buidings[transToArrID(pairs[0])].BuildingName+""+pairs[1]+"级,"
			}else{
				tempC +="<span class='t_red' title='前置条件不足'><b>"+mb.Buidings[transToArrID(pairs[0])].BuildingName+""+pairs[1]+"级</b></span>,"	
				preIs=false
			}
		}
		return [tempC.substring(0,tempC.length-1),preIs]
	}
}

//flash调用 快捷面板调用
function ShowMainFourDiv(str){	
	switch(str){
		case "Build":
			if(arrCityBuildRank[gov_arid]==0){
				msgbox("您还没有建造官府，请在城内建造。")
			}else{
				ShowBuildListDiv();
				addZindex();	
			}
			break
		case "TE":
			if(arrCityBuildRank[tec_arid]==0){
				msgbox("您还没有建造太学院，请在城内建造。")
			}else{
				ShowTEListDiv();
				addZindex();	
			}
			break
		case "FO":
			if(arrCityBuildRank[for_arid]==0){
				msgbox("您还没有建造城防处，请在城内建造。")
			}else{
				ShowFOListDiv();
				addZindex();	
			}
			break
		case "AR":
			if(arrCityBuildRank[arm_arid]==0){
				msgbox("您还没有建造兵营，请在城内建造。")
			}else{
				ShowARListDiv();
				addZindex();	
			}
			break
	}
}

//供flash调用,勿删！
function addZindex(){
	$('l_content').style.display='block';
	$('l_content').style.zIndex=zindexStart;
	zindexStart++
}





//1019军事队列信息弹出面板
function ShowARingDiv(A){	
	listdivID=5;
	$("blist_newtitle").innerHTML = "查看军事队列";
	var temH = "";	
	var B=[] //其他人发起的军事行动
	//自己发起的行动
	temH += '<table width="659" border="0" cellpadding="0" cellspacing="0" class="armying_tab_border2" style="text-align:center; margin:10px 0 0  5px">'
	temH += '<tr>'
	temH += '			<td width="87" height="27" bgcolor="#221f1d" class="armying_tab_up2"><strong>玩家</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>出发城池</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>目标城池</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>行动</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>到达时间</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>剩余时间</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>状态</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>命令</strong></td>'
	temH += '			<td width="95" bgcolor="#b5b2aa" class="armying_tab_up2">&nbsp;</td>'
	temH += '</tr>'
	//判断是否有联防部队驻军
	var isallUN=true  
	for(i=0;i<A.length;i++){
		if(A[i].iStat!=3)isallUN=false
	}
	if(A.length==0 || isallUN==true){
		temH += '		<tr>'
		temH += '			<td height="30" class="armying_tab_up3" colspan="9">暂无</td>'
		temH += '		</tr>'
	}else{
		for(i=0;i<A.length;i++){
			//判断是否是自己发起的行动
			if(A[i].iUin==Uin && A[i].iStat!=3){
				var tmCityName=(A[i].iType==6) ? "据点" : (A[i].iType==2)?"拓荒新城":A[i].szMarrowCityName;		
				temH += '		<tr>'
				temH += '			<td height="30" class="armying_tab_up3">'
				temH += '				<div id="arInfo_'+A[i].stCarmyWaterID+'" class="armying_tab_tipdiv border_hui" style="display:none">'
				temH += '				</div><span class="t_blue">自己</span></td>'
				temH += '			<td class="armying_tab_up3">'+curCityIDToName(A[i].iLeaveCityID)+'</td>'
				temH += '			<td class="armying_tab_up3"><span title="点击查看该地" class="imghand" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+A[i].iTarGrid+'))">'+tmCityName+'('+ToXY(A[i].iTarGrid)+')</span></td>'
				temH += '			<td class="armying_tab_up3">'+toArmyType(A[i].iType)+'</td>'
				temH += '			<td class="armying_tab_up3">'+formattimeNOW(A[i].ileaveTime+A[i].iMarchTime)+'</td>'
				//倒计时多少时间
				var nowL = new Date();
				nowL.setTime(nowL);			
				temH += '			<td class="armying_tab_up3">'+formattime((A[i].ileaveTime+A[i].iMarchTime)-parseInt(nowL/1000)+parseInt(LocalTime))+'</td>'
				temH += '			<td class="armying_tab_up3">'+toFangXiang(A[i].iStat,0)+'</td>'
				//判断是否显示召回
				if(A[i].iStat==1){
					temH += '			<td class="armying_tab_up3"><a class="t_juhuang" href="javascript:void(0)" onclick="objFlashEng.Send(GetCancleArmy(\''+A[i].stCarmyWaterID+'\',0));curArmyIng=\''+A[i].stCarmyWaterID+'\'" title="超过3分钟只能使用道具召回，3分钟内免费召回">召回</a></td>'
				}else{
					temH += '<td class="armying_tab_up3">&nbsp;</td>'
				}
				temH += '			<td class="armying_tab_up3"><span onclick="SHI(\'arInfo_'+A[i].stCarmyWaterID+'\',this,\''+A[i].stCarmyWaterID+'\','+A[i].iLeaveCityID+')" class="t_juhuang imghand">查看详情</span></td>'
				temH += '		</tr>'
			}else if(A[i].iUin!=Uin && A[i].iStat!=3){
				B.push(A[i])
			}
		}
	}
	//其他人发起的行动
	temH += '	</table>'
	temH += '<table width="659" border="0" cellpadding="0" cellspacing="0" class="armying_tab_border2" style="text-align:center; margin:10px 0 0  5px">'
	temH += '<tr>'
	temH += '			<td width="87" height="27" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>其他玩家</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>出发城池</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>目标城池</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>行动</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>到达时间</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>剩余时间</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>状态</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong></strong></td>'
	temH += '			<td width="95" bgcolor="#b5b2aa" class="armying_tab_up2">&nbsp;</td>'
	if(B.length==0){
		temH += '		<tr>'
		temH += '			<td height="30" class="armying_tab_up3" colspan="9">暂无</td>'
		temH += '		</tr>'
	}else{
		for(i=0;i<B.length;i++){
			temH += '		<tr>'
			temH += '			<td height="30" class="armying_tab_up3">'
			temH += '				<div id="arInfo_'+B[i].stCarmyWaterID+'" class="armying_tab_tipdiv" style="display:none">'
			temH += '				</div><span class="t_blue">'+mailThisName(B[i].iUin,B[i].szMarPlayer)+'</span></td>'
			temH += '			<td title="点击查看该地" class="armying_tab_up3 imghand" onclick=ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+B[i].iTarGrid+'))>'+B[i].szMarrowCityName+'('+ToXY(B[i].iTarGrid)+')</td>'
			temH += '			<td class="armying_tab_up3">'+curCityIDToName(B[i].iTargetCityID)+'</td>'
			temH += '			<td class="armying_tab_up3">'+toArmyType(B[i].iType)+'</td>'
			temH += '			<td class="armying_tab_up3">'+formattimeNOW(B[i].ileaveTime+B[i].iMarchTime)+'</td>'
			//倒计时多少时间
			var nowL = new Date();
			nowL.setTime(nowL);			
			temH += '			<td class="armying_tab_up3">'+formattime((B[i].ileaveTime+B[i].iMarchTime)-parseInt(nowL/1000)+parseInt(LocalTime))+'</td>'
			temH += '			<td class="armying_tab_up3">'+toFangXiang(B[i].iStat,0)+'</td>'
			temH += '			<td class="armying_tab_up3">&nbsp;</td>'
			temH += '			<td class="armying_tab_up3"><span onclick="SHI(\'arInfo_'+B[i].stCarmyWaterID+'\',this,\''+B[i].stCarmyWaterID+'\','+B[i].iLeaveCityID+')" class="t_juhuang imghand">查看详情</span></td>'
			temH += '		</tr>'
		}
	}
	temH += '	</table>'
	
	$("blist_list").innerHTML = temH
}
//点击查看详情
function SHI(ob,ob2,wid,cid){
	if($(ob).style.display!="none"){
		$(ob).style.display="none"
		ob2.innerHTML="查看详情"
	}else{
		objFlashEng.Send(GetArmyListInfo(wid,cid))
		$(ob).style.display="block"
		ob2.innerHTML="<span class='a_lv'>点击隐藏</span>"
	}
}
//1018查看部队详情
function ShowArmyListInfo(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		if(obj.CResult.iResultID ==1018001){
			msgbox("无法查看对方部队详情<br>要提高查看对方部队概率，请升级<span class='t_red'>神目</span>科技")
		}else{
			msgbox("Error:"+obj.CResult.iResultID+"<br><b>获取队列详情失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		}
		objFlashEng.Send(GetArmyList(1,CityID,1))
		return false
	}
	if(obj.CTMsgHead.llMsgAct!=1000){
		//军事列表页面查看详情
		$("arInfo_"+obj.CAnsArmyInfo.CArmyInfo.stCarmyWaterID).innerHTML = formatArmyInfo(obj.CAnsArmyInfo.CArmyInfo)
	}else{
		//点将台页面查看详情
		ShowDJ_ArmyInfo(obj.CAnsArmyInfo.CArmyInfo)
	}
}


function formatHero(C){
	var temHero=""
	for(var m=0;m<C.stArmyHeroInfo.length;m++){
		temHero+= '<span  hint="<img src=\'\/images\/blank.gif\' width=\'90\' height=\'90\' class=\'border_hui imghand\' style=\'background:url(\/images\/hero\/hero_'+C.stArmyHeroInfo[m].iPicID+'.jpg)\' \/><br>'+C.stArmyHeroInfo[m].iHeroLv+'级<br>近攻:'+C.stArmyHeroInfo[m].iNearAttack+'<br>远攻:'+C.stArmyHeroInfo[m].iFarAttack+'<br>近防:'+C.stArmyHeroInfo[m].iNearFort+'<br>远防:'+C.stArmyHeroInfo[m].iFarFort+'<br>速度:'+C.stArmyHeroInfo[m].iHeroSleep+'<br>负载:'+C.stArmyHeroInfo[m].iHeroLoad+'">'+C.stArmyHeroInfo[m].szName+'</span>'
	}
	temHero=(temHero=="")?"无":temHero
	return temHero
}
function formatArmyInfo(obj){
	var C=obj
	var temH=""
	temH += '	<table id ="armying_tab'+C.stCarmyWaterID+'"  style="background-color:#32312f; text-align:center;" bgcolor="#32312f" cellpadding="0" cellspacing="1">'
	temH += '			<tr>'
	temH += '			<td width="47">&nbsp;</td>'
	temH += '			<td width="47"><img src="/images/army/bz1.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz2.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz3.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz4.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz5.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz6.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz7.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz8.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz9.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz10.png" width="20" height="20" /></td>'
	temH += '			<td width="47"><img src="/images/army/bz11.png" width="20" height="20" /></td>'
	temH += '		</tr>'
	temH += '		<tr>'
	var arrArmyTemp = PackArr(C.CCityArmy.ashArmy,11)
	temH += '			<td height="20">数量</td>'
	temH += '			<td>'+arrArmyTemp[0]+'</td>'
	temH += '			<td>'+arrArmyTemp[1]+'</td>'
	temH += '			<td>'+arrArmyTemp[2]+'</td>'
	temH += '			<td>'+arrArmyTemp[3]+'</td>'
	temH += '			<td>'+arrArmyTemp[4]+'</td>'
	temH += '			<td>'+arrArmyTemp[5]+'</td>'
	temH += '			<td>'+arrArmyTemp[6]+'</td>'
	temH += '			<td>'+arrArmyTemp[7]+'</td>'
	temH += '			<td>'+arrArmyTemp[8]+'</td>'
	temH += '			<td>'+arrArmyTemp[9]+'</td>'
	temH += '			<td>'+arrArmyTemp[10]+'</td>'
	temH += '		</tr>'
	temH += '	</table>'
	temH += '					<div class="floatleft" style="margin:6px 50px; display:inline;background:#221f1d; width:500px; height:25px; line-height:25px;">'
	//解析英雄
	temH += '						英雄：'+formatHero(C)
	temH +="	　　<img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+C.iArmyLoadWood;
	temH +="	<img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+C.iArmyLoadIron;
	temH +="	<img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+C.iArmyLoadStone;
	temH +="	<img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+C.iArmyLoadFood;
	temH += '		　　粮食消耗：'+C.iFoodExpenHour+'</div>'
	return temH
}





//英雄弹出面板 1601
function ShowHeroList(str){	
	var objS=eval('('+str+')');
	if(typeof(objS.CResult) != "undefined")	{
		msgbox("Error:"+objS.CResult.iResultID+"<br><b>获取英雄列表失败：</b><span class='t_tips_yellow'>"+errMsg(objS.CResult.iResultID)+"!</span>")
	}
	listdivID=6;
	if(objS.CTMsgHead.llMsgAct==0)$("blist_newtitle").innerHTML = "查看英雄";
	var temHtml = "";
	var arrH=objS.CAnsAllHeroTrea.astHtMsg;
	//act=-10为交易所页面调用
	if(objS.CTMsgHead.llMsgAct==0){
		for(i=0;i<arrH.length;i++){
			
			//解析英雄状态
			var tmpStu="" //英雄状态str
			var tmpBtn="" //英雄按钮str
			var tmpPicStyle="" //英雄图片灰度str
			switch(arrH[i].CUserHeroMsg.m_chStatus){
				case 0:
					tmpStu = "待命中"
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'objFlashEng.Send(GetUpGradeHero("+arrH[i].CUserHeroMsg.HeroID+"))\'>升 级<\/div><br>";
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'ShowHeroHealth("+arrH[i].CUserHeroMsg.HeroID+","+arrH[i].CUserHeroMsg.iFoodType+")\'>补充体力<\/div><br>";
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"您确认要流放该英雄吗？<br><span class=t_red>流放后不可再找回！<br>如果英雄携带了宝物，请先卸下宝物，否则也将一并丢失！</span>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>流 放<\/div>";
					break
				case 1:
					tmpStu = "任务中"
					tmpBtn +="				<div class=\'btnGray\'>升 级<\/div><br>";
					tmpBtn +="				<div class=\'btnGray\'>补充体力<\/div><br>";
					tmpBtn +="				<div class=\'btnGray\'>流 放<\/div>";				
					break
				case 2:
					tmpStu = "交易中"
					tmpBtn +="				<div class=\'btnGray\'>交易中<\/div>";
					tmpPicStyle = "Filter:Gray"
					break
				case 3:
					tmpStu = "关押中"
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"您确认要劝降该英雄吗？<br>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1605,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>劝 降<\/div><br>";
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"您确认要流放该英雄吗？<br><span class=t_red>流放后不可再找回！</span>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>流 放<\/div>";
					tmpPicStyle = "Filter:Gray"
					break
				case 4:
					tmpStu = "关押中"
					tmpBtn +="				<div class=\'btnGray\'>关押中<\/div>";
					tmpPicStyle = "Filter:Gray"
					break
				case 5:
					tmpStu = "交易返回中"
					tmpBtn +="				<div class=\'btnGray\'>交易返回中<\/div><div class='t_gray lineh17'>返回所需时间：一星2小时<br>二星4小时<br>三星6小时</div>";
					tmpPicStyle = "Filter:Gray"
					break
				default :
					tmpStu = "关押中"
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"您确认要劝降该英雄吗？<br>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1605,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>劝 降<\/div><br>";
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"您确认要流放该英雄吗？<br><span class=t_red>流放后不可再找回！</span>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>流 放<\/div>";
					tmpPicStyle = "Filter:Gray"
					break
			}
			//解析宝物
			var tmpTrea=""
			for(m=0;m<2;m++){
				if(typeof(arrH[i].astTreaMsg[m])=="object"){
					//解析宝物效果
					var tmpEffect=""
					for(n=0;n<arrH[i].astTreaMsg[m].m_stPropertyArray.length;n++){
						tmpEffect += arrH[i].astTreaMsg[m].m_stPropertyArray[n].m_szName +":" +arrH[i].astTreaMsg[m].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
					}
					
					tmpTrea += "<div class=\'hero_taketrea_divbg\'><img class=\'imghand\' onclick=\'objFlashEng.Send(getTaskList(1603,"+arrH[i].CUserHeroMsg.HeroID+"))\' src=\'\/images\/hero\/trea_"+(arrH[i].astTreaMsg[m].iPicID)+".gif\' width=\'20\' height=\'20\' hint=\""+nameColor(arrH[i].astTreaMsg[m].chStar,arrH[i].astTreaMsg[m].szName)+" "+arrH[i].astTreaMsg[m].m_chRank+" 级<br><img src=\'\/images\/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_"+arrH[i].astTreaMsg[m].chStar+"\'><br><img src=\'\/images\/hero\/trea_"+(arrH[i].astTreaMsg[m].iPicID)+".jpg\' width=\'48\' height=\'48\' align=\'absmiddle\'><br>"+tmpEffect+"需要"+arrH[i].astTreaMsg[m].chNeedRank+"级"+arrH[i].astTreaMsg[m].chNeedStar+"星以上英雄\" \/><\/div>"
				}else{
					tmpTrea += "<div title=\'点击进行装备\' class=\'hero_taketrea_divbg imghand\' onclick=\'objFlashEng.Send(getTaskList(1603,"+arrH[i].CUserHeroMsg.HeroID+"))\'><\/div>"
				}
			}
			
			temHtml +="<div class=\'hero_one_div\'>";
			temHtml +="	<table width=\'646\' height=\'100\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\' style=\'text-align:center; margin:2px 0 0  5px\'>";
			temHtml +="		<tr>";
			temHtml +="			<td width=\'117\' rowspan=\'5\' align=\'center\'><img src=\'\/images\/blank.gif\' width=\'90\' height=\'90\' class=\'border_hui\' id='heroimg"+arrH[i].CUserHeroMsg.HeroID+"' style='background:url(\/images\/hero\/hero_"+arrH[i].CUserHeroMsg.m_iPicID+".jpg);"+tmpPicStyle+"' \/><\/td>";
			temHtml +="			<td width=\'178\' height=\'20\' align=\'left\'><span class='t_yellow'>"+arrH[i].CUserHeroMsg.m_szName+"</span> <img src=\'\/images\/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_"+arrH[i].CUserHeroMsg.chStar+"\'><\/td>";
			temHtml +="			<td width=\'144\' align=\'left\'>所在城池：<span class=\'t_green\'>"+curCityIDToName(arrH[i].CUserHeroMsg.m_iCurCity)+"<\/span><\/td>";
			temHtml +="			<td width=\'127\' align=\'left\'><span class=\'\'>近攻：<\/span>"+arrH[i].CUserHeroMsg.m_iNearAttack+"<\/td>";
			temHtml +="			<td width=\'93\' rowspan=\'5\' valign=\'middle\'>";
			temHtml += 		tmpBtn+"			<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="		<tr>";
			temHtml +="			<td height=\'20\' align=\'left\'>"+arrH[i].CUserHeroMsg.m_chRank+"级 经验："+arrH[i].CUserHeroMsg.m_iCurExprience+"\/"+arrH[i].CUserHeroMsg.iNeedEprience+"<\/td>";
			temHtml +="			<td width=\'144\' align=\'left\'><span class=\'\'>体力：<\/span>"+arrH[i].CUserHeroMsg.m_iCurStrength+"<\/td>";
			temHtml +="			<td width=\'127\' align=\'left\'><span class=\'\'>近防：<\/span>"+arrH[i].CUserHeroMsg.m_iNearFort+"<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="		<tr>";
			temHtml +="			<td height=\'20\' align=\'left\'><div class=\'hero_exp_bg\'><img class=\'hero_exp\' src=\'\/images\/blank.gif\' width=\'";
			temHtml +=		(arrH[i].CUserHeroMsg.m_iCurExprience<arrH[i].CUserHeroMsg.iNeedEprience)?parseInt(arrH[i].CUserHeroMsg.m_iCurExprience/arrH[i].CUserHeroMsg.iNeedEprience*114):114;
			temHtml +="			\' \/><\/div><\/td><td width=\'144\' align=\'left\'><span class=\'\'>日体力消耗：<\/span>"+arrH[i].CUserHeroMsg.m_iStrengthCost+"\/天<\/td>";
			temHtml +="			<td width=\'127\' align=\'left\'><span class=\'\'>远攻：<\/span>"+arrH[i].CUserHeroMsg.m_iFarAttack+"<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="		<tr>";
			var gift=["","平庸","普通","良好","优秀","完美"]
			temHtml +="			<td height=\'20\' align=\'left\'>状态：<span class=\'t_yellow\'>"+tmpStu+"<\/span> 天赋：<span class=\'t_yellow\'>"+gift[arrH[i].CUserHeroMsg.m_iGiftClass]+"<\/span><\/td>";
			temHtml +="			<td width=\'144\' align=\'left\'><span class=\'\'>所需口粮：<\/span>"
			temHtml +=  (arrH[i].CUserHeroMsg.iFoodType==14)?"低级体力药":"高级体力药";
			temHtml +="			<\/td><td width=\'127\' align=\'left\'><span class=\'\'>远防：<\/span>"+arrH[i].CUserHeroMsg.m_iFarFort+"<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="		<tr>";
			temHtml +="			<td height=\'20\' align=\'left\'>"+tmpTrea+"<\/td>";
			temHtml +="			<td width=\'144\' align=\'left\'><span class=\'\'>负载量：<\/span>"+arrH[i].CUserHeroMsg.m_iAffordCount+"<\/td>";
			temHtml +="			<td width=\'127\' align=\'left\'><span class=\'\'>速度：<\/span>"+arrH[i].CUserHeroMsg.m_iMoveSpeed+"<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="	<\/table>";
			//temHtml +="	<img src=\'\/images\/army_tabline.gif\' width=\'582\' height=\'9\'>";
			temHtml +="<\/div>";
		}
		/*temHtml +='<iframe id="l_content_frame" width="691" height="436" scrolling="auto" frameborder="0" allowtransparency="ture" src="mainhtml/hero.html"></iframe>';*/
		if(temHtml=="")temHtml="<div style='margin:10px 0 0 18px;'><img src='/images2/hero_nohero.gif' width='629' height='383'/></div>"
		$("blist_list").innerHTML = temHtml;
		addZindex();
	}
	else if(objS.CTMsgHead.llMsgAct==-10){
		document.frames['marketdiv'].ShowMarketHeroList(arrH)
	}
}
//转换cityid到名称
function curCityIDToName(inid){
	var tr="";
	inid = parseInt(inid);
	if(allCityName.length>0){
		for(var m in allCityName){
			if(allCityName[m].iCityID ==inid)tr = allCityName[m].szCityName;
		}
	}
	if(tr=="")tr="不在城中"
	return tr;
}





/*
**    ==================================================================================================  
**    类名： 
**    功能：宝物合成，宝物精炼，装备合成界面
**    示例：   
**    ==================================================================================================  
*/ 

//初始化DIV
function ShowTreaList(m,total){	
	listdivID=7;
	$("blist_newtitle").innerHTML = "宝物装备";

	var inHtm="";
	inHtm+='<div id="treasure">';
	inHtm+='<div id="treamain">';
	inHtm+='	<div id="trealeft">';
	inHtm+='		<div id="trea_a_main">';
	inHtm+='			<div id="trea_a_lefttxt">　　·合成宝物可以将两个宝物的属性叠加。<br>　　·副宝物的属性将被合成到主宝物上，合成后的宝物最多不超过4种属性，主宝物的原始属性不受合成的影响。<br>　　·根据宝物的级别不同需要消耗合成石或合成神石。</div>';
	inHtm+='			<div id="trea_a_bg">';
	inHtm+='				<img id="trea_a_pic1" src="/images/blank.gif" width="50" height="50" onclick="toMixClear(1)" class="imghand">';
	inHtm+='				<img id="trea_a_pic2" src="/images/blank.gif" width="50" height="50" onclick="toMixClear(2)" class="imghand">';
	inHtm+='				<img id="trea_a_pic3" src="/images/blank.gif" width="50" height="50">';
	inHtm+='				<img id="trea_a_picbtn" src="/images/blank.gif" width="50" height="50" class="imghand" onclick="submitConpose()">';
	inHtm+='				<div>合成石：<span id="trea_item18">0</span>&nbsp;&nbsp;合成神石：<span id="trea_item19">0</span></div>';
	inHtm+='			</div>';
	inHtm+='		</div>';
	inHtm+='		<div id="trea_b_main" style="display:none">';
	inHtm+='			<div id="trea_b_lefttxt">　　·精炼宝物可以加强宝物的属性，但也有一定几率损坏宝物（精炼宝物只加强宝物的主属性）。<br>　　·根据宝物的级别不同需要消耗精炼石或精炼神石。</div>';
	inHtm+='			<div id="trea_b_bg">';
	inHtm+='				<img id="trea_b_pic1" src="/images/blank.gif" width="50" height="50" onclick="toRefineClear()" class="imghand">';
	inHtm+='				<img id="trea_b_pic2" src="/images/blank.gif" width="50" height="50">';
	inHtm+='				<img id="trea_b_picbtn" src="/images/blank.gif" width="50" height="50" class="imghand" onclick="submitRefine()">';
	inHtm+='				<div>精炼石：<span id="trea_item16">0</span>&nbsp;&nbsp;精炼神石：<span id="trea_item17">0</span></div>';
	inHtm+='			</div>';
	inHtm+='		</div>';
	inHtm+='	</div>'
		
	inHtm+='	<div id="trearight">';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_5 floatleft"><div id="trearight_count">宝物仓库容量：<span id="trea_curitem">0</span>/<span id="trea_allitem">0</span></div>';
	inHtm+='		<div id="trea_class5" class="trea_class">无</div>';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_4">';
	inHtm+='		<div id="trea_class4" class="trea_class">无</div>';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_3">';
	inHtm+='		<div id="trea_class3" class="trea_class">无</div>';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_2">';
	inHtm+='		<div id="trea_class2" class="trea_class">无</div>';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_1">';
	inHtm+='		<div id="trea_class1" class="trea_class">无</div>';
	inHtm+='		<span class="t_juhuang">暂不能操作的宝物（<span class="a_lv" hint="宝物：不同星级的宝物，购买后送达的时间不同。<br><span class=t_red>一星</span>宝物将在交易成功后<span class=t_red>2小时</span>出现在你的仓库中，<br><span class=t_red>二星</span>宝物将在交易成功后<span class=t_red>4小时</span>出现在你的仓库中，<br><span class=t_red>三星</span>以上宝物将在交易成功后<span class=t_red>6小时</span>出现在你的仓库中">关于交易返回</span>）</span>';
	inHtm+='		<div id="trea_class6" class="trea_class">无</div>';
	inHtm+='	</div>';
	inHtm+='</div>	'
	
	inHtm+='<div id="armormain" style="text-align:center; display:none">';
	inHtm+='	<div id="armor_toplist"><ul>';
	inHtm+='		<li><img src="../images/icon/cl1.gif" align="absmiddle" hint="棉" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl2.gif" align="absmiddle" hint="细麻"  /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl3.gif" align="absmiddle" hint="羊皮" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl4.gif" align="absmiddle" hint="狼皮" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl5.gif" align="absmiddle" hint="豹皮" /> <span>0</span></li>'
	inHtm+='		<br /><br />';
	inHtm+='		<li><img src="../images/icon/cl6.gif" align="absmiddle" hint="虎皮" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl7.gif" align="absmiddle" hint="青铜碎片" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl8.gif" align="absmiddle" hint="白银碎片" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl9.gif" align="absmiddle" hint="黄金碎片" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl10.gif" align="absmiddle" hint="圣石" /> <span>0</span></li></ul>';
	inHtm+='	</div><div>';
	inHtm+='		<div class="armorlist">';
	inHtm+='			<div class="armorlist_title">青铜甲 <span class="t_gray">（粮草兵、运输车、侦察兵、拓荒部队使用）</span></div>';
	inHtm+='			<div class="armorlist_main">';
	inHtm+='				<div class="armorlist_picleft"><img src="../images/trea_03_armor1.gif" /></div>';
	inHtm+='				<div class="armorlist_right">';
	inHtm+='					<div class="armorlist_info"></div>';
	inHtm+='					<div class="armorlist_icon">';
	inHtm+='						<img src="/images/icon/cl7.gif" align="absmiddle" style="margin-left:10px;" /> 青铜碎片:1 '
	inHtm+='						<img src="/images/icon/cl3.gif" align="absmiddle" style="margin-left:10px;" /> 羊皮:1'
	inHtm+='						<br /><br />';
	inHtm+='						<img src="/images/icon/cl1.gif" align="absmiddle" style="margin-left:10px;" /> 棉:1 '
	inHtm+='						<img src="/images/mail_goldicon.gif" align="absmiddle" style="margin-left:10px;" /> 金币:1 '
	inHtm+='						</div>';
	inHtm+='				</div>';
	inHtm+='			</div>';
	inHtm+='			<img src="/images/army_tabline.gif" width="320" height="9" style="filter:alpha(Opacity=30);" />';
	inHtm+='			<div class="armorlist_bot">';
	inHtm+='				<div class="armorlist_bot_left">现有数量：<span id="armor_count0">'+Outfit[0]+'</span></div>';
	inHtm+='				<div class="armorlist_bot_right">';
	inHtm+='					<div class="btFrontLeft armorlist_bot_right_input"><input id="armor_out0" type="text" class="inputboxhui" value="0"  style="width:40px;"/>/<a class="a_deepred" id="armor_max0" href="javascript:void(0)" onclick=\'$("armor_out0").value=this.innerHTML\'></a></div>';
	inHtm+='					<div class="btnWhite btFrontRight" style="margin:3px;" onclick="submitOutfit(0)">合成</div>';
	inHtm+='				</div>';
	inHtm+='			</div>'			
	inHtm+='		</div>'
			
	inHtm+='		<div class="armorlist">';
	inHtm+='			<div class="armorlist_title">白银甲 <span class="t_gray">（枪盾兵、强弩兵、长枪兵、弓箭兵使用）</span></div>';
	inHtm+='			<div class="armorlist_main">';
	inHtm+='				<div class="armorlist_picleft"><img src="../images/trea_03_armor2.gif" /></div>';
	inHtm+='				<div class="armorlist_right">';
	inHtm+='					<div class="armorlist_info"></div>';
	inHtm+='					<div class="armorlist_icon">';
	inHtm+='						<img src="/images/icon/cl8.gif" align="absmiddle" style="margin-left:10px;" /> 白银碎片:1 '
	inHtm+='						<img src="/images/icon/cl4.gif" align="absmiddle" style="margin-left:10px;" /> 狼皮:1'
	inHtm+='						<br /><br />';
	inHtm+='						<img src="/images/icon/cl1.gif" align="absmiddle" style="margin-left:10px;" /> 棉:2'
	inHtm+='						<img src="/images/mail_goldicon.gif" align="absmiddle" style="margin-left:10px;" /> 金币:5 '
	inHtm+='						</div>';
	inHtm+='				</div>';
	inHtm+='			</div>';
	inHtm+='			<img src="/images/army_tabline.gif" width="320" height="9" style="filter:alpha(Opacity=30);" />';
	inHtm+='			<div class="armorlist_bot">';
	inHtm+='				<div class="armorlist_bot_left">现有数量：<span id="armor_count1">'+Outfit[1]+'</span></div>';
	inHtm+='				<div class="armorlist_bot_right">';
	inHtm+='					<div class="btFrontLeft armorlist_bot_right_input"><input id="armor_out1" type="text" class="inputboxhui" value="0"  style="width:40px;"/>/<a class="a_deepred" id="armor_max1" href="javascript:void(0)" onclick=\'$("armor_out1").value=this.innerHTML\'></a></div>';
	inHtm+='					<div class="btnWhite btFrontRight" style="margin:3px;" onclick="submitOutfit(1)">合成</div>';
	inHtm+='				</div>';
	inHtm+='			</div>'
	inHtm+='		</div>'
			
			
			
	inHtm+='		<div class="armorlist">';
	inHtm+='			<div class="armorlist_title">黄金甲 <span class="t_gray">（骑枪战将、骑射战将使用）</span></div>';
	inHtm+='			<div class="armorlist_main">';
	inHtm+='				<div class="armorlist_picleft"><img src="../images/trea_03_armor3.gif" /></div>';
	inHtm+='				<div class="armorlist_right">';
	inHtm+='					<div class="armorlist_info"></div>';
	inHtm+='					<div class="armorlist_icon">';
	inHtm+='						<img src="/images/icon/cl9.gif" align="absmiddle" style="margin-left:10px;" /> 黄金碎片:1'
	inHtm+='						<img src="/images/icon/cl5.gif" align="absmiddle" style="margin-left:10px;" /> 豹皮:1 '
	inHtm+='						<br /><br />';
	inHtm+='						<img src="/images/icon/cl2.gif" align="absmiddle" style="margin-left:10px;" /> 细麻:1  '
	inHtm+='						<img src="/images/mail_goldicon.gif" align="absmiddle" style="margin-left:10px;" /> 金币:30 '
	inHtm+='						</div>';
	inHtm+='				</div>';
	inHtm+='			</div>';
	inHtm+='			<img src="/images/army_tabline.gif" width="320" height="9" style="filter:alpha(Opacity=30);" />';
	inHtm+='			<div class="armorlist_bot">';
	inHtm+='				<div class="armorlist_bot_left">现有数量：<span id="armor_count2">'+Outfit[2]+'</span></div>';
	inHtm+='				<div class="armorlist_bot_right">';
	inHtm+='					<div class="btFrontLeft armorlist_bot_right_input"><input id="armor_out2" type="text" class="inputboxhui" value="0"  style="width:40px;"/>/<a class="a_deepred"  id="armor_max2" href="javascript:void(0)" onclick=\'$("armor_out2").value=this.innerHTML\'></a></div>';
	inHtm+='					<div class="btnWhite btFrontRight" style="margin:3px;" onclick="submitOutfit(2)">合成</div>';
	inHtm+='				</div>';
	inHtm+='			</div>'
	inHtm+='		</div>'
			
			
			
	inHtm+='		<div class="armorlist">';
	inHtm+='			<div class="armorlist_title">圣甲 <span class="t_gray">（重甲将军使用）</span></div>';
	inHtm+='			<div class="armorlist_main">';
	inHtm+='				<div class="armorlist_picleft"><img src="../images/trea_03_armor4.gif" /></div>';
	inHtm+='				<div class="armorlist_right">';
	inHtm+='					<div class="armorlist_info"></div>';
	inHtm+='					<div class="armorlist_icon">';
	inHtm+='						<img src="/images/icon/cl10.gif" align="absmiddle" style="margin-left:10px;" /> 圣石:1'
	inHtm+='						<img src="/images/icon/cl6.gif" align="absmiddle" style="margin-left:10px;" /> 虎皮:1'
	inHtm+='						<br /><br />';
	inHtm+='						<img src="/images/icon/cl2.gif" align="absmiddle" style="margin-left:10px;" /> 细麻:2 '
	inHtm+='						<img src="/images/mail_goldicon.gif" align="absmiddle" style="margin-left:10px;" /> 金币:150 '
	inHtm+='						</div>';
	inHtm+='				</div>';
	inHtm+='			</div>';
	inHtm+='			<img src="/images/army_tabline.gif" width="320" height="9" style="filter:alpha(Opacity=30);" />';
	inHtm+='			<div class="armorlist_bot">';
	inHtm+='				<div class="armorlist_bot_left">现有数量：<span id="armor_count3">'+Outfit[3]+'</span></div>';
	inHtm+='				<div class="armorlist_bot_right">';
	inHtm+='					<div class="btFrontLeft armorlist_bot_right_input"><input id="armor_out3" type="text" class="inputboxhui" value="0"  style="width:40px;"/>/<a class="a_deepred" id="armor_max3" href="javascript:void(0)" onclick=\'$("armor_out3").value=this.innerHTML\'></a></div>';
	inHtm+='					<div class="btnWhite btFrontRight" style="margin:3px;" onclick="submitOutfit(3)">合成</div>';
	inHtm+='				</div>';
	inHtm+='			</div>'
	inHtm+='		</div>';
	inHtm+='	</div>';
	inHtm+='</div>'
	
	inHtm+='<div id="treatoptab">';
	inHtm+='	<div class="index_y2_tabstyle" id="treatab1" onclick="treaTab(1)">合成宝物</div>';
	inHtm+='	<div class="index_y2_notabstyle" id="treatab2" onclick="treaTab(2)">精炼宝物</div>';
	inHtm+='	<div class="index_y2_notabstyle" id="treatab3" onclick="treaTab(3)">合成装备</div>';
	inHtm+='</div>';
	inHtm+='</div>'
	
	/*inHtm ='<iframe id="l_content_frame" width="691" height="436" scrolling="auto" frameborder="0" allowtransparency="ture" src="mainhtml/treasure.html"></iframe>';*/
	
	//所有宝物协议返回数组
	gTrea.m = m 
	//判断是否清空已放入宝物
	if(gTrea.isReturn==0){
		$("blist_list").innerHTML = inHtm;
		
	
		//根据当前的tab状况更新tab
		treaTab(gTrea.tab)		
		
		
		//显示层
		addZindex();
	}else{
		//如果是return就保留
		treaTab(gTrea.tab,1)	
	}
	//清空标记
	gTrea.isReturn=0
	//更新合成石及合成神石初始化,精炼石及神石
	updataItemNum()
	//显示仓库容量
	var len=m.length
	for(i=0;i<m.length;i++){
		if(m[i].m_chStatus==1 || m[i].m_chStatus==2 || m[i].m_chStatus==3 || m[i].m_chStatus==4)len--;
	}
	$("trea_curitem").innerHTML = len;
	$("trea_allitem").innerHTML = total; //仓库库存
}

function updataItemNum(){	
	//合成石及合成神石初始化,精炼石及神石初始化
	$("trea_item16").innerHTML=getItemCount(37);
	$("trea_item17").innerHTML=getItemCount(38);
	$("trea_item18").innerHTML=getItemCount(39);
	$("trea_item19").innerHTML=getItemCount(40);	
}
//转换成宝物div
function toTreaInfo(num,m,type){
	var tmpCT=""
	//宝物m_chStatus含义：0正常 1佩戴 2交易中  3临时宝物 4交易送达
	
	//其他不能操作的宝物状态
	if(num==6){
		for(i=0;i<m.length;i++){
			if(m[i].m_chStatus==1 || m[i].m_chStatus==2 || m[i].m_chStatus==3 || m[i].m_chStatus==4){
				//解析宝物效果
				var tmpEffect=""
				for(n=0;n<m[i].m_stPropertyArray.length;n++){
					tmpEffect += m[i].m_stPropertyArray[n].m_szName +":" +m[i].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
				}
				var  arrd=["","佩戴中","交易中","临时宝物","交易送达中"]
				tmpCT += '<div class="trea_list_div">'
				tmpCT += '<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'"/>'
				tmpCT +='<div class="floatleft lineh17">'
				tmpCT +=nameColor(m[i].chStar,m[i].szName)+' '+m[i].m_chRank+'级<br />'
				tmpCT +='需要'+m[i].chNeedRank+'级'+m[i].chNeedStar+'星以上英雄<br />'
				if( m[i].m_chStatus==3 ){
					tmpCT +='<span class="t_gray">临时宝物</span> <span class="t_green imghand"  onclick="objFlashEng.Send(GetActHeroTrea(1605,'+m[i].m_iTreaID+',1))">激活</span></div>'
				}else{
					tmpCT +='<span class="t_gray">'+arrd[m[i].m_chStatus]+'</span></div>'
				}
				tmpCT +='</div>'
			}
		}
	}else{
	//其他正常的宝物状态
		for(i=0;i<m.length;i++){
			if(m[i].m_chStatus==0&&m[i].chStar==num){
				//解析宝物效果
				var tmpEffect=""
				for(n=0;n<m[i].m_stPropertyArray.length;n++){
					tmpEffect += m[i].m_stPropertyArray[n].m_szName +":" +m[i].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
				}
				//判断显示“合成”还是“精炼”
				var tmpfunstr = (type==0)?"toMix":"toRefine";
				var tmpchrstr = (type==0)?"合成":"精炼";
				tmpCT += '<div class="trea_list_div">'
				if(type==0){
					tmpCT += '<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui imghand" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'" onclick="'+tmpfunstr+'('+m[i].m_iTreaID+','+m[i].iPicID+','+m[i].iConposeNeedItem+','+m[i].iComposeNeed+')"/>'
				}else{
					tmpCT += '<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui imghand" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'" onclick="'+tmpfunstr+'('+m[i].m_iTreaID+','+m[i].iPicID+','+m[i].iRefineNeedItem+','+m[i].iRefineNeed+')"/>'
				}
				tmpCT +='<div class="floatleft lineh17">'
				tmpCT +=nameColor(m[i].chStar,m[i].szName)+' '+m[i].m_chRank+'级<br />'
				tmpCT +='需要'+m[i].chNeedRank+'级'+m[i].chNeedStar+'星以上英雄<br />'
				if(type==0){
					tmpCT +='<span class="t_green imghand" onclick="'+tmpfunstr+'('+m[i].m_iTreaID+','+m[i].iPicID+','+m[i].iConposeNeedItem+','+m[i].iComposeNeed+')">'+tmpchrstr+'</span>		<span class="t_green imghand"  onclick=\'msgboxyesno(\"您确认要<span class=t_red>丢弃</span>该宝物吗？\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,'+m[i].m_iTreaID+',1))\"\'>丢弃</span></div>'
				}else{
					tmpCT +='<span class="t_green imghand" onclick="'+tmpfunstr+'('+m[i].m_iTreaID+','+m[i].iPicID+','+m[i].iRefineNeedItem+','+m[i].iRefineNeed+')">'+tmpchrstr+'</span>		<span class="t_green imghand"  onclick=\'msgboxyesno(\"您确认要<span class=t_red>丢弃</span>该宝物吗？\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,'+m[i].m_iTreaID+',1))\"\'>丢弃</span></div>'					
				}			
				tmpCT +='</div>'
			}
		}
	}
	if(tmpCT=="")tmpCT="无";
	return tmpCT;
}

//定义宝物类，存储中间变量
function TreaM(){
	this.mixAID = 0
	this.mixBID = 0
	this.mixNeedItem = 0
	this.refineID = 0
	this.refineNeedItem = 0
	this.m = new Object() //存放协议返回临时宝物数组
	//当前打开的tab
	this.tab = 1;
	//当前是否是合成或精炼返回
	this.isReturn = 0;
}
var gTrea = new TreaM();
//效果ID转道具ID
function toItemID(n){
	if(n==16)return 37
	if(n==17)return 38
	if(n==18)return 39
	if(n==19)return 40
}
//放入合成
function toMix(m,p,i,c){
	//iConposeNeedItem 16精炼石37 17神石38 18合成石39 19合成神石40
	if(gTrea.mixAID==0){
		if(gTrea.mixAID==m || gTrea.mixBID==m){
			msgbox("该宝物已放入合成区！")
		}else{
			$("trea_a_pic1").src="/images/hero/trea_"+p+".jpg"
			$("trea_a_pic1").hint="点击卸下"
			gTrea.mixAID=m
			gTrea.mixNeedItem = toItemID(i)
			//合成石头图片
			$("trea_a_pic3").src="images/item/item"+gTrea.mixNeedItem+".gif"
			var nameofstone = (gTrea.mixNeedItem==39)?"合成石":"合成神石"
			$("trea_a_pic3").hint="需要"+c+"个 "+nameofstone
		}
	}else if(gTrea.mixAID!=0 && gTrea.mixBID==0){
		if(gTrea.mixAID==m || gTrea.mixBID==m){
			msgbox("该宝物已放入合成区！")
		}else{
			$("trea_a_pic2").src="/images/hero/trea_"+p+".jpg"
			$("trea_a_pic2").hint="点击卸下"
			gTrea.mixBID=m
		}
	}else if(gTrea.mixAID!=0 && gTrea.mixBID!=0){
		msgbox("已经放了两个宝物，请先点击卸下一个宝物")
	}
}
//清除现有合成选中物品
function toMixClear(m){
	if(m==1){
		$("trea_a_pic1").src="/images/blank.gif"
		$("trea_a_pic1").hint=""
		gTrea.mixAID=0
		gTrea.mixNeedItem = 0
		//合成石头图片
		$("trea_a_pic3").src="/images/blank.gif"
		$("trea_a_pic3").hint=""
	}else if(m==2){
		$("trea_a_pic2").src="/images/blank.gif"
		$("trea_a_pic2").hint=""
		gTrea.mixBID=0
	}
}
//提交合成
function submitConpose(){
	if(	gTrea.mixAID==0 ||	gTrea.mixBID==0){
		msgbox("请选择两种宝物进行合成！")	
	}else{
		objFlashEng.Send(GetTreaConpose(gTrea.mixAID,gTrea.mixBID,gTrea.mixNeedItem))
	}
}
//1611合成宝物返回的提示信息
function ShowTreaConpose(str)
{
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		
		//toMixClear(1)
		toMixClear(2)
		gTrea.isReturn=1
		//拉取道具信息
		objFlashEng.Send(GetUserItems());
		//拉取最新宝物
		objFlashEng.Send(getTaskList(1603))		
		
		return false;
	}
	else
	{//
		//toMixClear(1)
		toMixClear(2)
		gTrea.isReturn=1
		//显示合成前与合成后的宝物属性Conpose
		var oldt=EffectOfTrea(obj.CAnsComposeTrea.stOldPtArray)
		var newt=EffectOfTrea(obj.CAnsComposeTrea.stNewPtArray)
		var msg="合成宝物完毕！<br>"
		msg+='<div style="line-height:15px;"><span class="t_juhuang">旧属性：</span>'+oldt
		msg+='<br><span class="t_juhuang">新属性：</span>'+newt
		msg+='</div>'
		
		msgbox(msg)
		//拉取道具信息
		objFlashEng.Send(GetUserItems());
		//拉取最新宝物
		objFlashEng.Send(getTaskList(1603))		
	}
}

//解析宝物效果函数
function EffectOfTrea(a){
	var tmpEffect=""
	for(var n=0;n<a.length;n++){
		tmpEffect += a[n].m_szName +":" +a[n].m_iValue/10 +"% "	
	}
	return tmpEffect
}


//精炼
function toRefine(m,p,i,c){
	$("trea_b_pic1").src="/images/hero/trea_"+p+".jpg"
	$("trea_b_pic1").hint="点击卸下"
	gTrea.refineID=m
	
	gTrea.refineNeedItem = toItemID(i)
	var nameofstone = (gTrea.refineNeedItem==37)?"精炼石":"精炼神石"
	$("trea_b_pic2").hint="需要"+c+"个 "+nameofstone
	$("trea_b_pic2").src="images/item/item"+gTrea.refineNeedItem+".gif"
}
function toRefineClear(){
	$("trea_b_pic1").src="/images/blank.gif"
	$("trea_b_pic1").hint=""
	$("trea_b_pic2").src="/images/blank.gif"
	$("trea_b_pic2").hint=""
	gTrea.refineID=0
	gTrea.refineNeedItem = 0
}
//提交合成
function submitRefine(){
	if(gTrea.refineID==0){
		msgbox("请选择宝物进行精炼！")	
	}else{
		objFlashEng.Send(GetTreaRefine(gTrea.refineID,gTrea.refineNeedItem))
	}
}
//1610精炼宝物返回的提示信息
function ShowTreaRefine(str)
{
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>精炼失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		
		
		//toRefineClear()
		gTrea.isReturn=1
		//拉取道具信息
		objFlashEng.Send(GetUserItems());
		//拉取最新宝物
		objFlashEng.Send(getTaskList(1603))	
		return false;
	}
	else
	{
		
		//显示合成前与合成后的宝物属性
		var oldt=EffectOfTrea(obj.CAnsUpGradeTrea.stOldPtArray)
		var newt=EffectOfTrea(obj.CAnsUpGradeTrea.stNewPtArray)
		var msg="精炼宝物成功！<br>"
		msg+='<div style="line-height:15px;"><span class="t_juhuang">旧属性：</span>'+oldt
		msg+='<br><span class="t_juhuang">新属性：</span>'+newt
		msg+='</div>'
		msgbox(msg)
		
		//toRefineClear()
		gTrea.isReturn=1
		//拉取道具信息
		objFlashEng.Send(GetUserItems());
		//拉取最新宝物
		objFlashEng.Send(getTaskList(1603))		
	}
}


//切换顶部tab，合成 精炼 装备
function treaTab(n,act){
	if(n==1){
		SH("treamain")
			SH("trea_a_main")
			HI("trea_b_main")
		HI("armormain")
		//更新右侧宝物list
		for(var i=1;i<7;i++){
			eval("$(\"trea_class"+i+"\").innerHTML=toTreaInfo("+i+",gTrea.m,0)")
		}		
		//当前打开tab1
		gTrea.tab=1
		$("treatab1").className = "index_y2_tabstyle"
		$("treatab2").className = "index_y2_notabstyle"
		$("treatab3").className = "index_y2_notabstyle"
	}else if(n==2){
		SH("treamain")
			HI("trea_a_main")
			SH("trea_b_main")
		HI("armormain")
		//更新右侧宝物list		
		for(var i=1;i<7;i++){
			eval("$(\"trea_class"+i+"\").innerHTML=toTreaInfo("+i+",gTrea.m,1)")
		}		
		//当前打开tab2
		gTrea.tab=2
		$("treatab1").className = "index_y2_notabstyle"
		$("treatab2").className = "index_y2_tabstyle"
		$("treatab3").className = "index_y2_notabstyle"	
	}else if(n==3){
		//获取材料数据
		objFlashEng.Send(getTaskList(1613))		
		
		HI("treamain")
			HI("trea_a_main")
			HI("trea_b_main")
		SH("armormain")
		//当前打开tab3
		gTrea.tab=3
		$("treatab1").className = "index_y2_notabstyle"
		$("treatab2").className = "index_y2_notabstyle"
		$("treatab3").className = "index_y2_tabstyle"	
	}
	//如果不是点击或第一次进入，不清空原有已放上的宝物
	//第一次进入，切换tab是清空
	if(typeof(act)=="undefined"){
		//合成
		toMixClear(1)
		toMixClear(2)
		//精炼
		toRefineClear()
	}
}

function submitOutfit(n){
	eval("var c = $(\"armor_out"+n+"\").value")
	if(isPlusNumber(c))
		objFlashEng.Send(getMakeOutfit(n+1,c))
	else
		msgbox("请输入大于零的整数！")
}
//获取材料1613
function ShowGetOutfit(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>获取材料失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		return false;
	}
	//获取材料页面元素
	if(obj.CTMsgHead.llMsgAct == 0 ){
		//材料合成页面所需
		updataMateril(obj.CAnsGetUserMaterial.m_stMaterilArry)
	}else if(obj.CTMsgHead.llMsgAct == -10 ){
		//交易所页面所需
		document.frames["marketdiv"].ShowMarketMateril(obj.CAnsGetUserMaterial.m_stMaterilArry)		
	}
}

function ShowMakeOutfit(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>合成装备失败：</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		return false;
	}
	//更新页面材料显示
	updataMateril(obj.CAnsComposeOutFit.m_stMaterilArry)
	
	Outfit= obj.CAnsComposeOutFit.m_astOutFit
	
	for(var i=0;i<4;i++){
		//更新页面装备数量	
		eval("$('armor_count"+i+"').innerHTML=Outfit["+i+"]")
		//清空输入框
		eval("$('armor_out"+i+"').value=0")
	}
	msgbox("合成装备成功！")	
	$('init_iGlod').innerHTML = obj.CAnsComposeOutFit.m_iLeftGold;
	
}

//更新页面材料显示
function updataMateril(b){
	var m = $("armor_toplist").getElementsByTagName("span");
	for(var i=0;i<b.length;i++){
		if(b[i].m_iID == 100)m[0].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 101)m[1].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 200)m[2].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 201)m[3].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 202)m[4].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 203)m[5].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 300)m[6].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 301)m[7].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 302)m[8].innerHTML  = b[i].m_iVale;
		if(b[i].m_iID == 303)m[9].innerHTML  = b[i].m_iVale;
	}	
	//计算最大合成
	for(var i=0;i<4;i++){
		eval("$(\"armor_max"+i+"\").innerHTML=CountMatrialMax("+i+")")
	}		
}

//计算当前资源最大能造装备数目
function CountMatrialMax(n){
  	var m = $("armor_toplist").getElementsByTagName("span");
	var newArr=[]
	var needgoldArr=[1,5,30,150]
	switch(n){
		case 0:
			newArr.push(m[0].innerHTML) //100
			newArr.push(m[2].innerHTML) //200
			newArr.push(m[6].innerHTML) //300
			newArr.push(Math.floor($("init_iGlod").innerHTML/needgoldArr[0])) //计算金币
			newArr.sort(function(a,b){return a-b});
			break;
		case 1:
			newArr.push(Math.floor(m[0].innerHTML/2)) //100*2
			newArr.push(m[3].innerHTML) //201
			newArr.push(m[7].innerHTML) //301
			newArr.push(Math.floor($("init_iGlod").innerHTML/needgoldArr[1])) //计算金币
			newArr.sort(function(a,b){return a-b});
			break;
		case 2:
			newArr.push(m[1].innerHTML) //101
			newArr.push(m[4].innerHTML) //202
			newArr.push(m[8].innerHTML) //302
			newArr.push(Math.floor($("init_iGlod").innerHTML/needgoldArr[2])) //计算金币
			newArr.sort(function(a,b){return a-b});
			break;
		case 3:
			newArr.push(Math.floor(m[1].innerHTML/2)) //101*2
			newArr.push(m[5].innerHTML) //203
			newArr.push(m[9].innerHTML) //303
			newArr.push(Math.floor($("init_iGlod").innerHTML/needgoldArr[3])) //计算金币
			newArr.sort(function(a,b){return a-b});
			break;		
	}
	return newArr[0]			
}



/*
**    ==================================================================================================  
**    类名： 
**    功能：宝物合成，宝物精炼，装备合成界面
**    示例：   
**    ==================================================================================================  
*/ 

//初始化DIV
function ShowMarketDiv(){	
	listdivID=8;
	$("blist_newtitle").innerHTML = "交易所";

	var inHtm="";
	inHtm ='<iframe id="marketdiv" width="652" height="406" scrolling="no" frameborder="0" allowtransparency="ture" src="mainhtml/market2.html?v=2009070401"></iframe>';
	$("blist_list").innerHTML = inHtm;
	
	
	
	//显示层
	addZindex();
}
