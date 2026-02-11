$(document).ready(function() {
    // 1. تهيئة السلايدر للعمل تلقائياً
    var heroCarousel = document.querySelector('#professional-hero');
    var carousel = new bootstrap.Carousel(heroCarousel, {
        interval: 4000, // المدة الزمنية (4000 مللي ثانية = 4 ثوانٍ)
        pause: 'hover', // يتوقف عند تمرير الماوس
        wrap: true      // يعود للبداية بعد انتهاء الشرائح
    });

    // 2. كود إعادة تشغيل الأنيميشن عند كل انتقال
    $('#professional-hero').on('slide.bs.carousel', function (e) {
        // نحدد العناصر التي تحتوي على كلاس animate
        var animatedElements = $(e.relatedTarget).find('.animate__animated');
        
        // نزيل الكلاسات ثم نعيدها بعد فترة بسيطة جداً لإعادة الحركة
        animatedElements.each(function() {
            var el = $(this);
            var animationClass = el.attr('class').match(/animate__[a-zA-Z]+/g);
            if (animationClass) {
                el.removeClass(animationClass.join(' '));
                setTimeout(function() {
                    el.addClass(animationClass.join(' '));
                }, 10);
            }
        });
    });
});
$(document).ready(function() {
    // مصفوفة البيانات (Data)
    const workersData = [
        {
            id: 1,
            name: "م. أنس صالح",
            job: "مهندس ترميم إنشائي",
            img: "images/en1.jpg",
            demand: "طلب مرتفع جداً",
            bio: "خبير في فحص سلامة الأبنية بعد التضرر، أشرف على ترميم أكثر من 50 وحدة سكنية في غزة.",
            testimonial: "أحمد: المهندس أنس دقيق جداً في مواعيده وقدم لنا حلولاً اقتصادية للترميم."
        },
        {
            id: 2,
            name: "الحرفي سعيد خليل",
            job: "فني تمديدات صحية",
            img: "images/plumber.jpg",
            demand: "متاح الآن",
            bio: "خبرة 15 عاماً في تمديد شبكات المياه البديلة وإصلاح وصيانة المضخات تحت أقسى الظروف.",
            testimonial: "محمد: عمل متقن وسرعة في الإنجاز، بارك الله في جهوده."
        },
        {
            id: 3,
            name: "الأسطى إبراهيم حمدان",
            job: "فني طاقة شمسية وكهرباء",
            img: "images/electrician.jpg",
            demand: "متاح الآن",
            bio: "خبير في تركيب أنظمة الطاقة الشمسية وصيانة المولدات الكهربائية وخطوط التغذية المنزلية.",
            testimonial: "خالد: رجل أمين ومحترف، أنقذنا من انقطاع الكهرباء بحلول مبتكرة وبسيطة."
        },
        {
            id: 4,
            name: "المعلم يوسف النجار",
            job: "نجار - ترميم أثاث وأبواب",
            img: "images/carpenter.jpg",
            demand: "طلب متوسط",
            bio: "متخصص في إصلاح الأبواب والشبابيك المتضررة وتصنيع قطع الأثاث البديلة بجودة عالية.",
            testimonial: "سامي: قام بإصلاح جميع شبابيك المنزل في وقت قياسي وبسعر مناسب."
        }

    ];

    // 1. توليد البطاقات أسفل بعضها البعض (Loop)
    function renderWorkersStack() {
        let html = "";
        workersData.forEach(w => {
            html += `
                <div class="col-12 animate__animated animate__fadeInRight">
                    <div class="worker-card-row">
                        <img src="${w.img}" class="worker-list-img shadow-sm">
                        <div class="worker-info-flex">
                            <h4 class="fw-bold mb-1">${w.name}</h4>
                            <p class="text-warning fw-bold mb-2">${w.job}</p>
                            <span class="badge bg-light text-dark border">${w.demand}</span>
                        </div>
                        <button class="btn btn-warning fw-bold px-4 py-2 rounded-3 btn-details" data-id="${w.id}">
                            التفاصيل <i class="fas fa-chevron-left ms-1"></i>
                        </button>
                    </div>
                </div>`;
        });
        $('#workers-stack').html(html);
    }
    renderWorkersStack();

    // 2. التحكم في الشاشة المنبثقة (DOM Manipulation)
    $(document).on('click', '.btn-details', function() {
        const id = $(this).data('id');
        const worker = workersData.find(item => item.id === id);
        
        if(worker) {
            $('#m-name').text(worker.name);
            $('#m-job').text(worker.job);
            $('#m-bio').text(worker.bio);
            $('#m-demand').html('<i class="fas fa-fire me-1"></i> ' + worker.demand);
            $('#m-testimonial').text('"' + worker.testimonial + '"');
            $('#m-img').attr('src', worker.img);
            
            $('#detailsModal').modal('show');
        }
    });
});
$(document).ready(function() {
    // مصفوفة تحاكي المستخدمين المسجلين في الموقع
    const registeredUsers = ["osama@example.com", "engineer@gaza.ps", "user123@mail.com"];

    $('#proJobForm').on('submit', function(e) {
        e.preventDefault();
        
        const emailInput = $('#jobEmail').val().toLowerCase();
        const nameInput = $('#jobFullName').val();
        const feedback = $('#validationMsg');

        // التحقق: هل البريد موجود في قائمة المشتركين؟
        if (registeredUsers.includes(emailInput)) {
            // حالة النجاح: المستخدم مشترك
            feedback.html(`
                <div class="alert alert-success animate__animated animate__headShake text-end">
                    <i class="fas fa-check-circle ms-2"></i>
                    أهلاً بك يا ${nameInput}. تم التعرف على عضويتك، جاري إرسال طلبك..
                </div>
            `);
            
            // محاكاة إرسال البيانات
            setTimeout(() => {
                alert("تم إرسال طلب التوظيف بنجاح. سنقوم بالرد عليك قريباً.");
                $('#proJobForm').trigger("reset");
                feedback.html('');
            }, 2000);

        } else {
            // حالة الفشل: المستخدم غير مشترك
            feedback.html(`
                <div class="alert alert-danger animate__animated animate__shakeX text-end">
                    <i class="fas fa-exclamation-triangle ms-2"></i>
                    عذراً! هذا البريد (${emailInput}) غير مسجل لدينا. 
                    <br><small>يرجى الاشتراك في الموقع أولاً لتتمكن من تقديم طلب التوظيف.</small>
                </div>
            `);
        }
    });
});
