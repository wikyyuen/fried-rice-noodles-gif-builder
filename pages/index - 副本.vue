
<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col
              ><span style="font-weight: bold">炒粉GIF生成器</span></el-col
            >
          </el-row>
        </div>
      </el-header>
      <el-main>
        <el-row type="flex" class="row-bg" justify="center" align="middle">
          <el-col>
            <div height="220px" width="220px">
              <i class="el-icon-loading" v-show="loading"></i>
              <!-- <div id="gif" v-show="!loading"></div> -->
              <img :src="img_gif" alt="" />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <el-select placeholder="请选择" v-model="gif_type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <el-input
              class="grid-content"
              v-model="right_up_input"
              placeholder="请输入内容"
              maxlength="6"
              show-word-limit
            ></el-input>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <el-input
              class="grid-content"
              v-model="position"
              placeholder="请输入职位"
              maxlength="5"
              show-word-limit
            ></el-input>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="3" :xl="3">
            <el-button
              class="grid-content"
              type="primary"
              v-on:click="reflushGif()"
              >刷新</el-button
            >
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col><span>Created By Yuen，仅供学习</span></el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
export default {
  // modules:[
  //   'gifshot'
  // ],
  data() {
    return {
      input: "123",
      right_up_input: "10元/份",
      position: "PHP",
      loading: true,
      img_gif: "",
      gif_type: "barbecue",
      options: [
        {
          value: "fried_rice_noodles",
          label: "炒粉",
        },
        {
          value: "barbecue",
          label: "烧烤",
        },
      ],
      gif_list: {
        fried_rice_noodles: { length: 21, name: "炒粉" },
        barbecue: { length: 20, name: "烧烤" },
      },
    };
  },

};
</script>

