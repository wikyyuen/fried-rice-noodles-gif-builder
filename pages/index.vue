
<template>
  <div>
    <el-container>
      <el-head class="head-parent-class">
        <div class="head-div-class">
          <el-row type="flex" class="row-bg" justify="left">
            <el-col :offset="2"
              ><span font-weight="bold">屌图生成器</span></el-col
            >
          </el-row>
        </div>
      </el-head>
      <el-main height="100%">
        <el-row type="flex" class="row-bg" justify="center" align="middle">
          <div height="220px" width="220px">
            <i class="el-icon-loading" v-show="loading"></i>
            <div id="gif" v-show="!loading"></div>
          </div>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="4">
            <el-input
              class="grid-content"
              v-model="right_up_input"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              class="grid-content"
              v-model="position"
              placeholder="请输入职位"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="2">
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
          <el-col><span>Create By Yuen，仅供学习</span></el-col>
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
    };
  },

  mounted() {
    this.reflushGif();
  },
  methods: {
    createGIF(images) {
      gifshot.createGIF(
        {
          images: images,
          gifWidth: 240,
          gifHeight: 220,
        },
        function (obj) {
          if (!obj.error) {
            var image = obj.image,
              animatedImage = document.createElement("img");
            animatedImage.src = image;
            document.getElementById("gif").innerHTML = "";
            document.getElementById("gif").appendChild(animatedImage);
          }
        }
      );
    },
    mergePic(images, right_up_input, position) {
      let new_images = [];
      let userPromis = async () => {
        let pro;
        const payicon = require("~/assets/payicon.jpeg");
        const juhuasuan = require("~/assets/juhuasuan.png");
        const promiseList = [];
        images.map((item, index) => {
          // promiseList.push(
          pro = new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            canvas.width = 240;
            canvas.height = 220;

            // document.body.appendChild(canvas);
            const ctx = canvas.getContext("2d");
            var img = new Image();
            img.src = item;
            img.onload = () => {
              ctx.drawImage(img, 0, 0, 240, 135);
              var img2 = new Image();
              img2.src = payicon;
              img2.onload = () => {
                ctx.drawImage(img2, 0, 135, 240, 85);
                var img3 = new Image();
                img3.src = juhuasuan;
                img3.onload = () => {
                  ctx.drawImage(img3, 0, 0, 70, 30);
                  //添加文字
                  ctx.font = "bolder 24px Microsoft YaHei";
                  ctx.textAlign = "center";
                  ctx.textBaseline = "bottom";
                  ctx.fillStyle = "#000000";
                  ctx.fillText("落魄" + position + " 在线" + "炒粉", 120, 172);
                  ctx.font = "bolder 22px Microsoft YaHei";
                  ctx.fillStyle = "#000000";
                  ctx.textAlign = "right";
                  ctx.textBaseline = "top";
                  ctx.fillText(right_up_input, 235, 15);
                  ctx.strokeStyle = "red";
                  ctx.lineWidth = 5;
                  ctx.strokeRect(0, 0, 240, 220);
                  var base64 = canvas.toDataURL();
                  var oneimg = new Image();
                  oneimg.src = base64;
                  oneimg.onload = () => {
                    new_images.push(oneimg);
                    resolve();
                  };
                  // resolve(canvas.toDataURL());
                };
              };
            };
          });
          // );
        });
        await pro;

        // return Promise.all(promiseList).then((result) => {
        //   result.map((item) => {
        //     new_images.push(item);
        //     console.log(new_images.length)
        //   });
        //   return new_images;
        // });
      };
      userPromis();
      return new_images;
    },
    reflushGif() {
      this.loading = true;
      var images = [
        require("~/assets/caofen1/1639552591-1.jpg"),
        require("~/assets/caofen1/1639552591-2.jpg"),
        require("~/assets/caofen1/1639552591-3.jpg"),
        require("~/assets/caofen1/1639552591-4.jpg"),
        require("~/assets/caofen1/1639552591-5.jpg"),
        require("~/assets/caofen1/1639552591-6.jpg"),
        require("~/assets/caofen1/1639552591-7.jpg"),
        require("~/assets/caofen1/1639552591-8.jpg"),
        require("~/assets/caofen1/1639552591-9.jpg"),
        require("~/assets/caofen1/1639552591-10.jpg"),
        require("~/assets/caofen1/1639552591-11.jpg"),
        require("~/assets/caofen1/1639552591-12.jpg"),
        require("~/assets/caofen1/1639552591-13.jpg"),
        require("~/assets/caofen1/1639552591-14.jpg"),
        require("~/assets/caofen1/1639552591-15.jpg"),
        require("~/assets/caofen1/1639552591-16.jpg"),
      ];
      //图片合并
      var images = this.mergePic(images, this.right_up_input, this.position);

      setTimeout(() => {
        this.createGIF(images);
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

