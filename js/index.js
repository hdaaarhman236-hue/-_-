 
 // 2. عرض بيانات المشاريع ديناميكياً (Data-driven Rendering)
    // استخدام Arrays و Objects كما هو مطلوب في التقييم 
    const projects = [
        {
            title: "مشروع ترميم المنازل",
            date: "يناير 2024",
            image: "images/project1.jpg",
            description: "إعادة تأهيل الوحدات السكنية المتضررة جزئياً."
        },
        {
            title: "مشروع ترميم مستشفى الشفاء",
            date: "فبراير 2024",
            image: "images/project2.jpg",
            description: "توفير السلال الغذائية للأسر النازحة."
        },
        {
            title: "محطة تحلية المياه",
            date: "مارس 2024",
            image: "images/project3.jpg",
            description: "توفير مياه صالحة للشرب في مناطق النزوح."
        }
    ];

    // استخدام Loop لعرض البيانات 
    const projectsContainer = $('#projects-container');
    projectsContainer.empty(); // تفريغ الحاوية أولاً

    projects.forEach(project => {
        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm project-card">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title text-primary">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <p class="card-text text-muted"><small>تاريخ الإنشاء: ${project.date}</small></p>
                    </div>
                </div>
            </div>
        `;
        projectsContainer.append(cardHTML);
    });

    // 3. إضافة تأثيرات حركية عند مرور الفأرة (jQuery Animation)
    $(document).on('mouseenter', '.project-card', function() {
        $(this).find('img').css('filter', 'grayscale(0%)');
    }).on('mouseleave', '.project-card', function() {
        $(this).find('img').css('filter', 'grayscale(50%)');
    });


