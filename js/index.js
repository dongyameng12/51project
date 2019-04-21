﻿(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})
    (document, window);

/**
* 
变量展示区
*/
var flower_number = 0 // 判断展示红花的数量
var flower_status = false // 判断是否点击测试几朵花按钮
var current_clickclass // 判断当前点击是哪个class
// 劳模类型（女生）
var modeltypeArr = [
    {
        modeltypeImg : 'images/women_00.jpg',
        introduction : '我是女生1'  
    },
    {
        modeltypeImg : 'images/women_01.jpg',
        introduction : '我是女生2'  
    },
    {
        modeltypeImg : 'images/women_02.jpg',
        introduction : '我是女生3'  
    },
    {
        modeltypeImg : 'images/women_03.jpg',
        introduction : '我是女生4'  
    },
    {
        modeltypeImg : 'images/women_04.jpg',
        introduction : '我是女生5'  
    },
    {
        modeltypeImg : 'images/women_05.jpg',
        introduction : '我是女生6'  
    },
    {
        modeltypeImg : 'images/women_06.jpg',
        introduction : '我是女生7'  
    },
    {
        modeltypeImg : 'images/women_07.jpg',
        introduction : '我是女生8'  
    },
];
// 劳模类型（男生）
var modelmenArr = [
    {
        modeltypeImg : 'images/men_00.jpg',
        introduction : '我是男生1'  
    },
    {
        modeltypeImg : 'images/men_01.jpg',
        introduction : '我是男生2'  
    },
    {
        modeltypeImg : 'images/men_02.jpg',
        introduction : '我是男生3'  
    },
    {
        modeltypeImg : 'images/men_03.jpg',
        introduction : '我是男生4'  
    },
    {
        modeltypeImg : 'images/men_04.jpg',
        introduction : '我是男生5'  
    },
    {
        modeltypeImg : 'images/men_05.jpg',
        introduction : '我是男生6'  
    },
    {
        modeltypeImg : 'images/men_06.jpg',
        introduction : '我是男生7'  
    },
    {
        modeltypeImg : 'images/men_07.jpg',
        introduction : '我是男生8'  
    },
];
$(document).ready(function () {
    //是否关注公众号
    var attention = true;
    // 是否绑定手机号
    var binding = true;
    // 本网，异网用户(默认本网)
    var CM = true;
    //是否转增
    var increase;
    // 出现劳模类型弹窗（女生）
    var  women_number = parseInt(Math.random()*7);
    // 点击首页开始按钮
    $('#start').on('click',function(){
        $('.home').hide();
        $('.enter').show();
    });
    // 选择
    $('.radio_selected>div').on('click',function(){
        var class_name = $(this).children('div').children('span').prop('class');
        if (class_name !== 'select_radio') {
            $(this).siblings('div').children('div').children('span').removeClass('select_radio');
            $(this).children('div').children('span').prop('class','select_radio');
        } else {
            $(this).children('div').children('span').removeClass('select_radio');
        }
    })   
    // 去测试
    $('#start_test').on('click',function(){
        var name = $('.name').val()
        var selected_status = $('.select_radio').length;
        submitForm(name,selected_status);
    });
    var sex
    // 用户填信息
    function submitForm (name,selected_status) {
        if (name !== '' && selected_status === 1) {
            sex = $('.select_radio').parent('div').siblings('label').text();
            showCard(sex)
        } else {
            if (name === '' && selected_status === 0) {
                $('.prompt').text('您还没有填写姓名和性别');
                showMask();
                $('.sex_name').show();
                // console.log('没有填写姓名和选择性别')
            } else {
                if (name === '') {
                    $('.prompt').text('您还没有填写姓名');
                    showMask();
                    $('.sex_name').show();
                    // console.log('没有填写姓名')
                } else {
                    $('.prompt').text('您还没有选择性别');
                    showMask();
                    $('.sex_name').show();
                }
            }
        }
    }
    // 卡片展示
    function showCard (sex) {
        showMask();
        if (sex === '女') {
            showModel (modeltypeArr);
            $('.worker').show();
        } else {
            showModel (modelmenArr);
            $('.worker').show();
        }  
    }
    
    // 展示劳模类型
    function showModel (sextArr) { 
        // women_number = parseInt(Math.random()*7);
        var str = '';
        var str_share = '';
        var nickname = $('.name').val();
        // utf16toEntities(nickname);
        // for(i = 0; i<modeltypeArr.length;  i++){
        //     str = " <p><span>"+"小胖胖"+"</span>是</p><img src='"+modeltypeArr[i].modeltypeImg +"'><p>"+modeltypeArr[i].introduction+"</p>"
        // }
        str = " <img src='"+sextArr[women_number].modeltypeImg +"'>";
        // str_list =" <p><span>"+nickname+"</span></p><img src='"+sextArr[women_number].modeltypeImg +"'>"
        str_share = " <p><span>"+nickname+"</span></p><img src='"+sextArr[women_number].modeltypeImg +"'>";
        $('.model_detail').html(str);
        $('.share_detail').html(str_share);
    }
    // 劳模种类弹窗换一个
    $('#another').on('click',function(){
        if (sex == '男') {
            cyclePromblem (modelmenArr);
        } else {
            cyclePromblem (modeltypeArr);
        }
    });
    // 循环问题
    function cyclePromblem (sextArr2) {
        women_number++; 
        if(women_number < 8){
            showModel(sextArr2); 
        }else{
            women_number = 0;
            showModel(sextArr2); 
        }
    }
    // 劳模种类弹窗确定
    $('#worker_sure').on('click',function(){
        $('.worker').hide();
        hideMask();
        $('.enter').hide();
        $('.glory').show();
    });
    // 判断关注，绑定等
    function jiangli () {
        if(attention){
            // 已关注
            if (binding) {
                if (CM) {
                    //本网中流量 
                    showMask();
                    $('.tc-1').show();
                } else {
                    //异网中流量 
                    if ($(current_clickclass).text() == '查看奖励') {
                        // alert('查看奖励')
                        showMask();
                        $('.tc-5').show(); 
                    } else {
                        showMask();
                        $('.tc-2').show();
                    }
                }
            } else {
                $('.main').hide();
                $('.bind').show();
                // 未绑定手机号
                // alert('你还没绑定手机号');
            }
        } else {
            // 未关注
            // alert('未关注');
             window.location.href = "https://mp.weixin.qq.com/s/FDD5Q57SnOrWAiYkfyzLFQ";
        }
    };

    // 改变小花
    function change_flower (number) {
        $('.small_flower li').each(function (index,item) {
            if (index < number) {
                $(this).css('background','url(images/flower_red.png)')
            }
        })
    }
    // 点击分享获得荣誉小红花
    $('.get_flower').on('click',function(){
        let rongyu_flower = localStorage.getItem('isclick')
        if (rongyu_flower == null) {
            localStorage.setItem('isclick',true)
            flower_number++;
            $('.show_flower').text(flower_number)
            change_flower(flower_number);
        } 
        showMask();
        $('.share_before').show();
        
    });
    // 分享前发送好友按钮
    $('.shareb_btn').on('click',function(){
        $('.share_before').hide();
        $('.share').show();
        generateImage()
    });
    // 点击分享
    // $('.share').on('click',function(){
    //     hideMask();
    //     $('.share').hide();
    // })
    $('.mask').on('click',function(){
        if ($('.share').css('display') == 'block') {
            hideMask();
            $('.share').hide();
        }
    })
    // 点击抽取最高5.1G
    $('.highest_ext').on('click',function () {
        $('.glory').hide();
        $('.main').show();
    })
    
    // 点击抽取
    $('.lottery').on('click',function () {
        if ($(this).hasClass('one_flower')) {
            if (flower_number <1) {
                $('#unflower').text('1');
                showMask();
                $('.unling').show();
            } else {
                current_clickclass = '.one_flower'
                jiangli();
            }
        }else if ($(this).hasClass('five_flower')) {
            if (flower_number < 5) {
                $('#unflower').text('5');
                showMask();
                $('.unling').show();
            } else {
                current_clickclass = '.five_flower'
                jiangli()
            }
        }else if ($(this).hasClass('eight_flower')) {
            if (flower_number < 8) {
                $('#unflower').text('8');
                showMask();
                $('.unling').show();
            } else {
                current_clickclass = '.eight_flower'
                jiangli()
            }
        }
    })

    //移动手机号码验证
    function istel(tel) {
        var rtn = false;
        //移动号段验证
        // var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(17[2|8])|(165)|(147)|198)[\d]{8}$/;
        if (regtel.test(tel)) {
            rtn = true;
        }
        return rtn;
    }

    // 点击绑定（提交）
    $('.bind_submit').on('click',function(){
        $('.bind').hide();
        $('.main').show();
    });
    // 点击主页返回
    $('.return').on('click',function(){
        $('.main').hide();
        $('.glory').show();
    })
    // (转增和取消)
    function Transfcancel () {
     if (increase) {
        //转增
        $('.tc-2').hide();  
        $('.tc-3').show();  
     } else {
        //  取消
        hideMask();
        $('.tc-2').hide();  
     }  
    };
    //异网流量弹窗 1（取消）
    $('.close-2').on('click',function(){
        increase = false;
        Transfcancel ();
    });
    //异网流量弹窗 1（转增）
    $('#giveBtn').on('click',function(){
        increase = true;
        Transfcancel ();
    });
    //异网流量弹窗 2,确定
    $('#giveBtn_2').on('click',function(){
        var input_val = $('#inputTel').val();
        if (istel(input_val)) {
            $('.tc-3').hide();
            $('.tc-4').show();
            $('.mobile').text(input_val);   
        } else {
           alert('请输入正确的北京移动号'); 
        }
       
    });
    //异网流量弹窗 3,修改
    $('#revise').on('click',function(){
        $('.tc-4').hide();
        $('.tc-3').show();
    });
    //异网流量弹窗 3,确定
    $('#giveBtn_3').on('click',function(){
        $('.tc-4').hide();
        $('.tc-5').show();
    });

    $('.close').on('click',function(){
        $(current_clickclass).text('查看奖励')
        $(this).parent().hide();
        hideMask();
    });

    // 活动规则
    $('.go_rule').on('click',function(){
        showMask();
        $('.rule').show();
    });
    // 活动规则确定
    $('.rule_close').on('click',function(){
        $('.rule').hide();
        hideMask();
    });
    // 未领奖的确定按钮
    $('.unsure').on('click',function(){
        $('.unling').hide();
        $('.share').show();
        generateImage()
    });
    // 姓名性别确定
    $('.sex_btn').on('click',function(){
        hideMask();
      $('.sex_name').hide();  
    })
    // 测试
    $('.test2').on('click',function(){
        attention = false;
    });
    $('.test3').on('click',function(){
        binding = false;
    });
    $('.test4').on('click',function(){
        CM = false;
    });
    $('.d1').on('click',function(){
        alert(1)
    });

    // 测试展示几朵小红花
    $('.test_number_flower').on('click',function () {
        flower_status = true
        var class_test = $(this).prop('class')
        if (class_test.includes('6')) {
            flower_number = 5;
            change_flower(flower_number);
            $('.show_flower').text(flower_number);
        } else if (class_test.includes('7')) {
            flower_number = 8;
            change_flower(flower_number);
            $('.show_flower').text(flower_number);
        }
    })

    // 恢复首次登陆
    $('.test8').on('click',function () {
        localStorage.clear();
        window.location.href="index.html?time="+((new Date()).getTime());
    })

});
// 生成图片方法
function generateImage () {
    var getimg_length = $('.getimg').children('img').length
    if (getimg_length == 0) {
        var copyDom = $('#pic')[0]
        var width = copyDom.offsetWidth;
        var height = copyDom.offsetHeight;
        var scale = 2;
        html2canvas(document.getElementById('pic'),{
            dpi:window.devicePixelRatio*2,
            scale:scale,
            width:width,
            height:height,
        }).then(function(canvas){
            var imgUrl = canvas.toDataURL();
            $('.getimg').css({'width':width,'height':height,'margin':'0 auto'})
            $('.getimg').html('<img class="cavas_img" src="'+imgUrl+'" style="width:'+width+'px;height:'+height+'px">');
        })
    }
}


//显示遮罩层
function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
    $('body').css('position', 'fixed');
}
//隐藏遮罩层
function hideMask() {
    $("#mask").hide();
    $('body').css('position', 'unset');
}
// 获取url参数
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
