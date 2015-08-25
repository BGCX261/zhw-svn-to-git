// ==== thinkryzhu begin ========================

// 建造项
function TaskItem(taskID, taskData)
{
	this.taskID = taskID;
	this.taskData = taskData;
}

TaskItem.prototype.toString = function()
{
	return "taskID:" + this.taskID;
}

// 建造队列
function Task()
{
	this.arrIT = new Array();
	this.arrTE = new Array();
	this.arrAR = new Array();
	this.arrFO = new Array();
	this.timerIT = null;
	this.timerTE = null;
	this.timerAR = null;
	this.timerFO = null;
	this.countReq = 0; // 记录发送了多少次请求
}

Task.NAMES = ["IT", "TE", "AR", "FO"]; //四种队列的标识

// 只插入taskID, taskData是null
// 不检查重复
Task.prototype.insertTaskID = function(taskID)
{
	var arr = this["arr" + taskID.slice(0,2)];
	arr.push(new TaskItem(taskID, null));
}

// 设置指定taskID的taskData
// 如果taskID不存在, 就insert
Task.prototype.setTaskData = function(taskID, taskData)
{
	var arr = this["arr" + taskID.slice(0,2)];
	for (var i = 0; i < arr.length; ++i)
	{
		if (arr[i].taskID == taskID)
		{
			arr[i].taskData = taskData;
			return true;
		}
	}

	// taskID不在数组中, insert
	arr.push(new TaskItem(taskID, taskData));
	return false;
}

// 所有task的数量
Task.prototype.getTaskCount = function()
{
	return this.arrIT.length + this.arrTE.length
		 + this.arrAR.length + this.arrFO.length;
}

// taskData有数据的task的数量
Task.prototype.getNullTaskCount = function()
{
	var count = 0;
	for (var a = 0; a < Task.NAMES.length; ++a)
	{
		var arr = this["arr" + Task.NAMES[a]];
		for (var i = 0; i < arr.length; ++i)
		{
			if (arr[i].taskData == null)
			{
				++count;
			}
		}
	}
	
	return count;
}

Task.prototype.isAllTaskHasData = function()
{
	return this.getNullTaskCount() == 0;
}

Task.prototype.eraseNullTask = function()
{
	var count = 0;
	for (var a = 0; a < Task.NAMES.length; ++a)
	{
		var arr = this["arr" + Task.NAMES[a]];
		for (var i = arr.length - 1; i >= 0; --i)
		{
			if (arr[i].taskData == null)
			{
				arr.splice(i, 1); // 删除元素
				++count;
			}
		}
	}

	return count;
}

// 清除所有task
Task.prototype.clearAllTasks = function()
{
	this.arrIT.length = 0;
	this.arrTE.length = 0;
	this.arrAR.length = 0;
	this.arrFO.length = 0;
	this.countReq = 0;
}

Task.prototype.incCount = function()
{
	if (this.countReq < 0) this.countReq = 0;
	++this.countReq;
}

Task.prototype.decCount = function()
{
	--this.countReq;
	if (this.countReq < 0) this.countReq = 0;
}

// 保存建造任务的定时器ID
// 同时会清除以前的同类型的定时器
Task.prototype.setTaskTimer = function(typeName, timerID)
{
	this.clearTaskTimer(typeName);
	this["timer" + typeName] = timerID;
}

// 按类型清除建造任务定时器
Task.prototype.clearTaskTimer = function(typeName)
{
	var n = "timer" + typeName;
	if (this[n] != null)
	{
		clearInterval(this[n]);
		this[n] = null;
	}
}

// 清除所有的建造任务定时器
Task.prototype.clearAllTimers = function()
{
	for (var a = 0; a < Task.NAMES.length; ++a)
	{
		this.clearTaskTimer(Task.NAMES[a]);
	}
}

// 处理时间
// 把Date转成number
// 把undefined null转成当前时间
function prehanleTime(t)
{
	if (t == null)
	{
		return new Date().getTime();
	}
	else if (t instanceof Date)
	{
		return t.getTime();
	}
	else
	{
		return Number(t);
	}
}

// 用字符串返回两个时间的差
function getTimeDiff(t1, t2)
{
	var t11 = prehanleTime(t1);
	var t22 = prehanleTime(t2);
	
	var result = "";
	var dif = Math.floor((t11 - t22) / 1000); // 差值秒
	if (dif > 0)
	{
		var d = Math.floor(dif / 86400);
		var h = Math.floor((dif % 86400) / 3600);
		var m = Math.floor((dif % 3600) / 60);
		var s = dif % 60;
		if (d > 0)
		{
			result = d + "天";
		}
		
		result += (h < 10 ? "0" : "") + h + ":";
		result += (m < 10 ? "0" : "") + m + ":";
		result += (s < 10 ? "0" : "") + s;
	}
	
	return result;
}

// ==== thinkryzhu end ==========================

var gTask = new Task();

// ==== thinkryzhu end ==========================
