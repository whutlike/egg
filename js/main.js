document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 加载配置文件
        // 添加时间戳防止缓存，确保修改config后刷新立即生效
        const response = await fetch('js/config.json?t=' + new Date().getTime());
        const config = await response.json();

        // 渲染头像
        document.getElementById('avatar-img').src = config.avatar;

        // 渲染名字和简介
        document.getElementById('user-name').innerText = config.name;
        document.getElementById('user-bio').innerHTML = config.bio;

        // 渲染导航图标
        const navContainer = document.getElementById('nav-list');
        config.links.forEach(link => {
            const a = document.createElement('a');
            a.className = 'nav-item';
            a.href = link.url;
            a.target = '_blank';

            a.innerHTML = `
                <i class="${link.icon} nav-icon"></i>
                <span class="nav-label">${link.name}</span>
            `;
            navContainer.appendChild(a);
        });

        // 渲染联系方式
        const contactContainer = document.getElementById('contact-list');

        if (config.contacts.wechat) {
            const wechatDiv = document.createElement('div');
            wechatDiv.className = 'contact-item';
            wechatDiv.innerHTML = `<i class="ri-wechat-line"></i> <span>${config.contacts.wechat}</span>`;
            contactContainer.appendChild(wechatDiv);
        }

        if (config.contacts.email) {
            const emailDiv = document.createElement('div');
            emailDiv.className = 'contact-item';
            emailDiv.innerHTML = `<i class="ri-mail-line"></i> <span>${config.contacts.email}</span>`;
            contactContainer.appendChild(emailDiv);
        }

        // 渲染底部版权 (新增)
        if (config.footer) {
            document.getElementById('footer-text').innerText = config.footer;
        }

    } catch (error) {
        console.error('加载配置失败:', error);
        document.body.innerHTML = '<h1 style="color:red; text-align:center; margin-top:50px;">页面加载失败，请检查配置文件</h1>';
    }
});