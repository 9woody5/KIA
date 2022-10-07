$(function(){

    //마우스 커서 효과
    let html = '';
    for (let index = 0; index < 3; index++){
        html += `<div class="cursor"></div>`
    }
    $('.body').append(html)

    $('body').mousemove(function(e){
        x = e.clientX - 5;
        y = e.clientY - 5;

        if($('.cursor').hasClass('hover')){
            x = e.clientX - 25;
            y = e.clientY - 25;
        }

        gsap.to('.cursor',{
            x:x,
            y:y,
            duration:0.1,
            // stagger:0.1,
        })
    })

    //하버 시 커서 효과
    $('[data-hover]').hover(function(e){
        $('.cursor').addClass('hover')
    }, function(){
        $('.cursor').removeClass('hover')
    })


    const load = gsap.timeline({
        paused:true,
        onStart: function(){
            $('body').addClass('hidden')
            $('.cursor').hide();
        },
        onComplete: function(){
            $('body').removeClass('hidden')
            $('.cursor').show();

        } 
    })

    //로딩 화면 전후 
    const video = document.getElementById('main-video');

    load.addLabel('label')
    .to('.page-load .logo',{opacity:1, delay:.2, duration:2},'label')
    // .to('.page-load .logo',{opacity:0, delay:3, duration:2},'label')
    .to('.page-load',{delay:4, opacity:0, onComplete:function(){$('.page-load').remove(); mainTxt.play(); video.play();}},'label')
    load.play();




    // gsap.to('.page-load',{
    //     delay:2,
    //     opacity:0,
    //     onComplete:function(){ //콜백
    //         $('.page-load').remove()
    //         mainTxt.play()
    //     },

    // })



    //햄버거 메뉴
    const menuMotion = gsap.timeline({
        paused:true,
    })

    menuMotion.addLabel('motion')
    .to('.group-menu', {display:'block',opacity:1},'motion')
    .to('.group-menu .circle', {opacity:1, scale:100},'motion+=0.3')
    .to('.group-menu .menu-wrap', {transform: 'translateY(0%)',opacity:1},'motion+=0.5')


    $('.ic-menu').click(function(e){
        e.preventDefault();

        if ($('.group-menu').hasClass('active')) {
            $('.group-menu').removeClass('active');
            menuMotion.reverse()
        } else {
            $('.group-menu').addClass('active');
            menuMotion.play()
        }
    })

    //메뉴 영역 스크롤 막기
    $('.ic-menu').click(function(e){
        e.preventDefault();

        if ($('.group-menu').hasClass('active')) {
            $(this).addClass('open')
            $('body').addClass('hidden')

        } else {
            $(this).removeClass('open')
            $('body').removeClass('hidden')
        };
    })

    //메뉴 영역 스크롤 시 헤더 고정
    let scroll = 0;
    $('.group-menu .inner').scroll(function(){
        const currScroll = $(this).scrollTop();

        // $('.header-inner').addClass('background')
        if (currScroll >= 1) {
            if (currScroll > scroll) {
                $('.header-inner').addClass('background')
            }
            scroll = currScroll;
        }else{
            $('.header-inner').removeClass('background')
        }
    });
    


    //메인비주얼 텍스트
    gsap.set('.main-txt .txt',{overflow:'hidden'})
    gsap.set('.main-txt .txt span',{yPercent:100})

    const mainTxt = gsap.to('.main-txt .txt span',{
        yPercent:0,
        stagger:0.3,
        paused:true,
    })


    //스크롤
    let lastScroll = 0;
    $(window).scroll(function(){
        const currentScroll = $(this).scrollTop();

        $('.header-inner').addClass('background')
        if (currentScroll >= 100) {
            if (currentScroll > lastScroll) {
                $('.header-inner').addClass('hide');
            }else{
                $('.header-inner').removeClass('hide');
            }
            lastScroll = currentScroll;
        }else{
            $('.header-inner').removeClass('background')
        }
    })






    //텍스트 스크롤
    //자바스크립트로 도전
    const slideTxt = document.querySelectorAll('[data-x]')

    slideTxt.forEach(item => {

        xVal = item.dataset.x

        gsap.from(item,{
            scrollTrigger:{
                trigger: item,
                start:"top 100%",
                end:"+=200%",
                // markers:true,
                scrub:1
            },
            xPercent: xVal,
        })

    });


    //데이터 영역
    //제이쿼리 방식으로 도전
    $('[data-data]').each(function(i,item){
        // console.log($(this).find('>*')); //직계자식
        const child = $(this).find('>*');

        direction = ($(this).data('data') === 'left') ? -10 : 10;
        //item.dataset.data랑 같음

        gsap.from(child,{
            scrollTrigger:{
                trigger: item,
                start:"top 90%", //트리거, 윈도우 시작점이 만나야 실행`
                end:"bottom top", //bottom top은 기본값, scrub있을 때만 변경 필요
                // markers:true,
                // scrub:1
            },
            opacity:0,
            xPercent:direction,
            stagger:0.2
        })

    })

    //discover 영역
    $('[data-y]').each(function(i,l){
        gsap.from(l,{
            scrollTrigger:{
                trigger:l,
                start:"0% 100%",
                // end:"bottom 80%",
                // markers:true,
                // scrub:1
            },
            opacity:0,
            yPercent:20,
        })
    })

    var swiper = new Swiper(".sc-discover .swiper", {
        slidesPerView: 'auto',
        freeMode: true,
      });



    //sc-movement 영역
    ScrollTrigger.matchMedia({
    // large
    "(min-width: 1023px)": function() {
        const movement = gsap.timeline({
            scrollTrigger:{
                trigger: '.sc-movement',
                start:"top top", //트리거, 윈도우 시작점이 만나야 실행`
                end:"bottom 40%", //bottom top은 기본값, scrub있을 때만 변경 필요
                // markers:true,
                scrub:1,
                pin:true
            },
        })
    movement.to('.sc-movement .group-movement',{xPercent:-120})
    },

    // medium
    "(min-width: 768px) and (max-width: 1023px)": function() {
        const movement = gsap.timeline({
            scrollTrigger:{
                trigger: '.sc-movement',
                start:"top top", //트리거, 윈도우 시작점이 만나야 실행`
                end:"+=200%", //bottom top은 기본값, scrub있을 때만 변경 필요
                // markers:true,
                scrub:1,
                pin:true
            },
        })
        movement.to('.sc-movement .group-movement',{xPercent:-170})
        },
    // small
    "(min-width: 320px) and (max-width: 767px)": function() {
        const movement = gsap.timeline({
                    scrollTrigger:{
                        trigger: '.sc-movement',
                        start:"top top", //트리거, 윈도우 시작점이 만나야 실행`
                        end:"+=200%", //bottom top은 기본값, scrub있을 때만 변경 필요
                        // markers:true,
                        scrub:1,
                        pin:true
                    },
                })
                movement.to('.sc-movement .group-movement',{xPercent:-350})
    }
    }); 

    // cong.addLabel('m1')
    // .to('.sc-movement .row1',{xPercent:-50},'m1')
    // .to('.sc-movement .row2',{xPercent:50},'m1')
    // .to('.sc-movement .group-movement',{xPercent:-100},'m1')



    // const motion1 = gsap.to('.main-txt p',{
    //     stagger:0.1,
    //     yPercent:-100,
    //     paused:true
    // })

});