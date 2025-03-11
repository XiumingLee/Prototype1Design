// 全局变量
let currentPage = 1;
let totalPages = 10;
let pageSize = 10;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 判断是否是详情页
    if (location.pathname.includes('community-detail.html')) {
        initDetailPage();
    } else {
        initListPage();
    }
});

// 初始化列表页
function initListPage() {
    loadCommunityList();
    // 绑定筛选条件联动
    bindFilterEvents();
}

// 初始化详情页
function initDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const id = urlParams.get('id');

    if (mode === 'add') {
        // 新增模式
        document.title = '新增小区';
        document.querySelector('.page-title').innerHTML = '<i class="fas fa-plus"></i> 新增小区';
        document.querySelector('.subtitle').textContent = '创建新的小区信息';
        // 生成小区编码
        generateCommunityCode();
    } else if (id) {
        // 编辑模式
        loadCommunityDetail(id);
    }
}

// 加载小区列表数据
function loadCommunityList() {
    // 使用模拟数据
    const mockData = [
        {
            id: 'XQ202401001',
            name: '恒大名都',
            shortName: '恒大名都',
            registeredName: '恒大名都小区',
            district: '历下区',
            street: '泉城路街道',
            community: '泉城社区',
            blueCardNumber: '泉城路街道001号',
            updateTime: '2024-01-15 14:30'
        },
        {
            id: 'XQ202401002',
            name: '中海国际社区',
            shortName: '中海国际',
            registeredName: '中海国际社区',
            district: '历下区',
            street: '解放路街道',
            community: '解放社区',
            blueCardNumber: '解放路街道023号',
            updateTime: '2024-01-15 15:20'
        },
        {
            id: 'XQ202401003',
            name: '绿地中心',
            shortName: '绿地',
            registeredName: '绿地中心住宅区',
            district: '市中区',
            street: '大观园街道',
            community: '大观园社区',
            blueCardNumber: '大观园街道108号',
            updateTime: '2024-01-15 16:45'
        },
        {
            id: 'XQ202401004',
            name: '万科城市花园',
            shortName: '万科花园',
            registeredName: '万科城市花园小区',
            district: '槐荫区',
            street: '振兴街街道',
            community: '振兴社区',
            blueCardNumber: '振兴街街道056号',
            updateTime: '2024-01-16 09:15'
        },
        {
            id: 'XQ202401005',
            name: '保利华庭',
            shortName: '保利华庭',
            registeredName: '保利华庭住宅区',
            district: '历下区',
            street: '千佛山街道',
            community: '千佛山社区',
            blueCardNumber: '千佛山街道088号',
            updateTime: '2024-01-16 10:30'
        },
        {
            id: 'XQ202401006',
            name: '融创茂悦府',
            shortName: '茂悦府',
            registeredName: '融创茂悦府小区',
            district: '市中区',
            street: '舜玉路街道',
            community: '舜玉社区',
            blueCardNumber: '舜玉路街道166号',
            updateTime: '2024-01-16 11:20'
        },
        {
            id: 'XQ202401007',
            name: '龙湖春江郦城',
            shortName: '春江郦城',
            registeredName: '龙湖春江郦城小区',
            district: '槐荫区',
            street: '道德街街道',
            community: '道德社区',
            blueCardNumber: '道德街街道198号',
            updateTime: '2024-01-16 14:00'
        },
        {
            id: 'XQ202401008',
            name: '金地悦江时代',
            shortName: '悦江时代',
            registeredName: '金地悦江时代小区',
            district: '历下区',
            street: '泉城路街道',
            community: '泉城社区',
            blueCardNumber: '泉城路街道218号',
            updateTime: '2024-01-16 15:45'
        },
        {
            id: 'XQ202401009',
            name: '碧桂园凤凰城',
            shortName: '凤凰城',
            registeredName: '碧桂园凤凰城小区',
            district: '市中区',
            street: '四里村街道',
            community: '四里村社区',
            blueCardNumber: '四里村街道168号',
            updateTime: '2024-01-16 16:30'
        },
        {
            id: 'XQ202401010',
            name: '华润中央公园',
            shortName: '中央公园',
            registeredName: '华润中央公园小区',
            district: '槐荫区',
            street: '中大槐树街道',
            community: '槐树社区',
            blueCardNumber: '中大槐树街道128号',
            updateTime: '2024-01-16 17:15'
        }
    ];

    renderCommunityList(mockData);
}

// 渲染小区列表
function renderCommunityList(data) {
    const tbody = document.querySelector('.community-table tbody');
    if (!tbody) return;

    tbody.innerHTML = data.map((item, index) => `
        <tr>
            <td>${(currentPage - 1) * pageSize + index + 1}</td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.shortName || '-'}</td>
            <td>${item.registeredName || '-'}</td>
            <td>${item.district}</td>
            <td>${item.street}</td>
            <td>${item.community}</td>
            <td>${item.blueCardNumber || '-'}</td>
            <td>${item.updateTime}</td>
            <td>
                <button class="action-btn view" onclick="viewDetail('${item.id}')">
                    <i class="fas fa-eye"></i> 查看
                </button>
                <button class="action-btn edit" onclick="editCommunity('${item.id}')">
                    <i class="fas fa-edit"></i> 编辑
                </button>
            </td>
        </tr>
    `).join('');
}

