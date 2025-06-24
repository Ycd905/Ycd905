document.addEventListener('DOMContentLoaded', function() {
    // 设置当前年份
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // 定义网站页面内容
    const siteContent = {
        'home': {
            title: '首页',
            content: `
                <section class="welcome-section">
                    <h2>欢迎来到我的个人网站</h2>
                    <p>我是一名Web开发者，专注于创建美观且功能强大的网站。</p>
                    <p>在这里你可以了解我的技能、查看我的项目，并联系我。</p>
                </section>
            `
        },
        'about': {
            title: '关于我',
            content: `
                <section class="about-section">
                    <h2>关于我</h2>
                    <div class="about-content">
                        <img src="assets/images/profile.jpg" alt="我的照片" class="profile-img">
                        <div>
                            <p>我是张三，一名全栈Web开发者，有5年开发经验。</p>
                            <div class="skills">
                                <h3>技能</h3>
                                <ul>
                                    <li>HTML/CSS/JavaScript</li>
                                    <li>React/Vue</li>
                                    <li>Node.js/Express</li>
                                    <li>Python/Django</li>
                                    <li>Git/GitHub</li>
                                    <li>UI/UX设计</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            `
        },
        'portfolio': {
            title: '作品集',
            content: `
                <section class="portfolio-section">
                    <h2>我的项目</h2>
                    <div class="projects">
                        <div class="project">
                            <img src="assets/images/project1.jpg" alt="项目1截图">
                            <h3>电子商务网站</h3>
                            <p>使用React和Node.js构建的全功能电子商务平台，支持用户注册、商品浏览和在线支付。</p>
                        </div>
                        <div class="project">
                            <img src="assets/images/project2.jpg" alt="项目2截图">
                            <h3>博客平台</h3>
                            <p>使用Vue和Django构建的博客系统，支持Markdown编辑和用户评论。</p>
                        </div>
                        <div class="project">
                            <img src="assets/images/project3.jpg" alt="项目3截图">
                            <h3>任务管理应用</h3>
                            <p>基于JavaScript的任务管理工具，具有拖放功能和本地存储支持。</p>
                        </div>
                    </div>
                </section>
            `
        },
        'contact': {
            title: '联系我',
            content: `
                <section class="contact-section">
                    <h2>联系方式</h2>
                    <div class="contact-info">
                        <p>📧 邮箱: <a href="mailto:example@example.com">example@example.com</a></p>
                        <p>💻 GitHub: <a href="https://github.com/yourusername" target="_blank">github.com/yourusername</a></p>
                        <p>👔 LinkedIn: <a href="https://linkedin.com/in/yourusername" target="_blank">linkedin.com/in/yourusername</a></p>
                        <p>📱 微信: yourwechatid</p>
                    </div>
                </section>
            `
        }
    };
    
    // 初始化导航
    function initNavigation() {
        const nav = document.getElementById('main-nav');
        const navItems = Object.keys(siteContent);
        
        navItems.forEach(item => {
            const link = document.createElement('a');
            link.href = `#${item}`;
            link.textContent = siteContent[item].title;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadPage(item);
                // 更新URL但不刷新页面
                history.pushState({page: item}, '', `#${item}`);
            });
            nav.appendChild(link);
        });
    }
    
    // 加载页面内容
    function loadPage(pageId) {
        const contentDiv = document.getElementById('content');
        const page = siteContent[pageId] || siteContent['home'];
        
        document.title = `${page.title} | 我的个人网站`;
        contentDiv.innerHTML = page.content;
        
        // 滚动到顶部
        window.scrollTo(0, 0);
    }
    
    // 处理浏览器前进/后退
    window.addEventListener('popstate', (e) => {
        const hash = window.location.hash.substring(1);
        if (hash && siteContent[hash]) {
            loadPage(hash);
        } else {
            loadPage('home');
        }
    });
    
    // 黑暗模式切换功能
    function setupDarkModeToggle() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.textContent = '☀️ 明亮模式';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                darkModeToggle.textContent = '🌙 黑暗模式';
                localStorage.setItem('darkMode', 'disabled');
            }
        });
        
        // 检查本地存储中的模式设置
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️ 明亮模式';
        }
    }
    
    // 初始化
    function init() {
        initNavigation();
        setupDarkModeToggle();
        
        // 检查URL hash决定加载哪个页面
        const hash = window.location.hash.substring(1);
        if (hash && siteContent[hash]) {
            loadPage(hash);
        } else {
            loadPage('home');
        }
    }
    
    init();
});