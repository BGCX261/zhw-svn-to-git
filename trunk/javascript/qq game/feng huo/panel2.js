//�����tab��ʾ
var gov_arid=6
var tec_arid=9
var for_arid=8
var arm_arid=7
var tec_start_arid=19
var for_start_arid=31
var arm_start_arid=39
var arm_end_arid=50 //����
var listdivID=0;//���嵱ǰ���ڲ��������mainDIV

//��ʾ�Ҳั���
function WriteDiv(id,NowRank){
	var temHtml = "";
	var NextRank = NowRank+1;
	
	if(NextRank < mbr.Buidingranks[id].rank.length ){
		temHtml += "<div style=\"margin:10px 0 10px 0;\">";
		temHtml += "                     <div style=\"float:left;\"><img style=\"background:url(images2/mgb2_iconbuilding.jpg) -"+ (71*(id)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+id+")\" title=\"����鿴����\" \/><\/div>";
		temHtml += "                     <div style=\"text-align:left; margin:3px 10px 0 88px;\"><b>"+ mb.Buidings[id].BuildingName +"<\/b>  ("+ NextRank +"��) <span class=\"a_yellow\"  onclick=\"getInfo("+id+")\"> &gt;&gt;�鿴����<\/span><br \/>";
		temHtml += "    "+ mb.Buidings[id].BuildingDesc1 +"<\/div>";
		temHtml += "   			   <\/div>";
		temHtml += "				  <div style=\"clear:both;\"><b>Ч��<\/b><br><img src=\"images2\/richtab_line.gif\" width=\"278\" height=\"2\" \/><\/div><div>";
		if(NowRank >= 0 ){
			temHtml += "                  ��ǰ�ȼ���"+ mbr.Buidingranks[id].rank[NowRank].Data +"<br \/>";
			temHtml += "                  ������"+ mbr.Buidingranks[id].rank[NextRank].Data +"<\/div>";
		}else{
			temHtml += "                  ��ǰ�ȼ�����δ����<br \/>";		
			temHtml += "                  �����"+ mbr.Buidingranks[id].rank[NextRank].Data +"<\/div>";
		}
		//�ж���Դ��������
		var strWood,strIron,strFood,strStone
		if(mbr.Buidingranks[id].rank[NextRank].NeedWood <= nWood){
			strWood = mbr.Buidingranks[id].rank[NextRank].NeedWood;
		}else{
			strWood = "<span title='ľ�Ĳ���' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedWood+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedIron<= nIron){
			strIron = mbr.Buidingranks[id].rank[NextRank].NeedIron;
		}else{
			strIron = "<span title='������' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedIron+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedFood <= nFood){
			strFood = mbr.Buidingranks[id].rank[NextRank].NeedFood;
		}else{
			strFood = "<span title='��ʳ����' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedFood+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedStone <= nStone){
			strStone = mbr.Buidingranks[id].rank[NextRank].NeedStone;
		}else{
			strStone = "<span title='ʯ�ϲ���' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedStone+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedPopulation <= nPop){
			strPop = mbr.Buidingranks[id].rank[NextRank].NeedPopulation;
		}else{
			strPop = "<span title='�˿ڲ���' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedPopulation+"</span>";			
		}
		if(mbr.Buidingranks[id].rank[NextRank].NeedMoney <= $("init_iGlod").innerHTML){
			strMoney = mbr.Buidingranks[id].rank[NextRank].NeedMoney;
		}else{
			strMoney = "<span title='��Ҳ���' style='color=#f00;font-weight:bold'>"+mbr.Buidingranks[id].rank[NextRank].NeedMoney+"</span>";			
		}
		
		temHtml += "                  <div style=\"margin:5px auto;\"><b>�ɱ�<\/b><br><img src=\"images2\/richtab_line.gif\" width=\"278\" height=\"2\" \/><\/div>";
		temHtml += "                  <div align=left><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strWood +" <img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strIron +" <img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strStone +" <img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strFood +"<br \/>";
		temHtml += "                    ��ʱ��"+ formattime(mbr.Buidingranks[id].rank[NextRank].NeedTime) +" <br>�˿ڣ�"+ strPop+" <br>"
		temHtml += (mbr.Buidingranks[id].rank[NextRank].NeedMoney>0)?(" ��ң�"+ strMoney+"<br \/>"):"";
		temHtml += "              ��:"+transPreCondition(mbr.Buidingranks[id].rank[NextRank].Precondition)[0]+"<br \/>";
		temHtml += "                  <\/div>";
		temHtml += "                  <div style=\"text-align:center;\">";
		temHtml += "                    <p>&nbsp;<\/p>";
		temHtml += "                    <p>";
		temHtml += "                    <\/p>";
		temHtml += "                    <p>";
		
		
		
		
		//�ж����ڽ�����
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
		//�жϸý����Ƿ�������
		if(isDoing){
			temHtml += "                        <div class='t_red2'>*���ڶ�����*</div> <div class=\"btnWhite\" onclick=\"javascript:CancleTask('"+waterid+"');\">ȡ ��</div> <\/div>";
		}else if(!transPreCondition(mbr.Buidingranks[id].rank[NextRank].Precondition)[1]){
			//�ж�ǰ������
			if(NowRank >= 0 ){
				temHtml += "                    <div class='t_red2'>*ǰ����������*</div><img src=\"images2\/building_upgrade.gif\" width=\"102\" height=\"34\" class='picgray' \/><\/div>";
			}else{	
				temHtml += "                    <div class='t_red2'>*ǰ����������*</div><img src=\"images2\/building_build.gif\" width=\"102\" height=\"34\" class='picgray' \/>";
			}
		}else{
			//����ý���û���������������жϹٸ��Ƿ�������
			if(isGovDoing){
				temHtml += "                         <div class='t_red2'>*�ٸ�������*</div> <div class=\"btnGray\">�� ��</div><\/div>";
			}else{
				//����ٸ�û�����������ֱ��жϱ�Ӫ���Ƿ������������������
				if(transToID(id) == 8){
					//����Ǿ�Ӫ���ж��Ƿ������б�
					if(isARDoing){
						temHtml += "                   <div class='t_red2'>*�����������������*</div>  <div class=\"btnGray\">�� ��</div><\/div>";
					}else{
						//���û��������жϱ�Ӫ�Ƿ�Ϊ0��
						if(NowRank >= 0 ){
							temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_upgrade.gif\" width=\"102\" height=\"34\" \/>";
						}else{	
							temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_build.gif\" width=\"102\" height=\"34\" \/>";
						}
					}
				}else if(transToID(id) == 9){
					//����ǳǷ������ж��Ƿ�������Ƿ�
					if(isFODoing){
						temHtml += "                    <div class='t_red2'>*������Ƿ�����������*</div>  <div class=\"btnGray\">�� ��</div><\/div>";
					}else{
						//���û��������жϱ�Ӫ�Ƿ�Ϊ0��
						if(NowRank >= 0 ){
							temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_upgrade.gif\" width=\"102\" height=\"34\" \/>";
						}else{	
							temHtml += "                    <img style=\"cursor:hand;\" onclick=\"cBuild("+transToID(id)+",1,"+(NextRank+1)+");\" src=\"images2\/building_build.gif\" width=\"102\" height=\"34\" \/>";
						}
					}
				}else{
					//��������
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
		//��ߵȼ������
		temHtml += "<div style=\"margin:10px 0 10px 0;\">";
		temHtml += "                     <div style=\"float:left;\"><img style=\"background:url(images2/mgb2_iconbuilding.jpg) -"+ (71*(id)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+id+")\" title=\"����鿴����\" \/><\/div>";
		temHtml += "                     <div style=\"text-align:left; margin:3px 10px 0 88px;\"><b>"+ mb.Buidings[id].BuildingName +"<\/b>  ("+ NextRank +"��) <span class=\"a_yellow\"  onclick=\"getInfo("+id+")\"> &gt;&gt;�鿴����<\/span><br \/>";
		temHtml += "    "+ mb.Buidings[id].BuildingDesc +"<\/div>";
		temHtml += "   			   <\/div>";
		temHtml += "				  <div style=\"clear:both;\"><b>Ч��<\/b><br><img src=\"images2\/richtab_line.gif\" width=\"278\" height=\"2\" \/><\/div><div style=\"padding-left:10px;\">";		
		temHtml += "                  ��ǰ�ȼ���"+ mbr.Buidingranks[id].rank[NowRank].Data +"<br \/>";		
		temHtml += "                  �Ѿ�����߼�����������" +"<\/div>";
	}
	return temHtml;
}


//����ٸ���ʾ�б�
function ShowBuildListDiv(){	
	listdivID=1;
	$("blist_newtitle").innerHTML = "����";
	var temHtml = "";
	if(arrCityBuildRank.length>0 ){
		//��һ��˳��������Ͻ�����ID
		var order=[14,7,12,9,5,4,8,17,16,10,15,11,18,13]
		var newBuildRank=[]
		var newBuildInfo=[]
		var newBuildRankInfo=[]
		for(var i=0;i<order.length;i++){
			//���鵱ǰ�ȼ�Rank��Ϣ
			newBuildRank.push(arrCityBuildRank[order[i]])
			//��������mb
			newBuildInfo.push(mb.Buidings[order[i]])
			//���齨��ȼ�mbr��Ϣ
			newBuildRankInfo.push(mbr.Buidingranks[order[i]])
		}
		
		
		for(var i=0;i<newBuildRank.length;i++){
			var NextRank = newBuildRank[i]; 
			//�ж��Ƿ�Ϊ��߼����
			if(NextRank < newBuildRankInfo[i].rank.length ){
				
				//�ж���Դ��������
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
					strPop = "<span title='�˿ڲ���' style='color=#f00;font-weight:bold'>"+newBuildRankInfo[i].rank[NextRank].NeedPopulation+"</span>";			
				}
				if(newBuildRankInfo[i].rank[NextRank].NeedMoney <= $("init_iGlod").innerHTML){
					strMoney = newBuildRankInfo[i].rank[NextRank].NeedMoney;
				}else{
					strMoney = "<span style='color=#f00;font-weight:bold'>"+newBuildRankInfo[i].rank[NextRank].NeedMoney+"</span>";			
				}
				
				temHtml +="<div class=\"blist_listdiv\">";
				temHtml +="				<div class=\"blist_listdiv_left\">��"+newBuildInfo[i].BuildingName+"-"+newBuildRank[i]  +"�� <img style=\"background:url(images2/mgb2_iconbuilding.jpg) -"+ (71*(order[i])) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+order[i]+")\" title=\"����鿴����\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+newBuildInfo[i].BuildingDesc+"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_source\"><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strWood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strIron;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strStone;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_source\"><img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strFood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"�˿�\" class=\"ico_pop\" height=\"16\" width=\"12\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strPop;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"���\" class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strMoney;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_righttime\">��Ҫ "+ formattime(newBuildRankInfo[i].rank[NextRank].NeedTime) /*+" [������Դ] "+ newBuildRankInfo[i].rank[NextRank].NeedSpecial*/ +"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_right_button\">";
				//�ж����ڽ�����
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
					temHtml += "                        <div class='btFrontLeft t_red2'>*���ڶ�����*</div> <div class=\"btnWhite btFrontRight\" onclick=\"javascript:CancleTask('"+waterid+"');\">ȡ ��</div> <\/div>";
				}else if(!transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[1]){
					//�ж�ǰ������
					if(NextRank > 0 ){
						temHtml += "                   <div class='btFrontLeft'>��:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div><div title='ǰ������������' class=\"btnGray btFrontRight\">�� ��</div>";
					}else{	
						temHtml += "                   <div class='btFrontLeft'>��:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div><div title='ǰ������������' class=\"btnGray btFrontRight\">�� ��</div>";
					}
				}else{
					//����ý���û���������������жϹٸ��Ƿ�������
					if(isGovDoing){
						temHtml += "                         <div class='btFrontLeft t_red2'>*�ٸ�������*</div> <div class=\"btnGray btFrontRight\">�� ��</div><\/div>";
					}else{
						//����ٸ�û�����������ֱ��жϱ�Ӫ���Ƿ������������������
						if(transToID(order[i]) == 8){
							//����Ǿ�Ӫ���ж��Ƿ������б�
							if(isARDoing){
								temHtml += "                     <div class='btFrontLeft t_red2'>*�����������������*</div>  <div class=\"btnGray btFrontRight\">�� ��</div><\/div>";
							}else{
								//���û��������жϱ�Ӫ�Ƿ�Ϊ0��
								if(NextRank == 0 ){
									temHtml +="<div class='btFrontLeft'>��:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">�� ��</div>";
								}else{
									temHtml +="<div class='btFrontLeft'>��:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">�� ��</div>";
								}
							}
						}else if(transToID(order[i]) == 9){
							//����ǳǷ������ж��Ƿ�������Ƿ�
							if(isFODoing){
								temHtml += "                     <div class='btFrontLeft t_red2'>*������Ƿ�����������*</div>  <div class=\"btnGray btFrontRight\">�� ��</div><\/div>";
							}else{
								//���û��������жϱ�Ӫ�Ƿ�Ϊ0��
								if(NextRank == 0 ){
									temHtml +="<div class='btFrontLeft'>��:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">�� ��</div>";
								}else{
									temHtml +="<div class='btFrontLeft'>��:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">�� ��</div>";
								}
							}
						}else{
							//��������
							if(NextRank == 0 ){
								temHtml +="<div class='btFrontLeft'>��:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">�� ��</div>";
							}else{
								temHtml +="<div class='btFrontLeft'>��:"+transPreCondition(newBuildRankInfo[i].rank[NextRank].Precondition)[0]+"</div><div onclick=\"cBuild("+transToID(order[i])+",1,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">�� ��</div>";
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
				temHtml +="				<div class=\"blist_listdiv_left\">��"+newBuildInfo[i].BuildingName+"-"+newBuildRank[i]  +"�� <img style=\"background:url(images2/mgb2_iconbuilding.jpg) -"+ (71*(order[i])) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+order[i]+")\" title=\"����鿴����\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+newBuildInfo[i].BuildingDesc+"<\/div><br \/>";
				temHtml +="					<div><a href=\"#\" class=\"a_yellow\" onclick=\"getInfo("+order[i]+")\">&gt;&gt;�鿴����<\/a> ";
				temHtml +="					�Ѿ�����߼�����������<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";			}
		}
		$("blist_list").innerHTML = temHtml;
	}
}

//���̫ѧԺ��ʾ�б�
function ShowTEListDiv(){	
	listdivID=2;
	$("blist_newtitle").innerHTML = "̫ѧԺ";
	var temHtml = "";
	if(arrCityBuildRank.length>0 ){
		//�Ƽ������±�19--31
		for(i=tec_start_arid;i<for_start_arid;i++){
			// �����һ�����������붨�����������
			var NextRank = arrCityBuildRank[i];
			//�ж��Ƿ�Ϊ��߼�
			if(NextRank < mbr.Buidingranks[i].rank.length ){
				//�ж���Դ��������
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
				temHtml +="				<div class=\"blist_listdiv_left\">��"+mb.Buidings[i].BuildingName+"-"+arrCityBuildRank[i]  +"�� <img style=\"background:url(images2/mgb2_icontech.jpg) -"+ (71*(i-19)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+i+")\" title=\"����鿴����\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+mb.Buidings[i].BuildingDesc+"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_source\"><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strWood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strIron;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strStone;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_source\"><img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strFood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"�˿�\" class=\"ico_pop\" height=\"16\" width=\"12\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ mbr.Buidingranks[i].rank[NextRank].NeedPopulation;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"���\" class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strMoney;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_righttime\">��Ҫ "+ formattime(mbr.Buidingranks[i].rank[NextRank].NeedTime) /*+" [������Դ] "+ mbr.Buidingranks[i].rank[NextRank].NeedSpecial*/ +"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_right_button\">";
				//�ж����ڽ�����
				var isDoing = false;
				var isTEDoing = false;
				for(n=0;n < arrCurBuild.length;n++){
					if(arrCurBuild[n] ==10 ){
						isTEDoing = true
					}
				}
				for(n=0;n < arrCurBuild.length;n++){ //��msg�ﶨ���ȫ�����飬1003ʱ��ֵ����ǰ���ڽ����еĽ�����
					if(i == transToArrID(arrCurBuild[n])){
						waterid = arrCurWaterID[n];
						isDoing = true
					}
				}
				if(isTEDoing){
					temHtml +="				 <div class='btFrontLeft t_red2'>*̫ѧԺ������*</div>  <div class=\"btnGray btFrontRight\">�� ��</div><\/div>";
				}else if(!transPreCondition(mbr.Buidingranks[i].rank[NextRank].Precondition)[1]){
					//�ж�ǰ������
					temHtml += "             <div class='btFrontLeft'>��:"+transPreCondition(mbr.Buidingranks[i].rank[NextRank].Precondition)[0]+"</div><div title='ǰ������������' class=\"btnGray btFrontRight\">�� ��</div>";
				}else{
					if(isDoing){
						temHtml += "                        <div class='btFrontLeft t_red2'>*���ڶ�����*</div> <div class=\"btnWhite btFrontRight\" onclick=\"javascript:CancleTask('"+waterid+"');\">ȡ ��</div> <\/div>";

					}else{
						temHtml +="<div class='btFrontLeft'>��:"+transPreCondition(mbr.Buidingranks[i].rank[NextRank].Precondition)[0]+"</div>						<div onclick=\"cBuild("+transToID(i)+",2,"+(NextRank+1)+");\" class=\"btnWhite btFrontRight\">�� ��</div>";
					}
				}
				//
				temHtml +="					<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";
			}else{
				temHtml +="<div class=\"blist_listdiv\">";
				temHtml +="				<div class=\"blist_listdiv_left\">��"+mb.Buidings[i].BuildingName+"-"+arrCityBuildRank[i]  +"�� <img style=\"background:url(images2/mgb2_icontech.jpg) -"+ (71*(i-19)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+i+")\" title=\"����鿴����\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+mb.Buidings[i].BuildingDesc+"<\/div><br \/>";
				temHtml +="					<div><a href=\"#\" class=\"a_yellow\" onclick=\"getInfo("+i+")\">&gt;&gt;�鿴����<\/a> ";
				temHtml +="					�Ѿ�����߼�����������<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";			}
		}
		$("blist_list").innerHTML = temHtml;
	}
}

//����Ƿ���ʾ�б�
function ShowFOListDiv(){	
	listdivID=3;
	$("blist_newtitle").innerHTML = "�Ƿ���";
	var temHtml = "";
	temHtml +="<form name=\"form_FO\">";
	if(arrCityBuildRank.length>0 ){
		//�Ƿ������±�31-38
		for(i=for_start_arid;i<arm_start_arid;i++){
				//�ж���Դ��������
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
				temHtml +="				<div class=\"blist_listdiv_left\">��"+mb.Buidings[i].BuildingName+" <img style=\"background:url(images2/mgb2_iconfort.jpg) -"+ (71*(i-for_start_arid)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+i+",1)\" title=\"����鿴����\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+mb.Buidings[i].BuildingDesc+"(����<span class='t_green'>"+arrCityBuildRank[i]+"</span>��)<\/div>";
				temHtml +="					<div class=\"blist_listdiv_source\"><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strWood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strIron;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strStone;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_source\"><img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strFood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"�˿�\" class=\"ico_pop\" height=\"16\" width=\"12\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ mbr.Buidingranks[i].rank[0].NeedPopulation;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"���\" class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strMoney;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_righttime\">��Ҫ "+ formattime(mbr.Buidingranks[i].rank[0].NeedTime) /*+" [������Դ] "+ mbr.Buidingranks[i].rank[0].NeedSpecial*/ +" "+transPreCondition(mbr.Buidingranks[i].rank[0].Precondition)[0]+"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_right_button\">";
				
				//�жϳǷ����������������
				var isFODoing = false;
				for(n=0;n < arrCurBuild.length;n++){
					if(arrCurBuild[n] ==9 ){
						isFODoing = true
					}
				}
				if(isFODoing){
					temHtml +="				 <div class='btFrontLeft t_red2'>*�Ƿ���������*</div>  <div class=\"btnGray btFrontRight\">�� ��</div><\/div>";
				}else if(!transPreCondition(mbr.Buidingranks[i].rank[0].Precondition)[1]){
					//�ж�ǰ������
					temHtml += "             <div class='btFrontLeft t_red2'>*ǰ������������*</div><div title='ǰ������������' class=\"btnGray btFrontRight\">�� ��</div>";
				}else{
					temHtml +="				<div class='btFrontLeft'>���� <input name=\"num"+i+"\" type=\"text\" id=\"num"+i+"\" value=\"0\" class=\"inputboxhui\" style=\"width:30px;\"> (����<span class='t_green imghand' onclick='$(\"num"+i+"\").value=this.innerHTML'>"+CountMax(mbr.Buidingranks[i].rank[0].NeedWood,mbr.Buidingranks[i].rank[0].NeedIron,mbr.Buidingranks[i].rank[0].NeedFood,mbr.Buidingranks[i].rank[0].NeedStone,mbr.Buidingranks[i].rank[0].NeedMoney)+"</span>��)</div> 	<div onclick=\"cArmy("+transToID(i)+",3,"+i+");\" class=\"btnWhite btFrontRight\">�� ��</div>";
				}
				
				temHtml +="					<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";
			
		}
		temHtml +="	</form>";
		$("blist_list").innerHTML = temHtml;
	}
}

//�����Ӫ��ʾ�б�
function ShowARListDiv(){	
	listdivID=4;
	$("blist_newtitle").innerHTML = "��Ӫ";
	var temHtml = "";
	temHtml += "<form name=\"form_AR\">";
	if(arrCityBuildRank.length>0 ){
		//���������±�40-50
		for(i=arm_start_arid;i<arm_end_arid;i++){
				//�ж���Դ��������
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
				temHtml +="				<div class=\"blist_listdiv_left\">��"+mb.Buidings[i].BuildingName+" <img style=\"background:url(images2/mgb2_iconarmy.jpg) -"+ (71*(i-arm_start_arid)) +"px 0px no-repeat;\" class=\"imghand\" src=\"images\/blank.gif\" width=\"71\" height=\"79\" onclick=\"getInfo("+i+",2)\" title=\"����鿴����\" \/><\/div>";
				temHtml +="				<div class=\"blist_listdiv_right\">";
				temHtml +="					<div class=\"blist_listdiv_right_top\">"+mb.Buidings[i].BuildingDesc+"(����<span class='t_green'>"+arrCityBuildRank[i]+"</span>��)<\/div>";
				temHtml +="					<div class=\"blist_listdiv_source\"><img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strWood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strIron;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strStone;
				temHtml +="					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_source\"><img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+strFood;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\"><img title=\"���\" class=\"ico_gold\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+ strMoney;
				temHtml +="					<\/div><div class=\"blist_listdiv_source\" style='line-height:16px'>������"+ mbr.Buidingranks[i].rank[0].Reserve8;
				temHtml +="/ʱ					<\/div><div class=\"cb\"><\/div><div class=\"blist_listdiv_righttime\">��Ҫ "+ formattime(mbr.Buidingranks[i].rank[0].NeedTime) /*+" [������Դ] "+ mbr.Buidingranks[i].rank[0].NeedSpecial*/ +" "+transPreCondition(mbr.Buidingranks[i].rank[0].Precondition)[0]+"<\/div>";
				temHtml +="					<div class=\"blist_listdiv_right_button\">";
				
				//�жϱ�Ӫ�������������
				var isARDoing = false;
				for(n=0;n < arrCurBuild.length;n++){
					if(arrCurBuild[n] ==8 ){
						isARDoing = true
					}
				}
				if(isARDoing){
					temHtml +="				<div class='btFrontLeft t_red2'>*��Ӫ������*</div>  <div class=\"btnGray btFrontRight\">�� ļ</div><\/div>";
				}else if(!transPreCondition(mbr.Buidingranks[i].rank[0].Precondition)[1]){
					//�ж�ǰ������
					temHtml += "             <div class='btFrontLeft t_red2'>*ǰ������������*</div><div title='ǰ������������' class=\"btnGray btFrontRight\">�� ļ</div>";
				}else{
					temHtml +="				<div class='btFrontLeft'>��ļ <input name=\"num"+i+"\" type=\"text\" id=\"num"+i+"\" value=\"0\"  class=\"inputboxhui\" style=\"width:30px;\"> (����<span class='t_green imghand' onclick='$(\"num"+i+"\").value=this.innerHTML'>"+CountMax(mbr.Buidingranks[i].rank[0].NeedWood,mbr.Buidingranks[i].rank[0].NeedIron,mbr.Buidingranks[i].rank[0].NeedFood,mbr.Buidingranks[i].rank[0].NeedStone,mbr.Buidingranks[i].rank[0].NeedMoney)+"</span>��)</div> 		<div onclick=\"cArmy("+transToID(i)+",4,"+i+");\" class=\"btnWhite btFrontRight\">�� ļ</div>";
				}
				
				temHtml +="					<\/div>";
				temHtml +="				<\/div>";
				temHtml +="			<\/div>";
		}
		temHtml +="	</form>";
		$("blist_list").innerHTML = temHtml;
	}
}

//���㵱ǰ��Դ����������Ŀ
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
		return ["��",true]
	}else{
		var tempC=""
		var pa=data.split("|")
		var preIs=true
		for(var i=0;i<pa.length;i++){
			var pairs = pa[i].split(":"); 
			//�ж�ǰ�������Ƿ�����
			//arrCityBuildRank[transToArrID(pairs[0])]����ǰ�����ȼ�
			//pairs[1]:��Ҫ�ȼ�
			
			if(arrCityBuildRank[transToArrID(pairs[0])] >= pairs[1]){
				tempC +=mb.Buidings[transToArrID(pairs[0])].BuildingName+""+pairs[1]+"��,"
			}else{
				tempC +="<span class='t_red' title='ǰ����������'><b>"+mb.Buidings[transToArrID(pairs[0])].BuildingName+""+pairs[1]+"��</b></span>,"	
				preIs=false
			}
		}
		return [tempC.substring(0,tempC.length-1),preIs]
	}
}

//flash���� ���������
function ShowMainFourDiv(str){	
	switch(str){
		case "Build":
			if(arrCityBuildRank[gov_arid]==0){
				msgbox("����û�н���ٸ������ڳ��ڽ��졣")
			}else{
				ShowBuildListDiv();
				addZindex();	
			}
			break
		case "TE":
			if(arrCityBuildRank[tec_arid]==0){
				msgbox("����û�н���̫ѧԺ�����ڳ��ڽ��졣")
			}else{
				ShowTEListDiv();
				addZindex();	
			}
			break
		case "FO":
			if(arrCityBuildRank[for_arid]==0){
				msgbox("����û�н���Ƿ��������ڳ��ڽ��졣")
			}else{
				ShowFOListDiv();
				addZindex();	
			}
			break
		case "AR":
			if(arrCityBuildRank[arm_arid]==0){
				msgbox("����û�н����Ӫ�����ڳ��ڽ��졣")
			}else{
				ShowARListDiv();
				addZindex();	
			}
			break
	}
}

//��flash����,��ɾ��
function addZindex(){
	$('l_content').style.display='block';
	$('l_content').style.zIndex=zindexStart;
	zindexStart++
}





//1019���¶�����Ϣ�������
function ShowARingDiv(A){	
	listdivID=5;
	$("blist_newtitle").innerHTML = "�鿴���¶���";
	var temH = "";	
	var B=[] //�����˷���ľ����ж�
	//�Լ�������ж�
	temH += '<table width="659" border="0" cellpadding="0" cellspacing="0" class="armying_tab_border2" style="text-align:center; margin:10px 0 0  5px">'
	temH += '<tr>'
	temH += '			<td width="87" height="27" bgcolor="#221f1d" class="armying_tab_up2"><strong>���</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>�����ǳ�</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>Ŀ��ǳ�</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>�ж�</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>����ʱ��</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>ʣ��ʱ��</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>״̬</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>����</strong></td>'
	temH += '			<td width="95" bgcolor="#b5b2aa" class="armying_tab_up2">&nbsp;</td>'
	temH += '</tr>'
	//�ж��Ƿ�����������פ��
	var isallUN=true  
	for(i=0;i<A.length;i++){
		if(A[i].iStat!=3)isallUN=false
	}
	if(A.length==0 || isallUN==true){
		temH += '		<tr>'
		temH += '			<td height="30" class="armying_tab_up3" colspan="9">����</td>'
		temH += '		</tr>'
	}else{
		for(i=0;i<A.length;i++){
			//�ж��Ƿ����Լ�������ж�
			if(A[i].iUin==Uin && A[i].iStat!=3){
				var tmCityName=(A[i].iType==6) ? "�ݵ�" : (A[i].iType==2)?"�ػ��³�":A[i].szMarrowCityName;		
				temH += '		<tr>'
				temH += '			<td height="30" class="armying_tab_up3">'
				temH += '				<div id="arInfo_'+A[i].stCarmyWaterID+'" class="armying_tab_tipdiv border_hui" style="display:none">'
				temH += '				</div><span class="t_blue">�Լ�</span></td>'
				temH += '			<td class="armying_tab_up3">'+curCityIDToName(A[i].iLeaveCityID)+'</td>'
				temH += '			<td class="armying_tab_up3"><span title="����鿴�õ�" class="imghand" onclick="ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+A[i].iTarGrid+'))">'+tmCityName+'('+ToXY(A[i].iTarGrid)+')</span></td>'
				temH += '			<td class="armying_tab_up3">'+toArmyType(A[i].iType)+'</td>'
				temH += '			<td class="armying_tab_up3">'+formattimeNOW(A[i].ileaveTime+A[i].iMarchTime)+'</td>'
				//����ʱ����ʱ��
				var nowL = new Date();
				nowL.setTime(nowL);			
				temH += '			<td class="armying_tab_up3">'+formattime((A[i].ileaveTime+A[i].iMarchTime)-parseInt(nowL/1000)+parseInt(LocalTime))+'</td>'
				temH += '			<td class="armying_tab_up3">'+toFangXiang(A[i].iStat,0)+'</td>'
				//�ж��Ƿ���ʾ�ٻ�
				if(A[i].iStat==1){
					temH += '			<td class="armying_tab_up3"><a class="t_juhuang" href="javascript:void(0)" onclick="objFlashEng.Send(GetCancleArmy(\''+A[i].stCarmyWaterID+'\',0));curArmyIng=\''+A[i].stCarmyWaterID+'\'" title="����3����ֻ��ʹ�õ����ٻأ�3����������ٻ�">�ٻ�</a></td>'
				}else{
					temH += '<td class="armying_tab_up3">&nbsp;</td>'
				}
				temH += '			<td class="armying_tab_up3"><span onclick="SHI(\'arInfo_'+A[i].stCarmyWaterID+'\',this,\''+A[i].stCarmyWaterID+'\','+A[i].iLeaveCityID+')" class="t_juhuang imghand">�鿴����</span></td>'
				temH += '		</tr>'
			}else if(A[i].iUin!=Uin && A[i].iStat!=3){
				B.push(A[i])
			}
		}
	}
	//�����˷�����ж�
	temH += '	</table>'
	temH += '<table width="659" border="0" cellpadding="0" cellspacing="0" class="armying_tab_border2" style="text-align:center; margin:10px 0 0  5px">'
	temH += '<tr>'
	temH += '			<td width="87" height="27" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>�������</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>�����ǳ�</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>Ŀ��ǳ�</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>�ж�</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>����ʱ��</strong></td>'
	temH += '			<td width="87" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>ʣ��ʱ��</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong>״̬</strong></td>'
	temH += '			<td width="43" bgcolor="#b5b2aa" class="armying_tab_up2"><strong></strong></td>'
	temH += '			<td width="95" bgcolor="#b5b2aa" class="armying_tab_up2">&nbsp;</td>'
	if(B.length==0){
		temH += '		<tr>'
		temH += '			<td height="30" class="armying_tab_up3" colspan="9">����</td>'
		temH += '		</tr>'
	}else{
		for(i=0;i<B.length;i++){
			temH += '		<tr>'
			temH += '			<td height="30" class="armying_tab_up3">'
			temH += '				<div id="arInfo_'+B[i].stCarmyWaterID+'" class="armying_tab_tipdiv" style="display:none">'
			temH += '				</div><span class="t_blue">'+mailThisName(B[i].iUin,B[i].szMarPlayer)+'</span></td>'
			temH += '			<td title="����鿴�õ�" class="armying_tab_up3 imghand" onclick=ShowTab(\'citymap\',2);objFlashEng.Send(GetWorldMap('+B[i].iTarGrid+'))>'+B[i].szMarrowCityName+'('+ToXY(B[i].iTarGrid)+')</td>'
			temH += '			<td class="armying_tab_up3">'+curCityIDToName(B[i].iTargetCityID)+'</td>'
			temH += '			<td class="armying_tab_up3">'+toArmyType(B[i].iType)+'</td>'
			temH += '			<td class="armying_tab_up3">'+formattimeNOW(B[i].ileaveTime+B[i].iMarchTime)+'</td>'
			//����ʱ����ʱ��
			var nowL = new Date();
			nowL.setTime(nowL);			
			temH += '			<td class="armying_tab_up3">'+formattime((B[i].ileaveTime+B[i].iMarchTime)-parseInt(nowL/1000)+parseInt(LocalTime))+'</td>'
			temH += '			<td class="armying_tab_up3">'+toFangXiang(B[i].iStat,0)+'</td>'
			temH += '			<td class="armying_tab_up3">&nbsp;</td>'
			temH += '			<td class="armying_tab_up3"><span onclick="SHI(\'arInfo_'+B[i].stCarmyWaterID+'\',this,\''+B[i].stCarmyWaterID+'\','+B[i].iLeaveCityID+')" class="t_juhuang imghand">�鿴����</span></td>'
			temH += '		</tr>'
		}
	}
	temH += '	</table>'
	
	$("blist_list").innerHTML = temH
}
//����鿴����
function SHI(ob,ob2,wid,cid){
	if($(ob).style.display!="none"){
		$(ob).style.display="none"
		ob2.innerHTML="�鿴����"
	}else{
		objFlashEng.Send(GetArmyListInfo(wid,cid))
		$(ob).style.display="block"
		ob2.innerHTML="<span class='a_lv'>�������</span>"
	}
}
//1018�鿴��������
function ShowArmyListInfo(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")	{
		if(obj.CResult.iResultID ==1018001){
			msgbox("�޷��鿴�Է���������<br>Ҫ��߲鿴�Է����Ӹ��ʣ�������<span class='t_red'>��Ŀ</span>�Ƽ�")
		}else{
			msgbox("Error:"+obj.CResult.iResultID+"<br><b>��ȡ��������ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		}
		objFlashEng.Send(GetArmyList(1,CityID,1))
		return false
	}
	if(obj.CTMsgHead.llMsgAct!=1000){
		//�����б�ҳ��鿴����
		$("arInfo_"+obj.CAnsArmyInfo.CArmyInfo.stCarmyWaterID).innerHTML = formatArmyInfo(obj.CAnsArmyInfo.CArmyInfo)
	}else{
		//�㽫̨ҳ��鿴����
		ShowDJ_ArmyInfo(obj.CAnsArmyInfo.CArmyInfo)
	}
}


function formatHero(C){
	var temHero=""
	for(var m=0;m<C.stArmyHeroInfo.length;m++){
		temHero+= '<span  hint="<img src=\'\/images\/blank.gif\' width=\'90\' height=\'90\' class=\'border_hui imghand\' style=\'background:url(\/images\/hero\/hero_'+C.stArmyHeroInfo[m].iPicID+'.jpg)\' \/><br>'+C.stArmyHeroInfo[m].iHeroLv+'��<br>����:'+C.stArmyHeroInfo[m].iNearAttack+'<br>Զ��:'+C.stArmyHeroInfo[m].iFarAttack+'<br>����:'+C.stArmyHeroInfo[m].iNearFort+'<br>Զ��:'+C.stArmyHeroInfo[m].iFarFort+'<br>�ٶ�:'+C.stArmyHeroInfo[m].iHeroSleep+'<br>����:'+C.stArmyHeroInfo[m].iHeroLoad+'">'+C.stArmyHeroInfo[m].szName+'</span>'
	}
	temHero=(temHero=="")?"��":temHero
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
	temH += '			<td height="20">����</td>'
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
	//����Ӣ��
	temH += '						Ӣ�ۣ�'+formatHero(C)
	temH +="	����<img class=\"ico_wood\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+C.iArmyLoadWood;
	temH +="	<img class=\"ico_iron\" height=\"16\" width=\"19\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+C.iArmyLoadIron;
	temH +="	<img class=\"ico_stone\" height=\"16\" width=\"18\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+C.iArmyLoadStone;
	temH +="	<img class=\"ico_food\" height=\"16\" width=\"16\" src=\"images\/blank.gif\" align=\"absmiddle\" \/> "+C.iArmyLoadFood;
	temH += '		������ʳ���ģ�'+C.iFoodExpenHour+'</div>'
	return temH
}





//Ӣ�۵������ 1601
function ShowHeroList(str){	
	var objS=eval('('+str+')');
	if(typeof(objS.CResult) != "undefined")	{
		msgbox("Error:"+objS.CResult.iResultID+"<br><b>��ȡӢ���б�ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(objS.CResult.iResultID)+"!</span>")
	}
	listdivID=6;
	if(objS.CTMsgHead.llMsgAct==0)$("blist_newtitle").innerHTML = "�鿴Ӣ��";
	var temHtml = "";
	var arrH=objS.CAnsAllHeroTrea.astHtMsg;
	//act=-10Ϊ������ҳ�����
	if(objS.CTMsgHead.llMsgAct==0){
		for(i=0;i<arrH.length;i++){
			
			//����Ӣ��״̬
			var tmpStu="" //Ӣ��״̬str
			var tmpBtn="" //Ӣ�۰�ťstr
			var tmpPicStyle="" //Ӣ��ͼƬ�Ҷ�str
			switch(arrH[i].CUserHeroMsg.m_chStatus){
				case 0:
					tmpStu = "������"
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'objFlashEng.Send(GetUpGradeHero("+arrH[i].CUserHeroMsg.HeroID+"))\'>�� ��<\/div><br>";
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'ShowHeroHealth("+arrH[i].CUserHeroMsg.HeroID+","+arrH[i].CUserHeroMsg.iFoodType+")\'>��������<\/div><br>";
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"��ȷ��Ҫ���Ÿ�Ӣ����<br><span class=t_red>���ź󲻿����һأ�<br>���Ӣ��Я���˱������ж�±������Ҳ��һ����ʧ��</span>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>�� ��<\/div>";
					break
				case 1:
					tmpStu = "������"
					tmpBtn +="				<div class=\'btnGray\'>�� ��<\/div><br>";
					tmpBtn +="				<div class=\'btnGray\'>��������<\/div><br>";
					tmpBtn +="				<div class=\'btnGray\'>�� ��<\/div>";				
					break
				case 2:
					tmpStu = "������"
					tmpBtn +="				<div class=\'btnGray\'>������<\/div>";
					tmpPicStyle = "Filter:Gray"
					break
				case 3:
					tmpStu = "��Ѻ��"
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"��ȷ��ҪȰ����Ӣ����<br>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1605,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>Ȱ ��<\/div><br>";
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"��ȷ��Ҫ���Ÿ�Ӣ����<br><span class=t_red>���ź󲻿����һأ�</span>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>�� ��<\/div>";
					tmpPicStyle = "Filter:Gray"
					break
				case 4:
					tmpStu = "��Ѻ��"
					tmpBtn +="				<div class=\'btnGray\'>��Ѻ��<\/div>";
					tmpPicStyle = "Filter:Gray"
					break
				case 5:
					tmpStu = "���׷�����"
					tmpBtn +="				<div class=\'btnGray\'>���׷�����<\/div><div class='t_gray lineh17'>��������ʱ�䣺һ��2Сʱ<br>����4Сʱ<br>����6Сʱ</div>";
					tmpPicStyle = "Filter:Gray"
					break
				default :
					tmpStu = "��Ѻ��"
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"��ȷ��ҪȰ����Ӣ����<br>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1605,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>Ȱ ��<\/div><br>";
					tmpBtn +="				<div class=\'btnWhite\' onclick=\'msgboxyesno(\"��ȷ��Ҫ���Ÿ�Ӣ����<br><span class=t_red>���ź󲻿����һأ�</span>\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,"+arrH[i].CUserHeroMsg.HeroID+",0))\"\'>�� ��<\/div>";
					tmpPicStyle = "Filter:Gray"
					break
			}
			//��������
			var tmpTrea=""
			for(m=0;m<2;m++){
				if(typeof(arrH[i].astTreaMsg[m])=="object"){
					//��������Ч��
					var tmpEffect=""
					for(n=0;n<arrH[i].astTreaMsg[m].m_stPropertyArray.length;n++){
						tmpEffect += arrH[i].astTreaMsg[m].m_stPropertyArray[n].m_szName +":" +arrH[i].astTreaMsg[m].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
					}
					
					tmpTrea += "<div class=\'hero_taketrea_divbg\'><img class=\'imghand\' onclick=\'objFlashEng.Send(getTaskList(1603,"+arrH[i].CUserHeroMsg.HeroID+"))\' src=\'\/images\/hero\/trea_"+(arrH[i].astTreaMsg[m].iPicID)+".gif\' width=\'20\' height=\'20\' hint=\""+nameColor(arrH[i].astTreaMsg[m].chStar,arrH[i].astTreaMsg[m].szName)+" "+arrH[i].astTreaMsg[m].m_chRank+" ��<br><img src=\'\/images\/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_"+arrH[i].astTreaMsg[m].chStar+"\'><br><img src=\'\/images\/hero\/trea_"+(arrH[i].astTreaMsg[m].iPicID)+".jpg\' width=\'48\' height=\'48\' align=\'absmiddle\'><br>"+tmpEffect+"��Ҫ"+arrH[i].astTreaMsg[m].chNeedRank+"��"+arrH[i].astTreaMsg[m].chNeedStar+"������Ӣ��\" \/><\/div>"
				}else{
					tmpTrea += "<div title=\'�������װ��\' class=\'hero_taketrea_divbg imghand\' onclick=\'objFlashEng.Send(getTaskList(1603,"+arrH[i].CUserHeroMsg.HeroID+"))\'><\/div>"
				}
			}
			
			temHtml +="<div class=\'hero_one_div\'>";
			temHtml +="	<table width=\'646\' height=\'100\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\' style=\'text-align:center; margin:2px 0 0  5px\'>";
			temHtml +="		<tr>";
			temHtml +="			<td width=\'117\' rowspan=\'5\' align=\'center\'><img src=\'\/images\/blank.gif\' width=\'90\' height=\'90\' class=\'border_hui\' id='heroimg"+arrH[i].CUserHeroMsg.HeroID+"' style='background:url(\/images\/hero\/hero_"+arrH[i].CUserHeroMsg.m_iPicID+".jpg);"+tmpPicStyle+"' \/><\/td>";
			temHtml +="			<td width=\'178\' height=\'20\' align=\'left\'><span class='t_yellow'>"+arrH[i].CUserHeroMsg.m_szName+"</span> <img src=\'\/images\/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_"+arrH[i].CUserHeroMsg.chStar+"\'><\/td>";
			temHtml +="			<td width=\'144\' align=\'left\'>���ڳǳأ�<span class=\'t_green\'>"+curCityIDToName(arrH[i].CUserHeroMsg.m_iCurCity)+"<\/span><\/td>";
			temHtml +="			<td width=\'127\' align=\'left\'><span class=\'\'>������<\/span>"+arrH[i].CUserHeroMsg.m_iNearAttack+"<\/td>";
			temHtml +="			<td width=\'93\' rowspan=\'5\' valign=\'middle\'>";
			temHtml += 		tmpBtn+"			<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="		<tr>";
			temHtml +="			<td height=\'20\' align=\'left\'>"+arrH[i].CUserHeroMsg.m_chRank+"�� ���飺"+arrH[i].CUserHeroMsg.m_iCurExprience+"\/"+arrH[i].CUserHeroMsg.iNeedEprience+"<\/td>";
			temHtml +="			<td width=\'144\' align=\'left\'><span class=\'\'>������<\/span>"+arrH[i].CUserHeroMsg.m_iCurStrength+"<\/td>";
			temHtml +="			<td width=\'127\' align=\'left\'><span class=\'\'>������<\/span>"+arrH[i].CUserHeroMsg.m_iNearFort+"<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="		<tr>";
			temHtml +="			<td height=\'20\' align=\'left\'><div class=\'hero_exp_bg\'><img class=\'hero_exp\' src=\'\/images\/blank.gif\' width=\'";
			temHtml +=		(arrH[i].CUserHeroMsg.m_iCurExprience<arrH[i].CUserHeroMsg.iNeedEprience)?parseInt(arrH[i].CUserHeroMsg.m_iCurExprience/arrH[i].CUserHeroMsg.iNeedEprience*114):114;
			temHtml +="			\' \/><\/div><\/td><td width=\'144\' align=\'left\'><span class=\'\'>���������ģ�<\/span>"+arrH[i].CUserHeroMsg.m_iStrengthCost+"\/��<\/td>";
			temHtml +="			<td width=\'127\' align=\'left\'><span class=\'\'>Զ����<\/span>"+arrH[i].CUserHeroMsg.m_iFarAttack+"<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="		<tr>";
			var gift=["","ƽӹ","��ͨ","����","����","����"]
			temHtml +="			<td height=\'20\' align=\'left\'>״̬��<span class=\'t_yellow\'>"+tmpStu+"<\/span> �츳��<span class=\'t_yellow\'>"+gift[arrH[i].CUserHeroMsg.m_iGiftClass]+"<\/span><\/td>";
			temHtml +="			<td width=\'144\' align=\'left\'><span class=\'\'>���������<\/span>"
			temHtml +=  (arrH[i].CUserHeroMsg.iFoodType==14)?"�ͼ�����ҩ":"�߼�����ҩ";
			temHtml +="			<\/td><td width=\'127\' align=\'left\'><span class=\'\'>Զ����<\/span>"+arrH[i].CUserHeroMsg.m_iFarFort+"<\/td>";
			temHtml +="		<\/tr>";
			temHtml +="		<tr>";
			temHtml +="			<td height=\'20\' align=\'left\'>"+tmpTrea+"<\/td>";
			temHtml +="			<td width=\'144\' align=\'left\'><span class=\'\'>��������<\/span>"+arrH[i].CUserHeroMsg.m_iAffordCount+"<\/td>";
			temHtml +="			<td width=\'127\' align=\'left\'><span class=\'\'>�ٶȣ�<\/span>"+arrH[i].CUserHeroMsg.m_iMoveSpeed+"<\/td>";
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
//ת��cityid������
function curCityIDToName(inid){
	var tr="";
	inid = parseInt(inid);
	if(allCityName.length>0){
		for(var m in allCityName){
			if(allCityName[m].iCityID ==inid)tr = allCityName[m].szCityName;
		}
	}
	if(tr=="")tr="���ڳ���"
	return tr;
}





/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ�����ϳɣ����ﾫ����װ���ϳɽ���
**    ʾ����   
**    ==================================================================================================  
*/ 

//��ʼ��DIV
function ShowTreaList(m,total){	
	listdivID=7;
	$("blist_newtitle").innerHTML = "����װ��";

	var inHtm="";
	inHtm+='<div id="treasure">';
	inHtm+='<div id="treamain">';
	inHtm+='	<div id="trealeft">';
	inHtm+='		<div id="trea_a_main">';
	inHtm+='			<div id="trea_a_lefttxt">�������ϳɱ�����Խ�������������Ե��ӡ�<br>����������������Խ����ϳɵ��������ϣ��ϳɺ�ı�����಻����4�����ԣ��������ԭʼ���Բ��ܺϳɵ�Ӱ�졣<br>���������ݱ���ļ���ͬ��Ҫ���ĺϳ�ʯ��ϳ���ʯ��</div>';
	inHtm+='			<div id="trea_a_bg">';
	inHtm+='				<img id="trea_a_pic1" src="/images/blank.gif" width="50" height="50" onclick="toMixClear(1)" class="imghand">';
	inHtm+='				<img id="trea_a_pic2" src="/images/blank.gif" width="50" height="50" onclick="toMixClear(2)" class="imghand">';
	inHtm+='				<img id="trea_a_pic3" src="/images/blank.gif" width="50" height="50">';
	inHtm+='				<img id="trea_a_picbtn" src="/images/blank.gif" width="50" height="50" class="imghand" onclick="submitConpose()">';
	inHtm+='				<div>�ϳ�ʯ��<span id="trea_item18">0</span>&nbsp;&nbsp;�ϳ���ʯ��<span id="trea_item19">0</span></div>';
	inHtm+='			</div>';
	inHtm+='		</div>';
	inHtm+='		<div id="trea_b_main" style="display:none">';
	inHtm+='			<div id="trea_b_lefttxt">����������������Լ�ǿ��������ԣ���Ҳ��һ�������𻵱����������ֻ��ǿ����������ԣ���<br>���������ݱ���ļ���ͬ��Ҫ���ľ���ʯ������ʯ��</div>';
	inHtm+='			<div id="trea_b_bg">';
	inHtm+='				<img id="trea_b_pic1" src="/images/blank.gif" width="50" height="50" onclick="toRefineClear()" class="imghand">';
	inHtm+='				<img id="trea_b_pic2" src="/images/blank.gif" width="50" height="50">';
	inHtm+='				<img id="trea_b_picbtn" src="/images/blank.gif" width="50" height="50" class="imghand" onclick="submitRefine()">';
	inHtm+='				<div>����ʯ��<span id="trea_item16">0</span>&nbsp;&nbsp;������ʯ��<span id="trea_item17">0</span></div>';
	inHtm+='			</div>';
	inHtm+='		</div>';
	inHtm+='	</div>'
		
	inHtm+='	<div id="trearight">';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_5 floatleft"><div id="trearight_count">����ֿ�������<span id="trea_curitem">0</span>/<span id="trea_allitem">0</span></div>';
	inHtm+='		<div id="trea_class5" class="trea_class">��</div>';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_4">';
	inHtm+='		<div id="trea_class4" class="trea_class">��</div>';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_3">';
	inHtm+='		<div id="trea_class3" class="trea_class">��</div>';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_2">';
	inHtm+='		<div id="trea_class2" class="trea_class">��</div>';
	inHtm+='		<img src="/images/blank.gif" width="63" height="13" align="absmiddle" class="hero_star_1">';
	inHtm+='		<div id="trea_class1" class="trea_class">��</div>';
	inHtm+='		<span class="t_juhuang">�ݲ��ܲ����ı��<span class="a_lv" hint="�����ͬ�Ǽ��ı��������ʹ��ʱ�䲻ͬ��<br><span class=t_red>һ��</span>���ｫ�ڽ��׳ɹ���<span class=t_red>2Сʱ</span>��������Ĳֿ��У�<br><span class=t_red>����</span>���ｫ�ڽ��׳ɹ���<span class=t_red>4Сʱ</span>��������Ĳֿ��У�<br><span class=t_red>����</span>���ϱ��ｫ�ڽ��׳ɹ���<span class=t_red>6Сʱ</span>��������Ĳֿ���">���ڽ��׷���</span>��</span>';
	inHtm+='		<div id="trea_class6" class="trea_class">��</div>';
	inHtm+='	</div>';
	inHtm+='</div>	'
	
	inHtm+='<div id="armormain" style="text-align:center; display:none">';
	inHtm+='	<div id="armor_toplist"><ul>';
	inHtm+='		<li><img src="../images/icon/cl1.gif" align="absmiddle" hint="��" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl2.gif" align="absmiddle" hint="ϸ��"  /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl3.gif" align="absmiddle" hint="��Ƥ" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl4.gif" align="absmiddle" hint="��Ƥ" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl5.gif" align="absmiddle" hint="��Ƥ" /> <span>0</span></li>'
	inHtm+='		<br /><br />';
	inHtm+='		<li><img src="../images/icon/cl6.gif" align="absmiddle" hint="��Ƥ" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl7.gif" align="absmiddle" hint="��ͭ��Ƭ" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl8.gif" align="absmiddle" hint="������Ƭ" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl9.gif" align="absmiddle" hint="�ƽ���Ƭ" /> <span>0</span></li>'
	inHtm+='		<li><img src="../images/icon/cl10.gif" align="absmiddle" hint="ʥʯ" /> <span>0</span></li></ul>';
	inHtm+='	</div><div>';
	inHtm+='		<div class="armorlist">';
	inHtm+='			<div class="armorlist_title">��ͭ�� <span class="t_gray">�����ݱ������䳵���������ػĲ���ʹ�ã�</span></div>';
	inHtm+='			<div class="armorlist_main">';
	inHtm+='				<div class="armorlist_picleft"><img src="../images/trea_03_armor1.gif" /></div>';
	inHtm+='				<div class="armorlist_right">';
	inHtm+='					<div class="armorlist_info"></div>';
	inHtm+='					<div class="armorlist_icon">';
	inHtm+='						<img src="/images/icon/cl7.gif" align="absmiddle" style="margin-left:10px;" /> ��ͭ��Ƭ:1 '
	inHtm+='						<img src="/images/icon/cl3.gif" align="absmiddle" style="margin-left:10px;" /> ��Ƥ:1'
	inHtm+='						<br /><br />';
	inHtm+='						<img src="/images/icon/cl1.gif" align="absmiddle" style="margin-left:10px;" /> ��:1 '
	inHtm+='						<img src="/images/mail_goldicon.gif" align="absmiddle" style="margin-left:10px;" /> ���:1 '
	inHtm+='						</div>';
	inHtm+='				</div>';
	inHtm+='			</div>';
	inHtm+='			<img src="/images/army_tabline.gif" width="320" height="9" style="filter:alpha(Opacity=30);" />';
	inHtm+='			<div class="armorlist_bot">';
	inHtm+='				<div class="armorlist_bot_left">����������<span id="armor_count0">'+Outfit[0]+'</span></div>';
	inHtm+='				<div class="armorlist_bot_right">';
	inHtm+='					<div class="btFrontLeft armorlist_bot_right_input"><input id="armor_out0" type="text" class="inputboxhui" value="0"  style="width:40px;"/>/<a class="a_deepred" id="armor_max0" href="javascript:void(0)" onclick=\'$("armor_out0").value=this.innerHTML\'></a></div>';
	inHtm+='					<div class="btnWhite btFrontRight" style="margin:3px;" onclick="submitOutfit(0)">�ϳ�</div>';
	inHtm+='				</div>';
	inHtm+='			</div>'			
	inHtm+='		</div>'
			
	inHtm+='		<div class="armorlist">';
	inHtm+='			<div class="armorlist_title">������ <span class="t_gray">��ǹ�ܱ���ǿ�������ǹ����������ʹ�ã�</span></div>';
	inHtm+='			<div class="armorlist_main">';
	inHtm+='				<div class="armorlist_picleft"><img src="../images/trea_03_armor2.gif" /></div>';
	inHtm+='				<div class="armorlist_right">';
	inHtm+='					<div class="armorlist_info"></div>';
	inHtm+='					<div class="armorlist_icon">';
	inHtm+='						<img src="/images/icon/cl8.gif" align="absmiddle" style="margin-left:10px;" /> ������Ƭ:1 '
	inHtm+='						<img src="/images/icon/cl4.gif" align="absmiddle" style="margin-left:10px;" /> ��Ƥ:1'
	inHtm+='						<br /><br />';
	inHtm+='						<img src="/images/icon/cl1.gif" align="absmiddle" style="margin-left:10px;" /> ��:2'
	inHtm+='						<img src="/images/mail_goldicon.gif" align="absmiddle" style="margin-left:10px;" /> ���:5 '
	inHtm+='						</div>';
	inHtm+='				</div>';
	inHtm+='			</div>';
	inHtm+='			<img src="/images/army_tabline.gif" width="320" height="9" style="filter:alpha(Opacity=30);" />';
	inHtm+='			<div class="armorlist_bot">';
	inHtm+='				<div class="armorlist_bot_left">����������<span id="armor_count1">'+Outfit[1]+'</span></div>';
	inHtm+='				<div class="armorlist_bot_right">';
	inHtm+='					<div class="btFrontLeft armorlist_bot_right_input"><input id="armor_out1" type="text" class="inputboxhui" value="0"  style="width:40px;"/>/<a class="a_deepred" id="armor_max1" href="javascript:void(0)" onclick=\'$("armor_out1").value=this.innerHTML\'></a></div>';
	inHtm+='					<div class="btnWhite btFrontRight" style="margin:3px;" onclick="submitOutfit(1)">�ϳ�</div>';
	inHtm+='				</div>';
	inHtm+='			</div>'
	inHtm+='		</div>'
			
			
			
	inHtm+='		<div class="armorlist">';
	inHtm+='			<div class="armorlist_title">�ƽ�� <span class="t_gray">����ǹս��������ս��ʹ�ã�</span></div>';
	inHtm+='			<div class="armorlist_main">';
	inHtm+='				<div class="armorlist_picleft"><img src="../images/trea_03_armor3.gif" /></div>';
	inHtm+='				<div class="armorlist_right">';
	inHtm+='					<div class="armorlist_info"></div>';
	inHtm+='					<div class="armorlist_icon">';
	inHtm+='						<img src="/images/icon/cl9.gif" align="absmiddle" style="margin-left:10px;" /> �ƽ���Ƭ:1'
	inHtm+='						<img src="/images/icon/cl5.gif" align="absmiddle" style="margin-left:10px;" /> ��Ƥ:1 '
	inHtm+='						<br /><br />';
	inHtm+='						<img src="/images/icon/cl2.gif" align="absmiddle" style="margin-left:10px;" /> ϸ��:1  '
	inHtm+='						<img src="/images/mail_goldicon.gif" align="absmiddle" style="margin-left:10px;" /> ���:30 '
	inHtm+='						</div>';
	inHtm+='				</div>';
	inHtm+='			</div>';
	inHtm+='			<img src="/images/army_tabline.gif" width="320" height="9" style="filter:alpha(Opacity=30);" />';
	inHtm+='			<div class="armorlist_bot">';
	inHtm+='				<div class="armorlist_bot_left">����������<span id="armor_count2">'+Outfit[2]+'</span></div>';
	inHtm+='				<div class="armorlist_bot_right">';
	inHtm+='					<div class="btFrontLeft armorlist_bot_right_input"><input id="armor_out2" type="text" class="inputboxhui" value="0"  style="width:40px;"/>/<a class="a_deepred"  id="armor_max2" href="javascript:void(0)" onclick=\'$("armor_out2").value=this.innerHTML\'></a></div>';
	inHtm+='					<div class="btnWhite btFrontRight" style="margin:3px;" onclick="submitOutfit(2)">�ϳ�</div>';
	inHtm+='				</div>';
	inHtm+='			</div>'
	inHtm+='		</div>'
			
			
			
	inHtm+='		<div class="armorlist">';
	inHtm+='			<div class="armorlist_title">ʥ�� <span class="t_gray">���ؼ׽���ʹ�ã�</span></div>';
	inHtm+='			<div class="armorlist_main">';
	inHtm+='				<div class="armorlist_picleft"><img src="../images/trea_03_armor4.gif" /></div>';
	inHtm+='				<div class="armorlist_right">';
	inHtm+='					<div class="armorlist_info"></div>';
	inHtm+='					<div class="armorlist_icon">';
	inHtm+='						<img src="/images/icon/cl10.gif" align="absmiddle" style="margin-left:10px;" /> ʥʯ:1'
	inHtm+='						<img src="/images/icon/cl6.gif" align="absmiddle" style="margin-left:10px;" /> ��Ƥ:1'
	inHtm+='						<br /><br />';
	inHtm+='						<img src="/images/icon/cl2.gif" align="absmiddle" style="margin-left:10px;" /> ϸ��:2 '
	inHtm+='						<img src="/images/mail_goldicon.gif" align="absmiddle" style="margin-left:10px;" /> ���:150 '
	inHtm+='						</div>';
	inHtm+='				</div>';
	inHtm+='			</div>';
	inHtm+='			<img src="/images/army_tabline.gif" width="320" height="9" style="filter:alpha(Opacity=30);" />';
	inHtm+='			<div class="armorlist_bot">';
	inHtm+='				<div class="armorlist_bot_left">����������<span id="armor_count3">'+Outfit[3]+'</span></div>';
	inHtm+='				<div class="armorlist_bot_right">';
	inHtm+='					<div class="btFrontLeft armorlist_bot_right_input"><input id="armor_out3" type="text" class="inputboxhui" value="0"  style="width:40px;"/>/<a class="a_deepred" id="armor_max3" href="javascript:void(0)" onclick=\'$("armor_out3").value=this.innerHTML\'></a></div>';
	inHtm+='					<div class="btnWhite btFrontRight" style="margin:3px;" onclick="submitOutfit(3)">�ϳ�</div>';
	inHtm+='				</div>';
	inHtm+='			</div>'
	inHtm+='		</div>';
	inHtm+='	</div>';
	inHtm+='</div>'
	
	inHtm+='<div id="treatoptab">';
	inHtm+='	<div class="index_y2_tabstyle" id="treatab1" onclick="treaTab(1)">�ϳɱ���</div>';
	inHtm+='	<div class="index_y2_notabstyle" id="treatab2" onclick="treaTab(2)">��������</div>';
	inHtm+='	<div class="index_y2_notabstyle" id="treatab3" onclick="treaTab(3)">�ϳ�װ��</div>';
	inHtm+='</div>';
	inHtm+='</div>'
	
	/*inHtm ='<iframe id="l_content_frame" width="691" height="436" scrolling="auto" frameborder="0" allowtransparency="ture" src="mainhtml/treasure.html"></iframe>';*/
	
	//���б���Э�鷵������
	gTrea.m = m 
	//�ж��Ƿ�����ѷ��뱦��
	if(gTrea.isReturn==0){
		$("blist_list").innerHTML = inHtm;
		
	
		//���ݵ�ǰ��tab״������tab
		treaTab(gTrea.tab)		
		
		
		//��ʾ��
		addZindex();
	}else{
		//�����return�ͱ���
		treaTab(gTrea.tab,1)	
	}
	//��ձ��
	gTrea.isReturn=0
	//���ºϳ�ʯ���ϳ���ʯ��ʼ��,����ʯ����ʯ
	updataItemNum()
	//��ʾ�ֿ�����
	var len=m.length
	for(i=0;i<m.length;i++){
		if(m[i].m_chStatus==1 || m[i].m_chStatus==2 || m[i].m_chStatus==3 || m[i].m_chStatus==4)len--;
	}
	$("trea_curitem").innerHTML = len;
	$("trea_allitem").innerHTML = total; //�ֿ���
}

function updataItemNum(){	
	//�ϳ�ʯ���ϳ���ʯ��ʼ��,����ʯ����ʯ��ʼ��
	$("trea_item16").innerHTML=getItemCount(37);
	$("trea_item17").innerHTML=getItemCount(38);
	$("trea_item18").innerHTML=getItemCount(39);
	$("trea_item19").innerHTML=getItemCount(40);	
}
//ת���ɱ���div
function toTreaInfo(num,m,type){
	var tmpCT=""
	//����m_chStatus���壺0���� 1��� 2������  3��ʱ���� 4�����ʹ�
	
	//�������ܲ����ı���״̬
	if(num==6){
		for(i=0;i<m.length;i++){
			if(m[i].m_chStatus==1 || m[i].m_chStatus==2 || m[i].m_chStatus==3 || m[i].m_chStatus==4){
				//��������Ч��
				var tmpEffect=""
				for(n=0;n<m[i].m_stPropertyArray.length;n++){
					tmpEffect += m[i].m_stPropertyArray[n].m_szName +":" +m[i].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
				}
				var  arrd=["","�����","������","��ʱ����","�����ʹ���"]
				tmpCT += '<div class="trea_list_div">'
				tmpCT += '<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'"/>'
				tmpCT +='<div class="floatleft lineh17">'
				tmpCT +=nameColor(m[i].chStar,m[i].szName)+' '+m[i].m_chRank+'��<br />'
				tmpCT +='��Ҫ'+m[i].chNeedRank+'��'+m[i].chNeedStar+'������Ӣ��<br />'
				if( m[i].m_chStatus==3 ){
					tmpCT +='<span class="t_gray">��ʱ����</span> <span class="t_green imghand"  onclick="objFlashEng.Send(GetActHeroTrea(1605,'+m[i].m_iTreaID+',1))">����</span></div>'
				}else{
					tmpCT +='<span class="t_gray">'+arrd[m[i].m_chStatus]+'</span></div>'
				}
				tmpCT +='</div>'
			}
		}
	}else{
	//���������ı���״̬
		for(i=0;i<m.length;i++){
			if(m[i].m_chStatus==0&&m[i].chStar==num){
				//��������Ч��
				var tmpEffect=""
				for(n=0;n<m[i].m_stPropertyArray.length;n++){
					tmpEffect += m[i].m_stPropertyArray[n].m_szName +":" +m[i].m_stPropertyArray[n].m_iValue/10 +"%<br>"	
				}
				//�ж���ʾ���ϳɡ����ǡ�������
				var tmpfunstr = (type==0)?"toMix":"toRefine";
				var tmpchrstr = (type==0)?"�ϳ�":"����";
				tmpCT += '<div class="trea_list_div">'
				if(type==0){
					tmpCT += '<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui imghand" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'" onclick="'+tmpfunstr+'('+m[i].m_iTreaID+','+m[i].iPicID+','+m[i].iConposeNeedItem+','+m[i].iComposeNeed+')"/>'
				}else{
					tmpCT += '<img src="/images/hero/trea_'+m[i].iPicID+'.jpg" class="floatleft border_hui imghand" hint="<img src=\'/images/blank.gif\' width=\'63\' height=\'13\' align=\'absmiddle\' class=\'hero_star_'+m[i].chStar+'\'><br>'+tmpEffect+'" onclick="'+tmpfunstr+'('+m[i].m_iTreaID+','+m[i].iPicID+','+m[i].iRefineNeedItem+','+m[i].iRefineNeed+')"/>'
				}
				tmpCT +='<div class="floatleft lineh17">'
				tmpCT +=nameColor(m[i].chStar,m[i].szName)+' '+m[i].m_chRank+'��<br />'
				tmpCT +='��Ҫ'+m[i].chNeedRank+'��'+m[i].chNeedStar+'������Ӣ��<br />'
				if(type==0){
					tmpCT +='<span class="t_green imghand" onclick="'+tmpfunstr+'('+m[i].m_iTreaID+','+m[i].iPicID+','+m[i].iConposeNeedItem+','+m[i].iComposeNeed+')">'+tmpchrstr+'</span>		<span class="t_green imghand"  onclick=\'msgboxyesno(\"��ȷ��Ҫ<span class=t_red>����</span>�ñ�����\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,'+m[i].m_iTreaID+',1))\"\'>����</span></div>'
				}else{
					tmpCT +='<span class="t_green imghand" onclick="'+tmpfunstr+'('+m[i].m_iTreaID+','+m[i].iPicID+','+m[i].iRefineNeedItem+','+m[i].iRefineNeed+')">'+tmpchrstr+'</span>		<span class="t_green imghand"  onclick=\'msgboxyesno(\"��ȷ��Ҫ<span class=t_red>����</span>�ñ�����\");msgboxFunc = \"objFlashEng.Send(GetActHeroTrea(1606,'+m[i].m_iTreaID+',1))\"\'>����</span></div>'					
				}			
				tmpCT +='</div>'
			}
		}
	}
	if(tmpCT=="")tmpCT="��";
	return tmpCT;
}

//���屦���࣬�洢�м����
function TreaM(){
	this.mixAID = 0
	this.mixBID = 0
	this.mixNeedItem = 0
	this.refineID = 0
	this.refineNeedItem = 0
	this.m = new Object() //���Э�鷵����ʱ��������
	//��ǰ�򿪵�tab
	this.tab = 1;
	//��ǰ�Ƿ��Ǻϳɻ�������
	this.isReturn = 0;
}
var gTrea = new TreaM();
//Ч��IDת����ID
function toItemID(n){
	if(n==16)return 37
	if(n==17)return 38
	if(n==18)return 39
	if(n==19)return 40
}
//����ϳ�
function toMix(m,p,i,c){
	//iConposeNeedItem 16����ʯ37 17��ʯ38 18�ϳ�ʯ39 19�ϳ���ʯ40
	if(gTrea.mixAID==0){
		if(gTrea.mixAID==m || gTrea.mixBID==m){
			msgbox("�ñ����ѷ���ϳ�����")
		}else{
			$("trea_a_pic1").src="/images/hero/trea_"+p+".jpg"
			$("trea_a_pic1").hint="���ж��"
			gTrea.mixAID=m
			gTrea.mixNeedItem = toItemID(i)
			//�ϳ�ʯͷͼƬ
			$("trea_a_pic3").src="images/item/item"+gTrea.mixNeedItem+".gif"
			var nameofstone = (gTrea.mixNeedItem==39)?"�ϳ�ʯ":"�ϳ���ʯ"
			$("trea_a_pic3").hint="��Ҫ"+c+"�� "+nameofstone
		}
	}else if(gTrea.mixAID!=0 && gTrea.mixBID==0){
		if(gTrea.mixAID==m || gTrea.mixBID==m){
			msgbox("�ñ����ѷ���ϳ�����")
		}else{
			$("trea_a_pic2").src="/images/hero/trea_"+p+".jpg"
			$("trea_a_pic2").hint="���ж��"
			gTrea.mixBID=m
		}
	}else if(gTrea.mixAID!=0 && gTrea.mixBID!=0){
		msgbox("�Ѿ���������������ȵ��ж��һ������")
	}
}
//������кϳ�ѡ����Ʒ
function toMixClear(m){
	if(m==1){
		$("trea_a_pic1").src="/images/blank.gif"
		$("trea_a_pic1").hint=""
		gTrea.mixAID=0
		gTrea.mixNeedItem = 0
		//�ϳ�ʯͷͼƬ
		$("trea_a_pic3").src="/images/blank.gif"
		$("trea_a_pic3").hint=""
	}else if(m==2){
		$("trea_a_pic2").src="/images/blank.gif"
		$("trea_a_pic2").hint=""
		gTrea.mixBID=0
	}
}
//�ύ�ϳ�
function submitConpose(){
	if(	gTrea.mixAID==0 ||	gTrea.mixBID==0){
		msgbox("��ѡ�����ֱ�����кϳɣ�")	
	}else{
		objFlashEng.Send(GetTreaConpose(gTrea.mixAID,gTrea.mixBID,gTrea.mixNeedItem))
	}
}
//1611�ϳɱ��ﷵ�ص���ʾ��Ϣ
function ShowTreaConpose(str)
{
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		
		//toMixClear(1)
		toMixClear(2)
		gTrea.isReturn=1
		//��ȡ������Ϣ
		objFlashEng.Send(GetUserItems());
		//��ȡ���±���
		objFlashEng.Send(getTaskList(1603))		
		
		return false;
	}
	else
	{//
		//toMixClear(1)
		toMixClear(2)
		gTrea.isReturn=1
		//��ʾ�ϳ�ǰ��ϳɺ�ı�������Conpose
		var oldt=EffectOfTrea(obj.CAnsComposeTrea.stOldPtArray)
		var newt=EffectOfTrea(obj.CAnsComposeTrea.stNewPtArray)
		var msg="�ϳɱ�����ϣ�<br>"
		msg+='<div style="line-height:15px;"><span class="t_juhuang">�����ԣ�</span>'+oldt
		msg+='<br><span class="t_juhuang">�����ԣ�</span>'+newt
		msg+='</div>'
		
		msgbox(msg)
		//��ȡ������Ϣ
		objFlashEng.Send(GetUserItems());
		//��ȡ���±���
		objFlashEng.Send(getTaskList(1603))		
	}
}

//��������Ч������
function EffectOfTrea(a){
	var tmpEffect=""
	for(var n=0;n<a.length;n++){
		tmpEffect += a[n].m_szName +":" +a[n].m_iValue/10 +"% "	
	}
	return tmpEffect
}


//����
function toRefine(m,p,i,c){
	$("trea_b_pic1").src="/images/hero/trea_"+p+".jpg"
	$("trea_b_pic1").hint="���ж��"
	gTrea.refineID=m
	
	gTrea.refineNeedItem = toItemID(i)
	var nameofstone = (gTrea.refineNeedItem==37)?"����ʯ":"������ʯ"
	$("trea_b_pic2").hint="��Ҫ"+c+"�� "+nameofstone
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
//�ύ�ϳ�
function submitRefine(){
	if(gTrea.refineID==0){
		msgbox("��ѡ������о�����")	
	}else{
		objFlashEng.Send(GetTreaRefine(gTrea.refineID,gTrea.refineNeedItem))
	}
}
//1610�������ﷵ�ص���ʾ��Ϣ
function ShowTreaRefine(str)
{
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		
		
		//toRefineClear()
		gTrea.isReturn=1
		//��ȡ������Ϣ
		objFlashEng.Send(GetUserItems());
		//��ȡ���±���
		objFlashEng.Send(getTaskList(1603))	
		return false;
	}
	else
	{
		
		//��ʾ�ϳ�ǰ��ϳɺ�ı�������
		var oldt=EffectOfTrea(obj.CAnsUpGradeTrea.stOldPtArray)
		var newt=EffectOfTrea(obj.CAnsUpGradeTrea.stNewPtArray)
		var msg="��������ɹ���<br>"
		msg+='<div style="line-height:15px;"><span class="t_juhuang">�����ԣ�</span>'+oldt
		msg+='<br><span class="t_juhuang">�����ԣ�</span>'+newt
		msg+='</div>'
		msgbox(msg)
		
		//toRefineClear()
		gTrea.isReturn=1
		//��ȡ������Ϣ
		objFlashEng.Send(GetUserItems());
		//��ȡ���±���
		objFlashEng.Send(getTaskList(1603))		
	}
}


//�л�����tab���ϳ� ���� װ��
function treaTab(n,act){
	if(n==1){
		SH("treamain")
			SH("trea_a_main")
			HI("trea_b_main")
		HI("armormain")
		//�����Ҳ౦��list
		for(var i=1;i<7;i++){
			eval("$(\"trea_class"+i+"\").innerHTML=toTreaInfo("+i+",gTrea.m,0)")
		}		
		//��ǰ��tab1
		gTrea.tab=1
		$("treatab1").className = "index_y2_tabstyle"
		$("treatab2").className = "index_y2_notabstyle"
		$("treatab3").className = "index_y2_notabstyle"
	}else if(n==2){
		SH("treamain")
			HI("trea_a_main")
			SH("trea_b_main")
		HI("armormain")
		//�����Ҳ౦��list		
		for(var i=1;i<7;i++){
			eval("$(\"trea_class"+i+"\").innerHTML=toTreaInfo("+i+",gTrea.m,1)")
		}		
		//��ǰ��tab2
		gTrea.tab=2
		$("treatab1").className = "index_y2_notabstyle"
		$("treatab2").className = "index_y2_tabstyle"
		$("treatab3").className = "index_y2_notabstyle"	
	}else if(n==3){
		//��ȡ��������
		objFlashEng.Send(getTaskList(1613))		
		
		HI("treamain")
			HI("trea_a_main")
			HI("trea_b_main")
		SH("armormain")
		//��ǰ��tab3
		gTrea.tab=3
		$("treatab1").className = "index_y2_notabstyle"
		$("treatab2").className = "index_y2_notabstyle"
		$("treatab3").className = "index_y2_tabstyle"	
	}
	//������ǵ�����һ�ν��룬�����ԭ���ѷ��ϵı���
	//��һ�ν��룬�л�tab�����
	if(typeof(act)=="undefined"){
		//�ϳ�
		toMixClear(1)
		toMixClear(2)
		//����
		toRefineClear()
	}
}

function submitOutfit(n){
	eval("var c = $(\"armor_out"+n+"\").value")
	if(isPlusNumber(c))
		objFlashEng.Send(getMakeOutfit(n+1,c))
	else
		msgbox("������������������")
}
//��ȡ����1613
function ShowGetOutfit(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>��ȡ����ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		return false;
	}
	//��ȡ����ҳ��Ԫ��
	if(obj.CTMsgHead.llMsgAct == 0 ){
		//���Ϻϳ�ҳ������
		updataMateril(obj.CAnsGetUserMaterial.m_stMaterilArry)
	}else if(obj.CTMsgHead.llMsgAct == -10 ){
		//������ҳ������
		document.frames["marketdiv"].ShowMarketMateril(obj.CAnsGetUserMaterial.m_stMaterilArry)		
	}
}

function ShowMakeOutfit(str){
	var obj=eval('('+str+')');
	if(typeof(obj.CResult) != "undefined")
	{
		msgbox("Error:"+obj.CResult.iResultID+"<br><b>�ϳ�װ��ʧ�ܣ�</b><span class='t_tips_yellow'>"+errMsg(obj.CResult.iResultID)+"!</span>")
		return false;
	}
	//����ҳ�������ʾ
	updataMateril(obj.CAnsComposeOutFit.m_stMaterilArry)
	
	Outfit= obj.CAnsComposeOutFit.m_astOutFit
	
	for(var i=0;i<4;i++){
		//����ҳ��װ������	
		eval("$('armor_count"+i+"').innerHTML=Outfit["+i+"]")
		//��������
		eval("$('armor_out"+i+"').value=0")
	}
	msgbox("�ϳ�װ���ɹ���")	
	$('init_iGlod').innerHTML = obj.CAnsComposeOutFit.m_iLeftGold;
	
}

//����ҳ�������ʾ
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
	//�������ϳ�
	for(var i=0;i<4;i++){
		eval("$(\"armor_max"+i+"\").innerHTML=CountMatrialMax("+i+")")
	}		
}

//���㵱ǰ��Դ�������װ����Ŀ
function CountMatrialMax(n){
  	var m = $("armor_toplist").getElementsByTagName("span");
	var newArr=[]
	var needgoldArr=[1,5,30,150]
	switch(n){
		case 0:
			newArr.push(m[0].innerHTML) //100
			newArr.push(m[2].innerHTML) //200
			newArr.push(m[6].innerHTML) //300
			newArr.push(Math.floor($("init_iGlod").innerHTML/needgoldArr[0])) //������
			newArr.sort(function(a,b){return a-b});
			break;
		case 1:
			newArr.push(Math.floor(m[0].innerHTML/2)) //100*2
			newArr.push(m[3].innerHTML) //201
			newArr.push(m[7].innerHTML) //301
			newArr.push(Math.floor($("init_iGlod").innerHTML/needgoldArr[1])) //������
			newArr.sort(function(a,b){return a-b});
			break;
		case 2:
			newArr.push(m[1].innerHTML) //101
			newArr.push(m[4].innerHTML) //202
			newArr.push(m[8].innerHTML) //302
			newArr.push(Math.floor($("init_iGlod").innerHTML/needgoldArr[2])) //������
			newArr.sort(function(a,b){return a-b});
			break;
		case 3:
			newArr.push(Math.floor(m[1].innerHTML/2)) //101*2
			newArr.push(m[5].innerHTML) //203
			newArr.push(m[9].innerHTML) //303
			newArr.push(Math.floor($("init_iGlod").innerHTML/needgoldArr[3])) //������
			newArr.sort(function(a,b){return a-b});
			break;		
	}
	return newArr[0]			
}



/*
**    ==================================================================================================  
**    ������ 
**    ���ܣ�����ϳɣ����ﾫ����װ���ϳɽ���
**    ʾ����   
**    ==================================================================================================  
*/ 

//��ʼ��DIV
function ShowMarketDiv(){	
	listdivID=8;
	$("blist_newtitle").innerHTML = "������";

	var inHtm="";
	inHtm ='<iframe id="marketdiv" width="652" height="406" scrolling="no" frameborder="0" allowtransparency="ture" src="mainhtml/market2.html?v=2009070401"></iframe>';
	$("blist_list").innerHTML = inHtm;
	
	
	
	//��ʾ��
	addZindex();
}
