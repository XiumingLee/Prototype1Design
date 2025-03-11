/**
 * 框架页面集成脚本
 * 用于处理嵌套在iframe中的页面与主框架的通信
 */

// 判断当前页面是否在iframe中
const isInIframe = window !== window.parent;

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    if (isInIframe) {
        // 添加框架集成功能
        setupFrameIntegration();
    }
});

/**
 * 设置框架集成功能
 */
function setupFrameIntegration() {
    // 拦截所有导航链接，使其在框架内导航
    interceptNavigationLinks();
    
    // 移除冗余的导航栏（如果存在）
    // hideRedundantNavigation();
}

/**
 * 拦截页面中的导航链接，改为使用主框架导航
 */
function interceptNavigationLinks() {
    // 获取所有页面中的导航链接
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const href = this.getAttribute('href');
            const pageName = this.textContent.trim();
            
            // 向父窗口发送导航请求
            navigateInParent(href, pageName);
        });
    });
    
    // 其他可能的导航元素
    const actionButtons = document.querySelectorAll('[onclick*="location.href"]');
    
    actionButtons.forEach(button => {
        const originalOnclick = button.getAttribute('onclick');
        if (originalOnclick && originalOnclick.includes('location.href')) {
            // 提取URL
            const match = originalOnclick.match(/location\.href\s*=\s*['"]([^'"]+)['"]/);
            if (match && match[1]) {
                const url = match[1];
                
                // 替换原有的onclick处理程序
                button.setAttribute('onclick', '');
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    
                    // 从按钮文本或附近元素获取页面名称
                    let pageName = button.textContent.trim();
                    if (!pageName || pageName === '') {
                        pageName = '页面';
                    }
                    
                    // 向父窗口发送导航请求
                    navigateInParent(url, pageName);
                });
            }
        }
    });
}

/**
 * 在父窗口中导航到指定URL
 */
function navigateInParent(url, pageName) {
    // 向父窗口发送消息
    window.parent.postMessage({
        action: 'navigate',
        url: url,
        pageName: pageName
    }, '*');
}

/**
 * 隐藏页面中的冗余导航元素
 */
function hideRedundantNavigation() {
    // 隐藏导航链接（如果在框架中会重复）
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = 'none';
    }
    
    // 可以根据需要隐藏其他冗余元素
}

/**
 * 公开的API函数，供页面直接调用导航
 */
function navigateTo(url, pageName) {
    if (isInIframe) {
        navigateInParent(url, pageName);
    } else {
        window.location.href = url;
    }
} 