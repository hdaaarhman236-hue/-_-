$(document).ready(function() {

    /* =====================================================
       1. مصفوفات البيانات (المشاريع المنجزة والحالية)
       ===================================================== */
    
    // المشاريع السابقة (المنجزة)
    const pastProjectsData = [
        {
            id: 0,
            title: "إعادة إعمار مخبز حي الرمال",
            date: "مارس 2024",
            image: "images/project6.jpg",
            description: "تم إعادة تجهيز المخبز بالكامل بأفران حديثة لضمان توفير الخبز لأكثر من 10,000 نسمة يومياً بعد تضرره بشكل كبير.",
            category: "خدمات حيوية"
        },
        {
            id: 1,
            title: "ترميم عيادة الشفاء الميدانية",
            date: "فبراير 2024",
            image: "images/project7.jpg",
            description: "توفير غرف عمليات صغرى ووحدات غيار للجروح لتقديم الرعاية الطبية الطارئة للمواطنين.",
            category: "قطاع صحي"
        },
        {
            id: 2,
            title: "إصلاح خطوط مياه الشاطئ",
            date: "يناير 2024",
            image: "images/project8.jpg",
            description: "إعادة ربط الأنابيب الرئيسية وتدشين محطة تحلية صغيرة تعمل بالطاقة الشمسية.",
            category: "بنية تحتية"
        }
    ];

    // المشاريع الحالية (المتاحة للتبني)
    const currentProjects = [
        {
            id: 101,
            title: "منزل عائلة الكرد",
            location: "شمال غزة",
            cost: "$4,500",
            img: "images/project9.jpg",
            category: "ترميم كلي",
            description: "يهدف المشروع إلى إعادة بناء الجدران المتصدعة وسقف المنزل وتجهيز البنية التحتية للصرف الصحي لضمان عودة العائلة لمنزل آمن."
        },
        {
            id: 102,
            title: "شبكة مياه حي الزيتون",
            location: "شرق غزة",
            cost: "$2,200",
            img: "images/project10.jpg",
            category: "بنية تحتية",
            description: "إصلاح الأنابيب الرئيسية المتضررة وتركيب مضخة مياه جديدة لخدمة أكثر من 50 منزلاً في الحي."
        },
        {
            id: 103,
            title: "فصل مدرسة اليرموك",
            location: "وسط غزة",
            cost: "$1,800",
            img: "images/project11.jpg",
            category: "تعليم",
            description: "ترميم الجدران، طلاء الغرفة الصفية، وتوفير مقاعد دراسية وسبورة ذكية لدعم استمرار العملية التعليمية."
        }
    ];

    /* =====================================================
       2. دوال عرض المشاريع ديناميكياً
       ===================================================== */

    function displayAllProjects() {
        // عرض المشاريع المنجزة
        const pastGrid = $('#past-projects-grid');
        pastGrid.empty();
        pastProjectsData.forEach((project) => {
            pastGrid.append(`
                <div class="col-md-4 col-sm-6 mb-4">
                    <div class="card h-100 shadow-sm project-card border-0 overflow-hidden">
                        <div class="position-relative">
                            <img src="${project.image}" class="card-img-top project-image" alt="${project.title}">
                            <div class="project-overlay d-flex align-items-center justify-content-center">
                                 <button class="btn btn-light btn-sm fw-bold view-details" data-id="${project.id}" data-type="past">عرض التفاصيل</button>
                            </div>
                        </div>
                        <div class="card-body text-end">
                            <h5 class="card-title fw-bold text-dark">${project.title}</h5>
                            <p class="card-text text-muted mb-0"><i class="far fa-calendar-alt ms-1"></i> تم الإنجاز: ${project.date}</p>
                        </div>
                    </div>
                </div>`);
        });

        // عرض المشاريع المتاحة
        const currentGrid = $('#current-opportunities-grid');
        currentGrid.empty();
        currentProjects.forEach(project => {
            currentGrid.append(`
                <div class="col-md-4 mb-4">
                    <div class="card adopt-card shadow-sm h-100">
                        <img src="${project.img}" class="card-img-top" alt="${project.title}">
                        <div class="card-body text-end">
                            <span class="badge bg-warning text-dark mb-2">${project.category}</span>
                            <h5 class="card-title fw-bold">${project.title}</h5>
                            <p class="card-text text-muted"><i class="fas fa-map-marker-alt"></i> ${project.location}</p>
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold text-success fs-5">${project.cost}</span>
                                <button class="btn btn-outline-dark btn-sm view-details" data-id="${project.id}" data-type="current">التفاصيل</button>
                            </div>
                        </div>
                    </div>
                </div>`);
        });
    }

    displayAllProjects();

    /* =====================================================
       3. تفعيل النافذة المنبثقة (Modal) وربطها بالنموذج
       ===================================================== */

    let currentSelectedTitle = "";

    $(document).on('click', '.view-details', function() {
        const id = $(this).data('id');
        const type = $(this).data('type');
        let project = (type === 'current') ? currentProjects.find(p => p.id === id) : pastProjectsData.find(p => p.id === id);

        if (project) {
            currentSelectedTitle = project.title;
            $('#modalProjectTitle').text("تقديم طلب تبني: " + project.title);
            $('#modalBodyContent').html(`
                <div class="modal-project-img-container shadow-sm text-center">
                    <img src="${project.image || project.img}" alt="${project.title}">
                </div>
                <label class="project-label">وصف وتفاصيل العمل</label>
                <div class="project-info-value">${project.description}</div>
                <div class="row">
                    <div class="col-6">
                        <label class="project-label">الموقع</label>
                        <div class="project-info-value">${project.location || 'قطاع غزة'}</div>
                    </div>
                    <div class="col-6">
                        <label class="project-label">التكلفة / الحالة</label>
                        <div class="project-info-value text-success fw-bold">${project.cost || project.date}</div>
                    </div>
                </div>
            `);
            $('#projectModal').modal('show');
        }
    });

    // عند الضغط على زر "إرسال الطلب" داخل المودال
    $('#confirmAdoptBtn').on('click', function() {
        $('#projectModal').modal('hide');
        
        // تعبئة الاختيار في النموذج بالأسفل
        const selectBox = $('#chosenProject');
        if(selectBox.find("option:contains('" + currentSelectedTitle + "')").length == 0) {
            selectBox.append(`<option value="custom" selected>${currentSelectedTitle}</option>`);
        } else {
            selectBox.find("option:contains('" + currentSelectedTitle + "')").prop('selected', true);
        }

        // تمرير الصفحة للنموذج
        $('html, body').animate({
            scrollTop: $("#adopt-form-section").offset().top - 100
        }, 800);
    });

    /* =====================================================
       4. التأثيرات الحركية السابقة (البارالاكس والنموذج)
       ===================================================== */

    $('.main-hero').on('mousemove', function(e) {
        let moveX = (e.pageX * -1 / 50);
        let moveY = (e.pageY * -1 / 50);
        $(this).css('background-position', `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`);
    });

    $('#adoptRequestForm').on('submit', function (e) {
        e.preventDefault();
        const donorName = $('#donorName').val();
        const project = $('#chosenProject option:selected').text();
        $(this).fadeOut(400, function () {
            $(this).before(`
                <div class="alert alert-success p-4 text-center">
                    <i class="fas fa-heart fa-3x mb-3 text-danger"></i>
                    <h4>شكراً لك أستاذ/ة ${donorName}</h4>
                    <p>لقد استلمنا رغبتك في تبني مشروع (${project}). سيقوم منسق الإعمار بالتواصل معك قريباً.</p>
                </div>
            `);
        });
    });

});