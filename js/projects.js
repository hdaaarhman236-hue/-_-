// تنفيذ الكود بعد تحميل الصفحة بالكامل (DOM Ready)
$(document).ready(function () {

    /* =========================================================
       1. مصفوفة المشاريع المنجزة (التي سيتم إضافة النافذة لها)
       ========================================================= */
    const finishedProjects = [
        {
            title: "إعادة إعمار برج الأمل السكني",
            img: "images/project1.jpg",
            team: "لجنة إعمار غزة + شركة بناء للمقاولات",
            startDate: "01/05/2024",
            endDate: "15/12/2024",
            duration: "7 أشهر ونصف",
            description: "تم الانتهاء من ترميم وإعادة بناء كافة الوحدات السكنية المتضررة كلياً مع تحسين البنية التحتية والمرافق العامة لخدمة السكان."
        },
        {
            title: "ترميم شبكة مياه حي الرمال",
            img: "images/project3.jpg",
            team: "بلدية غزة + مصلحة مياه بلديات الساحل",
            startDate: "10/02/2024",
            endDate: "20/08/2024",
            duration: "6 أشهر",
            description: "إعادة تأهيل خطوط المياه الرئيسية والفرعية التي تضررت، مما ضمن وصول المياه لأكثر من 5000 وحدة سكنية في المنطقة."
        },
         {
     title: "تجهيز مدرسة الفاخورة المطورة",
     img: "images/project12.jpg",
     team: "وكالة الغوث (الأونروا) + وزارة الأشغال",
     startDate: "20/01/2024",
     endDate: "01/10/2024",
     duration: "8 أشهر",
     description: "بناء فصول دراسية إضافية وتجهيز المختبرات العلمية بأحدث الوسائل التعليمية لدعم المسيرة التعليمية في المناطق المتضررة."
 }
    ];

    const finishedContainer = $('#finished-projects-area');

    // عرض المشاريع المنجزة مع ميزة النافذة المنبثقة
    finishedProjects.forEach((project, index) => {
        const modalId = `modalProject${index}`; 

        const html = `
            <div class="col-12 mb-5">
                <div class="card finished-card border-0 shadow-sm overflow-hidden">
                    <div class="row g-0">
                        <div class="col-lg-4">
                            <div class="project-img-wrapper">
                                <img src="${project.img}" class="img-fluid h-100 w-100" alt="${project.title}">
                                <div class="status-badge">مكتمل</div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="card-body p-4 d-flex flex-column h-100">
                                <h4 class="fw-bold mb-3 text-dark">${project.title}</h4>
                                <p class="text-secondary mb-4 flex-grow-1">${project.description}</p>
                                <div class="text-start mt-auto">
                                    <button class="btn btn-gold-outline rounded-pill px-4" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#${modalId}">
                                        عرض تفاصيل التقرير
                                        <i class="fas fa-file-alt ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content border-0 shadow-lg rounded-4">
                            <div class="modal-header border-0" style="background-color: rgba(212, 175, 55, 0.1);">
                                <h5 class="modal-title fw-bold" style="color: #d4af37;">${project.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4 text-end" dir="rtl">
                                <div class="row">
                                    <div class="col-md-5 mb-3">
                                        <img src="${project.img}" class="img-fluid rounded-3 shadow-sm">
                                    </div>
                                    <div class="col-md-7">
                                        <h6 class="fw-bold border-bottom pb-2 mb-3">تفاصيل التقرير النهائي:</h6>
                                        <ul class="list-unstyled p-0">
                                            <li class="mb-2"><i class="fas fa-users-cog me-2" style="color: #d4af37;"></i> <strong>المنفذ:</strong> ${project.team}</li>
                                            <li class="mb-2"><i class="fas fa-calendar-alt me-2" style="color: #d4af37;"></i> <strong>الفترة:</strong> ${project.startDate} - ${project.endDate}</li>
                                            <li class="mb-2"><i class="fas fa-clock me-2" style="color: #d4af37;"></i> <strong>المدة:</strong> ${project.duration}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer border-0">
                                <button class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">إغلاق</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        finishedContainer.append(html);
    });

    /* =========================================================
       2. قسم المشاريع قيد التنفيذ (الكود الأصلي تماماً كما هو)
       ========================================================= */
    const ongoingProjects = [
        {
            title: "إعادة بناء مجمع الشفاء الطبي",
            img: "images/project2.jpg",
            progress: 65,
            team: "فريق الهندسة الإنشائية الموحد",
            expectedEnd: "ديسمبر 2026",
            description: "العمل جارٍ حالياً على صب القواعد الأساسية للمبنى الرئيسي وترميم الأقسام المتضررة جزئياً."
        },
        {
            title: "تطوير وحدات سكنية مؤقتة - خان يونس",
            img: "images/project4.jpg",
            progress: 40,
            team: "مؤسسة إعمار بالمقاولين المحليين",
            expectedEnd: "أغسطس 2026",
            description: "المشروع يستهدف إنشاء 200 وحدة سكنية مسبقة الصب لتوفير مأوى عاجل للعائلات النازحة."
        },
        {
    title: "إصلاح شبكات الصرف الصحي المركزية",
    img: "images/project10.jpg",
    progress: 85,
    team: "مصلحة مياه بلديات الساحل",
    expectedEnd: "مايو 2026",
    description: "وصلنا للمراحل النهائية من استبدال الأنابيب الرئيسية المتضررة واختبار كفاءة التدفق."
}
    ];

    const ongoingContainer = $('#ongoing-projects-area');

    ongoingProjects.forEach(project => {
        const html = `
            <div class="col-md-4 mb-4">
                <div class="card ongoing-card h-100 border-0 shadow-sm">
                    <div class="position-relative">
                        <img src="${project.img}" class="card-img-top" alt="${project.title}">
                        <div class="work-badge">
                            <i class="fas fa-sync fa-spin me-1"></i> قيد العمل
                        </div>
                    </div>
                    <div class="card-body p-4 d-flex flex-column">
                        <h5 class="fw-bold mb-3">${project.title}</h5>
                        <p class="small text-muted mb-3 flex-grow-1">${project.description}</p>
                        
                        <div class="mb-4">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="small fw-bold">نسبة الإنجاز</span>
                                <span class="small fw-bold text-primary">${project.progress}%</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar progress-bar-striped progress-bar-animated"
                                     style="width: ${project.progress}%">
                                </div>
                            </div>
                        </div>

                        <div class="d-grid gap-2 mb-3">
                           <a href="adopt.html?project=${project.title}" class="btn btn-primary rounded-pill btn-sm">
                           <i class="fas fa-hand-holding-heart me-1"></i> تبرع لهذا المشروع
                           </a>

                           <a href="https://wa.me/970XXXXXXXXX?text=أود الاستفسار عن مشروع: ${project.title}" target="_blank" class="btn btn-outline-secondary rounded-pill btn-sm">
                            <i class="fab fa-whatsapp me-1"></i> تواصل عبر واتساب
                              </a>
                        </div>

                        <div class="ongoing-meta pt-3 border-top">
                            <div class="small mb-1 text-truncate">
                                <i class="fas fa-hard-hat text-primary me-2"></i>
                                <strong>المنفذ:</strong> ${project.team}
                            </div>
                            <div class="small">
                                <i class="fas fa-calendar-alt text-primary me-2"></i>
                                <strong>الموعد:</strong> ${project.expectedEnd}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        ongoingContainer.append(html);
    });
});