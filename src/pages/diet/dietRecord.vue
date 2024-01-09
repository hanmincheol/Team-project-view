<script setup>


const uploadImg = e =>{
  console.log(e.target.files);
  const imgUrl = URL.createObjectURL(e.target.files[0]); //이미지 url 생성
  console.log(typeof imgUrl)
  console.log(imgUrl)
  var imageDiv = document.querySelector('#img');
  console.log(imageDiv);
  console.log(imageDiv.src);
  imageDiv.style.width = '250px';
  imageDiv.style.height = '250px';
  imageDiv.src = imgUrl;
  console.log('함수 끝');
}

const handleUpload = () => {
  var btn = document.getElementById('filebtn');
  btn.fileInput.click();
}
const rules = [fileList => !fileList || !fileList.length || fileList[0].size < 1000000 || 'Avatar size should be less than 1 MB!']
</script>
<template>
<VRow :style="{'margin-top':'120px'}">
  <VCol cols="6">
    
    <v-card class="text-high-emphasis text-center">
      <div :style="{'display':'flex', 'justify-content':'center','margin':'20px'}">
        <h2>식전 사진</h2>
      </div>
      <VCardItem :style="{'margin-top':'10px'}">
        <input @change="uploadImg" type="file" id="file" hidden> <!--test-->
        <label for="file" class="input-plus">
          <div :style="{'border-style':'dashed', 'width':'100%', 'height':'300px', 'display':'flex','justify-content': 'center','align-items': 'center'}">
            <img :style="{'width':'50px', 'height':'60px'}" id="img" src="@/assets/images/noimage.png"/>
          </div>
        </label> <!--test-->
      </VCardItem>
      <VCardText>
        <p class="text-base clamp-text">
          식전 사진은 필수로 입력해주세요.
        </p>
        <div>
        <input id="filebtn" ref="fileInput" @change="uploadImg" type="file" hidden> <!--test-->
          <v-btn @change="handleUpload">
            upload
          </v-btn>
        </div>
      </VCardText>

      <ShareProjectDialog v-model:isDialogVisible="isShareProjectDialogVisible" />
    </v-card>
  </VCol>
  <VCol cols="6">
    <v-card class="text-high-emphasis text-center">
      <div :style="{'display':'flex', 'justify-content':'center','margin-top':'20px'}">
        <h2>식전 사진</h2>
      </div>
      <VCardText>
        <VBtn @click="isShareProjectDialogVisible = !isShareProjectDialogVisible">
          Show
        </VBtn>
        
        <p :style="{'margin-top':'20px'}" class="text-base clamp-text">
          식전 사진은 필수로 업로드해주세요
        </p>

      </VCardText>
      <VCardItem :style="{'margin-top':'10px'}">
        <input @change="uploadImg" type="file" id="file" hidden> <!--test-->
        <label for="file" class="input-plus"><img :style="{'width':'200px', 'height':'200px'}" id="img" src="@/assets/images/noimage.jpeg"/></label> <!--test-->
      </VCardItem>
      <!-- <div>
        <img :style="{'width':'200px', 'height':'200px'}" id="img" src="@/assets/images/noimage.jpeg"/>
      </div> -->

      <ShareProjectDialog v-model:isDialogVisible="isShareProjectDialogVisible" />
    </v-card>
  </VCol>
</VRow>
</template>

<style>

</style>

<script>

</script>

