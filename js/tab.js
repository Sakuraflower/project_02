var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.add');
        this.ul = this.main.querySelector('.nav ul:first-child');
        this.content = this.main.querySelector('.content');
        this.init();
    }
    init() {
        this.update();
        //初始化操作放事件绑定
        //绑定导航栏点击事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.clear[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.updataTab;
            this.contents[i].ondblclick = this.updataTab;
        }
        //绑定+号添加事件
        this.add.onclick = this.addTab;
    }

    //获取生成新的元素
    update() {
        this.lis = this.main.querySelectorAll('li');
        this.contents = this.main.querySelectorAll('section');
        this.clear = this.main.querySelectorAll('.clear');
        this.spans = this.main.querySelectorAll('.nav li span');

    }

    //切换功能
    toggleTab() {
        console.log(this.index);
        that.clearclass();
        this.className = 'clearborder';
        that.contents[this.index].className = 'show';
    }

    clearclass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.contents[i].className = '';
        }
    }
    // 添加
    addTab() {
        that.clearclass();
        var li = '<li class="clearborder"><span>新的标签</span> <div class="clear">*</div></li>';
        var section = '<section class="show">新内容</section>'
        that.ul.insertAdjacentHTML('beforeend', li);
        that.content.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    //修改
    updataTab() {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        var text1 = this.innerHTML;
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = text1;
        input.select();
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        // 键盘事件
        input.onkeyup = function (e) {
            console.log(e.keyCode);
            if (e.keyCode === 13) {
                input.blur();
            }
        }
    }

    //删除
    removeTab(e) {
        e.stopPropagation();
        var index = this.parentNode.index;
        this.parentNode.remove();
        that.contents[index].remove();
        if (document.querySelector('.clearborder'))
            return;
        index--;
        that.lis[index] && that.lis[index].click();
    }
}
new Tab("#TAB");