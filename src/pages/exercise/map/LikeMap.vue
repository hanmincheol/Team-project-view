<template>
  <div :style="{'height':'50px'}">
    <VSelect
      :items="items"
      label="원하는 시/군/구를 선택하세요"
      variant="filled"
      :style="{'width':'50%','float':'right'}"
      prepend-icon="mdi-map-search-outline"
    />
  </div>
  <div
    id="map"
    :style="{'width':'100%','height':'450px'}"
  /> <!-- @click="$emit('refreshChildRoad', lat[0], lng[0], drawingMap)" -->
</template>

<script setup>
var items = [ //즐겨찾기 경로의 시/군/구 카테고리 선택 (받아온 데이터라고 가정)
  '평창군',
  '춘천시',
  '양구군',
  '인제군',
  '영월군',
]

var map = ref("") //지도 객체를 담을 변수


onMounted(()=>{
  const script = document.createElement("script")

  script.onload = () => {
    kakao.maps.load(()=>{ //kakao가 로드되었을 때 실행될 콜백함수 정의

      //지도 띄우기
      initMap(getCurrentPosition()[0], getCurrentPosition()[0])
      map.relayout()
      console.log('like:', map)
      
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

  const tempoptions = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  }

  map = new kakao.maps.Map(container, options)

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
