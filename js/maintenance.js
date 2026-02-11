// الاستماع لحدث انتهاء انتقال السلايدر إلى شريحة جديدة
$('#hero-slider').on('slid.bs.carousel', function () {
    // $('#hero-slider')      : تحديد عنصر السلايدر باستخدام المعرّف
    // on(...)                : ربط حدث (Event Listener)
    // 'slid.bs.carousel'     : حدث Bootstrap يُطلق بعد اكتمال الانتقال بين الشرائح

    // تحديد صندوق النص (caption-box) داخل الشريحة النشطة حاليًا
    $('.carousel-item.active .caption-box')
        // إضافة كلاسات Animate.css لإعادة تشغيل حركة الدخول
        .addClass('animate__animated animate__fadeInRight');
});

// الاستماع لحدث بدء انتقال السلايدر بين الشرائح
$('#hero-slider').on('slide.bs.carousel', function () {
    // 'slide.bs.carousel' : حدث يُطلق عند بداية الانتقال (قبل اكتماله)

    // تحديد جميع صناديق النص داخل السلايدر
    $('.caption-box')
        // إزالة كلاسات الحركة لإعادة تهيئتها قبل عرض الشريحة التالية
        .removeClass('animate__animated animate__fadeInRight');
});
// تنفيذ الكود بعد تحميل الصفحة بالكامل
$(document).ready(function() {

    // ================================
    // 1. مصفوفة بيانات مواد البناء
    // ================================

     // تنفيذ الكود بعد تحميل الصفحة بالكامل
$(document).ready(function() {

    // ================================
    // 1. مصفوفة البيانات المحدثة بالصور
    // ================================
    const constructionMaterials = [
        // كل كائن يمثل مادة بناء مع التفاصيل
        { id: 1, name: "إسمنت بورتلاندي", price: 40, demand: "مرتفع", stock: "متوفر", unit: "كيس", image: "images/cement.jpg" },
        { id: 2, name: "حديد تسليح 12 ملم", price: 4200, demand: "متوسط", stock: "كمية محدودة", unit: "طن", image: "images/iron.jpg" },
        { id: 3, name: "حصمة (كركار)", price: 110, demand: "مرتفع", stock: "متوفر", unit: "كوب", image: "images/gravel.jpg" },
        { id: 4, name: "رمل بناء ناعم", price: 90, demand: "منخفض", stock: "متوفر", unit: "كوب", image: "images/sand.jpg" }
    ];
    // كل عنصر يحتوي: معرف، اسم، سعر، مستوى الطلب، حالة التوفر، وحدة القياس، وصورة

    // ================================
    // 2. دالة عرض البيانات داخل الجدول (مع إضافة الصور)
    // ================================
    function renderTable() {
        // متغير لتجميع صفوف الجدول كنص HTML
        let tableRows = "";

        // المرور على جميع العناصر في المصفوفة
        constructionMaterials.forEach(item => {

            // تحديد لون النص بناء على حالة التوفر
            let stockClass = item.stock === "متوفر" ? "text-success" : "text-danger";

            // تحديد لون شارة الطلب (مرتفع / غير مرتفع)
            let demandColor = item.demand.includes("مرتفع") ? "bg-danger" : "bg-primary";
            
            // إنشاء صف HTML لكل مادة
            tableRows += `
                <tr>
                    <!-- صورة المادة -->
                    <td>
                        <img src="${item.image}" alt="${item.name}" 
                             class="img-thumbnail" 
                             style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                        <!-- img-thumbnail : إطار صغير حول الصورة
                             object-fit : لضمان تغطية الصورة دون تشويه
                             border-radius : حواف دائرية
                        -->
                    </td>

                    <!-- اسم المادة مع الوحدة -->
                    <td class="fw-bold">
                        ${item.name} 
                        <small class="text-muted">(${item.unit})</small>
                    </td>

                    <!-- السعر -->
                    <td>${item.price} ₪</td>

                    <!-- مستوى الطلب -->
                    <td>
                        <span class="badge ${demandColor}">
                            ${item.demand}
                        </span>
                    </td>

                    <!-- حالة التوفر -->
                    <td class="${stockClass} fw-bold">
                        ${item.stock}
                    </td>

                    <!-- زر الطلب -->
                    <td>
                        <button 
                            class="btn btn-sm btn-outline-warning fw-bold order-btn"
                            data-name="${item.name}"
                            data-price="${item.price}"
                            data-image="${item.image}">
                            <i class="fas fa-shopping-cart me-1"></i> اطلب الآن
                        </button>
                    </td>
                </tr>
            `;
        });

        // إدخال الصفوف الناتجة داخل جسم الجدول
        $('#materials-table-body').html(tableRows);
    }

    // استدعاء الدالة عند تحميل الصفحة
    renderTable();

    // ==========================================
    // 3. فتح نافذة الطلب ونقل البيانات (بما فيها الصورة)
    // ==========================================
    let currentPrice = 0; // لتخزين سعر المادة الحالية

    // الاستماع للنقر على أي زر طلب
    $(document).on('click', '.order-btn', function() {

        // جلب البيانات من attributes الخاصة بالزر
        const name = $(this).data('name');
        const imgPath = $(this).data('image');
        currentPrice = $(this).data('price');
        
        // تحديث اسم المادة في Modal
        $('#orderItemName').val(name);
        
        // تحديث صورة المنتج في Modal
        $('#orderItemImage').attr('src', imgPath); 
        
        // تعيين الكمية الافتراضية
        $('#orderQty').val(1);

        // تعيين السعر الإجمالي الابتدائي
        $('#totalPrice').val(currentPrice);

        // إظهار نافذة الطلب
        $('#orderModal').modal('show');
    });

    // ================================
    // 4. حساب السعر الإجمالي تلقائياً
    // ================================
    $('#orderQty').on('input', function() {
        let qty = $(this).val();
        
        // معالجة حالة إذا كانت الكمية أقل من 1 أو فارغة
        if(qty < 1 || qty === "") qty = 0;

        // حساب السعر الإجمالي
        let total = qty * currentPrice;

        // تحديث الحقل مع تنسيق الأرقام
        $('#totalPrice').val(total.toLocaleString());
    });

    // ================================
    // 5. معالجة إرسال الطلب
    // ================================
    $('#orderForm').on('submit', function(e) {
        // منع إعادة تحميل الصفحة
        e.preventDefault();

        // جلب بيانات العميل والمادة والمبلغ الإجمالي
        const customer = $('#customerName').val();
        const material = $('#orderItemName').val();
        const totalAmount = $('#totalPrice').val();
        
        // عرض رسالة تأكيد
        alert(`تم استلام طلبك بنجاح! \nالعميل: ${customer} \nالمادة: ${material} \nالمبلغ الإجمالي: ${totalAmount} ₪`);

        // إخفاء نافذة الطلب
        $('#orderModal').modal('hide');

        // إعادة تعيين النموذج
        $(this).trigger("reset");
    });
});
});
$(document).ready(function() {
    // ================================
    // 1. مصفوفة بيانات الحرفيين / المهندسين
    // ================================
    const workers = [
        {
            id: 1,
            name: "م. أنس معروف", // اسم المهني
            job: "مهندس إنشائي", // الوظيفة
            price: "150₪ /ساعة", // السعر أو التعرفة
            rating: 5, // التقييم من 1 إلى 5
            image: "images/worker1.jpg", // صورة المهني
            bio: "خبير في ترميم المباني الآيلة للسقوط وتدعيم الخرسانة المسلحة بأساليب حديثة." // نبذة عن المهني
        },
        {
            id: 2,
            name: "أبو العبد النجار",
            job: "فني نجارة عامة",
            price: "80₪ /يوم",
            rating: 4,
            image: "images/worker2.jpg",
            bio: "متخصص في تركيب الأبواب والشبابيك الخشبية وصيانة الأثاث المتضرر."
        },
        {
            id: 3,
            name: "يوسف الكهربائي",
            job: "فني كهرباء منزلية",
            price: "100₪ /يوم",
            rating: 5,
            image: "images/worker3.jpg",
            bio: "خبير في تمديد شبكات الكهرباء وأنظمة الطاقة الشمسية البديلة."
        }
    ];

    // ================================
    // 2. دالة لتوليد النجوم (Rating Stars)
    // بناءً على قيمة rating
    // ================================
    function generateStars(rating) {
        let stars = "";
        for (let i = 0; i < 5; i++) {
            // إذا كانت النجمة أقل من التقييم -> نجمة ممتلئة، وإلا نجمة فارغة
            stars += i < rating ? 
                '<i class="fas fa-star text-warning"></i>' : 
                '<i class="far fa-star text-warning"></i>';
        }
        return stars; // إرجاع سلسلة HTML تحتوي على النجوم
    }

    // ================================
    // 3. دالة عرض البطاقات في الصفحة (Loop)
    // ================================
    function renderWorkers() {
        let cards = ""; // لتجميع كل البطاقات HTML

        workers.forEach(worker => {
            cards += `
                <div class="col-md-4 animate__animated animate__zoomIn"> <!-- كل بطاقة في عمود -->
                    <div class="card h-100 border-0 shadow-sm worker-card text-center p-3">
                        <!-- صورة المهني -->
                        <img src="${worker.image}" 
                             class="card-img-top rounded-circle mx-auto mt-3 shadow-sm" 
                             style="width: 100px; height: 100px; object-fit: cover;">
                        <div class="card-body">
                            <!-- اسم المهني -->
                            <h5 class="card-title fw-bold">${worker.name}</h5>
                            <!-- الوظيفة -->
                            <p class="text-muted small mb-2">${worker.job}</p>
                            <!-- النجوم -->
                            <div class="mb-2">${generateStars(worker.rating)}</div>
                            <!-- السعر -->
                            <p class="text-primary fw-bold mb-3">${worker.price}</p>
                            <!-- زر عرض التفاصيل -->
                            <button class="btn btn-outline-dark btn-sm rounded-pill px-4 view-details" 
                                    data-id="${worker.id}">
                                عرض التفاصيل
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        // إدراج البطاقات في الحاوية
        $('#workers-container').html(cards);
    }

    // استدعاء الدالة عند تحميل الصفحة
    renderWorkers();

    // ================================
    // 4. معالجة زر عرض التفاصيل (عرض المودال)
    // ================================
    $(document).on('click', '.view-details', function() {
        const workerId = $(this).data('id'); // جلب الـ ID من الزر
        const worker = workers.find(w => w.id === workerId); // البحث عن المهني المطابق

        if (worker) {
            // تحديث محتوى المودال بالبيانات
            $('#modalWorkerName').text(worker.name); // الاسم
            $('#modalWorkerJob').text(worker.job); // الوظيفة
            $('#modalWorkerBio').text(worker.bio); // النبذة
            $('#modalWorkerImg').attr('src', worker.image); // الصورة
            $('#modalWorkerStars').html(generateStars(worker.rating)); // النجوم

            // عرض المودال
            $('#workerDetailModal').modal('show');
        }
    });
});
$(document).ready(function() {
    // ===========================
    // 1. مصفوفة آراء العملاء
    // ===========================
    const reviews = [
        {
            name: "أ. محمود القدوة",           // اسم العميل
            role: "صاحب منزل متضرر",          // دوره أو وصفه
            comment: "بفضل هذه المنصة، تمكنت من العثور على مهندس إنشائي خبير في وقت قياسي. الشفافية في الأسعار كانت أكثر ما أعجبني.", // نص التقييم
            rating: 5,                        // التقييم بالنجوم (من 1 إلى 5)
            image: "images/client1.jpg"       // صورة العميل
        },
        {
            name: "م. سمية حسن",
            role: "مكتب هندسي",
            comment: "منصة رائعة توفر لنا الوصول للحرفيين المهرة بسهولة. نظام تقييم الحرفيين ساعدنا كثيراً في اختيار الأفضل لمشاريعنا.",
            rating: 5,
            image: "images/client2.jpg"
        },
        {
            name: "سالم العبد",
            role: "مقاول بناء",
            comment: "دليل أسعار المواد دقيق جداً ويتم تحديثه باستمرار، وهو مرجعنا الأول في حساب تكاليف العطاءات الحالية.",
            rating: 4,
            image: "images/client3.jpg"
        }
    ];

    // ===========================
    // 2. دالة عرض الآراء داخل Carousel
    // ===========================
    function renderTestimonials() {
        let items = ""; // متغير لتجميع عناصر HTML لكل تقييم

        // حلقة على كل تقييم في المصفوفة
        reviews.forEach((rev, index) => {
            // العنصر الأول يجب أن يأخذ كلاس active ليعمل السلايدر
            let activeClass = index === 0 ? "active" : "";

            // توليد النجوم بناءً على التقييم
            let stars = '<i class="fas fa-star"></i>'.repeat(rev.rating) + 
                        '<i class="far fa-star"></i>'.repeat(5 - rev.rating);

            // إنشاء بطاقة التقييم بصيغة HTML
            items += `
                <div class="carousel-item ${activeClass}">
                    <div class="testimonial-card text-center animate__animated animate__fadeIn">
                        <i class="fas fa-quote-right"></i> <!-- أيقونة اقتباس -->
                        <img src="${rev.image}" class="rounded-circle client-img shadow mx-auto"> <!-- صورة العميل -->
                        <p class="fs-5 mb-4 italic">"${rev.comment}"</p> <!-- نص التقييم -->
                        <h5 class="fw-bold mb-0 text-warning">${rev.name}</h5> <!-- اسم العميل -->
                        <small class="text-light opacity-75">${rev.role}</small> <!-- وصف العميل أو دوره -->
                        <div class="rating-stars mt-2">${stars}</div> <!-- النجوم -->
                    </div>
                </div>
            `;
        });

        // إدراج جميع عناصر التقييم داخل حاوية Carousel
        $('#testimonials-container').html(items);
    }

    // ===========================
    // 3. استدعاء الدالة عند تحميل الصفحة
    // ===========================
    renderTestimonials();
});
$(document).ready(function() {
    // معالجة إرسال نموذج الخدمة
    $('#serviceForm').on('submit', function(e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة

        const name = $('#senderName').val();
        
        // استخدام تأثير Fade لإخفاء الفورم وإظهار رسالة نجاح (jQuery Animation)
        $(this).fadeOut(500, function() {
            $(this).before('<div class="alert alert-success text-center animate__animated animate__zoomIn">' +
                           '<i class="fas fa-check-circle fa-2x mb-2"></i>' +
                           '<br>شكراً لك يا ' + name + '، تم إرسال طلبك بنجاح للمراجعة سنرد عليك قريباً.</div>');
        });

        // إغلاق المودال تلقائياً بعد 3 ثواني
        setTimeout(function() {
            $('#serviceModal').modal('hide');
            // إعادة النموذج لحالته الأصلية بعد الإغلاق
            location.reload(); 
        }, 3500);
    });
});