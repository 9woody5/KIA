$(function(){

    //마우스 커서 효과
    $('body').mousemove(function(e){
        x = e.clientX;
        y = e.clientY;

        gsap.to('.cursor',{
            x:x,
            y:y,
            duration:0.1,
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

    //video safari 재생

    // if(videoSrc != '') {
    // 	if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // 		video.src = videoSrc;
    // 		$('#video').attr('playsinline','');	//이거추가

    // 	} else if (Hls.isSupported()) {
    // 		hls1.loadSource(videoSrc);
    // 		hls1.attachMedia(video);
    // 	}
    // }

    //로딩 화면 전후 
    const video = document.getElementById('main-video');

    load.addLabel('label')
    .to('.page-load .logo',{opacity:1, delay:.2, duration:2},'label')
    // .to('.page-load .logo',{opacity:0, delay:3, duration:2},'label')
    .to('.page-load',{delay:4, opacity:0, onComplete:function(){$('.page-load').remove(); mainTxt.play(); video.play();}},'label')
    load.play();




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
        const child = $(this).find('>*');

        direction = ($(this).data('data') === 'left') ? -10 : 10;
        //item.dataset.data랑 같음

        gsap.from(child,{
            scrollTrigger:{
                trigger: item,
                start:"top 90%", 
                end:"bottom top", 
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
                start:"0% 70%",
                end:"center 70%",
                // markers:true,
                scrub:1
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
    "(min-width: 1024px)": function() {
        const movement = gsap.timeline({
            scrollTrigger:{
                trigger: '.sc-movement',
                start:"top top",
                end:"bottom 40%", 
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
                start:"top top", 
                end:"+=200%", 
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
                        start:"top top", 
                        end:"+=200%", 
                        // markers:true,
                        scrub:1,
                        pin:true
                    },
                })
                movement.to('.sc-movement .group-movement',{xPercent:-350})
    }
    }); 


    //sc-news 영역
    $('[data-sequence]').each(function(i,l){
        child = $(this).find('>*')
        gsap.from(child,{
            scrollTrigger:{
                trigger:l,
                start:"top 70%",
                // end:"bottom 50%",
                // markers:true,
                // scrub:1
            },
            opacity:0,
            yPercent:20,
            stagger: 0.2,
        })
    })

});