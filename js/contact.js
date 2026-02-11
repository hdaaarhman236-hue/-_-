$(document).ready(function() { 
    // تنفيذ الكود بعد تحميل صفحة الـ DOM بالكامل

    // تفعيل Bootstrap Form Validation
    const forms = document.querySelectorAll('.needs-validation'); 
    // اختيار جميع النماذج التي تحتوي على الكلاس needs-validation للتحقق منها

    Array.from(forms).forEach(form => { 
        // تحويل قائمة النماذج إلى مصفوفة لتطبيق حلقة forEach على كل نموذج
        form.addEventListener('submit', function(event) { 
            // إضافة حدث عند محاولة إرسال النموذج
            if (!form.checkValidity()) { 
                // إذا لم يمر النموذج بالتحقق من صحة البيانات (الحقول المطلوبة)
                event.preventDefault(); 
                // منع الإرسال الافتراضي للنموذج
                event.stopPropagation(); 
                // إيقاف انتشار الحدث لأعلى DOM
            } else {
                event.preventDefault(); 
                // منع الإرسال الافتراضي حتى بعد التحقق (لأغراض الاختبار)
                alert('تم إرسال رسالتك بنجاح! شكراً لك.'); 
                // إظهار رسالة نجاح بسيطة للمستخدم
                // هنا يمكن إضافة كود لإرسال البيانات إلى السيرفر باستخدام AJAX
                form.reset(); 
                // إعادة تعيين النموذج وإفراغ جميع الحقول
                form.classList.remove('was-validated'); 
                // إزالة كلاس التحقق من النموذج لتفادي ظهور الأخطاء بعد إعادة التعيين
            }
            form.classList.add('was-validated'); 
            // إضافة كلاس Bootstrap لعرض رسائل التحقق على الحقول
        }, false); 
        // false تعني استخدام الـ bubbling للحدث وليس capture
    });
});

