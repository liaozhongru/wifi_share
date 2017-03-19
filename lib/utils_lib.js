var moment = require('moment');
var http_timeformat = 'ddd, DD MMM YYYY HH:mm:ss Z';
var crypto = require('crypto');
var path = require("path");
var nameArray = "蒯婉然花英勋蹇婉慧力虹影边灵阳程灵寒象溥心用晗蕾牟平乐春彭彭苌芷雪令建明巫马驰婷章佳玄雅栾玉宇曲巧春阴书兰江欣笑澹台夜卉蒿沛山寒雯丽闽驰月扬紫夏薄夏山其河灵莫明志钦安珊图门倩语巧代双吉南蓉鱼寻梅考夏岚泣子默彭丹亦卷欢悦合晓兰弘刚捷绍令慧哀慕诗泉昭懿迮妙梦练锐立黎湛英曹水丹凤采珊野修洁时玉树刚鸿晖终尔风溥曼云夙嫚儿戊致欣威易绿藤和悌智冬梅费翰采苗运凯求碧白逢景行枚含桃历骏燕漫金枝蚁阳舒慕诗槐吾丽思大秋柔谯正卿旗波峻昝代珊宫慧月聂玉龙昌飞双刑开朗屈琼英戚从珊星兴言通晴画师乐英汪若枫申屠雨文皇甫凡白戎娅欣衅兴运洋飞雪国妍丽墨格菲己蕴秀盖娟秀宝醉波钱岚风仝和怡关秋翠苟睿姿邶振国靳靖巧梁丘瀚钰衷山雁之晓灵邵灵珊闻人凌晴缪浩气鲜于乃欣张廖灵萱实晓桐枝望慕森妙松少浩邈抗代天碧白山莘芳林始碧春丛雪卉学雅爱字幻翠出安双贺柔惠梅涵桃业雪帆拓跋星雨渠妙芙钊晋鹏禽怜晴嵇颖初长冷之米蔚星暨骏桀华嘉玉闪欣怡石经武子车瑜然郎琴心甫妙芙岑华皓长孙从霜葛嘉丽毕兰梦贵谷槐阚兴腾乾绮云却平卉刀飞龙段腾逸隆良平郝振博表睿博税宏畅山山晴年佩杉北夜天碧鲁香之玉怀寒老兰芝局飞薇毛绮玉璩湛芳单于恬静战沈雅姜俊拔豆嘉志塔韦茹傅云霞励怜烟柏寒松资阳伯性子爱利乐正宜岚翠宇文桂月登向露冠弘懿党鹏鲸绪任真冒曜曦卞韶仪司空水冬贡晓露伦紫菱房洁玉辜雁凡温阳荣牵德华行学智殳兴发竹正浩堵安吉古恨蕊司海雪似思萱杜元蝶闻昌翰夫飞鸿偶骊萍撒映雁司徒曼青校翔宇南凝琴菅嘉歆斐涵易衡平惠庾乐儿巫文茵俞南晴胥锦诗耿丹寒浮坚壁荤思娜井悦欣巢瑞灵禄冷之籍寒云向兰蕙泥惜海才谷菱光和同赫醉易缑雅丹许诗柳公西夏璇满景山彤飞兰百烨磊蓟飞雪孟曼凡商迎海寸光亮禹新瑶沙涵阳银琳晨梁阳平节振荣羊晓兰袭迎波宦叶丰真雨竹乐正晓曼皋季雅嬴思卉荆冷珍褒梦槐全代芙康元芹何梅青尧寻桃惠从筠受婉淑逄自明郸建安抄白亦普梧桐成子珍龙忆曼千痴旋定凝洁五昊嘉谭怜阳辟桂华礼曼容孔甘雨郜元绿壬秋彤麴才捷卓秀杰杨驰颖淦语蝶卯子亦佟天工包修美皇德佑夏侯向松莱良工雷运锋遇幻儿湛娅童员雅霜叶紫云悉淳美汗婉仪完颜柳思革微熹贰梦玉简山梅杞俊豪脱建同蒋白萱纳宇荫么慧婕折幼枫佟佳洁雅须曼雁归雅诗闵山雁辉清俊漆雕书双次语诗濮水荷朋曼岚闳从筠眭家馨穆半双宗夏容佼清妙有莺韵郁安翔朴小之公良谷菱天以珊席霞飞袁诗珊称惜玉仲孙彦珺岳雨竹松安怡呼瑰玮坚一雯韦奇逸咎怡木端宜然桓含巧靖文彦粟璞玉乐绮晴纳喇玉韵翁伟茂阎丁兰诗意致从慕凝不翰翮容和豫卢凝雁铁康健达怡月司马芷珊诺寄蓝畅博厚罗幼怡怀如意印元灵申初雪公羊如凡吴高远晋孤晴初丹云丑清晖丰青梦唐阳华乌雅寄容毓同济类芳华植经艺驹菊月后安梦载昊穹白秀妮蒙春绿孙佳文茅平文戏力勤马鸿信庹光济索姝丽慈英秀望熙柔南门怀芹鹿茹薇谈经略祝志新嘉欣悦阳恨桃九初翠束茹云涂夏青郁文乐萧冷雪谢高爽休英悟宿迎秋昔采春舜平春保茵茵佘梦琪臧英朗睦燕晨宾虹颖回荷紫司寇心远城飞雪阿幼白乌夏菡澄昊乾夔水之甲凝绿金依波愚闲华塞泰然蛮惜筠富梦云熊展鹏养善芳同觅山明孤松府晓灵禾良策尉迟从丹母绮兰奚妙晴汉和风硕清淑相婉清贾春蕾侨淑华郗骊霞阙骊媛营清晖姓奇希修梦竹佴巧春拜语海军雅素聊凝远告秀颖樊鹏云秦飞雨剧傲旋买华容犁清逸卑流如掌流婉卫绮艳仲成龙饶晨钰后浩博蹉梦秋舒萌阳势建柏裔德寿史寻双那拉半青赫连燕楠丁浦泽赛雅安秋韶敏勇亦玉错绿兰邬忻乐西门阳泽接思义武冰薇楼访梦化小谷麻文瑶圭秋英虞素洁汤念梦尉子丹慎秀逸仵光誉尔梦旋顿南晴鲁元基本梦桐赤夏雪巨弘盛红慕卉操白易柳琼芳亓官高明延溪蓝良姝惠祭贞韵亓夏波仇梦蕊环暮雨苏舒云英香馨翟芮悦永暄嫣谬雅静寻听南戢静槐逮云梦薛琨瑶敬斌蔚虢巧香刁乐天钟离冉冉宣博雅蔚访天邛晶滢訾涵瑶乙雍雅弥雨安让梦易前才俊过水晶陆冰蓝旁曼衍冀逸丽生秋荣班力夫哈萍韵言云岚以思柔俟骊颖左丘芳洁独雁蓉邓月悦郑凯捷霍梓舒酆梓璐晏迎彤御梓萱招初兰竺华采崇浩歌沐丹烟覃姣姣桑紫薇系淑兰卜谷槐酒彬郁屠天干陈阳晖喻翠霜由雨筠顾惜玉窦夜春广妙晴悟嘉美穰腾骏宛康安祈春柏扶听枫钭丹亦务芳懿权晗昱理映冬信北嘉甄清昶琦玉石锐紫杉矫念真及芳芳高飞飙骑恬然堂元白桂忆之侍思凡邸玉怡符晓莉齐元凯蓝致萱詹碧春夕琼华淡清婉焦梦琪连欣可潘敏叡旷香巧肖冬萱风盼香方雪珍旅代玉罕雅蕊杭诗丹汝醉巧储夜梦拱娇然改奇邃帖雅洁速乐成赵素昕潮晴雪度力强无冬亦笃友灵羿英叡鲍又青尚新翰肇弘图楚星爵洪家欣第五兰蕙俎水冬盛慧丽栋千风肥永言铎正诚融静娴褚碧琳糜问薇世奇胜典骏年竭暖暖韶运珹万依柔纪俊贤愈明杰祢之双瓮雁兰仆雪曼台迎秋裘向雁零贤惠随初晴念元彤乜秋珊桐宛丝廉凡雁郭雨双来俊明敛文思宇月怡紫涵菱范姜晴丽钞晓畅仍灵卉绳冬卉端木婵娟王寒雁苑语燕冷阳兰檀新雨扈飞兰居绮梅厍佩玉荀炫明揭冬萱经才良戴小萍公冶涵畅盘白云呼延盼翠太叔华婉安朋义东方昊明况书竹幸以晴庄承载狄乐安贝韶华牛信瑞祁问丝展元冬魏雁菱茹红旭貊痴春干晴雪沈绮琴牧欣笑丘笑笑闾丘凝云邹傲雪鞠新蕾庞运鹏锁琬凝邴飞莲元杰秀喜静柏冉痴梅景冰之孛鸿运翠德元和梓云所安安闫水凡守文赋丹端雅闭寒蕾韩琴轩李高超严若翠士雨雪召兴平布嘉惠栗今雨帅清妙轩辕安娜宰灵凡贸婉秀荣泽宇冼灵秀那星泽秘白梅奇云梦陶荏苒微生勇捷乘以柳邝问芙原成周翦承颜飞昊然雀耘志剑飞掣磨丽玉烟初珍易雨梅余和雅粘鸿飞强秀雅万俟米琪祖丹烟镇涵梅京白雪亢飞烟沃佳美仰小蕊锺南琴茂含文伟可昕亥秋双曾建修钟念露镜孟君琴贝莉波秋柔霜阳冰黄惜雪殷永寿晁兴怀示香岚敏小琴解婷秀潜冷荷德晨旭首秋颖巩梓涵僧晓霜庆嫔然清方方巴惜梦茆星鹏桥颖慧赖婉君宁雨彤浑骊英道敏思皮天籁东雅青留惜萱第清涵督天佑辛孟乐欧阳欣然管文林邗国兴弓高轩捷白秋蔺文石谷淑婉颛孙君昊丙思天开春桃乔曼岚欧立群颜元旋暴丹彤益承德纵嘉月香鸿轩厉曼寒睢嘉平集静和诸春荷胡思柔支夜香寇端静池倩秀夷涵煦汲新霁隗瑜敏歧静曼介绮怀果春岚裴晴虹都凝莲区沛凝佛碧萱鄢清芬中天纵义雅云止丁辰腾月天郏碧琴章悠馨户韦柔凌晓昕委成文玄阳曦范驰逸施海之衣梅红功春翠郦思敏叔倚云麦友珊双夏真徐哲妍任英逸库雨凝蓬雅柏在昕葳越幼安爱希慕倪辰良鲜香露柔嘉德雪清卓冯贞怡张简山蝶甘和暖弭文敏蒉立轩苍宏胜板雨灵能宜修赏秀隽宋湛霞是尔真虎伶俐咸盈盈闾昊英帛施诗斯听双朱霞姝费莫箫吟续代玉单初柳书绮梅柴绿竹綦白枫藩以冬多梦香柯碧巧马佳夏山季鸣晨封涵蓄雍南珍犹坚诚阮一嘉仉瑛琭禚宏富隽听云濮阳静涵童谷翠洛宛畅庚骊娜兰南莲线博易吕忆枫百里菀菀空芷云代安彤娄艳卉尹文虹斛以欣尾欣怡别逸雅狂安顺项向晨针明亮宗政嘉澍林盼兰敖凝静检和通钮溪儿芒飞英于长运承谷雪东门天真鄞悠婉家帅红机沛岚董灵槐赧秋白贲宛儿建紫雪宏夜雪海念珍笪问寒匡情韵蒲采文劳翠琴完贞静诸葛伟诚徭依白伊海瑶富察会欣泰力行水稷骞";
var nameCount = nameArray.length - 1;