// 加载小区详情
function loadCommunityDetail(id) {
    // TODO: 实际项目中这里应该调用后端API
    // 这里使用模拟数据
    const mockDetail = {
        id: 'XQ202401001',
        name: '恒大名都',
        shortName: '恒大名都',
        registeredName: '恒大名都小区',
        promotionalName: '恒大名都花园',
        alias: '恒大小区',
        district: '历下区',
        street: '泉城路街道',
        community: '泉城社区',
        blueCardNumber: '泉城路街道001号',
        buildYear: 2018,
        totalArea: 150000,
        remarks: '这是一个示例小区'
    };

    fillDetailForm(mockDetail);
}

// 填充详情表单
function fillDetailForm(data) {
    Object.keys(data).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = data[key];
        }
    });
}

// 生成小区编码
function generateCommunityCode() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    const code = `XQ${year}${month}${random}`;
    
    document.getElementById('communityCode').value = code;
}

// 保存小区信息
function saveCommunity() {
    // 表单验证
    if (!validateForm()) {
        return;
    }

    // 收集表单数据
    const formData = {
        communityCode: document.getElementById('communityCode').value,
        communityName: document.getElementById('communityName').value,
        shortName: document.getElementById('communityShortName').value,
        registeredName: document.getElementById('registeredName').value,
        promotionalName: document.getElementById('promotionalName').value,
        alias: document.getElementById('alias').value,
        district: document.getElementById('district').value,
        street: document.getElementById('street').value,
        community: document.getElementById('community').value,
        blueCardNumber: document.getElementById('blueCardNumber').value,
        buildYear: document.getElementById('buildYear').value,
        totalArea: document.getElementById('totalArea').value,
        remarks: document.getElementById('remarks').value
    };

    // TODO: 实际项目中这里应该调用后端API保存数据
    console.log('保存的数据：', formData);
    
    // 模拟保存成功
    alert('保存成功！');
    location.href = 'community-list.html';
}

// 表单验证
function validateForm() {
    const requiredFields = ['communityName', 'district', 'street', 'community'];
    let isValid = true;

    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.classList.add('invalid');
            isValid = false;
        } else {
            element.classList.remove('invalid');
        }
    });

    if (!isValid) {
        alert('请填写必填项！');
    }

    return isValid;
}

// 查看详情
function viewDetail(id) {
    location.href = `community-detail.html?id=${id}&mode=view`;
}

// 编辑小区
function editCommunity(id) {
    location.href = `community-detail.html?id=${id}&mode=edit`;
}

// 绑定筛选条件联动
function bindFilterEvents() {
    const districtFilter = document.getElementById('districtFilter');
    const streetFilter = document.getElementById('streetFilter');
    
    if (districtFilter) {
        districtFilter.addEventListener('change', function() {
            updateStreetOptions(this.value);
        });
    }
    
    if (streetFilter) {
        streetFilter.addEventListener('change', function() {
            updateCommunityOptions(this.value);
        });
    }
}

// 更新街道选项
function updateStreetOptions(district) {
    // TODO: 实际项目中应该根据选择的区县从后端获取对应的街道列表
    const streetFilter = document.getElementById('streetFilter');
    if (!streetFilter) return;

    // 这里使用模拟数据
    const streetOptions = {
        '历下区': ['泉城路街道', '解放路街道', '千佛山街道'],
        '市中区': ['大观园街道', '舜玉路街道', '四里村街道'],
        '槐荫区': ['振兴街街道', '中大槐树街道', '道德街街道'],
    };

    const options = streetOptions[district] || [];
    streetFilter.innerHTML = `
        <option value="">全部</option>
        ${options.map(street => `<option value="${street}">${street}</option>`).join('')}
    `;

    // 清空社区选择
    document.getElementById('communityFilter').innerHTML = '<option value="">全部</option>';
}

// 更新社区选项
function updateCommunityOptions(street) {
    // TODO: 实际项目中应该根据选择的街道从后端获取对应的社区列表
    const communityFilter = document.getElementById('communityFilter');
    if (!communityFilter) return;

    // 这里使用模拟数据
    const communityOptions = {
        '泉城路街道': ['泉城社区', '解放社区', '大明湖社区'],
        '解放路街道': ['解放社区', '革命社区', '建设社区'],
        '千佛山街道': ['千佛山社区', '文化社区', '科技社区'],
    };

    const options = communityOptions[street] || [];
    communityFilter.innerHTML = `
        <option value="">全部</option>
        ${options.map(community => `<option value="${community}">${community}</option>`).join('')}
    `;
}

// 应用筛选条件
function applyFilters() {
    const filters = {
        district: document.getElementById('districtFilter').value,
        street: document.getElementById('streetFilter').value,
        community: document.getElementById('communityFilter').value,
        name: document.getElementById('nameFilter').value
    };

    // TODO: 实际项目中这里应该调用后端API进行筛选
    console.log('应用筛选条件：', filters);
    
    // 重新加载列表
    loadCommunityList();
}

// 重置筛选条件
function resetFilters() {
    const filterForm = document.querySelector('.filter-section');
    if (!filterForm) return;

    // 重置所有选择和输入
    filterForm.querySelectorAll('select, input').forEach(element => {
        element.value = '';
    });

    // 重新加载列表
    loadCommunityList();
}

// 分页相关函数
function changePage(page) {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    document.getElementById('currentPage').textContent = currentPage;
    
    // 重新加载列表数据
    loadCommunityList();
} 