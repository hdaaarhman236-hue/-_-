$(document).ready(function () {
    // منع التمرير عند بداية التحميل
    $('body').css('overflow', 'hidden');

    // 1. برمجة شاشة البداية
    setTimeout(function () {
        $('#splash-screen').fadeOut(500, function() {
            $(this).remove();
            $('body').css('overflow', 'auto'); // إعادة التمرير بعد اختفاء الشاشة
        });
    }, 2000);

    // 2. التمرير السلس المصحح (يمنع الأخطاء في الصفحات الخارجية)
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            var target = $(this.hash);
            if (target.length) { // التأكد أن العنصر موجود في نفس الصفحة
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);
            }
        }
    });
})
// التفاعل الخاص بصفحة الترميم والصيانة
$(document).ready(function () {
    $('#maintenanceHero').on('slide.bs.carousel', function (e) {
        // إخفاء الصناديق قبل الانتقال
        $('.side-glass-panel').removeClass('animate__fadeInRight animate__fadeInLeft');
    });

    $('#maintenanceHero').on('slid.bs.carousel', function (e) {
        // إضافة الحركة حسب اتجاه السلايد
        const currentPanel = $(e.relatedTarget).find('.side-glass-panel');
        if ($(e.relatedTarget).find('.side-right').length) {
            currentPanel.addClass('animate__fadeInRight');
        } else {
            currentPanel.addClass('animate__fadeInLeft');
        }
    });
});
$(document).ready(function() { 
    // التأكد من أن DOM جاهز قبل تنفيذ أي كود jQuery

    // معالجة نموذج تسجيل الدخول
    $('#loginForm').on('submit', function(e) { 
        // عند إرسال نموذج تسجيل الدخول
        e.preventDefault(); 
        // منع الإرسال الافتراضي للنموذج (عدم إعادة تحميل الصفحة)
        alert('مرحباً بك مجدداً! تم تسجيل الدخول بنجاح.'); 
        // عرض رسالة ترحيب بسيطة للمستخدم
        $('#loginModal').modal('hide'); 
        // إغلاق نافذة الـ Modal بعد الضغط على زر الإرسال
    });

    // معالجة نموذج الاشتراك
    $('#registerForm').on('submit', function(e) { 
        // عند إرسال نموذج إنشاء حساب جديد
        e.preventDefault(); 
        // منع الإرسال الافتراضي للنموذج
        alert('شكراً لانضمامك إلينا! تم إنشاء الحساب بنجاح.'); 
        // عرض رسالة تأكيد إنشاء الحساب
        $('#registerModal').modal('hide'); 
        // إغلاق نافذة الـ Modal بعد الإرسال
    });
});