module.exports = {
    /**
     * Decode JSON String
     */
    decode_json: function(str, callback) {
        try {
            var parsed = JSON.parse(str);
            callback(null, parsed);
        } catch (e) {
            callback(e, null);
        }
    },
    date_2_http_format: function(date) {
        if (!date) date = Date.now();
        return moment(date).format(http_timeformat);
    },
    parse_http_date: function(str) {
        return moment(str, http_timeformat);
    },
    get_timestamp: function(date) {
        var time_in_ms = date ? date.getTime() : Date.now();
        return Math.round(time_in_ms / 1000);
    },
    random_int: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    /**
     * 获取一个 sha1 随机字符串
     * @return {String}
     */
    random_str: function() {
        var random_str = crypto.randomBytes(32).toString('hex') + new Date().getTime();
        var hash = crypto.createHash('sha1');
        return hash.update(random_str).digest('hex');
    },
    /**
     * 判断对象是否=={}
     * @param obj
     * @returns {boolean}
     */
    is_object_empty: function(obj) {
        for (var n in obj) {
            return false
        }
        return true;
    },
    parser_upload_file: function(req, res, options, callback) {
        var m = this;

        if (!callback) {
            callback = options;
            options = null;
        }
        log("liao1425,");
        var Form = require("formidable");
        var form = new Form.IncomingForm();

        form.encoding = 'utf-8';

        log("liao2003, ", __dirname);
        var PreviousDirectory = path.resolve(__dirname, '..');
        log("liao2004,", PreviousDirectory);



        form.uploadDir = (options && options.upload_dir)? options.upload_dir: (PreviousDirectory + '/resource/public_pic');
        form.maxFieldsSize = 10 * 1024 * 1024;
        form.parse(req, function(err, fields, files) {
            log("liao1421,", err, fields, files);
            if (err) {
                //return res.send({code: 251,})
                err.code = 251;
                return ct.error_handler(res, err);
            }

            if (callback) {
                fields = m.is_object_empty(fields)? undefined: fields;
                files = m.is_object_empty(files)? undefined: files;
                callback(fields, files);
            }
            //var file_name = files.files.name;
            //var file_path = files.files.path;
            //var content = fields.content;
            //
            //
            //res.send({code: 1,file_name: file_name, file_path: file_path});

        })
    },
    trim: function(str, type) {
        if (!str) {
            return;
        }
        if (!type) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
        if (type == "right") {
            return str.replace(/(\s*$)/g, "");
        }
        if (type == "left") {
            return str.replace(/(^\s*)/g, "");
        }

    },
    random_name: function() {
        var rand = Math.random();
        var range = Math.round(rand * nameCount);
        range = Math.round(range / 3) * 3;
        log("liao1305,", range);
        var ret = nameArray.substring(range,range + 3);
        log("liao1306, ", ret);
        return ret;
    },
    random: function(min,max) {
        var Range = max - min;
        var Rand = Math.random();
        return(min + Math.round(Rand * Range));
    },
    trim2relative_path: function(dir,absolute_path) {
        dir = dir + "/";
        if (!absolute_path) {
            return "";
        }

        //var file_path =  '/Users/liaozhongru/Desktop/11.Wifi/wifi_share/resource/public_pic/upload_24600046d87be6772d37d67d50860b80';
        //var absolute_path = "public_pic/upload_24600046d87be6772d37d67d50860b80";
        var pos = absolute_path.indexOf(dir);
//log("liao2130, ", ss);
        var relative_path = absolute_path.substring(pos);
        return relative_path;
//
//        log("liao1059, ",part_file_path);


    }
}
