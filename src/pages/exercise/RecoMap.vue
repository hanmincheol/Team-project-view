<template>
  <div :style="{'height':'50px'}">
    <VSelect
      :items="recommendPathView"
      label="추천 경로를 선택하세요"
      variant="filled"
      :style="{'width':'100%','float':'right'}"
    />
  </div>
  <div
    id="map"
    :style="{'width':'100%','height':'450px'}"
  /><!-- @click="$emit('refreshChildRoad', lat[0], lng[0], drawingMap)" -->
</template>

<script setup>
import { onMounted } from 'vue'

var recommendPath = [ //받아온 데이터라고 가정
  ["달터근린공원", "구룡산길", "개암약수터"],
  ["실로암 약수터", "대모산 초소위", "독도모형", "대모산 정상"],
  ["선정릉", "봉은사"],
]
var map = ref("") //지도 객체를 담을 변수
var recommendPathView = [] //받아온 경로를 뿌려주는 값을 저장할 변수
var pathAboutLatLng = [] //lat, lng 값을 저장할 변수 

onMounted(()=>{
  const script = document.createElement("script")

  script.onload = () => {
    kakao.maps.load(()=>{ //kakao가 로드되었을 때 실행될 콜백함수 정의

      //지도 띄우기
      initMap(getCurrentPosition()[0], getCurrentPosition()[0])

      var places = new kakao.maps.services.Places() //검색을 위한 객체
      recommendPath.forEach(path=>{
        var temp = [] //[[lng,lat], [lng,lat], [lng,lat]...]
        var option = ''
        path.forEach(point=>{
          option += point + '-' //뿌려주는 용도의 text
          places.keywordSearch(i, (result, status)=>{
            if (status === kakao.maps.services.Status.OK) {
              console.log('검색 결과:', result[0]) //위도, 경도 값에 대한 정보가 나와있음
              temp.push([result[0].x, result[0].y]) //[x,y] = [lng, lat]
            }
          })
        })
        recommendPathView.push(option) //드롭다운 선택란에 뿌려줄 값
        pathAboutLatLng.push(temp) //지도에 뿌려줄 위도, 경도 값
      })
      
    })
  }
  script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ca9eb44c2889273e11b9860d99308508&libraries=services,clusterer,drawing"
  document.head.appendChild(script)
})

//지도를 화면에 로드하기 위한 함수
//지도 객체는 반응형이 아니므로 initMap 함수를 정의해 사용해야 함
const initMap = (lng, lat) => {
  const container = document.getElementById("map")

  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 5,
  }

  map.value = new kakao.maps.Map(container, options)

  //경로 가져오기
}

//사용자의 현재 위치를 얻어오기 위한 함수
const getCurrentPosition = () => {
  var lat, lng
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(positions=>{
      lng = positions.coords.longitude
      lat = positions.coords.latitude
    })
  }
  
  return [lng, lat]
}
</script>
