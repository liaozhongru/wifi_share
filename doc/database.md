表名：password

用处：用于存储用户认证信息

存储位置：mongoDB

存储字段：

		_id: 自动创建主键，用做userID
		phone: 用做手机号，或者用户名
		password_hash: 密码做了慢哈希处理，保存
		token: 用户凭证
		expire_timestamp: 用户凭证截止时间
		value: 表明用户的积分
		status:表明用户的状态，0.表示用户没有任何状态，1表示用户已经出售了WiFi，但是没有发广告，2表示用户已经发了广告了。
		gender:表明用户性别 0 表示未知，1表示男性，2表示女性。
		name: 表明用户名字
		avatar_url: 用户头像,返回的是路径，客户端要用头像，要拼接IP:http://IP:3333 + / + avatar_url
表名：wifi

用处：存储wifi信息

存储位置：mongoDB

存储字段：
		_id: 表示这是wifiID
		owner: 使用userID表征是谁上传的wifi
		bssid: 路由器硬件地址
		wifi_password:服务端做rsa加密，保存，保存的是buffer对象。
		category: wifi类别,0表示没密码，1表示有密码，收费，2表示有密码，但是免费
		loc: 地理位置索引,value为对象，里面存经纬度信息,有type,coordinates属性。type表明这是点，还是面等。
		#favor_number:点赞数--废弃
		favor_userIDs:这是一个数组，里面存放了点赞的人的userID，如果想知道，有几个人点赞了，那么，获取这个数组长度即可。
表名: public

用处： 存储用户上传信息

存储位置： mongoDB

存储字段：

		owner: 使用userID，表征谁上传的
		bssid:表明是哪个wifi
		content: 发布信息
		public_timestamp: 信息发布时间,秒为单位的时间戳,保存的是数字，所以客户端的就是数字
		pic_path: 图片路径
		comment_array: 评论，是一个数组，里面每一个成员如下
			comment: 评论信息
			comment_timestamp: 评论时间
			author: 评论者的userID
		


表名： vegetable

用处： 存储用户菜的状态

存储字段：
		_id: 使用userID,表征谁种的
		vegetable:是一个数组
			type: 表明菜的类型
			position: 表明菜的位置
			status: 表明菜的寿命
			timestamp: 菜的出生时间，用以唯一的表征这个菜


存储位置： redis

存储字段

		userID: key
		token:value
		expire_timestamp:value