<style>
.div-center{
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-box-orient: vertical;
  text-align: center;
}
</style>
<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col><span style="font-weight: bold">炒粉GIF生成器</span></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row >
          <el-col class="div-center">
              <el-image style="width: 240px; height: 220px" class="div-center" :src="img_gif">
                <div slot="error" class="image-slot">
                  <i class="el-icon-loading"></i>
                </div>
              </el-image>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="row-bg" justify="center">
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
      <el-footer class="div-center">
        <el-row class="row-bg" justify="center">
          <el-col>
            <el-link
              href="https://github.com/wikyyuen/fried-rice-noodles-gif-builder"
              target="_blank"
              type="primary"
              >github</el-link
            >
          </el-col>
        </el-row>

        <el-row class="row-bg" justify="center">
          <el-col><span>Created By Yuen，仅供学习</span> </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import gifshot from "gifshot";
// import fabric from "fabric";
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
      // gif:"",
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
      github_icon: require("~/assets/github-fill.svg"),
    };
  },

  mounted() {
    this.reflushGif();
  },
  methods: {
    createGIF(images) {
      // console.log(images)
      let that = this;
      gifshot.createGIF(
        {
          images: images,
          gifWidth: 240,
          gifHeight: 220,
        },
        function (obj) {
          if (!obj.error) {
            that.img_gif = obj.image;
            that.loading = false;
          }
        }
      );
    },
    mergePic(images, style, input, func) {
      let new_images = [];
      let promise_list = [];
      images.map((item, index) => {
        const pro = new Promise((resolve, reject) => {
          const canvas = document.createElement("canvas");
          canvas.width = 240;
          canvas.height = 220;

          const ctx = canvas.getContext("2d");
          let img = new Image();
          img.src = item;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, 240, 135);
            let img2 = new Image();
            img2.src = style.payicon;
            img2.onload = () => {
              ctx.drawImage(img2, 0, 135, 240, 85);
              let img3 = new Image();
              img3.src = style.juhuasuan;
              img3.onload = () => {
                ctx.drawImage(img3, 0, 0, 70, 30);
                //添加文字
                ctx.font = "bolder 24px Microsoft YaHei";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                ctx.fillStyle = "#000000";
                ctx.fillText(
                  "落魄" + input.position + " 在线" + input.gif_name,
                  120,
                  172
                );
                ctx.font = "bolder 22px Microsoft YaHei";
                ctx.fillStyle = "#000000";
                ctx.textAlign = "right";
                ctx.textBaseline = "top";
                ctx.fillText(input.right_up_input, 235, 15);
                ctx.strokeStyle = "red";
                ctx.lineWidth = 5;
                ctx.strokeRect(0, 0, 240, 220);
                let base64 = canvas.toDataURL();
                // new_images.push({ base: 1, item: image });
                new_images[index] = base64;
                resolve();
              };
            };
          };
        });
        promise_list.push(pro);
      });
      Promise.all(promise_list).then(() => {
        func(new_images);
      });
    },
    reflushGif() {
      this.loading = true;
      this.img_gif = "";
      let gif_msg = this.gif_list[this.gif_type];
      let images = [];
      for (let index = 1; index <= gif_msg.length; index++) {
        images.push(
          require("~/assets/" + this.gif_type + "/" + index + ".jpg")
        );
      }
      let new_images = [];
      let style = {
        payicon: require("~/assets/payicon.jpeg"),
        juhuasuan: require("~/assets/juhuasuan.png"),
      };
      let input = {
        right_up_input: this.right_up_input,
        position: this.position,
        gif_name: gif_msg.name,
      };
      // this.mergePic(images, style, input, new_images, this.createGIF);
      this.mergePic(images, style, input, this.createGIF);
    },
  },
};
</script>

