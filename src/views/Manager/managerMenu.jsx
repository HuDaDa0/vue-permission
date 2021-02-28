// import store from "@/store";

import { createNamespacedHelpers } from "vuex";

let { mapState } = createNamespacedHelpers("user");

export default {
  data() {
    return {
      menuList: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    let authList = this.userInfo.authList;
    // 要构造 [ { a: { children: [] } } ]
    this.menuList = this.getMenList(authList);
  },
  methods: {
    getMenList(authList) {
      let menu = [];
      let sourceMap = {};
      authList.forEach(m => {
        m.children = [];
        sourceMap[m.id] = m;
        if (m.pid === -1) {
          menu.push(m);
        } else {
          sourceMap[m.pid] && sourceMap[m.pid].children.push(m);
        }
      });
      return menu;
    }
  },

  render() {
    let renderChildren = data => {
      return data.map(child => {
        return child.children.length ? (
          <el-submenu index={child.id}>
            <div slot="title">{child.name}</div>
            {renderChildren(child.children)}
          </el-submenu>
        ) : (
          <el-menu-item index={child.path}>{child.path}</el-menu-item>
        );
      });
    };
    return (
      <el-menu
        router={true}
        background-color="pink"
        text-color="#fff"
        active-text-color="#fff"
      >
        {renderChildren(this.menuList)}
      </el-menu>
    );
  }
};
