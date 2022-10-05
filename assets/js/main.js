$(function(){

    gsap.to('.landing-page',{
        delay:2,
        opacity:0,
        onComplete:function(){ //콜백
            $('.landing-page').remove()
            mainTxt.play()
        },

    })


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
            $('body').addClass('hidden')

        } else {
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


    ScrollTrigger.matchMedia({
    // large
    "(max-width: 1920px)": function() {
        const cong = gsap.timeline({
            scrollTrigger:{
                trigger: '.sc-congrats',
                start:"top top", //트리거, 윈도우 시작점이 만나야 실행`
                end:"bottom 40%", //bottom top은 기본값, scrub있을 때만 변경 필요
                // markers:true,
                scrub:1,
                pin:true
            },
        })
    cong.to('.sc-congrats .group-msg',{xPercent:-100},'m1')
    },

    // medium
    // "(min-width: 768px) and (max-width: 1023px)": function() {
    //     const cong = gsap.timeline({
    //         scrollTrigger:{
    //             trigger: '.sc-congrats',
    //             start:"top top", //트리거, 윈도우 시작점이 만나야 실행`
    //             end:"bottom bottom", //bottom top은 기본값, scrub있을 때만 변경 필요
    //             markers:true,
    //             scrub:1,
    //             pin:true
    //         },
    //     })
    //     cong.to('.sc-congrats .group-msg',{xPercent:-100},'m1')
    //     },
    // small
    "(max-width: 599px)": function() {
    }
    }); 

    
    // cong.addLabel('m1')
    // .to('.sc-congrats .row1',{xPercent:-50},'m1')
    // .to('.sc-congrats .row2',{xPercent:50},'m1')
    // .to('.sc-congrats .group-msg',{xPercent:-100},'m1')




    var swiper = new Swiper(".sc-news .swiper", {
        slidesPerView: 'auto',
        // spaceBetween: 30,
        // freeMode: {
        //     enabled: true,
        //     sticky: true
        //   },
      });


      //데이터 영역

      
    //gsap


    // const motion1 = gsap.to('.main-txt p',{
    //     stagger:0.1,
    //     yPercent:-100,
    //     paused:true
    // })

    

    const motion1 = gsap.to('.txt-wrap p',{
        stagger:0.1,
        yPercent:-100,
        paused:true
    });
    
});