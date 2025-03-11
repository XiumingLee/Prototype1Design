/**
 * 地址关联管理页面脚本
 */

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化模态框
    initModals();
});

/**
 * 切换标签页显示
 * @param {string} tabId - 要显示的标签页ID
 */
function switchTab(tabId) {
    // 隐藏所有标签页内容
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // 取消选中所有标签
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // 显示选中的标签页内容
    document.getElementById(tabId).classList.add('active');
    
    // 选中对应的标签
    const currentTabIndex = tabId === 'linked' ? 0 : 1;
    tabs[currentTabIndex].classList.add('active');
}

/**
 * 选择地址来源系统（未关联地址标签页）
 * @param {string} system - 系统类型：construction(住建局), heating(供热), gas(燃气)
 */
function selectSystem(system) {
    // 取消选中所有系统选项
    const systemOptions = document.querySelectorAll('.system-option');
    systemOptions.forEach(option => option.classList.remove('active'));
    
    // 选中当前系统选项
    const systemIndex = {
        'construction': 0,
        'heating': 1,
        'gas': 2
    }[system];
    
    systemOptions[systemIndex].classList.add('active');
    
    // 这里可以添加加载对应系统未关联地址的逻辑
    loadUnlinkedAddresses(system);
}

/**
 * 加载未关联地址数据
 * @param {string} system - 系统类型
 */
function loadUnlinkedAddresses(system) {
    // 模拟API请求，实际项目中应替换为真实API调用
    console.log(`加载${system}系统的未关联地址`);
    
    // 这里应该是异步请求服务器数据
    // 示例：模拟数据加载
    let mockData;
    
    switch(system) {
        case 'construction':
            mockData = [
                { id: 101, address: '北京市朝阳区建国路街道建国社区建国小区12栋3单元8楼802号' },
                { id: 102, address: '北京市海淀区学院路街道学院社区学院路小区5号楼2单元11层1102室' },
                { id: 103, address: '北京市西城区西直门街道西直门社区西直门小区7号楼1单元4层401室' }
            ];
            break;
        case 'heating':
            mockData = [
                { id: 201, address: '北京市朝阳区建国路街道建国小区12号楼3单元8层802室' },
                { id: 202, address: '北京市海淀区学院路街道学院路小区5栋2单元11楼1102' },
                { id: 203, address: '北京市西城区西直门街道西直门小区7栋1单元4楼401' }
            ];
            break;
        case 'gas':
            mockData = [
                { id: 301, address: '北京市朝阳区建国路街道建国社区建国小区12号楼3单元8楼802号' },
                { id: 302, address: '北京市海淀区学院路街道学院社区学院路小区5号楼2单元11层1102号' },
                { id: 303, address: '北京市西城区西直门街道西直门社区西直门小区7号楼1单元4层401号' }
            ];
            break;
    }
    
    // 更新表格数据
    updateUnlinkedTable(mockData);
}

/**
 * 更新未关联地址表格
 * @param {Array} data - 地址数据
 */
