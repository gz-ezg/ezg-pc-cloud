import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
    state: {
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        dontCache: ['channelManagement', 'channelType_index'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        //  菜单权限
        updateMenulist (state) {
            // let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];
            // console.log(appRouter)
            appRouter.forEach((item, index) => {
                // console.log(typeof(item.access))
                // console.log(item.access)
                if (item.access != undefined) {
                    let _data = ("" + (Cookies.get('access'))).split(',')
                    // console.log(_data)
                    for (let i = 0; i < _data.length; i++) {
                        let accessCode = parseInt(_data[i])
                        if (Util.showThisRoute(item.access, accessCode)) {
                            //  父级菜单下面只有一个菜单的，默认给所有！
                            if (item.children.length === 1) {
                                menuList.push(item);
                            } else {
                                //  父级菜单下面有多个自己菜单的
                                // menuList.push(item)
                                // let len = menuList.length
                                // 等价于下面这句。。
                                let len = menuList.push(item);
                                let childrenArr = [];
                                for (let k = 0; k < item.children.length; k++) {
                                    for (let j = 0; j < _data.length; j++) {
                                        let accessCode2 = parseInt(_data[j])
                                        // console.log(accessCode2)
                                        if (item.children[k].access !== undefined) {
                                            if (item.children[k].access === accessCode2) {
                                                childrenArr.push(item.children[k])
                                            }
                                        }
                                    }
                                }
                                // if (childrenArr.length == 1) {
                                //     console.log(childrenArr)
                                //     menuList[len - 1].title = childrenArr[0].title
                                // }
                                // console.log(menuList[len-1])
                                //  直接替换孩纸
                                menuList[len - 1].children = childrenArr;
                            }
                        }
                    }
                } else {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (Util.showThisRoute(child.access, accessCode)) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                        handledItem.children = childrenArr;
                        menuList.splice(len - 1, 1, handledItem);
                    }
                }
            });
            state.menuList = menuList;
            // console.log(menuList)
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage (state) {
            // if (localStorage.cachePage) {
            //     state.cachePage = JSON.parse(localStorage.cachePage);
            // }
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            // state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang (state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount (state, count) {
            state.messageCount = count;
        },
        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                // 注释原因，页面未打开会刷出标签，可以直接访问，原因未知，cachePage的数据不知道哪里来的
                // localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            // localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        increateTagOnIndex (state, obj) {
            if (!Util.oneOf(obj.tagObj.name, state.dontCache)) {
                state.cachePage.push(obj.tagObj.name);
                // 注释原因，页面未打开会刷出标签，可以直接访问，原因未知，cachePage的数据不知道哪里来的
                // localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.splice(obj.index, 0, obj.tagObj )
            // localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    }
};

export default app;