function updateUnlinkedTable(data) {
    const tableBody = document.getElementById('unlinkedTable');
    if (!tableBody) return;
    
    // 清空表格
    tableBody.innerHTML = '';
    
    // 填充数据
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" name="addressId" value="${item.id}"></td>
            <td>${item.address}</td>
            <td>
                <button class="action-btn btn-view" onclick="viewAddress(${item.id})">查看</button>
                <button class="action-btn btn-primary" onclick="linkAddress(${item.id})">关联</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * 全选/取消全选
 */
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('input[name="addressId"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

/**
 * 搜索已关联地址
 */
function searchAddresses() {
    const keyword = document.getElementById('searchLinked').value.trim();
    console.log(`搜索关键字: ${keyword}`);
    
    // 实际项目中应该发起API请求搜索数据
    // 这里仅作为示例
    alert(`正在搜索: ${keyword}`);
}

/**
 * 搜索未关联地址
 */
function searchUnlinkedAddresses() {
    const keyword = document.getElementById('searchUnlinked').value.trim();
    
    // 获取当前选中的系统
    const activeSystem = document.querySelector('.system-option.active');
    const systemType = activeSystem ? activeSystem.textContent.includes('住建局') ? 'construction' : 
                                     activeSystem.textContent.includes('供热') ? 'heating' : 'gas' : 'construction';
    
    console.log(`系统: ${systemType}, 关键字: ${keyword}`);
    
    // 实际项目中应该发起API请求搜索数据
    // 这里仅作为示例
    alert(`正在搜索${systemType}系统中的: ${keyword}`);
}

/**
 * 查看地址详情
 * @param {number} id - 地址ID
 */
function viewAddress(id) {
    // 页面跳转到地址详情页
    window.location.href = `address-detail.html?id=${id}`;
}

/**
 * 创建单个地址关联
 * @param {number} id - 地址ID
 */
function linkAddress(id) {
    // 跳转到创建关联页面，并传递选中的地址ID
    window.location.href = `create-relation.html?id=${id}`;
}

/**
 * 批量创建地址关联
 */
function batchLinkAddresses() {
    // 获取选中的地址ID
    const checkboxes = document.querySelectorAll('input[name="addressId"]:checked');
    const selectedIds = Array.from(checkboxes).map(checkbox => checkbox.value);
    
    if (selectedIds.length === 0) {
        alert('请至少选择一个地址');
        return;
    }
    
    console.log(`选中的地址ID: ${selectedIds.join(', ')}`);
    
    // 跳转到创建关联页面，并传递选中的地址ID
    window.location.href = `create-relation.html?ids=${selectedIds.join(',')}`;
}

/**
 * 弹出确认解除关联的模态框
 * @param {string} relationId - 关联ID
 */
function confirmUnlinkAddress(relationId) {
    document.getElementById('unlinkRelationId').textContent = relationId;
    showModal('unlinkModal');
}

/**
 * 解除地址关联
 */
function unlinkAddress() {
    const relationId = document.getElementById('unlinkRelationId').textContent;
    console.log(`解除关联: ${relationId}`);
    
    // 实际项目中应该发起API请求解除关联
    // 这里仅作为示例
    setTimeout(() => {
        closeModal('unlinkModal');
        // 显示成功消息
        alert(`成功解除关联: ${relationId}`);
        // 重新加载已关联地址列表（实际项目中）
    }, 500);
}

/**
 * 创建新的关联关系
 */
function createRelation() {
    // 获取选择的地址数据
    const constructionAddressId = document.querySelector('input[name="constructionAddress"]:checked')?.value;
    const heatingAddressId = document.querySelector('input[name="heatingAddress"]:checked')?.value;
    const gasAddressId = document.querySelector('input[name="gasAddress"]:checked')?.value;
    const description = document.getElementById('relationDescription').value;
    
    // 验证是否至少选择了两个系统的地址
    const selectedCount = [constructionAddressId, heatingAddressId, gasAddressId].filter(Boolean).length;
    if (selectedCount < 2) {
        alert('请至少选择两个系统的地址进行关联');
        return;
    }
    
    console.log('创建关联关系：', {
        constructionAddressId,
        heatingAddressId,
        gasAddressId,
        description
    });
    
    // 实际项目中应该发起API请求创建关联
    // 这里仅作为示例
    setTimeout(() => {
        // 显示成功模态框
        document.getElementById('newRelationId').textContent = 'R' + Date.now().toString().substring(0, 10);
        showModal('successModal');
    }, 500);
}

/**
 * 搜索住建局系统地址
 */
function searchConstructionAddresses() {
    const keyword = document.getElementById('constructionSearchInput').value.trim();
    console.log(`搜索住建局地址: ${keyword}`);
    
    // 实际项目中应该发起API请求搜索数据
    // 这里仅作为示例
    alert(`正在搜索住建局系统中的: ${keyword}`);
}

/**
 * 搜索供热系统地址
 */
function searchHeatingAddresses() {
    const keyword = document.getElementById('heatingSearchInput').value.trim();
    console.log(`搜索供热系统地址: ${keyword}`);
    
    // 实际项目中应该发起API请求搜索数据
    // 这里仅作为示例
    alert(`正在搜索供热系统中的: ${keyword}`);
}

/**
 * 搜索燃气系统地址
 */
function searchGasAddresses() {
    const keyword = document.getElementById('gasSearchInput').value.trim();
    console.log(`搜索燃气系统地址: ${keyword}`);
    
    // 实际项目中应该发起API请求搜索数据
    // 这里仅作为示例
    alert(`正在搜索燃气系统中的: ${keyword}`);
}

/**
 * 初始化模态框
 */
function initModals() {
    // 点击模态框外部区域关闭模态框
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

/**
 * 显示模态框
 * @param {string} modalId - 模态框ID
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
}

/**
 * 关闭模态框
 * @param {string} modalId - 模态框ID
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    }
} 